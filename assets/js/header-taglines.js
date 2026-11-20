/* Shuffle Light/Dark and Bird taglines independently on each load.
 * The first tagline of each theme stays fixed at the start of its cycle. */
(function () {
  'use strict';

  var cycle = document.querySelector('.textcycle');
  if (!cycle) return;

  function shuffleAfterFirst(items) {
    // Fisher-Yates, restricted to the phrases after the fixed opener.
    for (var i = items.length - 1; i > 1; i -= 1) {
      var j = 1 + Math.floor(Math.random() * i);
      var temp = items[i];
      items[i] = items[j];
      items[j] = temp;
    }
  }

  var phrases = Array.prototype.slice.call(cycle.querySelectorAll('.phrase'));
  if (phrases.length >= 3) {
    shuffleAfterFirst(phrases);
    phrases.slice(1).forEach(function (phrase) {
      cycle.appendChild(phrase);
    });
  }

  // Keep the ten Light/Dark phrases in their original animation slots.
  // Bird starts at slot 11, with Welcome to the Nest always first.
  var birds = Array.prototype.slice.call(cycle.querySelectorAll('.bird-tagline'));
  if (birds.length) {
    shuffleAfterFirst(birds);
    birds.forEach(function (bird) {
      cycle.appendChild(bird);
    });
  }
})();
