(function() {
    var toggle = document.querySelector('.nav-toggle');
    var nav = document.querySelector('[data-nav]');

    if (!toggle || !nav) return;

    toggle.addEventListener('click', function(e) {
      e.stopPropagation();
      var isOpen = nav.getAttribute('data-nav') === 'open';
      // Toggle the menu state on the nav
      nav.setAttribute('data-nav', isOpen ? '' : 'open');
      // Toggle the open class on the button (for the X animation)
      toggle.classList.toggle('open', !isOpen);
      toggle.setAttribute('aria-expanded', !isOpen);
    });

    // Close when clicking outside
    document.addEventListener('click', function(e) {
      if (!nav.contains(e.target) && e.target !== toggle && nav.getAttribute('data-nav') === 'open') {
        nav.setAttribute('data-nav', '');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Dismiss the mobile menu with the keyboard and return focus to its toggle.
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && nav.getAttribute('data-nav') === 'open') {
        nav.setAttribute('data-nav', '');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  })();
