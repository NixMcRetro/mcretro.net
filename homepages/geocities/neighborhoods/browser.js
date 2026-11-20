/* GeoCities neighbourhood browser. Progressive enhancement only: the
   full HTML directory and private archive links work without JavaScript. */
(() => {
  'use strict';

  const list = document.getElementById('gc-neighbourhood-list');
  const toolbar = document.querySelector('.gc-browser-tools');
  if (!list || !toolbar) return;

  const input = document.getElementById('gc-neighbourhood-search');
  const output = document.getElementById('gc-neighbourhood-results');
  const jump = document.querySelector('.gc-jump');
  const expand = toolbar.querySelector('[data-gc-action="expand"]');
  const collapse = toolbar.querySelector('[data-gc-action="collapse"]');
  const random = toolbar.querySelector('[data-gc-action="random"]');
  if (!input || !output || !expand || !collapse || !random) return;

  const fold = (text) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase();
  const normalise = (text) => fold(text).trim();

  // Build text nodes rather than HTML strings so archived link text stays safe.
  // The index mapping keeps highlights accurate even with accented characters.
  const highlightText = (element, original, query) => {
    if (!element) return;
    if (!query) {
      element.textContent = original;
      return;
    }
    let folded = '';
    const starts = [];
    const ends = [];
    let offset = 0;
    for (const char of original) {
      const part = fold(char);
      for (let i = 0; i < part.length; i++) {
        starts.push(offset);
        ends.push(offset + char.length);
      }
      folded += part;
      offset += char.length;
    }
    const fragment = document.createDocumentFragment();
    let cursor = 0;
    let from = 0;
    while (from < folded.length) {
      const match = folded.indexOf(query, from);
      if (match < 0) break;
      const start = starts[match];
      const end = ends[match + query.length - 1];
      if (start < cursor) {
        from = match + query.length;
        continue;
      }
      fragment.appendChild(document.createTextNode(original.slice(cursor, start)));
      const marked = document.createElement('mark');
      marked.textContent = original.slice(start, end);
      fragment.appendChild(marked);
      cursor = end;
      from = match + query.length;
    }
    fragment.appendChild(document.createTextNode(original.slice(cursor)));
    element.replaceChildren(fragment);
  };

  const groups = [...list.querySelectorAll('.gc-neighbourhood')].map(section => {
    const details = section.querySelector('details');
    const heading = section.querySelector('.gc-neighbourhood-title');
    const body = section.querySelector('.gc-neighbourhood-body');
    if (!details || !heading || !body) return null;

    // Wrap just the visible name; leave the historic population label intact.
    const name = heading.firstChild?.textContent || section.id;
    const nameElement = document.createElement('span');
    nameElement.className = 'gc-neighbourhood-name';
    nameElement.textContent = name;
    if (heading.firstChild) heading.replaceChild(nameElement, heading.firstChild);
    else heading.insertBefore(nameElement, heading.firstChild);

    const suburbs = [...body.querySelectorAll('.gc-suburbs a')]
      .map(element => ({ element, original: element.textContent }));
    const description = [...body.querySelectorAll('p')]
      .find(p => !p.classList.contains('gc-neighbourhood-mast') && !p.querySelector('a'));
    const descriptionText = description?.textContent || '';

    return {
      section, details, name, nameElement, suburbs, description, descriptionText,
      searchText: normalise([section.id, heading.textContent, descriptionText,
        ...suburbs.map(item => item.original)].join(' '))
    };
  }).filter(Boolean);

  let preSearchOpen = null;
  const filter = () => {
    const query = normalise(input.value);
    if (query && preSearchOpen === null) {
      preSearchOpen = groups.map(group => group.details.open);
    } else if (!query && preSearchOpen !== null) {
      groups.forEach((group, index) => { group.details.open = preSearchOpen[index]; });
      preSearchOpen = null;
    }

    let found = 0;
    groups.forEach(group => {
      const match = !query || group.searchText.includes(query);
      group.section.hidden = !match;
      if (match) {
        found++;
        if (query) group.details.open = true;
      }
      highlightText(group.nameElement, group.name, query);
      highlightText(group.description, group.descriptionText, query);
      group.suburbs.forEach(item => highlightText(item.element, item.original, query));
    });
    if (jump) jump.hidden = !!query;
    output.textContent = query
      ? found + ' of ' + groups.length + ' neighbourhoods match your search.'
      : 'Showing all ' + groups.length + ' neighbourhoods.';
  };

  const toggle = (state) => {
    groups.forEach(group => {
      if (!group.section.hidden) group.details.open = state;
    });
  };

  let lastRandom = -1;
  const pickRandom = () => {
    if (!groups.length) return;
    // Search should not limit the random choice. Include every neighbourhood.
    input.value = '';
    filter();
    const pool = groups.length - (lastRandom >= 0 && groups.length > 1 ? 1 : 0);
    let index = Math.floor(Math.random() * pool);
    if (lastRandom >= 0 && groups.length > 1 && index >= lastRandom) index++;
    lastRandom = index;

    groups.forEach((group, i) => { group.details.open = i === index; });
    const picked = groups[index];
    output.textContent = 'Random pick: ' + picked.name + '.';
    picked.section.scrollIntoView({
      block: 'start',
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
    });
    picked.details.querySelector('summary')?.focus({ preventScroll: true });
  };

  input.addEventListener('input', filter);
  expand.addEventListener('click', () => toggle(true));
  collapse.addEventListener('click', () => toggle(false));
  random.addEventListener('click', pickRandom);
  toolbar.hidden = false;
  filter();
})();
