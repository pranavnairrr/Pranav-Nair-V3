-- The original seed in 20260908160000_roles.sql found no matching
-- auth.users row (the account hadn't been created yet in the dashboard),
-- so it silently inserted nothing. Re-running the same idempotent seed
-- now that the account exists.

insert into admin_users (id, email, role)
select id, email, 'admin' from auth.users where email = 'pranav.nairrr@gmail.com'
on conflict (id) do update set role = 'admin';
