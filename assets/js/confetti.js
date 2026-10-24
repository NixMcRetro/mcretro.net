/* Desktop homepage: a randomly chosen original Sonic, Tails or cat GIF
   follows the top border of the main navigation bar. No mobile effects. */
document.addEventListener('DOMContentLoaded', () => {
  const mainNav = document.querySelector('.main-nav');
  if (!mainNav) return;

  const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mobileMenu = () => window.matchMedia('(max-width: 750px)').matches;

  // Keep the original GIFs exactly as stored in the repository.
  // Walking characters move more slowly than running ones.
  const runners = [
    { src: '/homepages/sonic/images/swalk.gif', speed: 125 },
    { src: '/homepages/sonic/images/twalk.gif', speed: 125 },
    { src: '/homepages/sonic/images/trun.gif', speed: 205 },
    { src: '/homepages/sonic/images/srun.gif', speed: 205 },
    { src: '/assets/images/about/0CATRUNY.gif', speed: 205 }
  ];

  function runHeaderSprite() {
    if (reducedMotion() || mobileMenu()) return;

    // Position the 48px-tall sprite with its feet on the thin top border.
    // Start just left of the navigation and exit just beyond its right edge.
    const rect = mainNav.getBoundingClientRect();
    if (rect.width <= 0) return;
    const selected = runners[Math.floor(Math.random() * runners.length)];
    const startX = rect.left - 110;
    const endX = rect.right + 110;
    const y = Math.max(0, rect.top - 48);
    const seconds = Math.max(3.5, Math.min(8.5, (endX - startX) / selected.speed));

    // Keep the runner clipped to the viewport and click-through so it never
    // creates horizontal scrolling or interferes with the navigation links.
    const lane = document.createElement('div');
    lane.classList.add('header-runner-lane');
    lane.setAttribute('aria-hidden', 'true');
    const sprite = document.createElement('img');
    sprite.classList.add('header-runner-sprite');
    sprite.src = selected.src;
    sprite.alt = '';
    sprite.style.setProperty('--runner-start-x', startX + 'px');
    sprite.style.setProperty('--runner-end-x', endX + 'px');
    sprite.style.setProperty('--runner-y', y + 'px');
    sprite.style.animationDuration = seconds + 's';
    lane.appendChild(sprite);
    document.body.appendChild(lane);
    sprite.addEventListener('animationend', () => lane.remove(), { once: true });
    setTimeout(() => lane.remove(), 9500);
  }

  // One welcome animation on the homepage, only above the mobile breakpoint.
  if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
    runHeaderSprite();
  }
});
