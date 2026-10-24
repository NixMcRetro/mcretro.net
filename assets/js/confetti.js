/* McRetro star confetti: one homepage welcome and logo-hover bursts.
   No images or third-party libraries. Respect reduced-motion preferences. */
document.addEventListener('DOMContentLoaded', () => {
  const logo = document.querySelector('.site-logo');
  if (!logo) return;

  const colors = ['#FFFAE3', '#003d85', '#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3'];
  const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const random = (min, max) => min + Math.random() * (max - min);

  function makeStar(x, y, dx, dy, duration) {
    const particle = document.createElement('span');
    particle.classList.add('confetti-particle');
    particle.setAttribute('aria-hidden', 'true');

    const size = random(7, 12);
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.setProperty('--dx', dx + 'px');
    particle.style.setProperty('--dy', dy + 'px');
    particle.style.setProperty('--rotation', random(-270, 270) + 'deg');
    particle.style.animationDuration = duration + 's';

    document.body.appendChild(particle);
    particle.addEventListener('animationend', () => particle.remove(), { once: true });
    // Also remove particles if their animation was interrupted or disabled.
    setTimeout(() => particle.remove(), 2500);
  }

  function burstFromLogo() {
    if (reducedMotion()) return;

    const rect = logo.getBoundingClientRect();
    for (let i = 0; i < 30; i++) {
      const x = rect.left + random(0, rect.width);
      const y = rect.top + random(0, rect.height);
      const angle = random(0, Math.PI * 2);
      const distance = random(50, 150);
      makeStar(
        x, y,
        Math.cos(angle) * distance,
        Math.sin(angle) * distance,
        random(0.6, 1.2)
      );
    }
  }

  function scatterHomepageStars() {
    if (reducedMotion()) return;
    const width = window.innerWidth;
    const height = window.innerHeight;
    // Distribute across viewport cells rather than clumping around the logo.
    const count = width < 600 ? 24 : 48;
    const columns = Math.max(1, Math.ceil(Math.sqrt(count * width / Math.max(height, 1))));
    const rows = Math.ceil(count / columns);

    for (let i = 0; i < count; i++) {
      const col = i % columns;
      const row = Math.floor(i / columns);
      const x = (col + random(0.15, 0.85)) * width / columns;
      const y = (row + random(0.15, 0.85)) * height / rows;
      makeStar(x, y, random(-60, 60), random(25, 95), random(1.0, 1.8));
    }
  }

  logo.addEventListener('mouseenter', burstFromLogo);
  if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
    scatterHomepageStars();
  }
});
