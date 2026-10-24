(function() {
  'use strict';

  function ready(callback) {
    if (document.readyState !== 'loading') {
      callback();
    } else {
      document.addEventListener('DOMContentLoaded', callback);
    }
  }

  ready(function() {
    var link = document.getElementById('random-post-link');
    if (!link) return;

    var urlsPromise;

    function loadUrls() {
      if (!urlsPromise) {
        urlsPromise = fetch('/assets/data/random-post-urls.json', { credentials: 'same-origin' })
          .then(function(response) {
            if (!response.ok) throw new Error('Random post data unavailable');
            return response.json();
          })
          .then(function(urls) {
            if (!Array.isArray(urls)) throw new Error('Invalid random post data');
            return urls.filter(function(url) {
              return typeof url === 'string' && /^\/(?![\/\\])/.test(url);
            });
          });
      }
      return urlsPromise;
    }

    // Start loading on hover/focus, rather than downloading the URL list on every page load.
    function preloadUrls() {
      loadUrls().catch(function() {
        // The click handler uses the ordinary Blog link if the data is unavailable.
      });
    }

    link.addEventListener('mouseenter', preloadUrls);
    link.addEventListener('focus', preloadUrls);

    link.addEventListener('click', async function(event) {
      event.preventDefault();
      try {
        var urls = await loadUrls();
        if (urls.length === 0) {
          window.location.assign(link.href);
          return;
        }
        var randomIndex = Math.floor(Math.random() * urls.length);
        window.location.assign(urls[randomIndex]);
      } catch (error) {
        window.location.assign(link.href);
      }
    });
  });
})();
