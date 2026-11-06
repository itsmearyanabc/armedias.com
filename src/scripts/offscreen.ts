// Looping CSS animations pause while their block is off screen, so the browser doesn't
// restyle and repaint motion nobody can see (stroke-dashoffset lines, shimmering text and
// most SVG loops can't run on the compositor). They continue from the same frame when the
// block comes back, 200px before it enters the viewport, so nothing visibly changes.
// Hidden tabs need nothing extra: browsers already stop CSS animations there.
//
// Only blocks whose animations are all endless loops are listed. One-off entrances (the
// footer flock, reveals, the WhatsApp button pop-in) are left alone, because pausing them
// would delay them. A whole block pauses at once, so loops that are meant to stay in step
// (marquee tracks, the CTA route comets) never drift apart.
const LOOPING_BLOCKS = [
  '.hero', // homepage hero: sparkles, shimmer text, flow-line packet, caret
  '.marquee', // logo belts
  '.illo', // SVG illustrations
  '.aicon', // feature card icons
  '.ind-icon', // industry icons
  '.route-backdrop', // CTA world routes
  '.mascot', // Ari the bird
  '.blob', // drifting glows
  '.market-map', // market card pins
  '.cover', // blog cover art
  '.skyline', // city skylines
].join(',');

export function pauseOffscreenLoops() {
  if (!('IntersectionObserver' in window)) return;
  // Reduced motion keeps its own rules in global.css untouched
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.target.classList.toggle('is-offscreen', !e.isIntersecting)),
    { rootMargin: '200px 0px' },
  );
  document.querySelectorAll(LOOPING_BLOCKS).forEach((el) => io.observe(el));
}
