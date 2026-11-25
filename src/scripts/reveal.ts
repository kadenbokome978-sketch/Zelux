// One-shot scroll reveals. Native scrolling only; no scroll listeners.
const els = document.querySelectorAll<HTMLElement>('[data-reveal]');
if ('IntersectionObserver' in window && els.length) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );
  els.forEach((el) => io.observe(el));
} else {
  els.forEach((el) => el.classList.add('is-in'));
}

// FAQ accordions
document.querySelectorAll<HTMLElement>('.faq-item').forEach((item) => {
  const btn = item.querySelector<HTMLButtonElement>('button');
  btn?.addEventListener('click', () => {
    const open = item.dataset.open === 'true';
    item.dataset.open = String(!open);
    btn.setAttribute('aria-expanded', String(!open));
  });
});
