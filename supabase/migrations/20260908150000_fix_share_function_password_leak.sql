-- get_post_by_share previously matched visibility in ('private','password'),
-- which meant a password-protected post's full content (including
-- body_json) was returned to anyone with just the share link — the
-- password requirement was never actually enforced. Restrict this
-- function to link-only posts; password posts must go through
-- check_post_password instead, which is the only path that verifies
-- the password before returning anything.

create or replace function get_post_by_share(p_slug text, p_token text)
returns setof posts
language sql
security definer
set search_path = public
as $$
  select * from posts
  where slug = p_slug
    and visibility = 'private'
    and share_token = p_token
    and (token_expires_at is null or token_expires_at > now());
$$;
