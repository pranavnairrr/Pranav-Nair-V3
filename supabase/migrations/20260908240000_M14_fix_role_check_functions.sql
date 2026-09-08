-- Fixes "new row violates row-level security policy for table posts" when
-- publishing. Root cause: is_admin/is_team_member/can_write/my_role query
-- admin_users (which has its own RLS) but weren't SECURITY DEFINER — so
-- they ran under the caller's own row-visibility into admin_users instead
-- of seeing it directly, unlike every other access-control function in
-- this project (get_post_by_share, check_post_password, etc. are all
-- SECURITY DEFINER). Nested RLS through a non-definer function is a known
-- footgun; this brings these four in line with the established pattern.

create or replace function is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from admin_users where id = auth.uid() and role = 'admin');
$$;

create or replace function is_team_member()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from admin_users where id = auth.uid());
$$;

create or replace function can_write()
returns boolean
language sql
stable
security definer
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
security definer
set search_path = public
as $$
  select role from admin_users where id = auth.uid();
$$;
