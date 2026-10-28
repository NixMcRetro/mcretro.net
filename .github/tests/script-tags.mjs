// Test-only scanner for literal script elements in generated HTML.
// Handles quoted angle brackets and parses attribute names separately from values.
// Not a sanitizer or general-purpose HTML parser. Do not use on untrusted input.
function parseAttributes(raw) {
  const attributes = new Map();
  let pos = 0;
  while (pos < raw.length) {
    while (pos < raw.length && /\s/.test(raw[pos])) pos++;
    if (pos >= raw.length) break;
    if (raw[pos] === '/') { pos++; continue; }
    const start = pos;
    while (pos < raw.length && !/[\s=/>]/.test(raw[pos])) pos++;
    if (pos === start) { pos++; continue; }
    const name = raw.slice(start, pos).toLowerCase();
    while (pos < raw.length && /\s/.test(raw[pos])) pos++;
    let value = '';
    if (raw[pos] === '=') {
      pos++;
      while (pos < raw.length && /\s/.test(raw[pos])) pos++;
      if (raw[pos] === '"' || raw[pos] === "'") {
        const quote = raw[pos++];
        const valueStart = pos;
        while (pos < raw.length && raw[pos] !== quote) pos++;
        value = raw.slice(valueStart, pos);
        if (pos < raw.length) pos++;
      } else {
        const valueStart = pos;
        while (pos < raw.length && !/[\s>]/.test(raw[pos])) pos++;
        value = raw.slice(valueStart, pos);
      }
    }
    attributes.set(name, value);
  }
  return attributes;
}

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
      const attributes = html.slice(open + 7);
      result.push({ attributes, parsedAttributes: parseAttributes(attributes), body: '' });
      break;
    }
    const attributes = html.slice(open + 7, tagEnd);
    const parsedAttributes = parseAttributes(attributes);
    const bodyStart = tagEnd + 1;
    let close = lower.indexOf('</script', bodyStart);
    while (close >= 0 && !/[\s>]/.test(lower[close + 8] || '')) {
      close = lower.indexOf('</script', close + 8);
    }
    if (close < 0) {
      result.push({ attributes, parsedAttributes, body: html.slice(bodyStart) });
      break;
    }
    result.push({ attributes, parsedAttributes, body: html.slice(bodyStart, close) });
    const end = lower.indexOf('>', close + 8);
    pos = end < 0 ? html.length : end + 1;
  }
  return result;
}
