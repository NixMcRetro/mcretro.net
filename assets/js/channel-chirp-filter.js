/* Small, dependency-free search for the static Channel Chirp post index. */
(function () {
  'use strict';
  const field = document.getElementById('nest-search-input');
  const root = document.getElementById('nest-archive-list');
  const status = document.getElementById('nest-search-status');
  const empty = document.getElementById('nest-no-results');
  if (!field || !root || !status || !empty) return;

  const sections = Array.from(root.querySelectorAll('[data-nest-group]'));
  const cards = Array.from(root.querySelectorAll('[data-nest-post]'));
  const normalise = value => value.toLocaleLowerCase().trim().replace(/\s+/g, ' ');
  const indexed = cards.map(card => ({ card, searchable: normalise(card.textContent || '') }));

  function filter() {
    const query = normalise(field.value);
    let total = 0;
    indexed.forEach(({ card, searchable }) => {
      const visible = !query || searchable.includes(query);
      card.hidden = !visible;
      if (visible) total += 1;
    });
    sections.forEach(section => {
      section.hidden = !Array.from(section.querySelectorAll('[data-nest-post]'))
        .some(card => !card.hidden);
    });
    empty.hidden = total !== 0;
    status.textContent = total + (total === 1 ? ' adventure' : ' adventures') +
      (query ? ' found' : '');
  }

  // Bird-only sidebar searches return directly to /chirp/?q=... .
  // Do not query the global McRetro search index, which contains other posts.
  if (window.location && window.location.search) {
    const params = new URLSearchParams(window.location.search);
    const query = params.get('q');
    if (query) field.value = query;
  }
  field.addEventListener('input', filter);
  filter();
}());
