// Vanta "waves" WebGL background for the homepage hero.
// three.js is large (~150 KB gzipped), so it loads only after the page is idle, never for
// reduced-motion, data-saver or low-memory devices, and the effect is torn down while the
// hero is off screen. The CSS gradient behind it is the fallback in all those cases.
type Effect = { destroy(): void };

export function initWaves(el: HTMLElement) {
  const nav = navigator as Navigator & { connection?: { saveData?: boolean }; deviceMemory?: number };
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (nav.connection?.saveData || (nav.deviceMemory && nav.deviceMemory < 4)) return;
  if (!document.createElement('canvas').getContext('webgl')) return;

  let effect: Effect | undefined;
  let loading: Promise<void> | undefined;
  let visible = true;
  // Set once the page is idle after load. The observer fires as soon as it observes, so
  // without this gate WebGL would start during page load and delay the first paint.
  let ready = false;

  const start = async () => {
    if (!ready || effect || loading) return;
    loading = (async () => {
      const [THREE, mod] = await Promise.all([import('three'), import('vanta/dist/vanta.waves.min.js')]);
      // Vanta ships a UMD bundle; depending on interop the factory sits one `default` deeper
      const WAVES = (typeof mod.default === 'function' ? mod.default : (mod.default as unknown as { default: typeof mod.default }).default);
      if (!visible) return;
      effect = WAVES({
        el,
        THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0x3b1f73, // deep purple
      }) as Effect;
      el.classList.add('is-live');
    })().finally(() => { loading = undefined; });
  };

  const stop = () => {
    effect?.destroy();
    effect = undefined;
  };

  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    visible ? start() : stop();
  }).observe(el);

  addEventListener('pagehide', stop);

  // Wait until the page has painted and settled before pulling in WebGL
  const idle = (cb: () => void) => ('requestIdleCallback' in window ? requestIdleCallback(cb, { timeout: 2500 }) : setTimeout(cb, 1200));
  const kick = () => idle(() => { ready = true; if (visible) start(); });
  document.readyState === 'complete' ? kick() : addEventListener('load', kick, { once: true });
}
