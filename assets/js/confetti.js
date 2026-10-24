/* Desktop homepage: run one randomly chosen original Sonic, Tails or cat GIF
   horizontally past the McRetro.net lettering. No star or mobile effects. */
document.addEventListener('DOMContentLoaded', () => {
  const logo = document.querySelector('.site-logo');
  if (!logo) return;

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

    // The clickable logo can stretch across the whole header: locate its
    // rendered lettering with a Range so the runner starts beside the text.
    const textRange = document.createRange();
    textRange.selectNodeContents(logo);
    const textRect = textRange.getBoundingClientRect();
    const rect = textRect.width > 0 && textRect.height > 0
      ? textRect
      : logo.getBoundingClientRect();
    const selected = runners[Math.floor(Math.random() * runners.length)];
    const startX = Math.min(rect.right + 16, window.innerWidth - 60);
    const endX = window.innerWidth + 120;
    const y = Math.max(0, rect.top + rect.height / 2 - 24);
    const seconds = Math.max(3.5, Math.min(8.5, (endX - startX) / selected.speed));

    // Clip the decorative runner to the viewport so it never creates
    // horizontal scrolling or interferes with links and menu controls.
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
