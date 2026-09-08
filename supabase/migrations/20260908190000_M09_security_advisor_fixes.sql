-- Addresses the two real findings from Supabase's Security Advisor:
--
-- 1. ERROR: analytics_daily / analytics_top_pages / analytics_section_engagement
--    were plain views, which in Postgres run as their OWNER by default —
--    not as the querying user — unless `security_invoker` is set. That
--    means the "admin can read events" RLS policy on analytics_events was
--    silently bypassed for anyone querying these views directly, so any
--    signed-in team member (not just admin — content_manager and viewer
--    too, since all three roles are `authenticated`) could hit
--    /rest/v1/analytics_daily and read traffic data straight past is_admin().
--    This is what showed as the "Unrestricted" tag in the Table Editor.
--    Fix: security_invoker = true makes the view run as the querying user,
--    so the underlying table's RLS (admin-only) applies for real.
--
-- 2. WARN: a handful of functions had no search_path pinned, which is a
--    theoretical hijack vector (a role with schema-create rights could
--    shadow a table/function name earlier in an unset search_path).
--    None of these are reachable by anon/authenticated in a way that lets
--    them influence the caller's search_path, so this was low severity —
--    fixing it anyway since it's free.

alter view analytics_daily set (security_invoker = true);
alter view analytics_top_pages set (security_invoker = true);
alter view analytics_section_engagement set (security_invoker = true);

create or replace function set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function is_admin()
returns boolean
language sql
stable
set search_path = public
as $$
  select exists (select 1 from admin_users where id = auth.uid() and role = 'admin');
$$;

create or replace function is_team_member()
returns boolean
language sql
stable
set search_path = public
as $$
  select exists (select 1 from admin_users where id = auth.uid());
$$;

create or replace function can_write()
returns boolean
language sql
stable
set search_path = public
as $$
  select exists (
    select 1 from admin_users where id = auth.uid() and role in ('admin', 'content_manager')
  );
$$;

create or replace function my_role()
returns text
language sql
stable
set search_path = public
as $$
  select role from admin_users where id = auth.uid();
$$;
