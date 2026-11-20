/* Light, Dark and Bird. Bird is a released-post filter, not merely a palette. */
(function () {
  'use strict';
  var key = 'mcretro-theme';
  var media = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : { matches: false };
  var sessionChoice = null;
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

  function persist(theme) {
    try { window.localStorage.setItem(key, theme); }
    catch (error) { sessionChoice = theme; }
  }

  function effectiveTheme() {
    return savedTheme() || (media.matches ? 'dark' : 'light');
  }

  function updatePresentation() {
    var theme = effectiveTheme();
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
    if (!window.location) return null;
    var path = window.location.pathname || '';
    if (theme === 'bird') {
      // Navigate to the matching Channel Chirp section when available.
      if (path === '/' || path === '/index.html') return '/chirp/';
      if (/^\/about\/?$/.test(path)) return '/chirp/about/';
      if (/^\/blog(?:\/page\d+)?\/?$/.test(path)) return '/chirp/adventures/';
      if (/^\/goodies\/?$/.test(path)) return '/chirp/soundborb/';
      // Other McRetro pages still enter the Nest; conure articles can stay put.
      if (unrelatedPosts || (isUserChange && !landing && !conureArticle)) return '/chirp/';
    }
    if (theme !== 'bird' && landing && isUserChange) {
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

  // Opening /chirp/ or /chirp/timeline/ explicitly opts into Bird mode,
  // including when the visitor previously selected Light or Dark.
  if (landing) persist('bird');
  var firstTheme = updatePresentation();
  if (firstTheme === 'bird' && unrelatedPosts &&
      window.location && typeof window.location.replace === 'function') {
    window.location.replace(navigationTarget(firstTheme, false) || '/chirp/');
  }

  function ready() {
    var button = document.querySelector('[data-theme-toggle]');
    if (button) {
      button.addEventListener('click', function () {
        var current = root.getAttribute('data-theme');
        var next = themes[(themes.indexOf(current) + 1) % themes.length];
        persist(next);
        updatePresentation();
        var target = navigationTarget(next, true);
        if (target && window.location && typeof window.location.assign === 'function') {
          window.location.assign(target);
        }
      });
    }

    // Explicit escape links restore the ordinary McRetro sidebar and post feed.
    var exits = document.querySelectorAll ? document.querySelectorAll('[data-theme-exit]') : [];
    Array.prototype.forEach.call(exits, function (link) {
      link.addEventListener('click', function () {
        var choice = link.getAttribute('data-theme-exit');
        if (choice === 'light' || choice === 'dark') {
          persist(choice);
          updatePresentation();
        }
      });
    });
    updatePresentation();
  }

  function systemChanged() {
    if (!savedTheme()) updatePresentation();
  }

  if (media.addEventListener) media.addEventListener('change', systemChanged);
  else if (media.addListener) media.addListener(systemChanged);
  window.addEventListener('storage', function (event) {
    if (event.key === key || event.key === null) {
      var theme = updatePresentation();
      var destination = navigationTarget(theme, false);
      if (destination && window.location && typeof window.location.replace === 'function') {
        window.location.replace(destination);
      }
    }
  });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready);
  else ready();
})();
