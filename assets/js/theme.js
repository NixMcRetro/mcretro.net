/* Resolve the theme before stylesheets render. This file is intentionally loaded in <head>. */
(function () {
  'use strict';
  var key = 'mcretro-theme';
  var media = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : { matches: false };
  var sessionChoice = null; // Fallback when localStorage is blocked.

  function savedTheme() {
    try {
      var value = window.localStorage.getItem(key);
      return value === 'light' || value === 'dark' ? value : null;
    } catch (error) {
      return sessionChoice; // Preserve a manual choice within the page.
    }
  }

  function applyTheme() {
    var theme = savedTheme() || (media.matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);

    var browserColour = document.querySelector('meta[name="theme-color"]');
    if (browserColour) browserColour.setAttribute('content', theme === 'dark' ? '#191D27' : '#FFF8DC');

    var button = document.querySelector('[data-theme-toggle]');
    if (button) {
      button.setAttribute('aria-pressed', String(theme === 'dark'));
      button.setAttribute('title', 'Switch to ' + (theme === 'dark' ? 'light' : 'dark') + ' theme');
    }
  }

  function onSystemChange() {
    if (!savedTheme()) applyTheme();
  }

  function ready() {
    var button = document.querySelector('[data-theme-toggle]');
    if (button) {
      button.addEventListener('click', function () {
        var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        try { window.localStorage.setItem(key, next); }
        catch (error) { sessionChoice = next; }
        applyTheme();
      });
    }
    applyTheme();
  }

  applyTheme();
  if (media.addEventListener) media.addEventListener('change', onSystemChange);
  else if (media.addListener) media.addListener(onSystemChange);
  window.addEventListener('storage', function (event) {
    if (event.key === key || event.key === null) applyTheme();
  });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready);
  else ready();
})();
