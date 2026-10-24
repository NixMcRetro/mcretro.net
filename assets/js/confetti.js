/* McRetro logo-only Progress Pride confetti.
   Stars burst outward and drift downward. No automatic page-load effect. */
document.addEventListener('DOMContentLoaded', () => {
  const logo = document.querySelector('.site-logo');
  if (!logo) return;

  // Six rainbow stripes plus the five Progress Pride chevron colours.
  const colours = [
    '#E40303', '#FF8C00', '#FFED00', '#008026', '#004DFF', '#750787',
    '#000000', '#784F17', '#5BCEFA', '#F5A9B8', '#FFFFFF'
  ];
  const random = (min, max) => min + Math.random() * (max - min);
  const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function burstFromLogo() {
    if (reducedMotion()) return;

    const rect = logo.getBoundingClientRect();
    const centreX = rect.left + rect.width / 2;
    const centreY = rect.top + rect.height / 2;
    const mobile = window.innerWidth < 600;
    const count = mobile ? 12 : 20;
    // Cycling by seven (coprime with eleven) shows every Pride colour in each burst.
    const colourOffset = Math.floor(Math.random() * colours.length);

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * 2 * Math.PI + random(-0.14, 0.14);
      const distance = random(38, mobile ? 75 : 105);
      const size = random(9, mobile ? 14 : 16);
      const duration = random(1.9, 2.8);
      const star = document.createElement('span');
      star.classList.add('pride-star-particle');
      star.setAttribute('aria-hidden', 'true');
      star.style.width = size + 'px';
      star.style.height = size + 'px';
      star.style.left = centreX - size / 2 + 'px';
      star.style.top = centreY - size / 2 + 'px';
      star.style.setProperty('--pride-colour', colours[(i * 7 + colourOffset) % colours.length]);
      star.style.setProperty('--burst-x', Math.cos(angle) * distance + 'px');
      star.style.setProperty('--burst-y', Math.sin(angle) * distance + 'px');
      star.style.setProperty('--drift-x', random(-25, 25) + 'px');
      star.style.setProperty('--fall-y', random(mobile ? 70 : 90, mobile ? 130 : 175) + 'px');
      star.style.setProperty('--turn', random(-100, 100) + 'deg');
      star.style.animationDuration = duration + 's';

      document.body.appendChild(star);
      star.addEventListener('animationend', () => star.remove(), { once: true });
      // Remove particles if an animation is interrupted or disabled mid-flight.
      setTimeout(() => star.remove(), 3600);
    }
  }

  // Mouse and keyboard access; no continuous animation or homepage auto-burst.
  logo.addEventListener('mouseenter', burstFromLogo);
  logo.addEventListener('focus', burstFromLogo);
});
