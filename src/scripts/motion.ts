// Site-wide motion: Lenis smooth wheel scrolling + GSAP ScrollTrigger.
// - Skipped entirely when the visitor prefers reduced motion.
// - Lenis leaves touch scrolling native (syncTouch off), so iPhone/iPad behave normally.
// - Anchor links keep native behaviour so the skip link still moves focus.
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

declare global {
  interface Window { lenis?: Lenis }
}

// gsap.matchMedia() runs this only while reduced motion is off, and reverts it automatically
// (smooth scroll and scroll animations removed) if the visitor switches reduced motion on.
const mm = gsap.matchMedia();
mm.add('(prefers-reduced-motion: no-preference)', () => {
  const lenis = new Lenis({ autoRaf: false, lerp: 0.12 });
  window.lenis = lenis;
  lenis.on('scroll', ScrollTrigger.update);
  const raf = (time: number) => lenis.raf(time * 1000);
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);

  // How it works: a progress line draws across each step as the section scrolls past.
  const lines = gsap.utils.toArray<HTMLElement>('.step-line');
  const list = lines[0]?.closest('ol');
  if (list) {
    gsap.fromTo(
      lines,
      { scaleX: 0 },
      { scaleX: 1, ease: 'none', stagger: 0.6, scrollTrigger: { trigger: list, start: 'top 85%', end: 'bottom 60%', scrub: 0.6 } },
    );
  }

  return () => {
    gsap.ticker.remove(raf);
    lenis.destroy();
    window.lenis = undefined;
  };
});

// Web fonts change line breaks (and so section heights): recalculate scroll positions once they're in.
document.fonts?.ready.then(() => ScrollTrigger.refresh());
