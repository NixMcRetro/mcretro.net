/* Keep the primary McRetro navigation reachable as the page scrolls.
 * Desktop: offset the existing sticky header so only its nav remains.
 * Mobile: retain the accessible logo, theme toggle and hamburger; minimise
 * the subtitle after scrolling to avoid covering much of the viewport.
 * No cloned navigation, duplicate IDs, or dependency on animation. */
(function () {
  'use strict';
  const header = document.querySelector('.site-header');
  const nav = document.querySelector('#primary-navigation');
  const branding = header && header.querySelector('.logo-area');
  if (!header || !nav || !branding || !window.matchMedia) return;

  const narrow = window.matchMedia('(max-width: 750px)');
  let condensed = false;
  let previousOffset = null;

  function updateOffset() {
    const difference = narrow.matches ? 0 :
      Math.max(0, Math.round(nav.getBoundingClientRect().top -
                             header.getBoundingClientRect().top));
    const offset = -difference + 'px';
    if (offset !== previousOffset) {
      header.style.setProperty('--sticky-nav-top', offset);
      previousOffset = offset;
    }
  }

  function updateCompact() {
    const position = window.scrollY || 0;
    // Hysteresis avoids a visual loop when hiding the mobile subtitle.
    const desired = narrow.matches &&
      (condensed ? position > 60 : position > 160);
    if (desired !== condensed) {
      condensed = desired;
      if (condensed) header.setAttribute('data-nav-condensed', 'true');
      else header.removeAttribute('data-nav-condensed');
      updateOffset();
    }
  }

  updateOffset();
  header.classList.add('has-sticky-navigation');
  updateCompact();
  window.addEventListener('scroll', updateCompact, { passive: true });
  window.addEventListener('resize', function () {
    updateCompact();
    updateOffset();
  }, { passive: true });

  if (typeof ResizeObserver !== 'undefined') {
    const observer = new ResizeObserver(updateOffset);
    observer.observe(branding);
  }
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(updateOffset);
  }
})();
