// Browser regression checks for SuperNick's OP-1 Browser Lab v1.4.
// Run: node .github/tests/op1-browser-smoke.mjs
// Dependencies: npm install --no-save playwright && npx playwright install --with-deps chromium firefox webkit
import { chromium, firefox, webkit } from 'playwright';
import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const html=readFileSync('homepages/op-1/index.html','utf8');
const engines={chromium,firefox,webkit};
for(const [name,engine] of Object.entries(engines)){
 const browser=await engine.launch({headless:true});
 try{
  const ctx=await browser.newContext({viewport:{width:1440,height:900},acceptDownloads:true});
  const page=await ctx.newPage();const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.setContent(html,{waitUntil:'domcontentloaded'});
  assert.match(await page.title(),/v1\.4/);
  assert.equal(await page.locator('.sound-key').count(),8);
  assert.equal(await page.locator('.knob').count(),4);
  assert(!html.includes('For SuperNick (Nick).'));
  assert.equal(await page.locator('.mode-btn[data-mode="synth"]').getAttribute('aria-pressed'),'true');
  await page.locator('#quickSeq').focus();
  await page.keyboard.press('Space');
  assert(await page.locator('#screenOverlay').isVisible(),'Space failed to activate focused sequencer button');
  assert.equal(await page.locator('#playButton').getAttribute('aria-pressed'),'false','Space also started tape');
  await page.locator('#screenOverlay [data-seq-mode="tombola"]').click();
  await page.locator('#screenShortcuts [data-seq-action="plus"]').click();
  assert.match(await page.locator('#ballCount').innerText(),/5 BALLS/);
  await page.locator('#expandDisplay').click();
  assert(await page.locator('#displayZoom').isVisible());
  assert.equal(await page.evaluate('document.activeElement.id'),'closeDisplay');
  await page.keyboard.press('Escape');
  assert(!(await page.locator('#displayZoom').isVisible()));
  assert.equal(await page.evaluate('document.activeElement.id'),'expandDisplay');
  for(const mode of ['synth','drum','tape','mixer']){
   await page.locator('.mode-btn[data-mode="'+mode+'"]').click();
   assert.equal(await page.locator('.mode-btn[data-mode="'+mode+'"]').getAttribute('aria-pressed'),'true');
  }
  await page.locator('#quickGame').click();
  assert(await page.locator('#gameControls').isVisible());
  await page.locator('#quickGame').click();
  const old=await page.locator('.knob-caption').first().innerText();
  await page.locator('.encoder-step').nth(1).click();
  assert.notEqual(await page.locator('.knob-caption').first().innerText(),old);
  // Three banks of eight must remain navigable by keyboard and touch.
  assert.equal(await page.locator('#presetGrid button').count(),8);
  assert.equal(await page.locator('#bankName').innerText(),'CLASSICS');
  await page.locator('#bankNext').click();
  assert.equal(await page.locator('#bankName').innerText(),'AFTER HOURS');
  assert.match(await page.locator('#presetGrid button').nth(1).innerText(),/GLASSBELLS/);
  await page.locator('#presetGrid button').nth(1).click();
  assert.equal(await page.locator('#presetGrid button').nth(1).getAttribute('aria-pressed'),'true');
  await page.locator('#toneLevel').fill('85');
  await page.locator('#saturationLevel').fill('40');
  assert.equal(await page.locator('#toneValue').innerText(),'85%');
  assert.equal(await page.locator('#saturationValue').innerText(),'40%');
  const bankExport=page.waitForEvent('download');
  await page.locator('#saveProject').click();
  const bankProject=JSON.parse(readFileSync(await (await bankExport).path(),'utf8'));
  assert.equal(bankProject.soundBank,1);
  assert.equal(bankProject.preset,1);
  assert.equal(bankProject.fx.tone,.85);
  assert.equal(bankProject.fx.saturation,.4);
  await page.locator('#projectFile').setInputFiles({name:'v12-bank-project.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(bankProject))});
  await page.waitForTimeout(200);
  assert.equal(await page.locator('#bankName').innerText(),'AFTER HOURS');
  await page.locator('#bankPrev').click();
  assert.equal(await page.locator('#bankName').innerText(),'CLASSICS');
  const downloadPromise=page.waitForEvent('download');
  await page.locator('#saveProject').click();
  const saved=JSON.parse(readFileSync(await (await downloadPromise).path(),'utf8'));
  assert.equal(saved.format,'op1-browser-lab-v05','Existing project schema changed');
  assert.equal(saved.tracks.length,4);
  // Simulate old projects that predate banks and EQ: neutral sound defaults.
  delete saved.soundBank;delete saved.fx.tone;delete saved.fx.saturation;
  saved.tracks[0].events.push({t:0.1,d:0.3,n:60,kind:'synth',kit:0,patch:null,sampleId:null,sliceIndex:0,sliceSettings:null});
  await page.locator('#projectFile').setInputFiles({name:'v10-compatibility.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(saved))});
  await page.waitForTimeout(400);
  const nextDownload=page.waitForEvent('download');
  await page.locator('#saveProject').click();
  const loaded=JSON.parse(readFileSync(await (await nextDownload).path(),'utf8'));
  assert.equal(loaded.tracks[0].events[0].n,60,'Older project note data did not survive import');
  assert.equal(loaded.soundBank,0,'Legacy project must load into original sound bank');
  assert.equal(loaded.fx.tone,.5);
  assert.equal(loaded.fx.saturation,0);
  await page.setViewportSize({width:390,height:844});
  await page.locator('#quickDisplay').click();
  assert(await page.locator('#displayZoom').isVisible());
  await page.locator('#closeDisplay').click();
  assert(await page.locator('#mobileKeys').isVisible());
  assert((await page.locator('#mobileKbdGrid .mobile-note').count())>=12);
  assert.deepEqual(errors,[],'JavaScript errors detected');
  await ctx.close();
  console.log('PASS '+name+': controls, sequencers, sound banks, effects, touch, backups, compatibility');
 }finally{await browser.close();}
}
