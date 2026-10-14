// v1.9 independent polyphonic Piano Roll, MIDI import/export and legacy project safety.
import {chromium,firefox,webkit} from 'playwright';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {html} from './op1-test-html.mjs';
async function getFile(page,id){const promise=page.waitForEvent('download',{timeout:45000});await page.locator(id).click();return readFileSync(await (await promise).path());}
async function getProject(page){return JSON.parse((await getFile(page,'#saveProject')).toString())}
for(const [name,engine] of Object.entries({chromium,firefox,webkit})){
 const browser=await engine.launch({headless:true});
 try{for(const width of (name==='chromium'?[1440,390]:[1100])){
  const context=await browser.newContext({viewport:{width,height:880},acceptDownloads:true}),page=await context.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));await page.setContent(html,{waitUntil:'domcontentloaded'});
  assert.match(await page.title(),/v2\.0/);assert.equal(await page.locator('#rollPanel').count(),1);
  assert.equal(await page.evaluate('document.documentElement.scrollWidth'),width,'No horizontal page overflow allowed');
  // Draw C5/E5 at the same beat. Chord playback requires concurrent notes.
  for(const row of [11,7])await page.locator('#rollSurface').evaluate((el,row)=>{const box=el.getBoundingClientRect();el.dispatchEvent(new MouseEvent('click',{bubbles:true,clientX:box.left+64,clientY:box.top+32+row*24+9}))},row);
  const saved=await getProject(page);assert.equal(saved.format,'op1-browser-lab-v05');assert.equal(saved.version,5);
  assert.equal(saved.pianoRoll.notes.length,2);assert.deepEqual(saved.pianoRoll.notes.map(n=>n.start),[0,0]);
  assert.equal(saved.pianola.notes.length,0,'Original Pianola must remain untouched');
  const midi=await getFile(page,'#rollExportMidi');assert.equal(midi.toString('ascii',0,4),'MThd');
  page.once('dialog',d=>d.accept());await page.locator('#rollMidiFile').setInputFiles({name:'chord.mid',mimeType:'audio/midi',buffer:midi});
  await page.waitForFunction(()=>document.querySelector('#feedback')?.textContent.includes('Imported 2 MIDI notes'));
  assert.deepEqual((await getProject(page)).pianoRoll.notes.map(n=>n.start),[0,0]);
  await page.locator('.roll-note').last().click();await page.locator('#rollPitch').fill('61');await page.locator('#rollApply').click();
  assert.equal((await getProject(page)).pianoRoll.notes.at(-1).midi,61);
  await page.locator('#rollUndo').click();assert.notEqual((await getProject(page)).pianoRoll.notes.at(-1).midi,61);
  const before=(await getProject(page)).pianoRoll;
  await page.locator('#rollMidiFile').setInputFiles({name:'broken.mid',mimeType:'audio/midi',buffer:Buffer.from('bad')});
  await page.waitForFunction(()=>document.querySelector('#feedback')?.textContent.includes('MIDI import failed'));
  assert.deepEqual((await getProject(page)).pianoRoll,before,'Invalid MIDI changed the live score');
  await page.locator('#projectFile').setInputFiles({name:'project.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(saved))});
  await page.waitForFunction(()=>document.querySelectorAll('.roll-note').length===2);
  assert.deepEqual((await getProject(page)).pianoRoll.notes,saved.pianoRoll.notes);
  assert.deepEqual(errors,[],'Unexpected page errors');
  console.log(name,width,'polyphonic grid, chord MIDI, inspector undo, invalid file guard and project reload passed');await context.close();
 }}finally{await browser.close()}
}
const browser=await chromium.launch({headless:true});
try{const page=await browser.newPage({acceptDownloads:true}),errors=[];page.on('pageerror',e=>errors.push(e.message));await page.setContent(html);
 await page.locator('#startAudio').click();await page.locator('#rollRecord').click();assert.equal(await page.locator('#rollRecord').getAttribute('aria-pressed'),'true');
 await page.locator('#rollRecord').blur();await page.keyboard.down('z');await page.waitForTimeout(175);await page.keyboard.up('z');await page.locator('#rollRecord').click();
 const proj=await getProject(page);assert.equal(proj.pianoRoll.notes.length,1,'Live keyboard note did not record');
 await page.locator('#rollPlay').click();assert.match(await page.locator('#rollPlay').innerText(),/STOP/);await page.locator('#rollStop').click();
 const wav=await getFile(page,'#rollExportWav');assert.equal(wav.toString('ascii',0,4),'RIFF');assert(wav.length>40000,'WAV is unexpectedly empty');
 assert.deepEqual(errors,[]);console.log('Chromium live keyboard recording, synth playback and stereo WAV rendering passed');
}finally{await browser.close()}
