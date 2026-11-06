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

    const selected = runners[Math.floor(Math.random() * runners.length)];
    const sprite = document.createElement('img');
    sprite.classList.add('header-runner-sprite');
    sprite.alt = '';

    // Wait for the original GIF dimensions so its entire width starts offscreen.
    sprite.addEventListener('load', () => {
      if (reducedMotion() || mobileMenu() || !sprite.naturalHeight) return;
      const rect = mainNav.getBoundingClientRect();
      if (rect.width <= 0) return;

      // Travel across the complete visible page, not just the centred nav.
      // Keep the 48px-tall sprite's feet on the navigation's top border.
      const spriteWidth = Math.ceil(48 * sprite.naturalWidth / sprite.naturalHeight);
      const startX = -spriteWidth;
      const endX = document.documentElement.clientWidth;
      const y = Math.max(0, rect.top - 48);
      const seconds = Math.max(3.5, Math.min(8.5, (endX - startX) / selected.speed));

      // The fixed lane clips the sprite without blocking clicks or scrolling.
      const lane = document.createElement('div');
      lane.classList.add('header-runner-lane');
      lane.setAttribute('aria-hidden', 'true');
      sprite.style.setProperty('--runner-start-x', startX + 'px');
      sprite.style.setProperty('--runner-end-x', endX + 'px');
      sprite.style.setProperty('--runner-y', y + 'px');
      sprite.style.animationDuration = seconds + 's';
      lane.appendChild(sprite);
      document.body.appendChild(lane);
      sprite.addEventListener('animationend', () => lane.remove(), { once: true });
      setTimeout(() => lane.remove(), 9500);
    }, { once: true });

    sprite.src = selected.src;
  }

  // One welcome animation on the homepage, only above the mobile breakpoint.
  if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
    runHeaderSprite();
  }
});
