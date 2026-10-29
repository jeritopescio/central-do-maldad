-- Central do Maldad: base compartida, sin login (cada celu elige quién es).
-- Se corre una vez en el proyecto de Supabase.

create table if not exists public.items (
  id text primary key,
  kind text not null,
  data jsonb not null,
  updated_at timestamptz not null default now(),
  updated_by text
);
create index if not exists items_kind_idx on public.items (kind);

-- Sin login: la app entra con la clave pública. Cualquiera con el link de la app podría leer y escribir.
alter table public.items enable row level security;
drop policy if exists "app lee" on public.items;
drop policy if exists "app agrega" on public.items;
drop policy if exists "app edita" on public.items;
drop policy if exists "app borra" on public.items;
create policy "app lee" on public.items for select to anon, authenticated using (true);
create policy "app agrega" on public.items for insert to anon, authenticated with check (true);
create policy "app edita" on public.items for update to anon, authenticated using (true) with check (true);
create policy "app borra" on public.items for delete to anon, authenticated using (true);

create or replace function public.touch_updated_at() returns trigger language plpgsql set search_path = public as $$
begin new.updated_at = now(); return new; end $$;
drop trigger if exists items_touch on public.items;
create trigger items_touch before update on public.items for each row execute function public.touch_updated_at();

-- Para que los cambios lleguen al instante a los otros celus.
do $$ begin
  alter publication supabase_realtime add table public.items;
exception when duplicate_object then null; end $$;
