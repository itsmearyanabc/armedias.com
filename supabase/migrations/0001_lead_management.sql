-- armedias.com lead management, migration 0001.
-- Run once in Supabase: SQL Editor -> New query -> paste this file -> Run.
-- Safe to run again: every statement checks what already exists.
--
-- Access model: only the website's server reaches these tables, using the project's
-- secret key (service_role). Row Level Security is on with no policies and anon /
-- authenticated privileges are revoked, so the public (publishable) key can read or
-- write nothing here.

begin;

-- ---------------------------------------------------------------------------
-- Statuses
-- ---------------------------------------------------------------------------
create table if not exists public.lead_statuses (
  id bigint generated always as identity primary key,
  -- Stable key the code relies on for built-in statuses: new, hot, cold, spam.
  -- Custom statuses get custom-<id>.
  slug text not null unique,
  name text not null check (length(btrim(name)) between 1 and 40),
  color text not null check (color ~ '^#[0-9a-f]{6}$'),
  sort_order integer not null default 100,
  is_system boolean not null default false,
  is_default boolean not null default false,
  counts_as_converted boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create unique index if not exists lead_statuses_name_key on public.lead_statuses (lower(btrim(name)));
create unique index if not exists lead_statuses_one_default on public.lead_statuses (is_default) where is_default;

insert into public.lead_statuses (slug, name, color, sort_order, is_system, is_default) values
  ('new',  'New Lead',  '#2563eb', 10,   true, true),
  ('hot',  'Hot Lead',  '#dc2626', 20,   true, false),
  ('cold', 'Cold Lead', '#0891b2', 30,   true, false),
  ('spam', 'Spam',      '#6b7280', 1000, true, false)
on conflict (slug) do nothing;

-- ---------------------------------------------------------------------------
-- Leads (website contact form)
-- ---------------------------------------------------------------------------
create table if not exists public.leads (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text,
  company text,
  service text,
  country text,
  budget text,
  message text not null,
  page text,
  visitor_country text,
  email_sent boolean not null default false,
  status_id bigint not null references public.lead_statuses (id) on delete restrict,
  status_changed_at timestamptz,
  -- id in the old on-server SQLite database, so the one-time copy can run twice safely
  legacy_id bigint unique
);
create index if not exists leads_created_at on public.leads (created_at desc, id desc);
create index if not exists leads_status on public.leads (status_id, created_at desc);
create index if not exists leads_country on public.leads (country);
create index if not exists leads_service on public.leads (service);

-- History of what happened to each lead. Phase 1 records creation and status changes;
-- the lead view that shows it arrives in Phase 4.
create table if not exists public.lead_activity (
  id bigint generated always as identity primary key,
  lead_id bigint not null references public.leads (id) on delete cascade,
  created_at timestamptz not null default now(),
  kind text not null check (kind ~ '^[a-z_]{1,40}$'),
  detail jsonb not null default '{}'::jsonb
);
create index if not exists lead_activity_lead on public.lead_activity (lead_id, created_at);

-- ---------------------------------------------------------------------------
-- Job applications (careers form)
-- ---------------------------------------------------------------------------
create table if not exists public.applications (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text,
  role text not null,
  experience text,
  location text,
  portfolio text,
  cv text,
  message text,
  email_sent boolean not null default false,
  legacy_id bigint unique
);
create index if not exists applications_created_at on public.applications (created_at desc, id desc);

-- ---------------------------------------------------------------------------
-- Triggers
-- ---------------------------------------------------------------------------
-- New leads without an explicit status get the configured default.
create or replace function public.leads_before_insert() returns trigger
language plpgsql set search_path = public as $$
begin
  if new.status_id is null then
    select id into new.status_id from lead_statuses where is_default;
  end if;
  return new;
end $$;

create or replace function public.leads_after_insert() returns trigger
language plpgsql set search_path = public as $$
begin
  insert into lead_activity (lead_id, created_at, kind, detail)
  values (new.id, new.created_at, 'created', jsonb_build_object(
    'status', (select name from lead_statuses where id = new.status_id),
    'imported', new.legacy_id is not null));
  return new;
end $$;

create or replace function public.touch_updated_at() returns trigger
language plpgsql set search_path = public as $$
begin
  new.updated_at := now();
  return new;
end $$;

drop trigger if exists leads_before_insert on public.leads;
create trigger leads_before_insert before insert on public.leads
  for each row execute function public.leads_before_insert();
drop trigger if exists leads_after_insert on public.leads;
create trigger leads_after_insert after insert on public.leads
  for each row execute function public.leads_after_insert();
drop trigger if exists lead_statuses_touch on public.lead_statuses;
create trigger lead_statuses_touch before update on public.lead_statuses
  for each row execute function public.touch_updated_at();

-- ---------------------------------------------------------------------------
-- Functions the website server calls (via /rest/v1/rpc/...)
-- ---------------------------------------------------------------------------

-- One page of leads plus the tab counts, for the admin Leads section.
-- Tab counts honour every filter except the status itself.
create or replace function public.lead_page(
  p_status bigint default null,
  p_q text default null,
  p_country text default null,
  p_service text default null,
  p_from timestamptz default null,
  p_to timestamptz default null,
  p_oldest_first boolean default false,
  p_limit integer default 50,
  p_offset integer default 0
) returns jsonb
language sql stable set search_path = public as $$
  with filtered as (
    select l.* from leads l
    where (p_country is null or l.country = p_country)
      and (p_service is null or l.service = p_service)
      and (p_from is null or l.created_at >= p_from)
      and (p_to is null or l.created_at < p_to)
      and (p_q is null or position(lower(p_q) in lower(concat_ws(' ',
            l.name, l.email, l.phone, l.company, l.service, l.country, l.budget, l.message))) > 0)
  ),
  in_tab as (
    select * from filtered where p_status is null or status_id = p_status
  ),
  page as (
    select * from in_tab
    order by
      case when p_oldest_first then created_at end asc,
      case when not p_oldest_first then created_at end desc,
      case when p_oldest_first then id end asc,
      case when not p_oldest_first then id end desc
    limit least(greatest(p_limit, 1), 200) offset greatest(p_offset, 0)
  )
  select jsonb_build_object(
    'total', (select count(*) from in_tab),
    'all', (select count(*) from filtered),
    'counts', coalesce((select jsonb_object_agg(status_id, n)
                        from (select status_id, count(*) as n from filtered group by status_id) c), '{}'::jsonb),
    'rows', coalesce((select jsonb_agg(to_jsonb(p) order by
                        case when p_oldest_first then p.created_at end asc,
                        case when not p_oldest_first then p.created_at end desc,
                        case when p_oldest_first then p.id end asc,
                        case when not p_oldest_first then p.id end desc) from page p), '[]'::jsonb),
    'countries', coalesce((select jsonb_agg(c order by c) from (select distinct country c from leads where country is not null) x), '[]'::jsonb),
    'services', coalesce((select jsonb_agg(s order by s) from (select distinct service s from leads where service is not null) y), '[]'::jsonb)
  );
$$;

-- Change the status of one or more leads and record each change. Returns how many changed.
create or replace function public.set_lead_status(p_ids bigint[], p_status bigint) returns integer
language plpgsql set search_path = public as $$
declare
  changed integer;
begin
  if not exists (select 1 from lead_statuses where id = p_status) then
    raise exception 'That status no longer exists. Reload the page.';
  end if;
  with old as (
    select id, status_id from leads where id = any (p_ids) and status_id <> p_status for update
  ), upd as (
    update leads l set status_id = p_status, status_changed_at = now()
    from old where l.id = old.id
    returning l.id, old.status_id as from_id
  ), log as (
    insert into lead_activity (lead_id, kind, detail)
    select upd.id, 'status_changed', jsonb_build_object(
      'from', (select name from lead_statuses where id = upd.from_id),
      'to', (select name from lead_statuses where id = p_status))
    from upd
    returning 1
  )
  select count(*) into changed from log;
  return changed;
end $$;

-- Status management. Built-in statuses can't be deleted; New Lead and Spam also keep
-- their names because the rest of the system relies on them.
create or replace function public.create_lead_status(p_name text, p_color text) returns bigint
language plpgsql set search_path = public as $$
declare
  new_id bigint;
begin
  if exists (select 1 from lead_statuses where lower(btrim(name)) = lower(btrim(p_name))) then
    raise exception 'A status with that name already exists.';
  end if;
  insert into lead_statuses (slug, name, color, sort_order)
  values ('custom-pending-' || gen_random_uuid(), btrim(p_name), lower(p_color),
          (select coalesce(max(sort_order) filter (where slug <> 'spam'), 0) + 10 from lead_statuses))
  returning id into new_id;
  update lead_statuses set slug = 'custom-' || new_id where id = new_id;
  return new_id;
end $$;

create or replace function public.update_lead_status(p_id bigint, p_name text, p_color text) returns void
language plpgsql set search_path = public as $$
declare
  s lead_statuses;
begin
  select * into s from lead_statuses where id = p_id for update;
  if not found then raise exception 'That status no longer exists. Reload the page.'; end if;
  if s.slug in ('new', 'spam') and btrim(p_name) <> s.name then
    raise exception '"%" is a built-in status and keeps its name. You can still change its colour.', s.name;
  end if;
  if exists (select 1 from lead_statuses where id <> p_id and lower(btrim(name)) = lower(btrim(p_name))) then
    raise exception 'A status with that name already exists.';
  end if;
  update lead_statuses set name = btrim(p_name), color = lower(p_color) where id = p_id;
end $$;

create or replace function public.delete_lead_status(p_id bigint) returns void
language plpgsql set search_path = public as $$
declare
  s lead_statuses;
  in_use bigint;
begin
  select * into s from lead_statuses where id = p_id for update;
  if not found then return; end if;
  if s.is_system then raise exception '"%" is a built-in status and can''t be deleted.', s.name; end if;
  if s.is_default then raise exception '"%" is the default for new leads. Pick another default first.', s.name; end if;
  select count(*) into in_use from leads where status_id = p_id;
  if in_use > 0 then
    raise exception '"%" is used by % lead(s). Move them to another status first.', s.name, in_use;
  end if;
  delete from lead_statuses where id = p_id;
end $$;

create or replace function public.set_default_lead_status(p_id bigint) returns void
language plpgsql set search_path = public as $$
begin
  if not exists (select 1 from lead_statuses where id = p_id) then
    raise exception 'That status no longer exists. Reload the page.';
  end if;
  if (select slug from lead_statuses where id = p_id) = 'spam' then
    raise exception 'Spam can''t be the default for new leads.';
  end if;
  update lead_statuses set is_default = false where is_default and id <> p_id;
  update lead_statuses set is_default = true where id = p_id and not is_default;
end $$;

-- ---------------------------------------------------------------------------
-- Lock everything down to the server's secret key
-- ---------------------------------------------------------------------------
alter table public.lead_statuses enable row level security;
alter table public.leads enable row level security;
alter table public.lead_activity enable row level security;
alter table public.applications enable row level security;

revoke all on public.lead_statuses, public.leads, public.lead_activity, public.applications from anon, authenticated;
grant all on public.lead_statuses, public.leads, public.lead_activity, public.applications to service_role;

revoke execute on function
  public.lead_page(bigint, text, text, text, timestamptz, timestamptz, boolean, integer, integer),
  public.set_lead_status(bigint[], bigint),
  public.create_lead_status(text, text),
  public.update_lead_status(bigint, text, text),
  public.delete_lead_status(bigint),
  public.set_default_lead_status(bigint),
  public.leads_before_insert(),
  public.leads_after_insert(),
  public.touch_updated_at()
from public, anon, authenticated;
grant execute on function
  public.lead_page(bigint, text, text, text, timestamptz, timestamptz, boolean, integer, integer),
  public.set_lead_status(bigint[], bigint),
  public.create_lead_status(text, text),
  public.update_lead_status(bigint, text, text),
  public.delete_lead_status(bigint),
  public.set_default_lead_status(bigint)
to service_role;

-- Record that this migration ran
create table if not exists public.schema_migrations (
  version text primary key,
  applied_at timestamptz not null default now()
);
alter table public.schema_migrations enable row level security;
revoke all on public.schema_migrations from anon, authenticated;
grant all on public.schema_migrations to service_role;
insert into public.schema_migrations (version) values ('0001_lead_management') on conflict do nothing;

commit;

-- Make the API see the new tables and functions right away
notify pgrst, 'reload schema';
