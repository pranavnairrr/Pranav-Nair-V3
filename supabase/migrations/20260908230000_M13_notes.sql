-- Adds a lightweight "note" type alongside regular articles — short posts
-- (a sentence, optionally with an image or a link-preview card), X/Threads
-- style. Reuses the entire posts table/RLS/functions instead of a parallel
-- system: same visibility model, same admin roles, same public-post rule.

alter table posts add column if not exists type text not null default 'article'
  check (type in ('article', 'note'));

create index if not exists posts_type_idx on posts (type);
