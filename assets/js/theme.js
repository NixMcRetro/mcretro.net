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

  // Opening /chirp/ explicitly opts into Bird while preserving the last
  // Light/Dark preference for ordinary McRetro URLs.
  if (landing) persist('bird');
  updatePresentation();

  function ready() {
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
