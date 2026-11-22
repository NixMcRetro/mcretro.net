/* Light, Dark and Bird. Bird is a released-post filter, not merely a palette. */
(function () {
  'use strict';
  var key = 'mcretro-theme';
  var standardKey = 'mcretro-last-standard-theme';
  var media = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : { matches: false };
  var sessionChoice = null;
  var sessionStandardChoice = null;
  var themes = ['light', 'dark', 'bird'];
  var actionLabels = { light: 'Switch to Dark Mode', dark: 'Visit Channel Chirp', bird: 'Switch to Light Mode' };
  var colours = { light: '#FFF8DC', dark: '#191D27', bird: '#424242' };
  var root = document.documentElement;
  var landing = root.getAttribute('data-chirp-landing') === 'true';
  var conureArticle = root.getAttribute('data-chirp-article') === 'true';
  var unrelatedPosts = root.getAttribute('data-chirp-unrelated') === 'true';

  // Carry the visible experience when following a link: Light/Dark from
  // ordinary McRetro pages, Bird from Channel Chirp. A saved preference alone
  // is not enough to identify the origin of an article navigation.
  // The intent is one-shot, bound to the destination, and tab-local.
  var navigationThemeKey = 'mcretro-next-article-theme';
  function consumeNavigationTheme() {
    var raw = null;
    try {
      raw = window.sessionStorage.getItem(navigationThemeKey);
      window.sessionStorage.removeItem(navigationThemeKey);
    } catch (error) { return null; }
    if (!raw) return null;
    try {
      var intent = JSON.parse(raw);
      var age = Date.now() - intent.at;
      if (intent.path === window.location.pathname &&
          themes.indexOf(intent.theme) !== -1 &&
          Number.isFinite(age) && age >= 0 && age <= 60000) return intent.theme;
    } catch (error) { /* Ignore malformed or expired navigation state. */ }
    return null;
  }
  // Browser history keeps an article's chosen view through reload and
  // back/forward, without changing its URL or modifying global preferences.
  var historyThemeKey = 'mcretro-conure-standard-view';
  function readHistoryStandardTheme() {
    if (!conureArticle) return null;
    try {
      var entry = window.history.state && window.history.state[historyThemeKey];
      if (entry && entry.path === window.location.pathname &&
          (entry.theme === 'light' || entry.theme === 'dark')) return entry.theme;
    } catch (error) { /* History state may be unavailable. */ }
    return null;
  }
  function writeHistoryStandardTheme(theme) {
    if (!conureArticle) return;
    try {
      var state = window.history.state;
      if (state !== null && typeof state !== 'object') return;
      var next = Object.assign({}, state || {});
      if (theme === 'light' || theme === 'dark') {
        next[historyThemeKey] = {path: window.location.pathname, theme: theme};
      } else {
        delete next[historyThemeKey];
      }
      window.history.replaceState(next, '');
    } catch (error) { /* The current page still works without history state. */ }
  }
  var incomingNavigationTheme = consumeNavigationTheme();
  if (conureArticle) {
    if (incomingNavigationTheme) {
      // An explicit Bird arrival must also clear any older Light/Dark
      // history override for this browser entry.
      writeHistoryStandardTheme(incomingNavigationTheme);
    } else {
      incomingNavigationTheme = readHistoryStandardTheme();
    }
  }

  function captureStandardNavigation(event) {
    if (event.defaultPrevented || event.metaKey || event.ctrlKey ||
        event.shiftKey || event.altKey ||
        (typeof event.button === 'number' && event.button !== 0)) return;
    var theme = root.getAttribute('data-theme');
    if (theme !== 'light' && theme !== 'dark' &&
        !(theme === 'bird' && (landing || conureArticle))) return;
    var anchor = event.target && event.target.closest && event.target.closest('a[href]');
    if (!anchor || anchor.hasAttribute('download') ||
        anchor.hasAttribute('data-chirp-view-post') ||
        (anchor.target && anchor.target !== '_self')) return;
    try {
      var destination = new URL(anchor.href, window.location.href);
      if (destination.origin !== window.location.origin ||
          destination.pathname === window.location.pathname) return;
      if (landing && window.location.pathname === '/chirp/') clearBirdReturn();
      window.sessionStorage.setItem(navigationThemeKey, JSON.stringify({
        path: destination.pathname, theme: theme, at: Date.now()
      }));
    } catch (error) { /* Navigation remains functional if storage is blocked. */ }
  }

  // A page without a Channel Chirp counterpart temporarily visits the Nest.
  // Keep its exact path, search and fragment in this browser tab so cycling
  // back can return to the same McRetro page instead of the homepage.
  var birdReturnKey = 'mcretro-bird-return-url';
  function clearBirdReturn() {
    try { window.sessionStorage.removeItem(birdReturnKey); }
    catch (error) { /* Theme switching must still work without storage. */ }
  }
  function rememberBirdReturn() {
    var path = window.location.pathname || '/';
    if (path.charAt(0) !== '/' || path.slice(0, 2) === '//' ||
        /^\/chirp(?:\/|$)/.test(path)) return;
    try {
      window.sessionStorage.setItem(birdReturnKey, JSON.stringify({
        url: path + (window.location.search || '') + (window.location.hash || ''),
        at: Date.now()
      }));
    } catch (error) { /* With storage blocked, keep the normal Nest fallback. */ }
  }
  function consumeBirdReturn() {
    var raw = null;
    try {
      raw = window.sessionStorage.getItem(birdReturnKey);
      window.sessionStorage.removeItem(birdReturnKey);
    } catch (error) { return null; }
    if (!raw) return null;
    try {
      var value = JSON.parse(raw);
      if (!value || typeof value.url !== 'string' ||
          value.url.charAt(0) !== '/' || value.url.slice(0, 2) === '//') return null;
      var age = Date.now() - value.at;
      if (!Number.isFinite(age) || age < 0 || age > 1800000) return null;
      var target = new URL(value.url, window.location.origin);
      if (target.origin !== window.location.origin ||
          /^\/chirp(?:\/|$)/.test(target.pathname)) return null;
      return target.pathname + target.search + target.hash;
    } catch (error) { return null; }
  }

  // The return ticket only belongs to the Nest homepage reached through the
  // fallback theme toggle. Visiting another page invalidates a stale ticket.
  if (window.location.pathname !== '/chirp/') clearBirdReturn();

  function savedTheme() {
    try {
      var value = window.localStorage.getItem(key);
      return themes.indexOf(value) !== -1 ? value : null;
    } catch (error) {
      return sessionChoice;
    }
  }

  function systemTheme() {
    return media.matches ? 'dark' : 'light';
  }

  function savedStandardTheme() {
    try {
      var value = window.localStorage.getItem(standardKey);
      return value === 'light' || value === 'dark' ? value : null;
    } catch (error) {
      return sessionStandardChoice;
    }
  }

  function lastStandardTheme() {
    return savedStandardTheme() || systemTheme();
  }

  function rememberStandard(theme) {
    sessionStandardChoice = theme;
    try { window.localStorage.setItem(standardKey, theme); }
    catch (error) { /* Still available in this tab. */ }
  }

  function persist(theme) {
    incomingNavigationTheme = null;
    if (conureArticle) writeHistoryStandardTheme(null);
    var previous = savedTheme();
    if (theme === 'light' || theme === 'dark') rememberStandard(theme);
    // When opening /chirp/ directly, retain the previously selected standard
    // colour even though the main preference is about to become Bird.
    else if (theme === 'bird' && (previous === 'light' || previous === 'dark')) {
      rememberStandard(previous);
    }
    try { window.localStorage.setItem(key, theme); }
    catch (error) { sessionChoice = theme; }
  }

  function effectiveTheme() {
    // The URL decides the experience. Bird cannot hijack an ordinary McRetro
    // link, and an explicit /chirp/ destination is always displayed in Bird.
    if (landing) return 'bird';
    if (conureArticle && incomingNavigationTheme) return incomingNavigationTheme;
    var chosen = savedTheme();
    if (unrelatedPosts && chosen === 'bird') return lastStandardTheme();
    return chosen || systemTheme();
  }

  function updatePresentation(forcedTheme) {
    var theme = forcedTheme || effectiveTheme();
    root.setAttribute('data-theme', theme);
    var browserColour = document.querySelector('meta[name="theme-color"]');
    if (browserColour) browserColour.setAttribute('content', colours[theme]);
    var button = document.querySelector('[data-theme-toggle]');
    if (button) {
      var action = actionLabels[theme];
      button.setAttribute('aria-label', action);
      button.setAttribute('title', action);
    }
    return theme;
  }

  function navigationTarget(theme, isUserChange) {
    // Only the user's theme-toggle click changes destinations.
    // Loading a link, restoring history or syncing another tab never does.
    if (!isUserChange || !window.location) return null;
    var path = window.location.pathname || '';
    if (theme === 'bird') {
      clearBirdReturn();
      // Navigate to the matching Channel Chirp section when available.
      if (path === '/' || path === '/index.html') return '/chirp/';
      if (/^\/about\/?$/.test(path)) return '/chirp/about/';
      if (/^\/blog(?:\/page\d+)?\/?$/.test(path)) return '/chirp/adventures/';
      if (/^\/goodies\/?$/.test(path)) return '/chirp/soundborb/';
      // Other McRetro pages still enter the Nest; conure articles can stay put.
      if (unrelatedPosts || (!landing && !conureArticle)) {
        rememberBirdReturn();
        return '/chirp/';
      }
    }
    if (theme !== 'bird' && landing) {
      if (/^\/chirp\/?$/.test(path)) return consumeBirdReturn() || '/';
      clearBirdReturn();
      if (/^\/chirp\/about\/?$/.test(path)) return '/about/';
      if (/^\/chirp\/soundborb\/?$/.test(path)) return '/goodies/';
      // Adventures (including pagination) returns to the main Blog.
      if (/^\/chirp\/adventures(?:\/page\d+)?\/?$/.test(path)) return '/blog/';
      // Other Nest destinations keep their existing Blog fallback.
      return '/blog/';
    }
    return null;
  }

  // Opening /chirp/ explicitly opts into Bird while preserving the last
  // Light/Dark preference for ordinary McRetro URLs.
  if (landing) persist('bird');
  updatePresentation();

  function ready() {
    // Delegation covers Pagefind links added after load and Find-a-Squawk
    // links whose titles get dynamically highlighted.
    document.addEventListener('click', captureStandardNavigation, true);
    var button = document.querySelector('[data-theme-toggle]');
    if (button) {
      button.addEventListener('click', function () {
        var current = root.getAttribute('data-theme');
        var next = themes[(themes.indexOf(current) + 1) % themes.length];
        persist(next);
        updatePresentation(next);
        var target = navigationTarget(next, true);
        if (target && window.location && typeof window.location.assign === 'function') {
          window.location.assign(target);
        }
      });
    }

    // A released conure article can enter Bird Mode in place. Keep its
    // canonical URL and the user's last Light/Dark preference unchanged.
    // The link remains a working route to Adventures without JavaScript.
    var chirpLinks = document.querySelectorAll ? document.querySelectorAll('[data-chirp-view-post]') : [];
    Array.prototype.forEach.call(chirpLinks, function (link) {
      link.addEventListener('click', function (event) {
        if (event.defaultPrevented || event.metaKey || event.ctrlKey ||
            event.shiftKey || event.altKey || (typeof event.button === 'number' && event.button !== 0)) return;
        event.preventDefault();
        persist('bird');
        updatePresentation('bird');
      });
    });

    // Explicit exit links restore the remembered McRetro colour scheme.
    var exits = document.querySelectorAll ? document.querySelectorAll('[data-theme-exit]') : [];
    Array.prototype.forEach.call(exits, function (link) {
      link.addEventListener('click', function () {
        var choice = link.getAttribute('data-theme-exit');
        if (choice === 'standard') choice = lastStandardTheme();
        if (choice === 'light' || choice === 'dark') {
          persist(choice);
          updatePresentation(choice);
        }
      });
    });
    updatePresentation();
  }

  function systemChanged() {
    // An older saved Bird preference without a standard choice falls back
    // to the device colour scheme and should still follow its changes.
    if (!savedTheme() ||
        (unrelatedPosts && savedTheme() === 'bird' && !savedStandardTheme())) {
      updatePresentation();
    }
  }

  if (media.addEventListener) media.addEventListener('change', systemChanged);
  else if (media.addListener) media.addListener(systemChanged);
  window.addEventListener('storage', function (event) {
    if (event.key === key || event.key === standardKey || event.key === null) {
      updatePresentation();
    }
  });
  // Back/forward-cache restoration must also respect the page's own URL.
  window.addEventListener('pageshow', function (event) {
    if (event.persisted) {
      if (landing) persist('bird');
      updatePresentation();
    }
  });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready);
  else ready();
})();
