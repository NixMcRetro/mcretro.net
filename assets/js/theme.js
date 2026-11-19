/* Light, Dark and Bird. Bird is a released-post filter, not merely a palette. */
(function () {
  'use strict';
  var key = 'mcretro-theme';
  var media = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : { matches: false };
  var sessionChoice = null;
  var themes = ['light', 'dark', 'bird'];
  var names = { light: 'Light', dark: 'Dark', bird: 'Bird' };
  var colours = { light: '#FFF8DC', dark: '#191D27', bird: '#F4F4E7' };
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
      var next = themes[(themes.indexOf(theme) + 1) % themes.length];
      button.setAttribute('aria-label',
        'Current theme: ' + names[theme] + '. Switch to ' + names[next] +
        (next === 'bird' ? ' and show Channel Chirp posts' : ' theme'));
      button.setAttribute('title', names[theme] + ' mode. Switch to ' + names[next]);
    }
    return theme;
  }

  function navigationTarget(theme, isUserChange) {
    if (!window.location) return null;
    // Entering the dedicated Nest always activates its content filter.
    if (theme === 'bird' && unrelatedPosts) return '/chirp/';
    if (theme === 'bird' && isUserChange && !landing && !conureArticle) return '/chirp/';
    // Leaving Bird from the Nest returns to the unfiltered McRetro blog.
    if (theme !== 'bird' && landing && isUserChange) return '/blog/';
    return null;
  }

  // Opening /chirp/ or /chirp/timeline/ explicitly opts into Bird mode,
  // including when the visitor previously selected Light or Dark.
  if (landing) persist('bird');
  var firstTheme = updatePresentation();
  if (firstTheme === 'bird' && unrelatedPosts &&
      window.location && typeof window.location.replace === 'function') {
    window.location.replace('/chirp/');
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
