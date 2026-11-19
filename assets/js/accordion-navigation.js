/* Keep an accordion heading in place when opening or closing it.
   Native <details name="..."> panels can collapse a previous panel above
   the clicked heading. Correct only that resulting layout shift, rather than
   forcibly scrolling every newly opened heading to the top of the screen.
   Deep-link scripts retain control of deliberate programmatic navigation. */
(() => {
  'use strict';
  const selector = '.content-area details.about-panel > summary';

  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const summary = target.closest(selector);
    if (!summary) return;

    const before = summary.getBoundingClientRect().top;
    requestAnimationFrame(() => {
      const after = summary.getBoundingClientRect().top;
      const shift = after - before;
      // The browser may already have preserved the position with scroll
      // anchoring. Only compensate if the heading actually moved.
      if (Math.abs(shift) <= 1) return;
      window.scrollBy({ top: shift, left: 0, behavior: 'instant' });
    });
  });
})();
