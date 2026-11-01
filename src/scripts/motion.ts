// Site-wide motion. Content is fully visible without JS; `.js-motion` (set inline in
// <head> only when reduced motion is off) hides [data-reveal] until GSAP animates it in.
export async function initMotion() {
  const root = document.documentElement;
  if (!root.classList.contains('js-motion')) return;

  const [{ gsap }, { ScrollTrigger }, { default: Lenis }] = await Promise.all([
    import('gsap'),
    import('gsap/ScrollTrigger'),
    import('lenis'),
  ]);
  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis({ lerp: 0.1 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);

  const hover = matchMedia('(hover: hover)').matches;

  // Header logo flies in like the bird it is
  gsap.from('[data-header] img', { x: -30, y: 20, rotate: -25, opacity: 0, duration: 1.1, ease: 'back.out(1.6)' });

  // Scroll progress bar
  const bar = Object.assign(document.createElement('div'), { className: 'scroll-progress' });
  document.body.append(bar);
  gsap.to(bar, { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.2 } });

  // Section headings: word-by-word mask reveal. Only text nodes are split, so inline
  // markup and reading order stay intact.
  document.querySelectorAll<HTMLElement>('main h2:not([data-no-split]):not(.prose h2)').forEach((h) => {
    splitWords(h);
    gsap.from(h.querySelectorAll('.w > span'), {
      yPercent: 110, duration: 0.9, ease: 'power4.out', stagger: 0.04,
      scrollTrigger: { trigger: h, start: 'top 96%', once: true },
    });
  });

  // Orange underlines draw themselves once their heading is on screen
  const scribbles = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('is-drawn'); scribbles.unobserve(e.target); }
  }), { rootMargin: '0px 0px -15% 0px' });
  document.querySelectorAll('.scribble').forEach((el) => scribbles.observe(el));

  // Scroll reveals: data-reveal="up" | "fade" | "stagger" (children)
  gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
    const kind = el.dataset.reveal;
    const targets = kind === 'stagger' ? el.children : el;
    if (kind === 'stagger') gsap.set(el, { opacity: 1 });
    gsap.fromTo(
      targets,
      { opacity: 0, y: kind === 'fade' ? 0 : 40 },
      {
        opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.08,
        scrollTrigger: { trigger: el, start: 'top 96%', once: true },
      },
    );
  });

  // Count-up numbers
  gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
    const end = Number(el.dataset.count);
    const obj = { v: 0 };
    gsap.to(obj, {
      v: end, duration: 1.6, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 96%', once: true },
      onUpdate: () => { el.textContent = Math.round(obj.v).toString(); },
    });
  });

  // Parallax layers: data-parallax="0.2" moves at a fraction of scroll speed
  gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
    const speed = Number(el.dataset.parallax) || 0.2;
    gsap.to(el, {
      yPercent: -100 * speed, ease: 'none',
      scrollTrigger: { trigger: el.parentElement ?? el, start: 'top bottom', end: 'bottom top', scrub: true },
    });
  });

  // Footer wordmark rises letter by letter as the footer scrolls in
  const mark = document.querySelector<HTMLElement>('[data-footer-mark]');
  if (mark) {
    gsap.from(mark.children, {
      yPercent: 100, ease: 'none', stagger: 0.05,
      scrollTrigger: { trigger: mark, start: 'top bottom', end: 'bottom bottom', scrub: true },
    });
  }

  // Marquees speed up with scroll velocity, then settle back
  const tracks = [...document.querySelectorAll<HTMLElement>('.marquee__track')].flatMap((t) => t.getAnimations());
  if (tracks.length) {
    const rate = { v: 1 };
    lenis.on('scroll', ({ velocity }: { velocity: number }) => {
      gsap.to(rate, {
        v: 1 + Math.min(Math.abs(velocity) / 8, 4), duration: 0.2, overwrite: true,
        onUpdate: () => tracks.forEach((a) => (a.playbackRate = rate.v)),
        onComplete: () => gsap.to(rate, { v: 1, duration: 1.2, onUpdate: () => tracks.forEach((a) => (a.playbackRate = rate.v)) }),
      });
    });
  }

  if (!hover) return;

  // Magnetic buttons
  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
    const xTo = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3' });
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - r.left - r.width / 2) * 0.25);
      yTo((e.clientY - r.top - r.height / 2) * 0.35);
    });
    el.addEventListener('pointerleave', () => { xTo(0); yTo(0); });
  });

  // 3D tilt cards with a light glare that follows the pointer
  document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((el) => {
    gsap.set(el, { transformPerspective: 900 });
    const rX = gsap.quickTo(el, 'rotationX', { duration: 0.5, ease: 'power3' });
    const rY = gsap.quickTo(el, 'rotationY', { duration: 0.5, ease: 'power3' });
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      rY((px - 0.5) * 10); rX((0.5 - py) * 10);
      el.style.setProperty('--gx', `${px * 100}%`);
      el.style.setProperty('--gy', `${py * 100}%`);
    });
    el.addEventListener('pointerleave', () => { rX(0); rY(0); });
  });
}

function splitWords(el: HTMLElement) {
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  while (walker.nextNode()) nodes.push(walker.currentNode as Text);
  for (const node of nodes) {
    const frag = document.createDocumentFragment();
    for (const part of node.data.split(/(\s+)/)) {
      if (!part) continue;
      if (/^\s+$/.test(part)) { frag.append(part); continue; }
      const outer = document.createElement('span');
      outer.className = 'w';
      const inner = document.createElement('span');
      inner.textContent = part;
      outer.append(inner);
      frag.append(outer);
    }
    node.replaceWith(frag);
  }
}
