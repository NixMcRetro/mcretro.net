import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const site = process.argv[2] || '_site';
const manifest = JSON.parse(fs.readFileSync('.github/share-description-manifest.json', 'utf8'));
const data = JSON.parse(fs.readFileSync('_data/share_descriptions.json', 'utf8'));

function description(entry) {
  if (entry.storage === 'jekyll_data') {
    const text = data[new URL(entry.url).pathname];
    assert.equal(typeof text, 'string');
    return text;
  }
  const source = fs.readFileSync(entry.path, 'utf8');
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  assert.ok(match);
  const lines = match[1].split(/\r?\n/);
  const start = lines.findIndex(line => line === 'share_description: >-');
  assert.ok(start >= 0);
  const parts = [];
  for (let i = start + 1; i < lines.length && /^  \S/.test(lines[i]); i++) parts.push(lines[i].slice(2));
  return parts.join(' ');
}

function share(url) {
  const file = path.join(site, new URL(url).pathname.replace(/^\/+/, ''), 'index.html');
  assert.ok(fs.existsSync(file), 'Generated article missing: ' + file);
  const match = fs.readFileSync(file, 'utf8').match(/<section class="post-share"[\s\S]*?<\/section>/);
  assert.ok(match, 'Sharing panel missing in ' + file);
  return match[0];
}

function href(section, label) {
  const links = [...section.matchAll(/<a class="post-share__action" href="([^"]+)"[^>]*\btitle="([^"]+)"/g)];
  const link = links.find(match => match[2] === label);
  assert.ok(link, 'Sharing link missing: ' + label);
  return link[1].replaceAll('&amp;', '&');
}

for (const entry of manifest.posts) {
  test(entry.post_id + ' pre-fills Bluesky, Mastodon, Tumblr and email accurately', () => {
    const text = description(entry);
    const message = text + '\n\n' + entry.url;
    const section = share(entry.url);
    const bluesky = new URL(href(section, 'Share on Bluesky'));
    assert.equal(bluesky.origin, 'https://bsky.app');
    assert.equal(bluesky.searchParams.get('text'), message);
    const mastodon = new URL(href(section, 'Share on Mastodon'));
    assert.equal(mastodon.origin, 'https://share.joinmastodon.org');
    assert.equal(new URLSearchParams(mastodon.hash.slice(1)).get('text'), message);
    const tumblr = new URL(href(section, 'Share on Tumblr'));
    assert.equal(tumblr.searchParams.get('canonicalUrl'), entry.url);
    assert.equal(tumblr.searchParams.get('content'), entry.url);
    assert.equal(tumblr.searchParams.get('posttype'), 'link');
    assert.equal(tumblr.searchParams.get('caption'), text);
    const email = new URL(href(section, 'Share by email'));
    assert.equal(email.protocol, 'mailto:');
    assert.match(email.searchParams.get('subject'), /from Nix McRetro$/);
    assert.equal(email.searchParams.get('body').replace(/\r\n/g, '\n'),
      'Hello friend!\n\n' + text + '\n\n' + entry.url + '\n\nPeace out!');
    assert.ok(section.includes('data-copy-post-link data-url="' + entry.url + '"'));
  });
}
