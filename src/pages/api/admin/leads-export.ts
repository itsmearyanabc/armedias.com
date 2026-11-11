// CSV of every lead matching the admin's current tab and filters (GET, same query
// parameters as the dashboard). Selected rows are exported in the browser instead.
import type { APIRoute } from 'astro';
import { guard } from '../../../server/admin-api';
import { dbMessage, LEAD_SOURCES, leadPage, listStatuses, parseLeadFilters, PAGE_SIZE, type Lead } from '../../../server/leads';

export const prerender = false;

const MAX_ROWS = 20_000;
const columns: [keyof Lead | 'status' | 'found_via' | 'landing', string][] = [
  ['created_at', 'Date (UTC)'], ['source', 'Source'], ['found_via', 'Found via'], ['landing', 'First page'], ['status', 'Status'], ['name', 'Name'], ['email', 'Email'], ['phone', 'Phone'],
  ['company', 'Company'], ['service', 'Service'], ['country', 'Country'], ['budget', 'Budget'], ['message', 'Message'], ['page', 'Page'],
];
// Quote every cell. A leading = + - @ would run as a spreadsheet formula, so such cells get a
// ' prefix, except plain phone numbers like +1 555 0100, which can't do anything.
const cell = (v: unknown) => {
  const t = String(v ?? '');
  const risky = /^[=+\-@\t\r]/.test(t) && !/^[+\-]?[\d\s().-]+$/.test(t);
  return `"${(risky ? `'${t}` : t).replace(/"/g, '""')}"`;
};


export const GET: APIRoute = async (ctx) => {
  const denied = guard(ctx);
  if (denied) return denied;
  const filters = parseLeadFilters(ctx.url.searchParams);
  try {
    const statuses = await listStatuses();
    const names = new Map(statuses.map((s) => [s.id, s.name]));
    const rows: Lead[] = [];
    for (let page = 1; rows.length < MAX_ROWS; page++) {
      const chunk = await leadPage({ ...filters, page }, statuses);
      rows.push(...chunk.rows);
      if (chunk.rows.length < PAGE_SIZE) break;
    }
    const csv = [columns.map(([, label]) => cell(label)).join(','),
      ...rows.map((l) => columns.map(([key]) => cell(key === 'status' ? names.get(l.status_id) : key === 'source' ? LEAD_SOURCES[l.source] : key === 'found_via' ? l.attribution?.channel : key === 'landing' ? l.attribution?.landing : l[key])).join(','))].join('\r\n');
    return new Response('﻿' + csv, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="armedias-leads-${new Date().toISOString().slice(0, 10)}.csv"`,
        'Cache-Control': 'no-store',
      },
    });
  } catch (err) {
    return new Response(dbMessage(err), { status: 502, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
  }
};
