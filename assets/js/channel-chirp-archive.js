/* Bird-only archive calendar. Shares McRetro's visual calendar classes,
 * but never touches the ordinary McRetro calendar or its /archive/ URLs.
 * Month links go to the corresponding released-only Adventures section.
 */
(() => {
  'use strict';
  const root = document.querySelector('[data-chirp-calendar]');
  if (!root) return;
  const year = root.querySelector('[data-chirp-year]');
  const older = root.querySelector('[data-chirp-older]');
  const newer = root.querySelector('[data-chirp-newer]');
  const grid = root.querySelector('[data-chirp-months]');
  if (!year || !older || !newer || !grid) return;

  const short = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug',
    'Sep','Oct','Nov','Dec'];
  const full = ['January','February','March','April','May','June',
    'July','August','September','October','November','December'];

  function show() {
    const option = year.options[year.selectedIndex];
    if (!option || !/^(2018|2019)$/.test(option.value)) return;
    const counts = (option.dataset.counts || '').split(',').map(Number);
    if (counts.length !== 12 ||
        counts.some(n => !Number.isSafeInteger(n) || n < 0)) return;
    const archiveYear = option.value;
    const tiles = counts.map((count, index) => {
      const month = String(index + 1).padStart(2, '0');
      const tile = document.createElement(count ? 'a' : 'span');
      tile.className = 'archive-calendar-month ' +
        (count ? 'has-posts' : 'is-empty');
      if (count) {
        tile.href = '/chirp/adventures/#chirp-month-' + archiveYear + '-' + month;
        tile.setAttribute('aria-label', full[index] + ' ' + archiveYear + ': ' +
          count + (count === 1 ? ' adventure' : ' adventures'));
      }
      const label = document.createElement('span');
      label.className = 'archive-calendar-month-name';
      label.textContent = short[index];
      const total = document.createElement('span');
      total.className = 'archive-calendar-month-count';
      total.textContent = count + (count === 1 ? ' Post' : ' Posts');
      tile.append(label, total);
      return tile;
    });
    grid.replaceChildren(...tiles);
    grid.setAttribute('aria-label', archiveYear + ' Channel Chirp monthly archives');
    older.disabled = year.selectedIndex === year.options.length - 1;
    newer.disabled = year.selectedIndex === 0;
  }

  function step(direction) {
    const next = year.selectedIndex + direction;
    if (next < 0 || next >= year.options.length) return;
    year.selectedIndex = next;
    show();
  }

  // On a released conure article, use its year if it is 2018 or 2019.
  // Else the Jekyll-rendered current/latest year remains selected.
  const contextYear = document.body?.dataset?.archiveContextYear;
  if (/^(2018|2019)$/.test(contextYear || '')) {
    const index = Array.from(year.options).findIndex(option =>
      option.value === contextYear);
    if (index >= 0) year.selectedIndex = index;
  }
  year.disabled = false;
  older.addEventListener('click', () => step(1));
  newer.addEventListener('click', () => step(-1));
  year.addEventListener('change', show);
  show();
})();
