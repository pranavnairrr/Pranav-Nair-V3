-- Applied via `npx supabase db push` (or paste into Supabase dashboard →
-- SQL Editor → New Query if you'd rather run it by hand).
-- Replace 'CHANGE-ME' on the insert line below with your own password
-- BEFORE running — only its hash gets stored, the plaintext is never saved.

create extension if not exists pgcrypto with schema extensions;

create table if not exists vault_gates (
  id text primary key,
  password_hash text not null,
  created_at timestamptz not null default now()
);

-- Lock the table completely — no SELECT/INSERT/UPDATE/DELETE through the
-- API for anyone, anon or authenticated. Only the function below (running
-- as the table owner via SECURITY DEFINER) can read it.
alter table vault_gates enable row level security;

insert into vault_gates (id, password_hash)
values ('am-health-hub', extensions.crypt('CHANGE-ME', extensions.gen_salt('bf')))
on conflict (id) do update set password_hash = excluded.password_hash;

-- The only way to check a password: takes a plaintext attempt, returns
-- true/false. The stored hash is never returned to the caller.
create or replace function check_vault_password(gate_id text, attempt text)
returns boolean
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  stored_hash text;
begin
  select password_hash into stored_hash from vault_gates where id = gate_id;
  if stored_hash is null then
    return false;
  end if;
  return stored_hash = extensions.crypt(attempt, stored_hash);
end;
$$;

revoke all on function check_vault_password(text, text) from public;
grant execute on function check_vault_password(text, text) to anon;
grant execute on function check_vault_password(text, text) to authenticated;

-- To change the password later, just re-run the insert above with a new
-- value for CHANGE-ME (the on conflict clause updates the existing row).
