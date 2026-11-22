/* Accessible, single-selection flock cards. No profile is selected on a normal page load. */
(() => {
  'use strict';

  const container = document.getElementById('chirp-flock-tabs');
  const help = document.getElementById('chirp-flock-help');
  if (!container || !help) return;

  const tabs = [...container.querySelectorAll('[data-flock-tab]')];
  const panels = new Map(tabs.map(tab => [tab.dataset.flockTab, document.getElementById(tab.getAttribute('aria-controls'))]));
  if (tabs.some(tab => !panels.get(tab.dataset.flockTab))) return;

  function selectProfile(name, options = {}) {
    const selected = panels.has(name) ? name : null;
    for (const tab of tabs) {
      const active = tab.dataset.flockTab === selected;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active || (!selected && tab === tabs[0]) ? 0 : -1;
      panels.get(tab.dataset.flockTab).hidden = !active;
    }
    help.hidden = Boolean(selected);

    if (options.updateHash) {
      const url = new URL(window.location.href);
      url.hash = selected ? selected : '';
      window.history.replaceState(null, '', url);
    }
    if (options.focus && selected) {
      tabs.find(tab => tab.dataset.flockTab === selected).focus();
    }
  }

  container.addEventListener('click', event => {
    const tab = event.target.closest('[data-flock-tab]');
    if (!tab || !container.contains(tab)) return;
    selectProfile(tab.dataset.flockTab, { updateHash: true });
  });

  container.addEventListener('keydown', event => {
    const tab = event.target.closest('[data-flock-tab]');
    if (!tab || !container.contains(tab)) return;
    const index = tabs.indexOf(tab);
    let next;
    switch (event.key) {
      case 'ArrowRight':
        next = tabs[(index + 1) % tabs.length];
        break;
      case 'ArrowLeft':
        next = tabs[(index - 1 + tabs.length) % tabs.length];
        break;
      case 'Home':
        next = tabs[0];
        break;
      case 'End':
        next = tabs[tabs.length - 1];
        break;
      case 'Escape':
        event.preventDefault();
        selectProfile(null, { updateHash: true });
        tabs[0].focus();
        return;
      default:
        return;
    }
    event.preventDefault();
    selectProfile(next.dataset.flockTab, { updateHash: true, focus: true });
  });

  function followDeepLink() {
    const requested = decodeURIComponent(window.location.hash.slice(1)).toLowerCase();
    selectProfile(panels.has(requested) ? requested : null);
  }
  window.addEventListener('hashchange', followDeepLink);
  followDeepLink();
})();
