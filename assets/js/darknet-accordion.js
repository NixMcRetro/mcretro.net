/* Restore redirected 2016 guide chapter deep links without requiring grouped accordions. */
(() => {
  'use strict';
  const selector = 'details.about-panel[id^="part-"]';
  function reveal() {
    const hash = window.location.hash.slice(1);
    if (!/^part-(?:[1-9]|1[0-4])$/.test(hash)) return;
    const panel = document.getElementById(hash);
    if (!panel || !panel.matches(selector)) return;
    panel.open = true;
    window.requestAnimationFrame(() => {
      const summary = panel.querySelector('summary');
      if (summary) summary.scrollIntoView({ block: 'start', behavior: 'instant' });
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', reveal, { once: true });
  } else {
    reveal();
  }
  window.addEventListener('hashchange', reveal);
})();
