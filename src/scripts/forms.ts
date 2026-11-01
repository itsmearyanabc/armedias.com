// Submits [data-ajax-form] forms (contact, careers) in place and shows their animated
// success panel. Without JS the forms post normally and the server redirects.
import { gsap } from 'gsap';

export function initForms() {
  const failed = new URLSearchParams(location.search).has('error');

  document.querySelectorAll<HTMLFormElement>('[data-ajax-form]').forEach((form) => {
    if (form.dataset.bound) return; // several components may call initForms on one page
    form.dataset.bound = '1';
    const error = form.querySelector<HTMLElement>('[data-form-error]')!;
    const button = form.querySelector<HTMLButtonElement>('button[type=submit]')!;
    const label = button.querySelector<HTMLElement>('[data-label]')!;
    const idle = label.textContent!;
    const success = form.parentElement!.querySelector<HTMLElement>('[data-form-success]')!;
    const showError = (msg: string) => { error.textContent = msg; error.classList.remove('hidden'); };
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

      const data = new FormData(form);
      data.set('page', location.pathname);
      button.disabled = true;
      label.textContent = 'Sending…';
      try {
        const res = await fetch(form.action, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
        const body = await res.json().catch(() => ({}));
        if (!res.ok || !body.ok) throw new Error(body.error || 'Something went wrong.');
        success.hidden = false;
        gsap.from(success, { opacity: 0, scale: 0.96, duration: 0.6, ease: 'power3.out' });
        form.reset();
      } catch (err) {
        showError(`${(err as Error).message} Please try again, or email us directly.`);
      } finally {
        button.disabled = false;
        label.textContent = idle;
      }
    });
  });
}
