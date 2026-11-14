/* Desktop homepage: a random Sonic, Tails, cat or seal GIF travels along
   the main navigation's top border. No mobile effects. */
document.addEventListener('DOMContentLoaded', () => {
  const mainNav = document.querySelector('.main-nav');
  if (!mainNav) return;

  const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mobileMenu = () => window.matchMedia('(max-width: 750px)').matches;

  // Preserve the original Sonic, Tails and cat GIFs.
  // Walking characters and the flopping seal travel more slowly than runners.
  const runners = [
    { src: '/homepages/sonic/images/swalk.gif', speed: 125 },
    { src: '/homepages/sonic/images/twalk.gif', speed: 125 },
    { src: '/homepages/sonic/images/trun.gif', speed: 205 },
    { src: '/homepages/sonic/images/srun.gif', speed: 205 },
    { src: '/assets/images/about/0CATRUNY.gif', speed: 205 },
    { src: '/assets/images/about/seal-flop.gif', speed: 90 }
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

      // Match the sprite's feet to the navigation border. The lane itself
      // is anchored to the nav, so scrolling keeps them together.
      const spriteWidth = Math.ceil(48 * sprite.naturalWidth / sprite.naturalHeight);
      const startX = -spriteWidth;
      const viewportWidth = window.innerWidth;
      const seconds = (viewportWidth - startX) / selected.speed;

      // Clip the sprite to the viewport without blocking navigation clicks.
      const lane = document.createElement('div');
      lane.classList.add('header-runner-lane');
      lane.setAttribute('aria-hidden', 'true');
      sprite.style.setProperty('--runner-start-x', startX + 'px');
      sprite.style.animationDuration = seconds + 's';
      lane.appendChild(sprite);
      mainNav.appendChild(lane);
      sprite.addEventListener('animationend', () => lane.remove(), { once: true });
      setTimeout(() => lane.remove(), Math.ceil(seconds * 1000) + 2000);
    }, { once: true });

    sprite.src = selected.src;
  }

  // One welcome animation on the homepage, only above the mobile breakpoint.
  if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
    runHeaderSprite();
  }
});
