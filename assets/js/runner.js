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
    { src: '/assets/images/about/seal-flop.gif', speed: 90, height: 42, flop: true }
  ];

  // The seal GIF has eight 150ms frames. It lifts for frames 1-3,
  // propels forward in frames 4-6, then rests during frames 7-8.
  // Move only during that propulsion phase, with each hop on the
  // same 1.2-second rhythm as the GIF. Other runners stay linear.
  function animateSealFlops(sprite, startX, endX, speed, lane) {
    const frameMs = 150;
    const loopMs = 8 * frameMs;
    const stride = speed * loopMs / 1000;
    const hops = Math.ceil((endX - startX) / stride);
    const durationMs = hops * loopMs;
    const translate = (x) => `translate3d(${x}px, 0, 0)`;
    const keyframes = [{ offset: 0, transform: translate(startX) }];

    for (let hop = 0; hop < hops; hop += 1) {
      const baseMs = hop * loopMs;
      const fromX = Math.min(endX, startX + hop * stride);
      const toX = Math.min(endX, fromX + stride);
      keyframes.push({
        offset: (baseMs + 3 * frameMs) / durationMs,
        transform: translate(fromX),
        easing: 'ease-in-out'
      });
      keyframes.push({
        offset: (baseMs + 6 * frameMs) / durationMs,
        transform: translate(toX)
      });
    }

    keyframes.push({ offset: 1, transform: translate(endX) });
    const animation = sprite.animate(keyframes, { duration: durationMs, fill: 'forwards' });
    animation.finished.then(() => lane.remove(), () => lane.remove());
    return durationMs;
  }

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
      const spriteHeight = selected.height || 48;
      const spriteWidth = Math.ceil(spriteHeight * sprite.naturalWidth / sprite.naturalHeight);
      const startX = -spriteWidth;
      const viewportWidth = window.innerWidth;
      const seconds = (viewportWidth - startX) / selected.speed;

      // Clip the sprite to the viewport without blocking navigation clicks.
      const lane = document.createElement('div');
      lane.classList.add('header-runner-lane');
      lane.setAttribute('aria-hidden', 'true');
      sprite.style.height = spriteHeight + 'px';
      sprite.style.setProperty('--runner-start-x', startX + 'px');
      const useFlopMotion = selected.flop && typeof sprite.animate === 'function';
      if (useFlopMotion) {
        // Disable the usual continuous CSS translation for the seal only.
        sprite.style.animation = 'none';
      } else {
        sprite.style.animationDuration = seconds + 's';
      }
      lane.appendChild(sprite);
      mainNav.appendChild(lane);

      let durationMs = seconds * 1000;
      if (useFlopMotion) {
        durationMs = animateSealFlops(sprite, startX, viewportWidth, selected.speed, lane);
      } else {
        sprite.addEventListener('animationend', () => lane.remove(), { once: true });
      }
      setTimeout(() => lane.remove(), Math.ceil(durationMs) + 2000);
    }, { once: true });

    sprite.src = selected.src;
  }

  // One welcome animation on the homepage, only above the mobile breakpoint.
  if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
    runHeaderSprite();
  }
});
