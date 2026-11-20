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
  if (!input || !output || !expand || !collapse) return;

  const normalise = (s) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase().trim();
  const groups = [...list.querySelectorAll('.gc-neighbourhood')].map(section => {
    const details = section.querySelector('details');
    const heading = section.querySelector('.gc-neighbourhood-title');
    const body = section.querySelector('.gc-neighbourhood-body');
    const names = body ? [...body.querySelectorAll('.gc-suburbs a')].map(a => a.textContent) : [];
    const description = body ? [...body.querySelectorAll('p')]
      .filter(p => !p.classList.contains('gc-neighbourhood-mast'))
      .slice(0, 1).map(p => p.textContent) : [];
    return {
      section,
      details,
      searchText: normalise([section.id, heading?.textContent || '', ...description, ...names].join(' '))
    };
  }).filter(group => group.details);

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

  input.addEventListener('input', filter);
  expand.addEventListener('click', () => toggle(true));
  collapse.addEventListener('click', () => toggle(false));
  toolbar.hidden = false;
  filter();
})();
