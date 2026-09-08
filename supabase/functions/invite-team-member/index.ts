// Deno Edge Function. Deploy with: npx supabase functions deploy invite-team-member
//
// Creating a Supabase Auth user requires the service_role key, which must
// never reach the browser — so this has to happen server-side. The caller's
// own JWT is checked against admin_users (via a client scoped to their
// token, so RLS applies normally) before any privileged action runs.

import { createClient } from 'jsr:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization') ?? '';
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const anonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    // Scoped to the caller's own session — RLS decides whether they're an
    // admin, we don't just trust a claim from the request body.
    const asCaller = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: isAdmin } = await asCaller.rpc('is_admin');
    if (!isAdmin) {
      return new Response(JSON.stringify({ error: 'Admins only.' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { email, role } = await req.json();
    if (!email || !['admin', 'content_manager', 'viewer'].includes(role)) {
      return new Response(JSON.stringify({ error: 'A valid email and role are required.' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const admin = createClient(supabaseUrl, serviceRoleKey);

    // inviteUserByEmail creates the auth user and emails them a link to
    // set their own password — nobody, including the inviting admin, ever
    // has to know or transmit a temporary password.
    const { data: invited, error: inviteError } = await admin.auth.admin.inviteUserByEmail(email);
    if (inviteError) throw inviteError;

    const { error: roleError } = await admin
      .from('admin_users')
      .upsert({ id: invited.user.id, email, role });
    if (roleError) throw roleError;

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
