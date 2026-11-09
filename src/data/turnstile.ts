// Cloudflare Turnstile site key for the contact and careers forms. The site key is public
// by design (it goes into the page); the secret key lives only in the server's .env as
// TURNSTILE_SECRET_KEY. Leave both empty to switch Turnstile off.
// PUBLIC_TURNSTILE_SITE_KEY (from .env at build time) overrides the value below, which is
// how local tests use Cloudflare's published test keys.
export const TURNSTILE_SITE_KEY: string = import.meta.env.PUBLIC_TURNSTILE_SITE_KEY || '0x4AAAAAAF5SggfJyUD65XI4';
