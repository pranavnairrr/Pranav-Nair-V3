-- Replaces the single hardcoded-email is_admin() with a real team/role
-- system: admin (full access), content_manager (can create/edit posts,
-- cannot delete), viewer (read-only across everything, including drafts).

create table if not exists admin_users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  role text not null check (role in ('admin', 'content_manager', 'viewer')),
  created_at timestamptz not null default now()
);

alter table admin_users enable row level security;

-- Any recognized team member is a valid caller at all.
create or replace function is_team_member()
returns boolean
language sql
stable
as $$
  select exists (select 1 from admin_users where id = auth.uid());
$$;

-- Full access, including deleting posts and managing the team.
create or replace function is_admin()
returns boolean
language sql
stable
as $$
  select exists (select 1 from admin_users where id = auth.uid() and role = 'admin');
$$;

-- Can create/edit posts, upload images, set passwords — cannot delete
-- posts and cannot manage the team.
create or replace function can_write()
returns boolean
language sql
stable
as $$
  select exists (
    select 1 from admin_users where id = auth.uid() and role in ('admin', 'content_manager')
  );
$$;

-- A caller's own role, for the UI to key off (no need to expose the whole
-- admin_users table just to answer "what am I allowed to do").
create or replace function my_role()
returns text
language sql
stable
as $$
  select role from admin_users where id = auth.uid();
$$;

grant execute on function is_team_member() to authenticated;
grant execute on function is_admin() to authenticated;
grant execute on function can_write() to authenticated;
grant execute on function my_role() to authenticated;

-- Only admins can see/manage the team list; everyone can read their own row.
create policy "admin reads all team members"
  on admin_users for select
  using (is_admin());

create policy "member reads own row"
  on admin_users for select
  using (id = auth.uid());

create policy "admin manages team"
  on admin_users for all
  using (is_admin())
  with check (is_admin());

-- ── Re-point existing policies/functions at the new role model ─────────

drop policy if exists "admin can read all posts" on posts;
create policy "team can read all posts"
  on posts for select
  using (is_team_member());

drop policy if exists "admin can insert posts" on posts;
create policy "writers can insert posts"
  on posts for insert
  with check (can_write());

drop policy if exists "admin can update posts" on posts;
create policy "writers can update posts"
  on posts for update
  using (can_write());

-- Delete stays admin-only — "admin can delete posts" policy is unchanged.

drop policy if exists "admin can upload post images" on storage.objects;
create policy "writers can upload post images"
  on storage.objects for insert
  with check (bucket_id = 'post-images' and can_write());

drop policy if exists "admin can delete post images" on storage.objects;
create policy "writers can delete post images"
  on storage.objects for delete
  using (bucket_id = 'post-images' and can_write());

create or replace function set_post_password(p_id uuid, p_new_password text)
returns void
language sql
security definer
set search_path = public, extensions
as $$
  update posts set password_hash = extensions.crypt(p_new_password, extensions.gen_salt('bf'))
  where id = p_id and can_write();
$$;

-- ── Seed the current admin from the existing Supabase Auth user ────────
insert into admin_users (id, email, role)
select id, email, 'admin' from auth.users where email = 'pranav.nairrr@gmail.com'
on conflict (id) do update set role = 'admin';
