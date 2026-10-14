// v1.5 Performance Studio regression: state migration, mix controls, pattern scheduling,
// safe performance downloads and narrow touch layout. No third-party test assets.
import {chromium,firefox,webkit} from 'playwright';
import {readFileSync} from 'node:fs';
import assert from 'node:assert/strict';

import {html} from './op1-test-html.mjs';
const engines={chromium,firefox,webkit};
for(const [name,engine] of Object.entries(engines)){
 const browser=await engine.launch({headless:true});
 try{
  const ctx=await browser.newContext({viewport:{width:1440,height:900},acceptDownloads:true});
  const page=await ctx.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.setContent(html,{waitUntil:'domcontentloaded'});
  assert.match(await page.title(),/v2\.0/);
  assert.equal(await page.locator('.performance-track').count(),4);
  assert.equal(await page.locator('.performance-meter').count(),4);
  await page.locator('#quickMixer').click();
  assert.equal(await page.locator('.mode-btn[data-mode="mixer"]').getAttribute('aria-pressed'),'true');
  const level=page.locator('[data-performance-level="0"]'),pan=page.locator('[data-performance-pan="0"]');
  await level.evaluate(el=>{el.value='35';el.dispatchEvent(new Event('input',{bubbles:true}))});
  await pan.evaluate(el=>{el.value='-45';el.dispatchEvent(new Event('input',{bubbles:true}))});
  await page.locator('[data-performance-mute="0"]').click();
  await page.locator('[data-performance-solo="1"]').click();
  await page.locator('[data-performance-select="2"]').click();
  assert.equal(await page.locator('[data-performance-mute="0"]').getAttribute('aria-pressed'),'true');
  assert.equal(await page.locator('[data-performance-solo="1"]').getAttribute('aria-pressed'),'true');
  assert.equal(await page.locator('[data-performance-select="2"]').getAttribute('aria-pressed'),'true');
  await page.locator('#performanceResetSolo').click();
  assert.equal(await page.locator('[data-performance-solo="1"]').getAttribute('aria-pressed'),'false');
  async function save(){
   const pending=page.waitForEvent('download',{timeout:30000});
   await page.locator('#saveProject').click();
   return JSON.parse(readFileSync(await (await pending).path(),'utf8'));
  }
  let project=await save();
  assert.equal(project.format,'op1-browser-lab-v05');
  assert.equal(project.version,5);
  assert.equal(project.tracks.length,4);
  assert.equal(project.tracks[0].gain,.35);
  assert.equal(project.tracks[0].pan,-.45);
  assert.equal(project.tracks[0].mute,true);
  assert.equal(project.tracks[1].solo,false);
  assert.equal(project.selectedTrack,2);

  // Pre-v1.5 project must restore historical levels and make all tracks audible.
  for(const t of project.tracks){delete t.mute;delete t.solo}
  delete project.patternSlots;delete project.patternSlot;delete project.patternChain;
  delete project.patternChainEnabled;
  await page.locator('#projectFile').setInputFiles({name:'legacy-v14.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(project))});
  await page.waitForTimeout(450);
  project=await save();
  assert(project.tracks.every(t=>t.mute===false&&t.solo===false));
  assert.equal(project.tracks[0].gain,.35);
  assert.equal(project.tracks[0].pan,-.45);
  assert.equal(project.patternSlot,'A');
  assert(project.patternSlots.B.every(n=>n===null));
  assert.equal(project.seqPattern.length,16);

  await page.locator('#quickSeq').click();
  await page.locator('#screenOverlay [data-seq-mode="pattern"]').click();
  await page.locator('[data-pattern-slot="B"]').click();
  await page.locator('#steps .step').first().click();
  await page.locator('#patternChainText').fill('A×1, B×2, C×1');
  await page.locator('#patternChainApply').click();
  await page.locator('#patternChainToggle').click();
  project=await save();
  assert.equal(project.patternSlot,'B');
  assert.equal(project.patternSlots.B[0],12);
  assert.equal(project.seqPattern[0],null,'Pattern A was overwritten');
  assert.deepEqual(project.patternChain,[{slot:'A',repeat:1},{slot:'B',repeat:2},{slot:'C',repeat:1}]);
  assert.equal(project.patternChainEnabled,true);
  await page.locator('#patternChainText').fill('INVALID');
  await page.locator('#patternChainApply').click();
  project=await save();
  assert.equal(project.patternChain.length,3,'Invalid chain overwrote the previous valid chain');

  // Fast tempo makes the next bar reachable during headless playback.
  await page.locator('#seqRate').selectOption('32');
  await page.locator('#seqRun').click();
  // Chromium runs the audio clock in this headless CI environment. Firefox/WebKit
  // may suspend Web Audio without a physical output device: check transport UI
  // there and keep state/chain compatibility assertions on every engine.
  if(name==='chromium')
   await page.waitForFunction(()=>document.querySelector('#patternChainStatus')?.textContent.includes('PLAYING B'),null,{timeout:12000});
  else assert.match(await page.locator('#seqRun').innerText(),/STOP/,'Headless sequencer did not enter RUN state');
  await page.locator('#seqRun').click();

  if(name==='chromium' && await page.evaluate(()=>!!window.MediaRecorder && !!window.AudioContext?.prototype.createMediaStreamDestination)){
   await page.locator('#performanceRecord').click();
   assert.equal(await page.locator('#performanceRecord').getAttribute('aria-pressed'),'true');
   await page.waitForTimeout(900);
   const recording=page.waitForEvent('download',{timeout:30000});
   await page.locator('#performanceRecord').click();
   const take=await recording;
   assert.match(take.suggestedFilename(),/performance-(take|raw-take)-/);
   const content=readFileSync(await take.path());
   assert(content.length>200,'Performance file is empty');
   assert(['RIFF','\x1aE\xdf\xa3'].some(sig=>content.subarray(0,4).toString('latin1')===sig)||content.length>3000);
   await page.waitForFunction(()=>!document.querySelector('#performanceRecord').disabled);
  }

  if(name==='chromium'){
   // Offline rendering must honour MUTE for both persisted tape notes and WAV.
   const fixture=await save();
   fixture.tracks[0].events.push({t:.1,d:.4,n:60,kind:'synth',kit:0,patch:null});
   fixture.tracks[0].mute=true;
   fixture.tracks[0].gain=.8;
   fixture.tracks[1].events=[];fixture.tracks[2].events=[];fixture.tracks[3].events=[];
   fixture.fx.delay=0;fixture.fx.feedback=0;fixture.fx.wet=0;fixture.fx.reverb=0;fixture.fx.chorus=0;
   await page.locator('#projectFile').setInputFiles({name:'mute-export-v15.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(fixture))});
   await page.waitForTimeout(450);
   async function wavPeak(){
    const pending=page.waitForEvent('download',{timeout:90000});
    await page.locator('#exportWav').click();
    const b=readFileSync(await (await pending).path());
    assert.equal(b.toString('ascii',0,4),'RIFF');
    let peak=0;
    for(let i=44;i<Math.min(b.length,44100*4);i+=2)peak=Math.max(peak,Math.abs(b.readInt16LE(i)));
    return peak;
   }
   assert((await wavPeak())<5,'Muted tape event was audible in WAV export');
   await page.locator('[data-performance-mute="0"]').click();
   assert((await wavPeak())>100,'Audible tape event disappeared after clearing MUTE');
  }
  await page.setViewportSize({width:390,height:844});
  await page.locator('#quickMixer').click();
  assert(await page.locator('#performancePanel').isVisible());
  assert.equal(await page.locator('[data-performance-mute]').count(),4);
  assert.equal(await page.locator('[data-performance-solo]').count(),4);
  assert.deepEqual(errors,[],'Unexpected browser exceptions: '+errors.join('; '));
  await ctx.close();
  console.log('PASS '+name+': mixer, legacy migration, pattern slots, chains, mobile'+(name==='chromium'?', capture':''));
 }finally{await browser.close()}
}
