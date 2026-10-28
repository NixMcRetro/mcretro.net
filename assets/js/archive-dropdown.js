/* Accept only Jekyll's local /archive/YYYY/MM/ routes. */
(() => {
  'use strict';
  const dropdown = document.getElementById('archive-dropdown');
  if (!dropdown) return;
  dropdown.addEventListener('change', () => {
    const target = dropdown.value;
    if (/^\/archive\/\d{4}\/(?:0[1-9]|1[0-2])\/$/.test(target)) {
      window.location.assign(target);
    }
  });
})();
