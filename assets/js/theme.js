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
      window.sessionStorage.setItem(navigationThemeKey, JSON.stringify({
        path: destination.pathname, theme: theme, at: Date.now()
      }));
    } catch (error) { /* Navigation remains functional if storage is blocked. */ }
  }

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

  // Preserve an unsupported page when switching between McRetro and the Nest.
  // The redirect still leads to the other site's landing page. A one-use,
  // tab-local transfer attaches the originating URL to that history entry,
  // so switching back returns to the exact original path/query/fragment.
  var modeReturnPendingKey = 'mcretro-mode-return-pending';
  var modeReturnHistoryKey = 'mcretro-mode-return';

  function localModeRoute(value) {
    if (typeof value !== 'string' || value.charAt(0) !== '/' ||
        value.slice(0, 2) === '//' || value.indexOf('\\') !== -1) return null;
    try {
      var url = new URL(value, window.location.origin);
      if (url.origin !== window.location.origin) return null;
      return url.pathname + url.search + url.hash;
    } catch (error) { return null; }
  }

  function rememberFallbackReturn(destination, returnTheme) {
    var source = localModeRoute(window.location.pathname +
      window.location.search + window.location.hash);
    var target = localModeRoute(destination);
    if (!source || !target || source === target) return;
    try {
      window.sessionStorage.setItem(modeReturnPendingKey, JSON.stringify({
        source: source, target: target, returnTheme: returnTheme, at: Date.now()
      }));
    } catch (error) { /* Fallback navigation still works without storage. */ }
  }

  function attachPendingFallbackReturn() {
    var raw = null;
    try {
      raw = window.sessionStorage.getItem(modeReturnPendingKey);
      window.sessionStorage.removeItem(modeReturnPendingKey);
    } catch (error) { return; }
    if (!raw) return;
    try {
      var intent = JSON.parse(raw);
      var age = Date.now() - intent.at;
      if (!Number.isFinite(age) || age < 0 || age > 120000) return;
      var current = window.location.pathname + window.location.search + window.location.hash;
      if (intent.target !== current || (current !== '/chirp/' && current !== '/blog/')) return;
      var source = localModeRoute(intent.source);
      if (!source || source === current ||
          (intent.returnTheme !== 'light' && intent.returnTheme !== 'bird')) return;
      var previousState = window.history.state;
      if (previousState !== null &&
          (typeof previousState !== 'object' || Array.isArray(previousState))) return;
      var nextState = Object.assign({}, previousState || {});
      nextState[modeReturnHistoryKey] = {
        source: source, target: current, returnTheme: intent.returnTheme
      };
      window.history.replaceState(nextState, '');
    } catch (error) { /* Invalid or blocked history cannot affect navigation. */ }
  }

  function rememberedFallbackReturn(nextTheme) {
    try {
      var intent = window.history.state && window.history.state[modeReturnHistoryKey];
      var current = window.location.pathname + window.location.search + window.location.hash;
      if (!intent || intent.target !== current || intent.returnTheme !== nextTheme) return null;
      return localModeRoute(intent.source);
    } catch (error) { return null; }
  }

  function navigationTarget(theme, isUserChange) {
    // Only the user's theme-toggle click changes destinations.
    // Loading a link, restoring history or syncing another tab never does.
    if (!isUserChange || !window.location) return null;
    var path = window.location.pathname || '';
    // A saved fallback applies only to the exact landing-page history entry,
    // never to another tab or a direct visit to that URL.
    var remembered = rememberedFallbackReturn(theme);
    if (remembered) return remembered;
    if (theme === 'bird') {
      // Navigate to the matching Channel Chirp section when available.
      if (path === '/' || path === '/index.html') return '/chirp/';
      if (/^\/about\/?$/.test(path)) return '/chirp/about/';
      if (/^\/blog(?:\/page\d+)?\/?$/.test(path)) return '/chirp/adventures/';
      if (/^\/goodies\/?$/.test(path)) return '/chirp/soundborb/';
      // Other McRetro pages still enter the Nest; conure articles can stay put.
      if (unrelatedPosts || (!landing && !conureArticle)) return '/chirp/';
    }
    if (theme !== 'bird' && landing) {
      if (/^\/chirp\/?$/.test(path)) return '/';
      if (/^\/chirp\/about\/?$/.test(path)) return '/about/';
      if (/^\/chirp\/soundborb\/?$/.test(path)) return '/goodies/';
      // Adventures (including pagination) returns to the main Blog.
      if (/^\/chirp\/adventures(?:\/page\d+)?\/?$/.test(path)) return '/blog/';
      // Other Nest destinations keep their existing Blog fallback.
      return '/blog/';
    }
    return null;
  }

  // Import the short-lived fallback once, before presenting this history entry.
  attachPendingFallbackReturn();

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
          var path = window.location.pathname || '';
          if (current !== 'bird' && next === 'bird' && target === '/chirp/' &&
              path !== '/' && path !== '/index.html') {
            rememberFallbackReturn(target, 'light');
          } else if (current === 'bird' && next !== 'bird' && target === '/blog/' &&
              landing && !/^\/chirp\/adventures(?:\/page\d+)?\/?$/.test(path)) {
            rememberFallbackReturn(target, 'bird');
          }
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
