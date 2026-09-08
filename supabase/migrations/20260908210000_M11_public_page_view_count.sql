-- A public-safe way to show "N views" on a blog post without exposing the
-- underlying analytics_events table (which stays admin-only per M06/M09).
-- Returns just a count for one path — no session ids, no timestamps, no
-- referrers. Anyone can call it, but all they ever get back is a number.

create or replace function get_page_view_count(p_path text)
returns bigint
language sql
stable
security definer
set search_path = public
as $$
  select count(*) from analytics_events
  where path = p_path and event_type = 'pageview';
$$;

revoke all on function get_page_view_count(text) from public;
grant execute on function get_page_view_count(text) to anon, authenticated;
