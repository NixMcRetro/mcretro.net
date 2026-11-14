/* Shuffle the header taglines, preserving the fixed opener, then crossfade
   directly between phrases every six seconds. No blank animation intervals. */
(function () {
  'use strict';

  var cycle = document.querySelector('.textcycle');
  if (!cycle) return;

  var phrases = Array.prototype.slice.call(cycle.querySelectorAll('.phrase'));
  if (!phrases.length) return;

  // Fisher-Yates, restricted to the phrases after the fixed opener.
  for (var i = phrases.length - 1; i > 1; i -= 1) {
    var j = 1 + Math.floor(Math.random() * i);
    var temp = phrases[i];
    phrases[i] = phrases[j];
    phrases[j] = temp;
  }
  phrases.slice(1).forEach(function (phrase) {
    cycle.appendChild(phrase);
  });

  var activeIndex = 0;
  phrases[0].classList.add('is-active');
  cycle.classList.add('is-cycling');

  // Respect reduced motion; the CSS keeps the opener static if preferences
  // change while the page is open.
  if (phrases.length < 2 ||
      (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)) return;

  window.setInterval(function () {
    var previous = phrases[activeIndex];
    activeIndex = (activeIndex + 1) % phrases.length;
    // Activate first, then deactivate: at least one phrase is always shown.
    phrases[activeIndex].classList.add('is-active');
    previous.classList.remove('is-active');
  }, 6000);
})();
