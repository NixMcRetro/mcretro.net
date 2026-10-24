/* Progress Pride stars: one homepage welcome and logo-triggered bursts.
   Stars pop outward, then slowly drift and fade down. */
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

    // The logo link can stretch across its flex-column header.
    // Measure the rendered text itself, not the full clickable link box.
    const textRange = document.createRange();
    textRange.selectNodeContents(logo);
    const textRect = textRange.getBoundingClientRect();
    const rect = textRect.width > 0 && textRect.height > 0
      ? textRect
      : logo.getBoundingClientRect();
    const centreX = rect.left + rect.width / 2;
    const centreY = rect.top + rect.height / 2;
    const mobile = window.innerWidth < 600;
    const count = mobile ? 22 : 33;
    // Extend the circular burst from the middle of the text to just beyond
    // both ends of "McRetro.net". This adapts to actual text width on mobile.
    const burstRadius = Math.max(50, rect.width / 2 + (mobile ? 12 : 20));
    // Cycling by seven (coprime with eleven) gives exactly two of each
    // Progress Pride colour on mobile and three of each on desktop.
    const colourOffset = Math.floor(Math.random() * colours.length);

    for (let i = 0; i < count; i++) {
      // Two stars fly straight sideways to reach beyond either end of the
      // lettering, while the others scatter in every direction.
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

  // One welcome burst on the homepage, plus mouse or keyboard logo triggers.
  logo.addEventListener('mouseenter', burstFromLogo);
  logo.addEventListener('focus', burstFromLogo);
  if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
    burstFromLogo();
  }
});
