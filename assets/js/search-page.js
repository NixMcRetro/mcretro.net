window.addEventListener('DOMContentLoaded', () => {
    const ui = new PagefindUI({
      element: "#search",
      showSubResults: true,
      excerptLength: 60,
      showImages: false
    });

    const params = new URLSearchParams(window.location.search);
    const query = params.get('q');
    if (query) {
      setTimeout(() => {
        const input = document.querySelector('#search input');
        if (input) {
          // Focus the input, set value, and dispatch input event
          input.focus();
          input.value = query;
          input.dispatchEvent(new Event('input', { bubbles: true }));
        }
      }, 300);
    }
  });
