/* Resolve Light, Dark, or Bird before stylesheets render to prevent a theme flash. */
(function () {
  'use strict';
  var key = 'mcretro-theme';
  var media = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : { matches: false };
  var sessionChoice = null; // Fallback when localStorage is blocked.
  var themes = ['light', 'dark', 'bird'];
  var names = { light: 'Light', dark: 'Dark', bird: 'Bird' };
  var colours = { light: '#FFF8DC', dark: '#191D27', bird: '#F4F4E7' };

  function savedTheme() {
    try {
      var value = window.localStorage.getItem(key);
      return themes.indexOf(value) !== -1 ? value : null;
    } catch (error) {
      return sessionChoice;
    }
  }

  function defaultTheme() {
    // Only conure pages default to Bird for visitors without a manual choice.
    // Explicit choices persist across McRetro, including on conure pages.
    if (document.documentElement.getAttribute('data-default-theme') === 'bird') return 'bird';
    return media.matches ? 'dark' : 'light';
  }

  function applyTheme() {
    var theme = savedTheme() || defaultTheme();
    document.documentElement.setAttribute('data-theme', theme);

    var browserColour = document.querySelector('meta[name="theme-color"]');
    if (browserColour) browserColour.setAttribute('content', colours[theme]);

    var button = document.querySelector('[data-theme-toggle]');
    if (button) {
      var next = themes[(themes.indexOf(theme) + 1) % themes.length];
      button.setAttribute('aria-label', 'Current theme: ' + names[theme] + '. Switch to ' + names[next] + ' theme');
      button.setAttribute('title', names[theme] + ' theme. Click to switch to ' + names[next]);
    }
  }

  function onSystemChange() {
    if (!savedTheme()) applyTheme();
  }

  function ready() {
    var button = document.querySelector('[data-theme-toggle]');
    if (button) {
      button.addEventListener('click', function () {
        var current = document.documentElement.getAttribute('data-theme');
        var next = themes[(themes.indexOf(current) + 1) % themes.length];
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
