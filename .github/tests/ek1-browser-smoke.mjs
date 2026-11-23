// Electronic Keyboard (Model EK-1) v0.1.0 browser regression.
// Run with: node .github/tests/ek1-browser-smoke.mjs
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {resolve} from 'node:path';
import {chromium, firefox, webkit} from 'playwright';

const url = pathToFileURL(resolve('homepages/electronic-keyboard/index.html')).href;
for (const [name, browserType] of Object.entries({chromium, firefox, webkit})) {
  const browser = await browserType.launch({headless:true});
  try {
    for (const width of (name === 'chromium' ? [1280, 390] : [1024])) {
      const page = await browser.newPage({viewport:{width, height:860}});
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto(url, {waitUntil:'load'});
      await page.waitForFunction(() => !!window.EK1);
      assert.match(await page.title(),/Electronic Keyboard \(Model EK-1\) v0\.1\.0/);
      const info = await page.evaluate(() => ({
        version: EK1.version,
        tones: EK1.tones,
        rhythms: EK1.rhythms,
        demos: EK1.demos,
        bars: Array.from({length:EK1.demos}, (_,i) => EK1.demoBars(i)),
        events: Array.from({length:EK1.demos}, (_,i) => EK1.demoEvents(i))
      }));
      assert.equal(info.version, '0.1.0');
      assert.deepEqual([info.tones,info.rhythms,info.demos], [12,6,5]);
      assert.deepEqual(info.bars, [16,16,16,16,16]);
      for (const [i,events] of info.events.entries()) {
        assert(events.length >= 60, 'Demo ' + i + ' is not a complete arrangement');
        assert(events.every(e => e.step >= 0 && e.step < 256 && e.midi >= 48 && e.midi <= 96 && e.length > 0));
      }
      assert.equal(await page.locator('#keys .key').count(), 49);
      assert.equal(await page.locator('#keys .key.white').count(), 29);
      assert.equal(await page.locator('#keys .key.black').count(), 20);
      assert.equal(await page.locator('#tone option').count(), 12);
      assert.equal(await page.locator('#rhythm option').count(), 6);
      assert.equal(await page.locator('#demoSong option').count(), 5);
      assert.deepEqual(await page.evaluate(() => EK1.parseBar('C4:1 E4:1 G4:2').map(n => n.length)), [1,1,2]);
      await page.locator('#tone').selectOption('5');
      assert.match(await page.locator('#displayMain').textContent(),/TRUMPET/);
      await page.locator('#playDemo').click();
      await page.waitForFunction(() => EK1.state.transport === 'demo');
      assert.match(await page.locator('#displaySub').innerText(),/DEMO/);
      await page.locator('#melodyOff').click();
      assert.equal(await page.locator('#melodyOff').getAttribute('aria-pressed'), 'true');
      await page.locator('#nextDemo').click();
      await page.waitForFunction(() => EK1.state.transport === 'demo' && EK1.state.demoIndex === 1);
      await page.locator('#stop').click();
      assert.equal(await page.evaluate(() => EK1.state.transport), 'stopped');
      await page.locator('#rhythm').selectOption('3');
      await page.locator('#startRhythm').click();
      await page.waitForFunction(() => EK1.state.transport === 'rhythm');
      await page.locator('#tempo').evaluate(el => { el.value = '155'; el.dispatchEvent(new Event('input', {bubbles:true})); });
      assert.match(await page.locator('#tempoValue').innerText(),/155 BPM/);
      await page.locator('#accomp').click();
      assert.equal(await page.evaluate(() => EK1.state.autoChord), true);
      await page.locator('#stop').click();
      await page.locator('#record').click();
      assert.equal(await page.evaluate(() => EK1.state.recording), true);
      const key = page.locator('#keys .key[data-midi="72"]');
      await key.scrollIntoViewIfNeeded();
      const rect = await key.boundingBox();
      assert(rect, 'Playable key should have a bounding rectangle');
      await page.mouse.move(rect.x + rect.width / 2, rect.y + rect.height * .83);
      await page.mouse.down();
      await page.waitForTimeout(120);
      await page.mouse.up();
      await page.locator('#record').click();
      assert.equal(await page.evaluate(() => EK1.state.recording), false);
      assert.equal(await page.evaluate(() => EK1.state.takeNotes), 1);
      assert(await page.locator('#playTake').isEnabled());
      await page.locator('#playTake').click();
      assert.equal(await page.evaluate(() => EK1.state.transport), 'take');
      await page.locator('#stop').click();
      await page.locator('#clearTake').click();
      assert.equal(await page.evaluate(() => EK1.state.takeNotes), 0);
      if (width === 390) {
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
        assert(overflow <= 2, 'Unexpected horizontal page overflow: ' + overflow);
      }
      assert.deepEqual(errors, [], 'Unexpected browser exceptions: ' + errors.join(', '));
      console.log('PASS EK-1 playable keyboard, authored demos, rhythm, auto chord and recording', name, width);
      await page.close();
    }
  } finally { await browser.close(); }
}
