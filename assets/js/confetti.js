/* Homepage desktop: one randomly selected original Sonic/Tails/cat GIF
   runs to the right of the site title. Mobile: retain Progress Pride
   welcome and hamburger-open bursts. No Random menu effects. */
document.addEventListener('DOMContentLoaded', () => {
  const logo = document.querySelector('.site-logo');
  const menuToggle = document.querySelector('.nav-toggle');
  if (!logo || !menuToggle) return;

  // Six rainbow stripes plus the five Progress Pride chevron colours.
  const colours = [
    '#E40303', '#FF8C00', '#FFED00', '#008026', '#004DFF', '#750787',
    '#000000', '#784F17', '#5BCEFA', '#F5A9B8', '#FFFFFF'
  ];
  const random = (min, max) => min + Math.random() * (max - min);
  const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Match the hamburger layout breakpoint in assets/css/style.css.
  const mobileMenu = () => window.matchMedia('(max-width: 750px)').matches;

  function burstFromMenu() {
    if (reducedMotion() || !mobileMenu()) return;

    const rect = menuToggle.getBoundingClientRect();
    const centreX = rect.left + rect.width / 2;
    const centreY = rect.top + rect.height / 2;
    const mobile = true;
    const count = 22;
    // Keep the existing mobile Progress Pride star size, spread and drift.
    const burstRadius = Math.max(50, rect.width / 2 + (mobile ? 12 : 20));
    // Cycling by seven gives exactly two of each of the eleven colours.
    const colourOffset = Math.floor(Math.random() * colours.length);

    for (let i = 0; i < count; i++) {
      // Two stars reach beyond either side of the target;
      // the remaining stars scatter in every direction.
      const leftmost = Math.floor(count / 2);
      const sideways = i === 0 || i === leftmost;
      // Odd counts need an explicit leftward angle: 33 / 2 is not an index.
      const angle = i === 0 ? 0
        : i === leftmost ? Math.PI
        : (i / count) * 2 * Math.PI + random(-0.14, 0.14);
      const distance = burstRadius * (sideways
        ? random(1.02, 1.12)
        : random(0.7, 1.08));
      const size = random(9, mobile ? 14 : 16);
      const duration = random(3.9, 5.4);
      const driftX = random(-14, 14);
      const fallY = random(mobile ? 42 : 58, mobile ? 85 : 110);
      // Keep a slow, steady descent rather than dropping sharply mid-flight.
      const burstX = Math.cos(angle) * distance;
      const burstY = Math.sin(angle) * distance;
      const star = document.createElement('span');
      star.classList.add('pride-star-particle');
      star.setAttribute('aria-hidden', 'true');
      star.style.width = size + 'px';
      star.style.height = size + 'px';
      star.style.left = centreX - size / 2 + 'px';
      star.style.top = centreY - size / 2 + 'px';
      star.style.setProperty('--pride-colour', colours[(i * 7 + colourOffset) % colours.length]);
      star.style.setProperty('--burst-x', burstX + 'px');
      star.style.setProperty('--burst-y', burstY + 'px');
      star.style.setProperty('--drift-x', driftX + 'px');
      star.style.setProperty('--fall-y', fallY + 'px');
      star.style.setProperty('--mid-x', burstX + driftX * 0.35 + 'px');
      star.style.setProperty('--mid-y', burstY + fallY * 0.35 + 'px');
      star.style.setProperty('--late-x', burstX + driftX * 0.7 + 'px');
      star.style.setProperty('--late-y', burstY + fallY * 0.7 + 'px');
      star.style.setProperty('--turn', random(-45, 45) + 'deg');
      star.style.animationDuration = duration + 's';

      document.body.appendChild(star);
      star.addEventListener('animationend', () => star.remove(), { once: true });
      // Remove particles if an animation is interrupted or disabled mid-flight.
      setTimeout(() => star.remove(), 6600);
    }
  }

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

  // Mobile: a burst only when the existing hamburger changes to open,
  // including keyboard activation. Closing never triggers a new burst.
  const menuObserver = new MutationObserver(() => {
    if (mobileMenu() && menuToggle.getAttribute('aria-expanded') === 'true') {
      burstFromMenu();
    }
  });
  menuObserver.observe(menuToggle, { attributes: true, attributeFilter: ['aria-expanded'] });

  // One decorative welcome on the homepage; no effect on inner page loads.
  if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
    if (mobileMenu()) burstFromMenu();
    else runHeaderSprite();
  }
});
