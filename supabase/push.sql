-- Avisos al celu: tablas privadas (RLS sin políticas: solo las lee la función «push») y el cron de las 10.
create table if not exists public.push_subs (endpoint text primary key, member text not null, sub jsonb not null, updated_at timestamptz default now());
create table if not exists public.push_keys (id int primary key, pub text not null, jwk jsonb not null);
create table if not exists public.push_log (key text primary key, at timestamptz default now());
alter table public.push_subs enable row level security;
alter table public.push_keys enable row level security;
alter table public.push_log enable row level security;

create extension if not exists pg_net;
create extension if not exists pg_cron;

-- Todos los días a las 10 de Argentina (13 UTC): job «cdm-avisos-10hs» en Integrations → Cron,
-- tipo «Supabase Edge Function», POST a «push» con body {"op":"daily"}.
-- La clave del header la agrega el panel de Supabase (no va en el repo).
