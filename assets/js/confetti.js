/* McRetro flying retro hardware with Progress Pride rainbow exhaust.
   Original images are untouched. Particles fly offscreen without fading. */
document.addEventListener('DOMContentLoaded', () => {
  const logo = document.querySelector('.site-logo');
  if (!logo) return;

  const sprite = '/assets/images/effects/retro-tech-particles.svg#';
  // Weighted to favour the iconic floppy disk.
  const choices = [
    { id: 'floppy-35', weight: 60 },
    { id: 'crt', weight: 10 },
    { id: 'keyboard', weight: 20 },
    { id: 'cdrom', weight: 10 }
  ];
  const random = (min, max) => min + Math.random() * (max - min);
  const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function chooseHardware() {
    let roll = Math.random() * 100;
    for (const item of choices) {
      roll -= item.weight;
      if (roll < 0) return item.id;
    }
    return choices[0].id;
  }

  function launchHardware() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const size = random(width < 600 ? 23 : 29, width < 600 ? 38 : 48);
    const trail = random(width < 600 ? 75 : 115, width < 600 ? 125 : 210);
    const margin = size + trail + 24;
    const edge = Math.floor(Math.random() * 4);

    let startX, startY, dx, dy;
    switch (edge) {
      case 0: // left to right
        startX = -margin;
        startY = random(0, height);
        dx = width + 2 * margin;
        dy = random(-height * 0.22, height * 0.22);
        break;
      case 1: // right to left
        startX = width + margin;
        startY = random(0, height);
        dx = -(width + 2 * margin);
        dy = random(-height * 0.22, height * 0.22);
        break;
      case 2: // top to bottom
        startX = random(0, width);
        startY = -margin;
        dx = random(-width * 0.22, width * 0.22);
        dy = height + 2 * margin;
        break;
      default: // bottom to top
        startX = random(0, width);
        startY = height + margin;
        dx = random(-width * 0.22, width * 0.22);
        dy = -(height + 2 * margin);
    }

    const duration = random(5.8, 9.0);
    const particle = document.createElement('span');
    particle.classList.add('retro-tech-particle');
    particle.setAttribute('aria-hidden', 'true');
    particle.style.left = startX + 'px';
    particle.style.top = startY + 'px';
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.setProperty('--move-x', dx + 'px');
    particle.style.setProperty('--move-y', dy + 'px');
    particle.style.setProperty('--trail-length', trail + 'px');
    const trailWidth = random(10, 17);
    particle.style.setProperty('--trail-width', trailWidth + 'px');
    particle.style.setProperty('--trail-half-width', (trailWidth / 2) + 'px');
    particle.style.setProperty('--trail-angle', (Math.atan2(dy, dx) * 180 / Math.PI + 180) + 'deg');
    particle.style.animationDuration = duration + 's';
    // Keep the initial burst spread across the screen at the slower speed.
    particle.style.animationDelay = -random(0.1, duration * 0.58) + 's';

    const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    icon.setAttribute('viewBox', '0 0 48 48');
    icon.setAttribute('class', 'retro-tech-icon');
    icon.setAttribute('focusable', 'false');
    icon.setAttribute('aria-hidden', 'true');

    const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    use.setAttribute('href', sprite + chooseHardware());
    icon.appendChild(use);
    particle.appendChild(icon);
    document.body.appendChild(particle);

    particle.addEventListener('animationend', () => particle.remove(), { once: true });
    // Safety net for interrupted animations or a tab being suspended.
    setTimeout(() => particle.remove(), (duration + 2) * 1000);
  }

  function flyPast(count) {
    if (reducedMotion()) return;
    for (let i = 0; i < count; i++) launchHardware();
  }

  logo.addEventListener('mouseenter', () => flyPast(window.innerWidth < 600 ? 12 : 22));
  if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
    flyPast(window.innerWidth < 600 ? 20 : 38);
  }
});
