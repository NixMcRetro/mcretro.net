/* Copy links are the only script needed for the post sharing panel.
   Social sharing and RSS remain ordinary links when JavaScript is disabled. */
(function () {
  'use strict';

  async function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (error) {
        // Clipboard permissions can be blocked; try the local legacy fallback.
      }
    }

    var field = document.createElement('textarea');
    field.value = text;
    field.readOnly = true;
    field.setAttribute('aria-hidden', 'true');
    field.style.position = 'fixed';
    field.style.left = '-9999px';
    field.style.opacity = '0';
    document.body.appendChild(field);
    field.select();
    field.setSelectionRange(0, field.value.length);

    var copied = false;
    try {
      copied = document.execCommand('copy');
    } catch (error) {
      copied = false;
    }
    field.remove();
    return copied;
  }

  document.querySelectorAll('[data-copy-post-link]').forEach(function (button) {
    var label = button.querySelector('[data-copy-label]');
    var panel = button.closest('.post-share');
    var status = panel && panel.querySelector('[data-copy-status]');
    var resetTimer;

    button.addEventListener('click', async function () {
      var url = button.getAttribute('data-url');
      if (!url) return;

      var copied = await copyText(url);
      if (label) label.textContent = copied ? 'Copied!' : 'Copy Link';
      if (status) status.textContent = copied
        ? 'Article link copied to clipboard.'
        : 'Could not copy automatically. Copy the URL from your address bar.';

      clearTimeout(resetTimer);
      resetTimer = setTimeout(function () {
        if (label) label.textContent = 'Copy Link';
        if (status) status.textContent = '';
      }, 2500);
      button.focus();
    });
  });
})();
