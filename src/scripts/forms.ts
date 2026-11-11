// Submits [data-ajax-form] forms (contact, careers) in place and shows their animated
// success panel. Without JS the forms post normally and the server redirects.
import { gsap } from 'gsap';
import { createCheck, TurnstileUnavailable } from '../lib/turnstile-client';

// Cloudflare Turnstile protects form submissions only. It starts when a visitor first
// touches a form, so page views (and crawlers, which never fill in forms) never load it.
function securityCheck(form: HTMLFormElement, before: HTMLElement) {
  const box = document.createElement('div');
  box.className = 'mt-5 empty:hidden';
  before.before(box);
  const check = createCheck(box, form.action.includes('careers') ? 'careers' : 'contact', 'interaction-only');
  if (!check) { box.remove(); return null; }
  form.addEventListener('focusin', () => { check.start().catch(() => {}); }, { once: true });
  form.addEventListener('pointerdown', () => { check.start().catch(() => {}); }, { once: true });
  return check;
}

// How this visit began: the first page, the site that sent the visitor and campaign tags.
// Kept in this tab's sessionStorage and sent only if the visitor submits a form, so the
// business can see which pages and channels bring enquiries.
const FIRST_TOUCH = 'am_first_touch';
function firstTouch(): Record<string, string> {
  try {
    const saved = sessionStorage.getItem(FIRST_TOUCH);
    if (saved) return JSON.parse(saved) as Record<string, string>;
    const q = new URLSearchParams(location.search);
    let referrer = '';
    try {
      const host = document.referrer ? new URL(document.referrer).hostname : '';
      if (host && host !== location.hostname) referrer = host;
    } catch { /* unparseable referrer */ }
    const touch: Record<string, string> = { landing: location.pathname, referrer };
    for (const k of ['utm_source', 'utm_medium', 'utm_campaign']) touch[k] = (q.get(k) ?? '').slice(0, 80);
    sessionStorage.setItem(FIRST_TOUCH, JSON.stringify(touch));
    return touch;
  } catch {
    return {}; // storage blocked: the form still works, without attribution
  }
}

export function initForms() {
  const failed = new URLSearchParams(location.search).has('error');
  const touch = firstTouch();

  document.querySelectorAll<HTMLFormElement>('[data-ajax-form]').forEach((form) => {
    if (form.dataset.bound) return; // several components may call initForms on one page
    form.dataset.bound = '1';

    // "Other" choices reveal a write-in field, which becomes required while shown
    form.querySelectorAll<HTMLSelectElement>('select[data-other]').forEach((select) => {
      const wrap = form.querySelector<HTMLElement>(`[data-other-field="${select.dataset.other}"]`);
      const input = wrap?.querySelector<HTMLInputElement>('input');
      if (!wrap || !input) return;
      const sync = () => {
        const on = select.value === 'Other';
        wrap.hidden = !on;
        input.required = on;
        if (on) input.focus();
      };
      select.addEventListener('change', sync);
      form.addEventListener('reset', () => setTimeout(sync));
    });
    const error = form.querySelector<HTMLElement>('[data-form-error]')!;
    const button = form.querySelector<HTMLButtonElement>('button[type=submit]')!;
    const label = button.querySelector<HTMLElement>('[data-label]')!;
    const idle = label.textContent!;
    const success = form.parentElement!.querySelector<HTMLElement>('[data-form-success]')!;
    const showError = (msg: string) => { error.textContent = msg; error.classList.remove('hidden'); };
    const check = securityCheck(form, error);
    if (failed) showError('Your message could not be sent. Please check the form and try again.');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      error.classList.add('hidden');

      let firstInvalid: HTMLElement | null = null;
      form.querySelectorAll<HTMLInputElement>('input, select, textarea').forEach((el) => {
        const ok = el.checkValidity();
        el.setAttribute('aria-invalid', String(!ok));
        if (!ok && !firstInvalid) firstInvalid = el;
      });
      if (firstInvalid) {
        (firstInvalid as HTMLElement).focus();
        gsap.fromTo(form, { x: -8 }, { x: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
        return showError('Please fill in the required fields with valid details.');
      }

      button.disabled = true;
      label.textContent = 'Sending…';
      try {
        if (check) {
          label.textContent = 'Checking…';
          await check.token().catch((err: Error) => {
            throw new Error(err instanceof TurnstileUnavailable
              ? "Our spam check couldn't run in this browser (an ad blocker or privacy setting can cause this). Please email info@armedias.com or WhatsApp us instead, and we'll reply just the same."
              : err.message);
          });
          label.textContent = 'Sending…';
        }
        const data = new FormData(form);
        data.set('page', location.pathname);
        for (const [k, v] of Object.entries(touch)) if (v) data.set(k, v);
        const res = await fetch(form.action, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
        const body = await res.json().catch(() => ({}));
        if (!res.ok || !body.ok) throw new Error(body.error || 'Something went wrong.');
        success.hidden = false;
        gsap.from(success, { opacity: 0, scale: 0.96, duration: 0.6, ease: 'power3.out' });
        burst(success);
        form.reset();
      } catch (err) {
        const msg = (err as Error).message;
        showError(/email|whatsapp/i.test(msg) ? msg : `${msg} Please try again, or email us directly.`);
      } finally {
        check?.reset(); // tokens work once
        button.disabled = false;
        label.textContent = idle;
      }
    });
  });
}

/** Brand-coloured confetti burst inside the success panel. */
function burst(panel: HTMLElement) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const colors = ['#ff7a1a', '#ffc93c', '#a9c46c', '#ffffff'];
  for (let i = 0; i < 36; i++) {
    const piece = document.createElement('span');
    Object.assign(piece.style, {
      position: 'absolute', left: '50%', top: '38%', width: '8px', height: i % 3 ? '12px' : '8px',
      borderRadius: i % 3 ? '2px' : '99px', background: colors[i % colors.length], pointerEvents: 'none',
    });
    panel.append(piece);
    const angle = (Math.PI * 2 * i) / 36 + Math.random() * 0.3;
    const dist = 90 + Math.random() * 140;
    gsap.to(piece, {
      x: Math.cos(angle) * dist, y: Math.sin(angle) * dist + 120, rotation: Math.random() * 720,
      opacity: 0, duration: 1.4 + Math.random() * 0.6, ease: 'power2.out', onComplete: () => piece.remove(),
    });
  }
}
