// Browser side of Cloudflare Turnstile, shared by the public forms and the admin sign-in.
// The script loads only when asked for, never on plain page views.
import { TURNSTILE_SITE_KEY } from '../data/turnstile';

interface Turnstile {
  render(el: HTMLElement, opts: Record<string, unknown>): string;
  getResponse(id: string): string | undefined;
  reset(id: string): void;
}
declare global { interface Window { turnstile?: Turnstile } }

let script: Promise<Turnstile> | null = null;
function load(): Promise<Turnstile> {
  script ??= new Promise<Turnstile>((resolve, reject) => {
    const s = document.createElement('script');
    s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    s.async = true;
    s.onload = () => (window.turnstile ? resolve(window.turnstile) : reject(new TurnstileUnavailable()));
    s.onerror = () => { script = null; reject(new TurnstileUnavailable()); };
    document.head.append(s);
  });
  return script;
}

/** The check could not run at all (blocked script, unsupported browser, repeated errors). */
export class TurnstileUnavailable extends Error {
  constructor() { super('Turnstile unavailable'); this.name = 'TurnstileUnavailable'; }
}

export interface Check {
  /** Start loading and rendering (safe to call repeatedly). */
  start(): Promise<void>;
  /** A fresh token. Waits up to `waitMs` for the visitor to finish an interactive check. */
  token(waitMs?: number): Promise<string>;
  /** Tokens work once: call after every submission attempt. */
  reset(): void;
}

/**
 * A Turnstile widget inside `box`. `appearance: 'interaction-only'` stays hidden unless
 * Cloudflare needs a click; 'always' shows the tick box. Returns null when no site key is set.
 */
export function createCheck(box: HTMLElement, action: string, appearance: 'interaction-only' | 'always'): Check | null {
  if (!TURNSTILE_SITE_KEY) return null;
  let id: Promise<string> | null = null;
  let failures = 0;
  let unsupported = false;

  const start = () => (id ??= load().then((t) => t.render(box, {
    sitekey: TURNSTILE_SITE_KEY,
    action,
    appearance,
    'refresh-expired': 'auto',
    'response-field-name': 'cf-turnstile-response',
    'error-callback': () => { failures++; },          // Turnstile retries on its own
    'unsupported-callback': () => { unsupported = true; },
  })).catch((err) => { id = null; throw err; }));

  return {
    start: () => start().then(() => undefined),
    async token(waitMs = 15_000) {
      const widget = await start();
      for (let waited = 0; waited <= waitMs; waited += 250) {
        if (unsupported || failures >= 3) throw new TurnstileUnavailable();
        const t = window.turnstile!.getResponse(widget);
        if (t) return t;
        await new Promise((r) => setTimeout(r, 250));
      }
      if (failures) throw new TurnstileUnavailable();
      throw new Error('Please tick the "Verify you are human" box, then try again.');
    },
    reset: () => { id?.then((w) => window.turnstile?.reset(w)).catch(() => {}); },
  };
}
