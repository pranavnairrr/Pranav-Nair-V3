-- Applied via `npx supabase db push` (or paste into Supabase dashboard →
-- SQL Editor → New Query if you'd rather run it by hand).
--
-- SETUP ORDER:
--   1. Supabase dashboard → Authentication → Users → Add user. Create
--      your own admin login (email + password). This is the only account
--      that will ever be able to write posts. (Email already set below:
--      pranav.nairrr@gmail.com — must match exactly.)
--   2. Run this migration.

create extension if not exists pgcrypto with schema extensions;

-- Single source of truth for "is the caller the admin" — checked by email
-- so nothing here needs your user id hardcoded in a dozen places.
create or replace function is_admin()
returns boolean
language sql
stable
as $$
  select coalesce(auth.jwt() ->> 'email', '') = 'pranav.nairrr@gmail.com';
$$;

-- ── POSTS ──────────────────────────────────────────────────────────────
create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null default '',
  excerpt text not null default '',
  cover_image_url text,
  body_json jsonb not null default '{"type":"doc","content":[]}'::jsonb,
  category text,
  visibility text not null default 'private'
    check (visibility in ('public', 'private', 'password')),
  password_hash text,
  share_token text unique,
  token_expires_at timestamptz,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists posts_visibility_published_idx
  on posts (visibility, published_at desc);

alter table posts enable row level security;

-- Public can only ever see fully public, published posts — nothing else,
-- including the share_token/password_hash columns of any other row, is
-- reachable through the API directly.
create policy "public posts are readable"
  on posts for select
  using (visibility = 'public' and published_at is not null);

create policy "admin can read all posts"
  on posts for select
  using (is_admin());

create policy "admin can insert posts"
  on posts for insert
  with check (is_admin());

create policy "admin can update posts"
  on posts for update
  using (is_admin());

create policy "admin can delete posts"
  on posts for delete
  using (is_admin());

-- keep updated_at current
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists posts_set_updated_at on posts;
create trigger posts_set_updated_at
  before update on posts
  for each row execute function set_updated_at();

-- ── ACCESS FUNCTIONS (the only way to reach a private/password post) ───

-- Link-only posts: valid, non-expired token required.
create or replace function get_post_by_share(p_slug text, p_token text)
returns setof posts
language sql
security definer
set search_path = public
as $$
  select * from posts
  where slug = p_slug
    and visibility in ('private', 'password')
    and share_token = p_token
    and (token_expires_at is null or token_expires_at > now());
$$;

revoke all on function get_post_by_share(text, text) from public;
grant execute on function get_post_by_share(text, text) to anon, authenticated;

-- Password posts: same token check, plus a password match. Returns the
-- post only on success; the hash itself is never exposed.
create or replace function check_post_password(p_slug text, p_token text, p_attempt text)
returns setof posts
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  found posts;
begin
  select * into found from posts
  where slug = p_slug
    and visibility = 'password'
    and share_token = p_token
    and (token_expires_at is null or token_expires_at > now());

  if found.id is null then
    return;
  end if;

  if found.password_hash = extensions.crypt(p_attempt, found.password_hash) then
    return query select * from posts where id = found.id;
  end if;

  return;
end;
$$;

revoke all on function check_post_password(text, text, text) from public;
grant execute on function check_post_password(text, text, text) to anon, authenticated;

-- Admin UI calls this to set/change a post's password — hashes
-- server-side, the plaintext never gets stored.
create or replace function set_post_password(p_id uuid, p_new_password text)
returns void
language sql
security definer
set search_path = public, extensions
as $$
  update posts set password_hash = extensions.crypt(p_new_password, extensions.gen_salt('bf'))
  where id = p_id and is_admin();
$$;

revoke all on function set_post_password(uuid, text) from public;
grant execute on function set_post_password(uuid, text) to authenticated;

-- ── LINK PREVIEW CACHE ───────────────────────────────────────────────
create table if not exists link_previews (
  url text primary key,
  platform text,
  title text,
  description text,
  image_url text,
  embed_html text,
  fetched_at timestamptz not null default now()
);

alter table link_previews enable row level security;

create policy "link previews are readable"
  on link_previews for select
  using (true);

-- Writes happen only from the Edge Function using the service_role key,
-- which bypasses RLS entirely — no insert/update policy needed here.

-- ── STORAGE ──────────────────────────────────────────────────────────
insert into storage.buckets (id, name, public)
values ('post-images', 'post-images', true)
on conflict (id) do nothing;

create policy "post images are publicly readable"
  on storage.objects for select
  using (bucket_id = 'post-images');

create policy "admin can upload post images"
  on storage.objects for insert
  with check (bucket_id = 'post-images' and is_admin());

create policy "admin can delete post images"
  on storage.objects for delete
  using (bucket_id = 'post-images' and is_admin());
