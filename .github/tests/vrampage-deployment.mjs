import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';

// The hosted app carries only runtime files. Complete corresponding modified
// source accompanies the exact release ZIP, checked on pull requests.
const source = resolve('homepages/vrampage-md');
const built = resolve(process.argv[2] || '_site', 'homepages/vrampage-md');
const version = '0.5.0';
const commit = 'e9f366fb3985f11430d353c3b2589f076ff93128';
const releaseURL = 'https://github.com/NixMcRetro/VRAMpage-MD/releases/download/v0.5.0/VRAMpage-MD-v0.5.0-browser.zip';
const releaseDigest = '6024ad1701d1cb58dc5da16ce4ae51db4fd03de7e9e1a6e26b3e6aff27ef0aad';

const info = JSON.parse(readFileSync(join(source, 'build-info.json'), 'utf8'));
assert.equal(info.application_version, version);
assert.equal(info.source_commit, commit);
assert.equal(existsSync(join(source, 'source')), false, 'Build source must not be published');
assert.equal(existsSync(join(built, 'source')), false, 'Build source must not be published');

function files(directory, prefix = '') {
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const name = join(prefix, entry.name);
    assert.ok(!entry.isSymbolicLink(), 'Unexpected symlink: ' + name);
    return entry.isDirectory() ? files(join(directory, entry.name), name) : [name];
  });
}
const paths = files(source);
for (const name of paths) {
  assert.ok(!/\.(bin|gen|smd|rom|iso)$/i.test(name), 'ROM-like file: ' + name);
  assert.deepEqual(readFileSync(join(built, name)), readFileSync(join(source, name)),
    'Jekyll omitted or modified published runtime/notice: ' + name);
}
for (const name of ['core/genplus.js', 'core/genplus.wasm', 'index.html', 'app.js',
  'style.css', 'framebuffer.js', 'circuit-config.js', 'experiment-comparison.js',
  'THIRD-PARTY-NOTICES.md', 'DEPLOYMENT.txt', 'README.md', 'build-info.json']) {
  assert.ok(paths.includes(name), 'Incomplete runtime release: ' + name);
}
assert.deepEqual(readFileSync(join(built, 'core/genplus.wasm')).subarray(0, 4),
  Buffer.from([0, 97, 115, 109]));
const html = readFileSync(join(built, 'index.html'), 'utf8');
assert.ok(!html.startsWith('---'), 'Standalone runtime must not have front matter');
assert.ok(html.includes(releaseURL), 'Missing complete corresponding-source download');
assert.ok(html.includes('THIRD-PARTY-NOTICES.md'), 'Missing licence notice link');
const deployment = readFileSync(join(built, 'DEPLOYMENT.txt'), 'utf8');
assert.ok(deployment.includes(commit) && deployment.includes(releaseURL)
  && deployment.includes(releaseDigest), 'Missing pinned source version or SHA256');
console.log('VRAMpage v' + version + ': ' + paths.length + ' runtime files preserved; source in pinned release ZIP');
