/* Progressive enhancement for code samples in McRetro.net articles.
   Copy the rendered code text, never the toolbar label or markup. */
(() => {
  'use strict';

  const content = document.querySelector('.post-full .post-content');
  if (!content) return;

  const languageNames = {
    bash: 'Bash', sh: 'Shell', shell: 'Shell', zsh: 'Zsh',
    bat: 'Batch', batch: 'Batch', cmd: 'Batch',
    text: 'Text', txt: 'Text', plaintext: 'Text',
    html: 'HTML', xml: 'XML', css: 'CSS', js: 'JavaScript',
    javascript: 'JavaScript', json: 'JSON', py: 'Python', python: 'Python',
    ini: 'INI', apache: 'Apache', yaml: 'YAML', yml: 'YAML',
    ruby: 'Ruby', rb: 'Ruby', c: 'C', cpp: 'C++'
  };

  function languageLabel(pre, code) {
    for (let element = code || pre; element && element !== content; element = element.parentElement) {
      for (const className of element.classList) {
        const match = /^language-([\w+#-]+)$/i.exec(className);
        if (match) {
          const language = match[1].toLowerCase();
          return languageNames[language] || match[1].slice(0, 18);
        }
      }
    }
    return 'Code';
  }

  async function copyText(text) {
    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (error) {
        // Some browsers block the async API; try their legacy clipboard path.
      }
    }

    const field = document.createElement('textarea');
    field.value = text;
    field.readOnly = true;
    field.setAttribute('aria-hidden', 'true');
    field.style.position = 'fixed';
    field.style.left = '-9999px';
    field.style.opacity = '0';
    document.body.appendChild(field);
    field.focus({ preventScroll: true });
    field.select();
    field.setSelectionRange(0, field.value.length);
    let success = false;
    try {
      success = document.execCommand('copy');
    } catch (error) {
      success = false;
    }
    field.remove();
    return success;
  }

  for (const pre of content.querySelectorAll('pre')) {
    if (pre.closest('.mcretro-code-frame') || !pre.textContent.trim()) continue;

    const code = pre.querySelector('code');
    const frame = document.createElement('div');
    frame.className = 'mcretro-code-frame';

    const toolbar = document.createElement('div');
    toolbar.className = 'mcretro-code-toolbar';
    toolbar.setAttribute('data-pagefind-ignore', 'all');

    const language = document.createElement('span');
    language.className = 'mcretro-code-language';
    language.textContent = languageLabel(pre, code);

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'mcretro-code-copy';
    button.setAttribute('aria-label', 'Copy code to clipboard');
    button.title = 'Copy code to clipboard';

    const icon = document.createElement('span');
    icon.className = 'mcretro-code-copy-icon';
    icon.setAttribute('aria-hidden', 'true');

    const label = document.createElement('span');
    label.className = 'mcretro-code-copy-label';
    label.setAttribute('aria-live', 'polite');
    label.textContent = 'Copy';
    button.append(icon, label);
    toolbar.append(language, button);

    pre.before(frame);
    frame.append(toolbar, pre);

    let resetTimer;
    button.addEventListener('click', async () => {
      // textContent preserves spacing, HTML entities and syntax-highlighted text.
      const source = code || pre;
      const success = await copyText(source.textContent);
      label.textContent = success ? 'Copied!' : 'Copy failed';
      button.setAttribute('aria-label', success ? 'Code copied to clipboard' : 'Copy failed. Try again');
      button.title = success ? 'Copied!' : 'Copy failed. Try again';
      button.classList.toggle('is-copied', success);
      window.clearTimeout(resetTimer);
      resetTimer = window.setTimeout(() => {
        label.textContent = 'Copy';
        button.setAttribute('aria-label', 'Copy code to clipboard');
        button.title = 'Copy code to clipboard';
        button.classList.remove('is-copied');
      }, 2400);
      button.focus({ preventScroll: true });
    });
  }
})();
