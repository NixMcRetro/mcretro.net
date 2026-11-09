/* Published-post month counts are built by Jekyll, not fetched at runtime. */
(() => {
  'use strict';
  const root = document.querySelector('[data-archive-calendar]');
  if (!root) return;
  const year = root.querySelector('[data-archive-year]');
  const older = root.querySelector('[data-archive-older]');
  const newer = root.querySelector('[data-archive-newer]');
  const grid = root.querySelector('[data-archive-months]');
  if (!year || !older || !newer || !grid) return;
  const short = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const full = ['January','February','March','April','May','June','July','August',
    'September','October','November','December'];
  function show() {
    const index = year.selectedIndex, option = year.options[index];
    if (!option || !/^\d{4}$/.test(option.value)) return;
    // Convert the DOM attribute to a validated integer before constructing URLs.
    // No raw DOM text should reach href or other generated labels.
    const numericYear = Number(option.value);
    if (!Number.isSafeInteger(numericYear) || numericYear < 1000 || numericYear > 9999) return;
    const archiveYear = String(numericYear);
    const counts = (option.dataset.counts || '').split(',').map(Number);
    if (counts.length !== 12 || counts.some(n => !Number.isSafeInteger(n) || n < 0)) return;
    const tiles = counts.map((count, i) => {
      const cell = document.createElement(count ? 'a' : 'span');
      cell.className = 'archive-calendar-month ' + (count ? 'has-posts' : 'is-empty');
      if (count) {
        cell.href = '/archive/' + archiveYear + '/' + String(i + 1).padStart(2, '0') + '/';
        cell.setAttribute('aria-label', full[i] + ' ' + archiveYear + ': ' +
          count + (count === 1 ? ' post' : ' posts'));
      }
      const name = document.createElement('span');
      name.className = 'archive-calendar-month-name';
      name.textContent = short[i];
      const total = document.createElement('span');
      total.className = 'archive-calendar-month-count';
      total.textContent = count + (count === 1 ? ' Post' : ' Posts');
      cell.append(name, total);
      return cell;
    });
    grid.replaceChildren(...tiles);
    grid.setAttribute('aria-label', archiveYear + ' monthly archives');
    older.disabled = index === year.options.length - 1;
    newer.disabled = index === 0;
  }
  function step(n) {
    const index = year.selectedIndex + n;
    if (index < 0 || index >= year.options.length) return;
    year.selectedIndex = index;
    show();
  }
  // Jekyll supplies a publication year for posts and monthly archives.
  // A post's permalink is /:title/, so the year cannot be read from its URL.
  // Only choose a known option; the validated year still builds archive hrefs.
  const contextYear = document.body?.dataset?.archiveContextYear;
  if (contextYear && /^\d{4}$/.test(contextYear)) {
    const contextIndex = Array.from(year.options).findIndex(
      option => option.value === contextYear);
    if (contextIndex !== -1) year.selectedIndex = contextIndex;
  }
  year.disabled = false;
  older.addEventListener('click', () => step(1));
  newer.addEventListener('click', () => step(-1));
  year.addEventListener('change', show);
  show();
})();
