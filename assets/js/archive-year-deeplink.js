/* Open a specific archive year only when the URL explicitly links to it.
   A normal /archive/ visit still starts with every year collapsed. */
(() => {
  'use strict';

  const years = document.querySelector('.archive-index-years');
  if (!years) return;

  function openLinkedYear() {
    const match = /^#year-(\d{4})$/.exec(window.location.hash);
    if (!match) return;

    const panel = document.getElementById('year-' + match[1]);
    if (!panel || !years.contains(panel) || !panel.matches('details.archive-index-year')) return;

    // Native <details name> keeps the year accordions mutually exclusive.
    panel.open = true;
    requestAnimationFrame(() => {
      panel.querySelector('summary')?.scrollIntoView({
        block: 'start',
        inline: 'nearest',
        behavior: 'instant'
      });
    });
  }

  window.addEventListener('hashchange', openLinkedYear);
  openLinkedYear();
})();
