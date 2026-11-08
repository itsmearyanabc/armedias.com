// Google Forms integration settings.
//   POST { action: 'connect' }                         create / replace the connection key
//   POST { action: 'disconnect' }                      remove the key (imported leads stay)
//   POST { action: 'webapp', url }                     save the script's web app URL
//   POST { action: 'mapping', map: { question: field } }
//   POST { action: 'sync', mode: 'recent' | 'all' }   ask the script to send responses now
import type { APIRoute } from 'astro';
import { bad, guard, jsonBody, ok } from '../../../server/admin-api';
import { connect, disconnect, requestSync, setFieldMap, setWebAppUrl } from '../../../server/google-forms';

export const prerender = false;

export const POST: APIRoute = async (ctx) => {
  const denied = guard(ctx);
  if (denied) return denied;
  const body = await jsonBody(ctx.request);
  if (!body) return bad('Invalid request.');
  switch (body.action) {
    case 'connect':
      connect();
      return ok();
    case 'disconnect':
      disconnect();
      return ok();
    case 'webapp': {
      const r = setWebAppUrl(String(body.url ?? ''));
      return typeof r === 'string' ? ok({ url: r }) : bad(r.error, 422);
    }
    case 'mapping': {
      const r = setFieldMap(body.map && typeof body.map === 'object' ? (body.map as Record<string, unknown>) : {});
      return 'error' in r ? bad(r.error, 422) : ok();
    }
    case 'sync': {
      const r = await requestSync(body.mode === 'all' ? 'all' : 'recent');
      return r.ok ? ok({ message: r.message }) : bad(r.message, 502);
    }
    default:
      return bad('Unknown action.');
  }
};
