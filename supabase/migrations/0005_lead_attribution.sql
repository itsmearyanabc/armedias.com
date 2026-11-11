-- armedias.com lead management, migration 0005: how each lead found the site.
-- Run once in Supabase: SQL Editor -> New query -> paste this file -> Run.
-- Safe to run again. The website works before and after this runs; until it runs, new
-- leads are simply saved without the "found via" details.

begin;

-- { channel, landing, referrer, utm_source, utm_medium, utm_campaign }
alter table public.leads add column if not exists attribution jsonb;

-- lead_stats gains leads by channel and the top landing pages (spam left out, as before)
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
    'by_channel', coalesce((select jsonb_agg(jsonb_build_object('label', k, 'n', n) order by n desc, k)
      from (select attribution->>'channel' k, count(*) n from real where attribution->>'channel' is not null group by 1) x), '[]'::jsonb),
    'by_landing', coalesce((select jsonb_agg(jsonb_build_object('label', k, 'n', n) order by n desc, k)
      from (select attribution->>'landing' k, count(*) n from real where attribution->>'landing' is not null group by 1 order by 2 desc, 1 limit 12) x), '[]'::jsonb),
    'monthly', (select jsonb_agg(jsonb_build_object('month', to_char(months.m, 'YYYY-MM'), 'n', coalesce(c.n, 0)) order by months.m)
      from months left join (
        select date_trunc('month', created_at at time zone 'Asia/Kolkata') as mm, count(*) n from real group by 1
      ) c on c.mm = months.m)
  );
$$;

revoke execute on function public.lead_stats() from public, anon, authenticated;
grant execute on function public.lead_stats() to service_role;

insert into public.schema_migrations (version) values ('0005_lead_attribution') on conflict do nothing;

commit;

notify pgrst, 'reload schema';
