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

if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const lenis = new Lenis({ autoRaf: false, lerp: 0.12 });
  window.lenis = lenis;
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
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
}
