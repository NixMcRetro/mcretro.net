// Test-only scanner for literal script elements in generated HTML.
// Unlike a tag-matching regexp, this handles '>' inside quoted attributes.
// This is not a sanitizer and must not be used on untrusted HTML in production.
export function scriptElements(html) {
  const lower = html.toLowerCase();
  const result = [];
  let pos = 0;
  while (pos < lower.length) {
    const open = lower.indexOf('<script', pos);
    if (open < 0) break;
    if (!/[\s/>]/.test(lower[open + 7] || '')) { pos = open + 7; continue; }
    let tagEnd = open + 7;
    let quote = '';
    for (; tagEnd < html.length; tagEnd++) {
      const char = html[tagEnd];
      if (quote) {
        if (char === quote) quote = '';
      } else if (char === '"' || char === "'") {
        quote = char;
      } else if (char === '>') {
        break;
      }
    }
    if (tagEnd === html.length) {
      result.push({ attributes: html.slice(open + 7), body: '' });
      break;
    }
    const attributes = html.slice(open + 7, tagEnd);
    const bodyStart = tagEnd + 1;
    let close = lower.indexOf('</script', bodyStart);
    while (close >= 0 && !/[\s>]/.test(lower[close + 8] || '')) {
      close = lower.indexOf('</script', close + 8);
    }
    if (close < 0) {
      result.push({ attributes, body: html.slice(bodyStart) });
      break;
    }
    result.push({ attributes, body: html.slice(bodyStart, close) });
    const end = lower.indexOf('>', close + 8);
    pos = end < 0 ? html.length : end + 1;
  }
  return result;
}
