import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';

// v0.5.1 carries a verified same-origin source ZIP. Keep the historical v0.5.0
// checks below for that unchanged, separately published release.
const source = resolve('homepages/vrampage-md');
const built = resolve(process.argv[2] || '_site', 'homepages/vrampage-md');
const hostedInfo = JSON.parse(readFileSync(join(source, 'build-info.json'), 'utf8'));
if (hostedInfo.application_version === '0.5.1') {
  for (const directory of [source, built]) {
    execFileSync('python3', ['.github/tests/vrampage-package.py', directory], { stdio: 'inherit' });
  }
  const expected = files(source).sort();
  assert.deepEqual(files(built).sort(), expected, 'Jekyll must publish the exact runtime/source allowlist');
  for (const name of expected) {
    assert.deepEqual(readFileSync(join(built, name)), readFileSync(join(source, name)),
      'Jekyll omitted or modified runtime, ROM, source archive or licence: ' + name);
  }
  const wasm = readFileSync(join(built, 'core/genplus.wasm'));
  assert.ok(WebAssembly.validate(wasm), 'Published WASM must validate');
  const notices = WebAssembly.Module.customSections(new WebAssembly.Module(wasm), 'license.Musashi');
  assert.equal(notices.length, 1, 'Published binary must contain one Musashi notice section');
  const text = new TextDecoder().decode(notices[0]);
  assert.ok(text.includes('Copyright Karl Stenerud.  All rights reserved.')
    && text.includes('copyright notice remains unaltered'), 'Missing Musashi copyright terms inside WASM');
  assert.ok(!readFileSync(join(built, 'index.html'), 'utf8').startsWith('---'), 'Standalone runtime must not have front matter');
  console.log('VRAMpage v0.5.1: ' + expected.length + ' exact files, approved cartridges and complete same-origin source preserved');
  process.exit(0);
}
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
const paths = files(source).filter(name =>
  !name.split(/[\\/]/).some(part => part.startsWith('.')));
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
