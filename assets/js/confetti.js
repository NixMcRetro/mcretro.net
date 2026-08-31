document.addEventListener('DOMContentLoaded', () => {
  const logo = document.querySelector('.site-logo');
  if (!logo) return;

  logo.addEventListener('mouseenter', burstConfetti);

  function burstConfetti(e) {
    const rect = logo.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const colors = ['#FFFAE3', '#003d85', '#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3'];

    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('span');
      particle.classList.add('confetti-particle');

      // Random size between 6px and 12px
      const size = Math.random() * 6 + 6;
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';

      // Random color
      particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

      // Random starting position near the logo center
      const startX = centerX + (Math.random() - 0.5) * rect.width;
      const startY = centerY + (Math.random() - 0.5) * rect.height;
      particle.style.left = startX + 'px';
      particle.style.top = startY + 'px';

      // Random end offsets – they fly outward in random directions
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 100 + 50; // 50‑150px
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance;
      particle.style.setProperty('--dx', dx + 'px');
      particle.style.setProperty('--dy', dy + 'px');

      // Random rotation
      const rotation = Math.random() * 360;
      particle.style.setProperty('--rotation', rotation + 'deg');

      // Random duration
      const duration = Math.random() * 0.6 + 0.6; // 0.6–1.2s
      particle.style.animationDuration = duration + 's';

      // Append to body
      document.body.appendChild(particle);

      // Remove after animation ends
      particle.addEventListener('animationend', () => {
        particle.remove();
      });
    }
  }
});

// lumi was here
