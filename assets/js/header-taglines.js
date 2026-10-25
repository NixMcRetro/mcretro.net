/* Shuffle header taglines on each load, keeping the first phrase first. */
(function () {
  'use strict';

  var cycle = document.querySelector('.textcycle');
  if (!cycle) return;

  var phrases = Array.prototype.slice.call(cycle.querySelectorAll('.phrase'));
  if (phrases.length < 3) return;

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
})();
