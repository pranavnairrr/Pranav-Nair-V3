-- Applied via `npx supabase db push` after the posts_schema migration
-- (reuses is_admin() from that one, but redefines it here too so this
-- file also works standalone if run by hand in the SQL Editor).

create or replace function is_admin()
returns boolean
language sql
stable
as $$
  select coalesce(auth.jwt() ->> 'email', '') = 'pranav.nairrr@gmail.com';
$$;

-- One row per pageview or per section-engagement measurement. Deliberately
-- minimal: no IP storage, no cross-session persistent visitor ID — a
-- session_id is generated fresh per browser tab (sessionStorage), so
-- "unique visitors" here means unique sessions, not people tracked across
-- days. Good enough for "how many visits, what did they read, how long,"
-- without the privacy/consent complexity of long-lived tracking cookies.
create table if not exists analytics_events (
  id uuid primary key default gen_random_uuid(),
  session_id text not null,
  path text not null,
  referrer text,
  event_type text not null check (event_type in ('pageview', 'section_view')),
  section_id text,
  duration_ms integer,
  created_at timestamptz not null default now()
);

create index if not exists analytics_events_created_at_idx
  on analytics_events (created_at desc);
create index if not exists analytics_events_path_idx
  on analytics_events (path);

alter table analytics_events enable row level security;

-- Anyone can write an event (that's how tracking works) — but nobody can
-- read events back except the admin. A visitor can't see other visitors'
-- data, and the table can't be scraped for traffic numbers.
create policy "anyone can log an event"
  on analytics_events for insert
  with check (true);

create policy "admin can read events"
  on analytics_events for select
  using (is_admin());

-- Handy aggregates for the admin dashboard.
create or replace view analytics_daily as
select
  date_trunc('day', created_at) as day,
  count(distinct session_id) filter (where event_type = 'pageview') as sessions,
  count(*) filter (where event_type = 'pageview') as pageviews
from analytics_events
group by 1
order by 1 desc;

create or replace view analytics_top_pages as
select
  path,
  count(distinct session_id) as sessions,
  count(*) as pageviews
from analytics_events
where event_type = 'pageview'
group by path
order by pageviews desc;

create or replace view analytics_section_engagement as
select
  section_id,
  count(*) as views,
  round(avg(duration_ms)) as avg_duration_ms,
  round(percentile_cont(0.5) within group (order by duration_ms)) as median_duration_ms
from analytics_events
where event_type = 'section_view' and section_id is not null
group by section_id
order by avg_duration_ms desc nulls last;

-- Views inherit the RLS of the underlying table for authenticated/anon
-- roles by default in Supabase (security_invoker), so admin-only reads on
-- analytics_events are enough — but grant explicitly to be safe:
revoke all on analytics_daily, analytics_top_pages, analytics_section_engagement from anon;
grant select on analytics_daily, analytics_top_pages, analytics_section_engagement to authenticated;
