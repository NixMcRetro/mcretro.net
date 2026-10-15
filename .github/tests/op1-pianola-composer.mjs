// OP-1 Browser Lab v1.8: removal of novelty cat mode; meter-aware Pianola Composer.
import {chromium,firefox,webkit} from 'playwright';
import {readFileSync} from 'node:fs';
import assert from 'node:assert/strict';
import {html} from './op1-test-html.mjs';
const peak=buf=>{assert.equal(buf.toString('ascii',0,4),'RIFF');assert.equal(buf.toString('ascii',8,12),'WAVE');let max=0;for(let i=44;i<buf.length-1;i+=2)max=Math.max(max,Math.abs(buf.readInt16LE(i)));return max};
async function saveProject(page){const promise=page.waitForEvent('download',{timeout:30000});await page.locator('#saveProject').click();return JSON.parse(readFileSync(await (await promise).path(),'utf8'))}
for(const [name,engine] of Object.entries({chromium,firefox,webkit})){
 const browser=await engine.launch({headless:true});
 try{for(const width of(name==='chromium'?[1440,390]:[1000])){
  const context=await browser.newContext({viewport:{width,height:850},acceptDownloads:true});
  const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.setContent(html,{waitUntil:'domcontentloaded'});
  assert.match(await page.title(),/v2\.8/);
  assert.equal(await page.locator('#soundKeys .sound-key').count(),8);
  assert.equal(await page.locator('.cat-split,[data-cat]').count(),0,'Removed cat buttons must not reappear');
  assert.equal(await page.locator('#pianolaMeter').inputValue(),'4/4');
  assert.equal(await page.locator('#pianolaPitch option').count(),60);
  assert.equal(await page.locator('#pianolaRoll .pianola-cell').count(),0);
  await page.locator('#pianolaPitch').selectOption('60');
  await page.locator('#pianolaLength').selectOption('1');
  await page.locator('#pianolaAdd').click();
  assert.match(await page.locator('#pianolaSummary').innerText(),/1 events/);
  assert.equal(await page.locator('.pianola-cell').first().getAttribute('aria-label'),'Event 1: C4, 1 quarter-note beats, bar 1');
  await page.locator('#pianolaPitch').selectOption('64');
  await page.locator('#pianolaLength').selectOption('0.5');
  await page.locator('#pianolaAdd').click();
  await page.locator('#pianolaRest').click();
  assert.equal(await page.locator('.pianola-cell').count(),3);
  assert.equal(await page.locator('.pianola-cell[data-rest="true"]').count(),1);
  await page.locator('#pianolaMeter').selectOption('6/8');
  assert.equal(await page.locator('#pianolaMeter').inputValue(),'6/8');
  await page.locator('#pianolaAdd').click();
  await page.locator('#pianolaAdd').click();
  await page.locator('#pianolaAdd').click();
  assert.equal(await page.locator('.pianola-bar').count(),2,'6/8 measure groups three quarter beats');
  await page.locator('.pianola-cell').first().click();
  await page.locator('#pianolaPitch').selectOption('67');
  await page.locator('#pianolaReplace').click();
  assert.match(await page.locator('.pianola-cell').first().getAttribute('aria-label'),/G4/);
  await page.locator('#pianolaUndo').click();
  await page.locator('#pianolaRepeat').click();
  assert.equal(await page.locator('#pianolaRepeat').getAttribute('aria-pressed'),'true');
  await page.locator('#songAdd').click();assert.equal(await page.locator('.song-section').count(),2,'Song Arrangement retained');
  const project=await saveProject(page);
  assert.equal(project.format,'op1-browser-lab-v05');assert.equal(project.version,5);
  assert.equal(project.pianola.meter,'6/8');assert.equal(project.pianola.repeat,true);
  assert.equal(project.pianola.notes[0].midi,67);
  assert.equal(project.pianola.notes[2].midi,null);
  assert.equal(project.songSections.length,2);
  assert.equal(project.catMode,undefined,'Cat-mode flag must no longer be saved');
  await page.locator('#projectFile').setInputFiles({name:'pianola-roundtrip.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(project))});
  await page.waitForFunction(()=>document.querySelector('#feedback')?.textContent.includes('Project loaded'),null,{timeout:12000});
  assert.equal(await page.locator('#pianolaMeter').inputValue(),'6/8');
  const reloaded=await saveProject(page);
  assert.deepEqual(reloaded.pianola,project.pianola,'Pianola score changed on save/load');
  const old=structuredClone(project);delete old.pianola;old.catMode='keyboard';old.songSections[0].voice='catKeyboard';old.tracks[0].events.push({t:0,d:.2,n:60,kind:'catKeyboard'});old.tracks[1].events.push({t:.5,d:.2,n:48,kind:'catDrum'});
  await page.locator('#projectFile').setInputFiles({name:'cat-era-legacy.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(old))});
  await page.waitForFunction(()=>document.querySelector('#feedback')?.textContent.includes('Project loaded'),null,{timeout:12000});
  const migrated=await saveProject(page);
  assert.equal(migrated.pianola.meter,'4/4');assert.deepEqual(migrated.pianola.notes,[]);
  assert.equal(migrated.songSections[0].voice,'synth');
  assert.equal(migrated.tracks[0].events[0].kind,'synth');assert.equal(migrated.tracks[1].events[0].kind,'drum');
  assert.equal(migrated.catMode,undefined);
  assert.deepEqual(errors,[],'Browser errors: '+errors.join('; '));
  console.log(name,width,'score entry, 6/8, notes and rests, save/reload, cat removal and migration passed');
  await context.close();
 }}finally{await browser.close()}
}
// On Chromium render an actual score WAV, verify non-silence, and exercise playback.
const browser=await chromium.launch({headless:true});
try{const context=await browser.newContext({viewport:{width:1360,height:880},acceptDownloads:true});const page=await context.newPage(),errors=[];
 page.on('pageerror',e=>errors.push(e.message));await page.setContent(html,{waitUntil:'domcontentloaded'});
 await page.locator('#pianolaDemo').click();
 assert.equal(await page.locator('.pianola-bar').count(),4);
 await page.locator('#startAudio').click();
 await page.locator('#pianolaPlay').click();
 assert.match(await page.locator('#pianolaStatus').innerText(),/PLAYING/);
 await page.waitForTimeout(400);
 assert((await page.locator('.pianola-cell.playing').count())>0,'Pianola playhead is not following notes');
 await page.locator('#pianolaStop').click();
 const pending=page.waitForEvent('download',{timeout:45000});await page.locator('#pianolaExport').click();
 const wave=readFileSync(await (await pending).path());assert(peak(wave)>30,'Pianola WAV export is silent');
 assert.deepEqual(errors,[],'Audio playback or export errors: '+errors.join('; '));
 await context.close();console.log('Chromium: actual playable Pianola notes, moving score playhead, non-silent WAV export passed');
}finally{await browser.close()}
