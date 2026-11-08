-- armedias.com lead management, migration 0002: where each lead came from.
-- Run once in Supabase: SQL Editor -> New query -> paste this file -> Run.
-- Safe to run again.

begin;

alter table public.leads add column if not exists source text not null default 'website';
alter table public.leads drop constraint if exists leads_source_check;
alter table public.leads add constraint leads_source_check check (source in ('website', 'google_forms', 'manual'));
-- Stable id from the source system (Google Forms: gforms:<form id>:<response id>), so the
-- same response is never imported twice
alter table public.leads add column if not exists external_id text;
create unique index if not exists leads_external_id on public.leads (external_id);
create index if not exists leads_source on public.leads (source);

-- Record the source in the "created" activity
create or replace function public.leads_after_insert() returns trigger
language plpgsql set search_path = public as $$
begin
  insert into lead_activity (lead_id, created_at, kind, detail)
  values (new.id, new.created_at, 'created', jsonb_build_object(
    'status', (select name from lead_statuses where id = new.status_id),
    'source', new.source,
    'imported', new.legacy_id is not null));
  return new;
end $$;

-- lead_page gains a source filter and returns the sources present
drop function if exists public.lead_page(bigint, text, text, text, timestamptz, timestamptz, boolean, integer, integer);
create or replace function public.lead_page(
  p_status bigint default null,
  p_q text default null,
  p_country text default null,
  p_service text default null,
  p_from timestamptz default null,
  p_to timestamptz default null,
  p_oldest_first boolean default false,
  p_limit integer default 50,
  p_offset integer default 0,
  p_source text default null
) returns jsonb
language sql stable set search_path = public as $$
  with filtered as (
    select l.* from leads l
    where (p_country is null or l.country = p_country)
      and (p_service is null or l.service = p_service)
      and (p_source is null or l.source = p_source)
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

revoke execute on function public.lead_page(bigint, text, text, text, timestamptz, timestamptz, boolean, integer, integer, text) from public, anon, authenticated;
grant execute on function public.lead_page(bigint, text, text, text, timestamptz, timestamptz, boolean, integer, integer, text) to service_role;

insert into public.schema_migrations (version) values ('0002_lead_sources') on conflict do nothing;

commit;

notify pgrst, 'reload schema';
