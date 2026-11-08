-- armedias.com lead management, migration 0003: internal notes and the lead view.
-- Run once in Supabase: SQL Editor -> New query -> paste this file -> Run.
-- Safe to run again.

begin;

-- Internal notes. The original enquiry (leads.message) is never changed by a note.
create table if not exists public.lead_notes (
  id bigint generated always as identity primary key,
  lead_id bigint not null references public.leads (id) on delete cascade,
  created_at timestamptz not null default now(),
  body text not null check (length(btrim(body)) between 1 and 5000)
);
create index if not exists lead_notes_lead on public.lead_notes (lead_id, created_at);

alter table public.lead_notes enable row level security;
revoke all on public.lead_notes from anon, authenticated;
grant all on public.lead_notes to service_role;

-- Add a note and record it in the lead's history, in one step
create or replace function public.add_lead_note(p_lead bigint, p_body text) returns jsonb
language plpgsql set search_path = public as $$
declare
  n lead_notes;
begin
  if not exists (select 1 from leads where id = p_lead) then
    raise exception 'That lead no longer exists.';
  end if;
  insert into lead_notes (lead_id, body) values (p_lead, btrim(p_body)) returning * into n;
  insert into lead_activity (lead_id, kind, detail)
  values (p_lead, 'note_added', jsonb_build_object('note_id', n.id, 'preview', left(n.body, 120)));
  return to_jsonb(n);
end $$;

-- Everything the lead view needs in one call
create or replace function public.lead_detail(p_id bigint) returns jsonb
language sql stable set search_path = public as $$
  select case when l.id is null then null else jsonb_build_object(
    'lead', to_jsonb(l),
    'notes', coalesce((select jsonb_agg(to_jsonb(n) order by n.created_at desc, n.id desc) from lead_notes n where n.lead_id = l.id), '[]'::jsonb),
    'activity', coalesce((select jsonb_agg(to_jsonb(a) order by a.created_at desc, a.id desc) from lead_activity a where a.lead_id = l.id), '[]'::jsonb)
  ) end
  from (select 1) one left join leads l on l.id = p_id;
$$;

revoke execute on function public.add_lead_note(bigint, text), public.lead_detail(bigint) from public, anon, authenticated;
grant execute on function public.add_lead_note(bigint, text), public.lead_detail(bigint) to service_role;

insert into public.schema_migrations (version) values ('0003_lead_notes') on conflict do nothing;

commit;

notify pgrst, 'reload schema';
