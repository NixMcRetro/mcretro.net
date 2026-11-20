/* Randomise the Bird-mode sidebar from published conure posts only.
 * The server-rendered four fallback links remain if JavaScript or fetch fails.
 * A fresh selection is made on every page load and whenever Shuffle is pressed.
 */
(function () {
  'use strict';
  const list = document.querySelector('[data-chirp-random-posts]');
  const shuffleButton = document.querySelector('[data-chirp-random-shuffle]');
  const randomPostLinks = document.querySelectorAll('[data-chirp-random-link]');
  if (!list || !shuffleButton) return;

  let candidates = null;
  let loadingPromise = null;
  const maxPosts = 4;
  let lastShown = new Set();

  function pickRandom(items, count) {
    const shuffled = items.slice();
    for (let i = 0; i < Math.min(count, shuffled.length); i += 1) {
      const j = i + Math.floor(Math.random() * (shuffled.length - i));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, count);
  }

  function render() {
    if (!candidates || candidates.length === 0) return;
    const selected = pickRandom(candidates, maxPosts);
    // A click should visibly change the selection when other posts exist.
    // Preserve four distinct links even when the random draw repeats a set.
    if (lastShown.size > 0 && candidates.length > maxPosts &&
        selected.every(post => lastShown.has(post.url))) {
      const unseen = candidates.filter(post => !lastShown.has(post.url));
      if (unseen.length) selected[0] = unseen[Math.floor(Math.random() * unseen.length)];
    }
    lastShown = new Set(selected.map(post => post.url));
    const fragment = document.createDocumentFragment();
    for (const post of selected) {
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = post.url;
      link.textContent = post.title;
      item.appendChild(link);
      const date = document.createElement('span');
      date.className = 'post-date-sidebar';
      date.textContent = post.date_label;
      item.appendChild(date);
      fragment.appendChild(item);
    }
    list.replaceChildren(fragment);
  }

  function validPost(post) {
    return post && typeof post.url === 'string' &&
      /^\/(?![\\/])[^?#]*\/$/.test(post.url) &&
      typeof post.title === 'string' && post.title.length > 0 &&
      typeof post.date_label === 'string';
  }

  async function load() {
    try {
      const response = await fetch('/assets/data/chirp-random.json', {
        credentials: 'same-origin'
      });
      if (!response.ok) throw new Error('Random bird posts unavailable');
      const data = await response.json();
      if (!Array.isArray(data)) throw new Error('Invalid bird post catalogue');
      const seen = new Set();
      candidates = data.filter(post => {
        if (!validPost(post) || seen.has(post.url)) return false;
        seen.add(post.url);
        return true;
      });
      const current = window.location.pathname;
      if (candidates.length > maxPosts) {
        candidates = candidates.filter(post => post.url !== current);
      }
      shuffleButton.disabled = false;
      render();
    } catch (error) {
      // Keep the four ordinary, accessible server-rendered fallback links.
    }
  }

  shuffleButton.addEventListener('click', function () {
    if (candidates) render();
  });

  // All Bird Random links (nav, sidebar and homepage) open one released
  // conure article. Without JavaScript they safely open Adventures instead.
  randomPostLinks.forEach(function (randomPostLink) {
    randomPostLink.addEventListener('click', async function (event) {
      event.preventDefault();
      if (loadingPromise) await loadingPromise;
      if (!candidates || !candidates.length) {
        window.location.assign('/chirp/adventures/');
        return;
      }
      const selected = candidates[Math.floor(Math.random() * candidates.length)];
      window.location.assign(selected.url);
    });
  });
  // Avoid loading the bird-only catalogue while readers use Light/Dark.
  // Observe the existing theme switch so Bird also works without reloading
  // a published conure article.
  let requested = false;
  function activateIfBird() {
    if (requested || document.documentElement.getAttribute('data-theme') !== 'bird') return;
    requested = true;
    loadingPromise = load();
  }
  activateIfBird();
  const observer = new MutationObserver(activateIfBird);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
})();
