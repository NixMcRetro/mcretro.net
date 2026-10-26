import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';

const source = resolve('homepages/vrampage-md');
const built = resolve(process.argv[2] || '_site', 'homepages/vrampage-md');
const info = JSON.parse(readFileSync(join(source, 'build-info.json'), 'utf8'));
assert.equal(info.application_version, '0.5.0');
assert.equal(info.source_commit, 'e9f366fb3985f11430d353c3b2589f076ff93128');

function files(directory, prefix = '') {
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const name = join(prefix, entry.name);
    assert.ok(!entry.isSymbolicLink(), `Unexpected symlink: ${name}`);
    return entry.isDirectory() ? files(join(directory, entry.name), name) : [name];
  });
}

const paths = files(source);
for (const name of paths) {
  assert.ok(!/\.(bin|gen|smd|rom|iso)$/i.test(name), `ROM-like file: ${name}`);
  assert.deepEqual(readFileSync(join(built, name)), readFileSync(join(source, name)),
    `Jekyll omitted or changed a released file: ${name}`);
}
for (const name of ['core/genplus.wasm', 'source/src/main/js/genplus.wasm']) {
  assert.deepEqual(readFileSync(join(built, name)).subarray(0, 4), Buffer.from([0, 97, 115, 109]));
}
for (const name of ['index.html', 'app.js', 'style.css', 'framebuffer.js',
  'circuit-config.js', 'experiment-comparison.js', 'THIRD-PARTY-NOTICES.md',
  'source/runtime-profile/.vrampage-site-runtime-profile', 'DEPLOYMENT.txt']) {
  assert.ok(paths.includes(name), `Incomplete deployment: ${name}`);
}
assert.ok(!readFileSync(join(built, 'index.html'), 'utf8').startsWith('---'),
  'The released app must remain a standalone static page');
console.log(`VRAMpage v0.5.0 deployment: ${paths.length} unchanged files, source and fallback included`);
