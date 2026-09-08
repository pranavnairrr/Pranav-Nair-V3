-- Root cause of "new row violates row-level security policy for table
-- posts" when publishing: the admin_users seed (M06/M07) only ever
-- inserted a row for pranav.nairrr@gmail.com, but the account actually
-- signing in day-to-day is ppranav18@gmail.com — which had zero rows in
-- admin_users, so is_admin()/can_write()/my_role() all correctly returned
-- false/null for it. The RLS rejection was correct behavior given that
-- state; this fixes the state.

insert into admin_users (id, email, role)
select id, email, 'admin' from auth.users where email = 'ppranav18@gmail.com'
on conflict (id) do update set role = 'admin';
