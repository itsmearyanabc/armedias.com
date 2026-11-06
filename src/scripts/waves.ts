// Vanta "waves" WebGL background for the homepage hero.
// three.js is large (~150 KB gzipped), so it loads only after the page is idle, never for
// reduced-motion, data-saver or low-memory devices, and the effect is torn down while the
// hero is off screen. The CSS gradient behind it is the fallback in all those cases.
// It also stays off where WebGL would only run without a GPU (software rendering, as on
// PageSpeed's lab machine): there every frame of the waves blocks the main thread.
type Effect = { destroy(): void };
// The Vanta internals used by lighten() (vanta 0.5.24); each one is checked before use
type WavesEffect = Effect & {
  isOnScreen?: () => boolean;
  plane?: { geometry?: { computeVertexNormals?: () => void } };
};

export function initWaves(el: HTMLElement) {
  const nav = navigator as Navigator & { connection?: { saveData?: boolean }; deviceMemory?: number };
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (nav.connection?.saveData || (nav.deviceMemory && nav.deviceMemory < 4)) return;

  let effect: Effect | undefined;
  let loading: Promise<void> | undefined;
  let visible = true;
  // Set once the page is idle after load. The observer fires as soon as it observes, so
  // without this gate WebGL would start during page load and delay the first paint.
  let ready = false;
  // Checked once, at the first start: creating a GL context is slow, so it waits for idle
  // instead of running while the page loads
  let fastWebGL: boolean | undefined;

  const start = async () => {
    if (!ready || effect || loading) return;
    fastWebGL ??= hasFastWebGL();
    if (!fastWebGL) return;
    loading = (async () => {
      const [THREE, mod] = await Promise.all([import('three'), import('vanta/dist/vanta.waves.min.js')]);
      // Vanta ships a UMD bundle; depending on interop the factory sits one `default` deeper
      const WAVES = (typeof mod.default === 'function' ? mod.default : (mod.default as unknown as { default: typeof mod.default }).default);
      if (!visible) return;
      const waves = WAVES({
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
      }) as WavesEffect;
      lighten(waves, () => visible);
      effect = waves;
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

// WebGL with a GPU behind it. failIfMajorPerformanceCaveat makes the browser refuse a context
// it would render in software (SwiftShader, llvmpipe). The probe context is freed at once.
function hasFastWebGL() {
  const gl = document.createElement('canvas').getContext('webgl', { failIfMajorPerformanceCaveat: true });
  gl?.getExtension('WEBGL_lose_context')?.loseContext();
  return !!gl;
}

// Cheaper frames, same pixels:
// - On every frame Vanta checks whether the hero is on screen by reading its layout, which
//   forces a synchronous reflow. The IntersectionObserver above already knows.
// - The waves material is flat-shaded, so three.js derives each face's normal in the
//   fragment shader and never reads vertex normals. Vanta still recomputes and re-uploads
//   them for all 16,000 triangles on every frame; computing them once is enough.
function lighten(effect: WavesEffect, isVisible: () => boolean) {
  if (typeof effect.isOnScreen === 'function') effect.isOnScreen = isVisible;
  const geometry = effect.plane?.geometry;
  const computeNormals = geometry?.computeVertexNormals;
  if (!geometry || typeof computeNormals !== 'function') return;
  let computed = false;
  geometry.computeVertexNormals = () => {
    if (computed) return;
    computed = true;
    computeNormals.call(geometry);
  };
}
