/* Lightweight, released-only search for Channel Chirp's static article list.
 * Does not query the global McRetro Pagefind index. */
(function () {
  'use strict';
  const field = document.getElementById('nest-search-input');
  const root = document.getElementById('nest-archive-list');
  const status = document.getElementById('nest-search-status');
  const empty = document.getElementById('nest-no-results');
  const clear = document.getElementById('nest-search-clear');
  const more = document.getElementById('nest-search-more');
  if (!field || !root || !status || !empty || !clear || !more) return;

  const normalise = value => value.toLocaleLowerCase().trim().replace(/\s+/g, ' ');
  const indexed = Array.from(root.querySelectorAll('[data-nest-post]')).map(card => ({
    card,
    searchable: normalise(card.textContent || ''),
    highlights: Array.from(card.querySelectorAll('[data-nest-highlight]'))
      .map(element => ({ element, text: element.textContent || '' }))
  }));
  const pageSize = 10;
  let shown = pageSize;
  let previousQuery = '';

  // Insert highlight nodes as text, never by interpreting search terms as HTML.
  function highlight(element, source, query) {
    if (!query) {
      element.textContent = source;
      return;
    }
    const term = query.toLocaleLowerCase();
    const lower = source.toLocaleLowerCase();
    const nodes = [];
    let pos = 0;
    let next;
    while ((next = lower.indexOf(term, pos)) !== -1) {
      if (next > pos) nodes.push(document.createTextNode(source.slice(pos, next)));
      const mark = document.createElement('mark');
      mark.textContent = source.slice(next, next + term.length);
      nodes.push(mark);
      pos = next + term.length;
    }
    if (pos < source.length) nodes.push(document.createTextNode(source.slice(pos)));
    element.replaceChildren(...nodes);
  }

  function filter() {
    const query = normalise(field.value);
    if (query !== previousQuery) {
      shown = pageSize;
      previousQuery = query;
    }
    const matched = indexed.filter(item => !query || item.searchable.includes(query));
    const visible = new Set(matched.slice(0, shown));
    indexed.forEach(item => {
      item.card.hidden = !visible.has(item);
      if (visible.has(item)) {
        item.highlights.forEach(({ element, text }) => highlight(element, text, query));
      }
    });
    const count = matched.length;
    empty.hidden = count !== 0;
    more.hidden = count <= shown;
    clear.hidden = !field.value;
    status.textContent = count + (count === 1 ? ' adventure' : ' adventures') +
      (query ? ' found' : '');
  }

  const params = new URLSearchParams(window.location.search);
  const query = params.get('q');
  if (query) field.value = query;
  field.addEventListener('input', filter);
  clear.addEventListener('click', () => {
    field.value = '';
    field.focus();
    filter();
  });
  more.addEventListener('click', () => {
    shown += pageSize;
    filter();
  });
  filter();
}());
