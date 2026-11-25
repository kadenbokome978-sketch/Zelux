// One-shot scroll reveals. Native scrolling only; no scroll listeners.
const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
// Anything already on screen is shown immediately (never hidden, so it can't delay first paint).
const fold = window.innerHeight;
els.forEach((el) => { if (el.getBoundingClientRect().top < fold) el.classList.add('is-in'); });
document.documentElement.classList.add('reveal-ready');
const later = els.filter((el) => !el.classList.contains('is-in'));
if ('IntersectionObserver' in window && later.length) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('is-revealing', 'is-in');
          io.unobserve(e.target);
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );
  // Start observing on the next frame so the hidden state paints first and the fade is visible.
  requestAnimationFrame(() => later.forEach((el) => io.observe(el)));
} else {
  later.forEach((el) => el.classList.add('is-in'));
}

// FAQ accordions
document.querySelectorAll<HTMLElement>('.faq-item').forEach((item) => {
  const btn = item.querySelector<HTMLButtonElement>('button');
  const panel = item.querySelector<HTMLElement>('.faq-panel');
  panel?.toggleAttribute('inert', true);
  btn?.addEventListener('click', () => {
    const open = item.dataset.open === 'true';
    item.dataset.open = String(!open);
    btn.setAttribute('aria-expanded', String(!open));
    panel?.toggleAttribute('inert', open);
  });
});

