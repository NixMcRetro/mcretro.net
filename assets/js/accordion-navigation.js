/* Give every McRetro accordion the same scroll position after opening.
   Use the summary's CSS scroll-margin-top to leave 1rem of page background.
   Only user activation is handled here: existing deep-link scripts remain in
   charge of programmatic navigation and can still reveal nested anchors. */
(() => {
  'use strict';
  const selector = '.content-area details.about-panel > summary';

  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const summary = target.closest(selector);
    if (!summary) return;

    const panel = summary.parentElement;
    requestAnimationFrame(() => {
      // Closing a section must not move the page.
      if (!panel.open) return;
      summary.scrollIntoView({
        block: 'start',
        inline: 'nearest',
        behavior: 'instant'
      });
    });
  });
})();
