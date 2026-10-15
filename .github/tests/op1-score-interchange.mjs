// v1.9 Pianola notes JSON + Standard MIDI export, full-score synth playback/import.
import {chromium,firefox,webkit} from 'playwright';
import {readFileSync} from 'node:fs';
import assert from 'node:assert/strict';
import {html} from './op1-test-html.mjs';
function midiTracks(bytes){const b=Buffer.from(bytes);assert.equal(b.toString('ascii',0,4),'MThd');assert.equal(b.readUInt32BE(4),6);assert.equal(b.readUInt16BE(8),0);assert.equal(b.readUInt16BE(10),1);assert.equal(b.readUInt16BE(12),480);assert.equal(b.toString('ascii',14,18),'MTrk');assert.equal(b.readUInt32BE(18),b.length-22);let i=22,ticks=0;const out=[];while(i<b.length){let delta=0,octets=0,c;do{c=b[i++];delta=(delta<<7)|(c&127);if(++octets>4)throw Error('Invalid VLQ')}while(c&128);ticks+=delta;const cmd=b[i++];let data=[];if(cmd===0xff){const type=b[i++],len=b[i++];data=[type,...b.subarray(i,i+len)];i+=len}else if((cmd&0xf0)===0x90||(cmd&0xf0)===0x80){data=[b[i++],b[i++]]}else throw Error('Unsupported unexpected MIDI event '+cmd);out.push({ticks,cmd,data})}return out}
async function getDownload(page,selector){const p=page.waitForEvent('download',{timeout:30000});await page.locator(selector).click();return readFileSync(await (await p).path())}
for(const [name,engine] of Object.entries({chromium,firefox,webkit})){
 const browser=await engine.launch({headless:true});
 try{for(const width of(name==='chromium'?[1440,390]:[1100])){
  const context=await browser.newContext({viewport:{width,height:880},acceptDownloads:true});
  const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));await page.setContent(html,{waitUntil:'domcontentloaded'});
  assert.match(await page.title(),/v2\.6/);assert.equal(await page.locator('#pianolaExportMidi').count(),1);
  await page.locator('#pianolaMeter').selectOption('6/8');await page.locator('#pianolaPitch').selectOption('60');await page.locator('#pianolaAdd').click();
  await page.locator('#pianolaLength').selectOption('0.5');await page.locator('#pianolaRest').click();
  await page.locator('#pianolaPitch').selectOption('64');await page.locator('#pianolaLength').selectOption('0.25');await page.locator('#pianolaAdd').click();
  const score=JSON.parse((await getDownload(page,'#pianolaExportJson')).toString('utf8'));
  assert.equal(score.format,'supernick-pianola-score-v1');assert.equal(score.meter,'6/8');assert.equal(score.bpm,120);
  assert.deepEqual(score.notes,[{midi:60,beats:1},{midi:null,beats:.5},{midi:64,beats:.25}]);
  const events=midiTracks(await getDownload(page,'#pianolaExportMidi'));
  assert.deepEqual(events.filter(e=>e.cmd===0xff&&e.data[0]===0x58).map(e=>e.data),[[0x58,6,3,24,8]],'6/8 meter missing');
  assert.deepEqual(events.filter(e=>e.cmd===0x90).map(e=>[e.ticks,e.data[0]]),[[0,60],[720,64]]);
  assert.deepEqual(events.filter(e=>e.cmd===0x80).map(e=>[e.ticks,e.data[0]]),[[480,60],[840,64]]);
  assert.equal(events.at(-1).ticks,840,'MIDI timing must preserve rests');
  await page.locator('#pianolaSendSynth').click();assert.match(await page.locator('#synthScoreStatus').innerText(),/3 EVENTS · 6\/8 · 120 BPM/);
  await page.locator('#pianolaAdd').click();assert.match(await page.locator('#synthScoreStatus').innerText(),/3 EVENTS/,'Synth copy changed when Pianola was edited');
  const project=JSON.parse((await getDownload(page,'#saveProject')).toString('utf8'));
  assert.equal(project.format,'op1-browser-lab-v05');assert.equal(project.version,5);
  assert.deepEqual(project.synthScore.notes,score.notes);assert.equal(project.synthScore.meter,'6/8');assert.equal(project.pianola.notes.length,4);
  await page.locator('#synthScoreClear').click();assert.equal(await page.locator('#synthScoreStatus').innerText(),'NO SCORE LOADED');
  await page.locator('#synthScoreFile').setInputFiles({name:'melody.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(score))});
  await page.waitForFunction(()=>document.querySelector('#synthScoreStatus').textContent.includes('3 EVENTS'));
  const before=(await page.locator('#synthScoreStatus').innerText());
  await page.locator('#synthScoreFile').setInputFiles({name:'invalid.json',mimeType:'application/json',buffer:Buffer.from('{"hello":true}')});
  await page.waitForFunction(()=>document.querySelector('#feedback')?.textContent.includes('Notes import failed'));
  assert.equal(await page.locator('#synthScoreStatus').innerText(),before,'Invalid import replaced a valid synth score');
  await page.locator('#synthScoreClear').click();page.once('dialog',d=>d.accept());
  await page.locator('#pianolaScoreFile').setInputFiles({name:'melody.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(score))});
  await page.waitForFunction(()=>document.querySelectorAll('.pianola-cell').length===3);
  const roundtrip=JSON.parse((await getDownload(page,'#saveProject')).toString('utf8'));assert.deepEqual(roundtrip.pianola.notes,score.notes);
  await page.locator('#projectFile').setInputFiles({name:'project.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(project))});
  await page.waitForFunction(()=>document.querySelector('#synthScoreStatus').textContent.includes('3 EVENTS'));
  assert.deepEqual(JSON.parse((await getDownload(page,'#saveProject')).toString('utf8')).synthScore.notes,score.notes);
  assert.deepEqual(errors,[],'Unexpected JS errors: '+errors.join('; '));
  console.log(name,width,'notes JSON, 6/8 MIDI, full synth transfer, project persistence and invalid JSON guard passed');
  await context.close();
 }}finally{await browser.close()}
}
const browser=await chromium.launch({headless:true});
try{const page=await browser.newPage({viewport:{width:1300,height:900}}),errors=[];page.on('pageerror',e=>errors.push(e.message));await page.setContent(html,{waitUntil:'domcontentloaded'});await page.locator('#pianolaDemo').click();await page.locator('#pianolaSendSynth').click();await page.locator('#startAudio').click();await page.locator('#synthScorePlay').click();assert.match(await page.locator('#synthScoreStatus').innerText(),/PLAYING/);await page.locator('#synthScoreStop').click();assert.deepEqual(errors,[]);console.log('Synth Note Player audio playback succeeded');}finally{await browser.close()}
