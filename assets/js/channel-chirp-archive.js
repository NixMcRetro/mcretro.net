/* Bird-only month selector: local pages and published articles only. */
(function () {
  'use strict';
  var select = document.querySelector('[data-chirp-archive-select]');
  if (!select) return;
  select.addEventListener('change', function () {
    var dest = select.value;
    if (/^\/chirp\/adventures\/#chirp-month-\d{4}-\d{2}$/.test(dest)) {
      window.location.assign(dest);
    }
  });
})();
