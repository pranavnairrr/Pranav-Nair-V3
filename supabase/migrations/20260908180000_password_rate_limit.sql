-- Without this, a script that already has a valid share link to a
-- password-protected post could try passwords indefinitely — the link's
-- token being unguessable protects against finding the post at all, but
-- once someone has a real link, the password was the only remaining wall.
-- This locks a given share token out after repeated wrong guesses.

create table if not exists password_attempts (
  share_token text primary key,
  attempts int not null default 0,
  window_started_at timestamptz not null default now(),
  locked_until timestamptz
);

alter table password_attempts enable row level security;
-- No policies granted to anon/authenticated — completely inaccessible via
-- the public API. Only the SECURITY DEFINER function below touches it.

create or replace function check_post_password(p_slug text, p_token text, p_attempt text)
returns setof posts
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  found posts;
  attempt_row password_attempts;
  max_attempts constant int := 10;
  window_minutes constant int := 15;
  lockout_minutes constant int := 15;
begin
  select * into found from posts
  where slug = p_slug
    and visibility = 'password'
    and share_token = p_token
    and (token_expires_at is null or token_expires_at > now());

  -- No real post/token match at all — nothing to rate-limit against.
  if found.id is null then
    return;
  end if;

  select * into attempt_row from password_attempts where share_token = p_token;
  if attempt_row.share_token is null then
    insert into password_attempts (share_token) values (p_token) returning * into attempt_row;
  end if;

  -- Currently locked out — refuse without even checking the password, so
  -- a script can't distinguish "wrong password" from "you're throttled."
  if attempt_row.locked_until is not null and attempt_row.locked_until > now() then
    return;
  end if;

  -- Window expired since the first attempt — reset the counter.
  if now() - attempt_row.window_started_at > (window_minutes || ' minutes')::interval then
    update password_attempts set attempts = 0, window_started_at = now(), locked_until = null
      where share_token = p_token;
    attempt_row.attempts := 0;
  end if;

  if found.password_hash = extensions.crypt(p_attempt, found.password_hash) then
    delete from password_attempts where share_token = p_token;
    return query select * from posts where id = found.id;
    return;
  end if;

  update password_attempts
    set attempts = attempts + 1,
        locked_until = case when attempts + 1 >= max_attempts
          then now() + (lockout_minutes || ' minutes')::interval
          else locked_until end
    where share_token = p_token;

  return;
end;
$$;
