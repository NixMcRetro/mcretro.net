/* Resolve the theme before stylesheets render. This file is intentionally loaded in <head>. */
(function () {
  'use strict';
  var key = 'mcretro-theme';
  var media = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : { matches: false };

  function savedTheme() {
    try {
      var value = window.localStorage.getItem(key);
      return value === 'light' || value === 'dark' ? value : null;
    } catch (error) {
      return null; // Private browsing or blocked storage: use the device preference.
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
        try { window.localStorage.setItem(key, next); } catch (error) { /* Still switch for this page. */ }
        document.documentElement.setAttribute('data-theme', next);
        // Re-apply only the button and browser chrome when storage is unavailable.
        if (savedTheme() === next) applyTheme();
        else {
          var browserColour = document.querySelector('meta[name="theme-color"]');
          if (browserColour) browserColour.setAttribute('content', next === 'dark' ? '#191D27' : '#FFF8DC');
          button.setAttribute('aria-pressed', String(next === 'dark'));
          button.setAttribute('title', 'Switch to ' + (next === 'dark' ? 'light' : 'dark') + ' theme');
        }
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
