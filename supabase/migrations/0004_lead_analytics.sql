-- armedias.com lead management, migration 0004: lead analytics.
-- Run once in Supabase: SQL Editor -> New query -> paste this file -> Run.
-- Safe to run again.

begin;

-- A "Converted" status, counted as a conversion. It is a normal status: rename, recolour or
-- delete it as you like. Any status can be marked "counts as converted" in Settings.
insert into public.lead_statuses (slug, name, color, sort_order, counts_as_converted)
select 'converted', 'Converted', '#16a34a', 900, true
where not exists (select 1 from public.lead_statuses where slug = 'converted' or lower(btrim(name)) = 'converted');
update public.lead_statuses set counts_as_converted = true where lower(btrim(name)) = 'converted';

create or replace function public.set_status_converted(p_id bigint, p_value boolean) returns void
language plpgsql set search_path = public as $$
begin
  if (select slug from lead_statuses where id = p_id) = 'spam' and p_value then
    raise exception 'Spam can''t count as converted.';
  end if;
  update lead_statuses set counts_as_converted = p_value where id = p_id;
  if not found then raise exception 'That status no longer exists. Reload the page.'; end if;
end $$;

-- Every figure on the dashboard's lead analytics, from the leads table itself.
-- Breakdowns and the monthly chart leave out spam; months are India time.
create or replace function public.lead_stats() returns jsonb
language sql stable set search_path = public as $$
  with l as (
    select l.*, s.slug, s.counts_as_converted as conv from leads l join lead_statuses s on s.id = l.status_id
  ),
  real as (select * from l where slug <> 'spam'),
  months as (
    select generate_series(
      date_trunc('month', now() at time zone 'Asia/Kolkata') - interval '11 months',
      date_trunc('month', now() at time zone 'Asia/Kolkata'),
      interval '1 month') as m
  )
  select jsonb_build_object(
    'total', (select count(*) from l),
    'spam', (select count(*) from l where slug = 'spam'),
    'converted', (select count(*) from real where conv),
    'by_status', coalesce((select jsonb_object_agg(status_id, n) from (select status_id, count(*) n from l group by 1) x), '{}'::jsonb),
    'by_source', coalesce((select jsonb_object_agg(source, n) from (select source, count(*) n from real group by 1) x), '{}'::jsonb),
    'by_country', coalesce((select jsonb_agg(jsonb_build_object('label', k, 'n', n) order by n desc, k)
      from (select coalesce(nullif(btrim(country), ''), 'Not given') k, count(*) n from real group by 1 order by 2 desc, 1 limit 12) x), '[]'::jsonb),
    'by_service', coalesce((select jsonb_agg(jsonb_build_object('label', k, 'n', n) order by n desc, k)
      from (select coalesce(nullif(btrim(service), ''), 'Not given') k, count(*) n from real group by 1 order by 2 desc, 1 limit 12) x), '[]'::jsonb),
    'monthly', (select jsonb_agg(jsonb_build_object('month', to_char(months.m, 'YYYY-MM'), 'n', coalesce(c.n, 0)) order by months.m)
      from months left join (
        select date_trunc('month', created_at at time zone 'Asia/Kolkata') as mm, count(*) n from real group by 1
      ) c on c.mm = months.m)
  );
$$;

revoke execute on function public.lead_stats(), public.set_status_converted(bigint, boolean) from public, anon, authenticated;
grant execute on function public.lead_stats(), public.set_status_converted(bigint, boolean) to service_role;

insert into public.schema_migrations (version) values ('0004_lead_analytics') on conflict do nothing;

commit;

notify pgrst, 'reload schema';
