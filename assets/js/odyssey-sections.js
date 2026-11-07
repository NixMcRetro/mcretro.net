/* Expand Odyssey report panels for incoming deep links and internal navigation.
   Panels have no name attribute, so readers can keep multiple sections open. */
(() => {
  'use strict';
  const selector = 'details.odyssey-panel';

  function reveal() {
    const raw = window.location.hash.slice(1);
    if (!raw || raw.length > 180) return;
    let id;
    try {
      id = decodeURIComponent(raw);
    } catch (_) {
      return;
    }

    const target = document.getElementById(id);
    if (!target) return;
    const panel = target.closest(selector);
    if (!panel) return;
    panel.open = true;
    window.requestAnimationFrame(() => {
      if (panel.open) target.scrollIntoView({ block: 'start', behavior: 'instant' });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', reveal, { once: true });
  } else {
    reveal();
  }
  window.addEventListener('hashchange', reveal);
})();
