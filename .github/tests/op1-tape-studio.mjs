// SuperNick OP-1 Tape Studio v1.5 regression. Uses browser AudioContext with no external audio assets.
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const html=readFileSync('homepages/op-1/index.html','utf8');
function wavTone(){
 const rate=22050,n=rate,bytes=Buffer.alloc(44+n*2);
 bytes.write('RIFF',0);bytes.writeUInt32LE(36+n*2,4);bytes.write('WAVEfmt ',8);
 bytes.writeUInt32LE(16,16);bytes.writeUInt16LE(1,20);bytes.writeUInt16LE(1,22);
 bytes.writeUInt32LE(rate,24);bytes.writeUInt32LE(rate*2,28);
 bytes.writeUInt16LE(2,32);bytes.writeUInt16LE(16,34);bytes.write('data',36);bytes.writeUInt32LE(n*2,40);
 for(let i=0;i<n;i++)bytes.writeInt16LE(Math.round(9500*Math.sin(2*Math.PI*330*i/rate)),44+i*2);
 return bytes;
}
const browser=await chromium.launch({headless:true});
try{
 const ctx=await browser.newContext({acceptDownloads:true});
 const page=await ctx.newPage(),errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 page.on('dialog',d=>d.accept());
 await page.setContent(html,{waitUntil:'domcontentloaded'});
 assert.match(await page.title(),/v1\.8/);
 assert.equal(await page.locator('#tapeDrive').count(),1);
 for(const [id,value] of [['tapeDrive','65'],['tapeWow','55'],['tapeFlutter','40']])
  await page.locator('#'+id).fill(value);
 await page.locator('#tapeOverdub').selectOption('replace');
 async function save(){
  const pending=page.waitForEvent('download',{timeout:30000});
  await page.locator('#saveProject').click();
  return JSON.parse(readFileSync(await (await pending).path(),'utf8'));
 }
 async function load(project){
  await page.locator('#projectFile').setInputFiles([]);
  await page.locator('#projectFile').setInputFiles({name:'tape-studio.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(project))});
  await page.waitForTimeout(450);
 }
 let saved=await save();
 assert.deepEqual(saved.tapeFx,{drive:.65,wow:.55,flutter:.4});
 assert.equal(saved.overdubMode,'replace');
 await page.locator('#tapeAudioFile').setInputFiles({name:'test-tone.wav',mimeType:'audio/wav',buffer:wavTone()});
 await page.waitForTimeout(650);
 saved=await save();
 assert.equal(saved.tracks[0].clips.length,1,'import should create PCM clip');
 assert(await page.locator('#clipRight').isEnabled(),'Imported audio must be selected');
 await page.locator('#clipRight').click();
 await page.locator('#clipTrimOut').click();
 let changed=await save();
 assert(Math.abs(changed.tracks[0].clips[0].t-.1)<.001);
 assert(Math.abs(changed.tracks[0].clips[0].d-.75)<.02);
 await page.locator('#undoEdit').click();
 await page.locator('#undoEdit').click();
 let original=await save();
 assert(Math.abs(original.tracks[0].clips[0].d-1)<.02,'Undo must restore full clip');
 original.tracks[0].clips[0].captureSpeed=2;
 original.tracks[0].clips[0].d=2;
 original.tapeFx={drive:0,wow:0,flutter:0};
 original.loopOut=2;
 await load(original);
 saved=await save();
 assert.equal(saved.tracks[0].clips[0].captureSpeed,2);
 assert.equal(saved.tracks[0].clips[0].d,2);
 await page.locator('.mode-btn[data-mode="tape"]').click();
 const wavPending=page.waitForEvent('download',{timeout:60000});
 await page.locator('#exportWav').click();
 const pcm=readFileSync(await (await wavPending).path());
 assert.equal(pcm.toString('ascii',0,4),'RIFF');
 assert(pcm.length>100000,'Offline audio export must contain stereo PCM');
 // The recorded 1s tone, captured at 2x, must remain audible after tape second 1.
 const offset=44+Math.floor(1.2*44100)*4;
 let peak=0;for(let i=offset;i<offset+4000&&i+1<pcm.length;i+=2)peak=Math.max(peak,Math.abs(pcm.readInt16LE(i)));
 assert(peak>30,'Capture-speed metadata did not extend the audio clip');
 await page.locator('.soft-key').nth(1).click();
 await page.locator('#tapeBounce').click();
 await page.waitForFunction(()=>!document.querySelector('#tapeBounce').disabled,{timeout:30000});
 saved=await save();
 assert.equal(saved.tracks[0].clips.length,1,'Bounce changed source');
 assert.equal(saved.tracks[1].clips.length,1,'Bounce failed to add PCM to destination');
 assert(saved.audioSamples[saved.tracks[1].clips[0].sampleId],'Bounced PCM missing from backup');
 assert.deepEqual(errors,[],'Uncaught browser error');
 console.log('PASS v1.5 Tape Studio: PCM editing, undo, varispeed WAV, bounce, backup');
 await ctx.close();
}finally{await browser.close();}
