// v2.7 Stage 4: directional sound preview, safe A/B, undo and portable project stability.
import { chromium, firefox, webkit } from 'playwright';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {rawHtml} from './op1-test-html.mjs';
async function save(page,selector='#saveProject'){
 const pending=page.waitForEvent('download',{timeout:60000});
 await page.locator(selector).click();
 return JSON.parse(readFileSync(await(await pending).path(),'utf8'));
}
function part(result,ch){return result.tracker.channels[ch]}
function checkSafe(c){
 for(const x of ['tone','fxSend','warmth','punch','space','brightness']){
  assert(Number.isInteger(c[x])&&c[x]>=0&&c[x]<=100,x+' must be an integer in the safe range: '+c[x]);
 }
 assert(c.level>=0&&c.level<=1.5);
 assert(c.pan>=-1&&c.pan<=1);
}
for(const [name,engine] of Object.entries({chromium,firefox,webkit})){
 const browser=await engine.launch({headless:true});
 try{
  const ctx=await browser.newContext({viewport:{width:name==='chromium'?390:1200,height:900},acceptDownloads:true});
  try{
   const page=await ctx.newPage(),errors=[];
   page.on('pageerror',e=>errors.push(e.message));
   await page.setContent(rawHtml,{waitUntil:'domcontentloaded'});
   assert(await page.locator('#makerSoundTry').isVisible(),'Stage 4 sound shaping must be in beginner Music Maker');
   await page.locator('#makerSoundTry').click();
   assert.match(await page.locator('#makerSoundStatus').innerText(),/Generate a song or open an existing tracker/);
   await page.locator('#makerGenerate').click();
   const original=await save(page);
   assert.equal(original.version,5);
   assert.equal(original.tracker.channels[3].warmth,0);
   await page.locator('#makerSoundPart').selectOption('3');
   await page.locator('#makerSoundDirection').selectOption('warm');
   await page.locator('#makerSoundAmount').fill('80');
   await page.locator('#makerSoundTry').click();
   assert.equal(await page.locator('#makerSoundB').getAttribute('aria-pressed'),'true');
   assert.equal(await page.locator('#makerSoundKeep').isEnabled(),true);
   assert.equal(await page.locator('#makerSoundA').isEnabled(),true);
   assert.deepEqual((await save(page)).tracker,original.tracker,'Preview must not alter saved project data');
   await page.locator('#makerSoundA').click();
   assert.equal(await page.locator('#makerSoundA').getAttribute('aria-pressed'),'true');
   await page.locator('#makerSoundB').click();
   assert.deepEqual((await save(page)).tracker,original.tracker,'A/B comparison must not save automatically');
   await page.locator('#makerSoundKeep').click();
   const modified=await save(page);
   assert.notDeepEqual(part(modified,3),part(original,3),'Keep must change the selected mixer channel');
   assert(part(modified,3).tone<part(original,3).tone,'Warmer must soften highs');
   assert(part(modified,3).warmth>part(original,3).warmth,'Warmer must increase gentle saturation');
   for(const ch of [0,1,2])assert.deepEqual(part(modified,ch),part(original,ch),'Sound must not change unselected part '+ch);
   assert.deepEqual(modified.tracker.patterns,original.tracker.patterns,'Sound shaping must not replace notes');
   assert.deepEqual(modified.tracker.arrangement,original.tracker.arrangement,'Song arrangement must remain');
   assert.deepEqual(modified.tracks,original.tracks,'Independent tape must remain');
   assert.deepEqual(modified.songWorkspace,original.songWorkspace,'Song Workspace must remain');
   assert.deepEqual(modified.audioSamples,original.audioSamples,'Audio samples must remain');
   checkSafe(part(modified,3));
   await page.locator('#makerUndo').click();
   assert.deepEqual((await save(page)).tracker,original.tracker,'Undo must restore exact pre-shaping mixer');
   await page.locator('#makerSoundDirection').selectOption('bright');
   await page.locator('#makerSoundTry').click();
   await page.locator('#makerSoundKeep').click();
   const brighter=await save(page);
   assert(part(brighter,3).brightness>0,'Brighter must add high shelving');
   await page.locator('#makerSoundDirection').selectOption('space');
   await page.locator('#makerSoundTry').click();
   await page.locator('#makerSoundKeep').click();
   const spacious=await save(page);
   assert(part(spacious,3).space>0,'Spacier must add audible local ambience');
   await page.locator('#makerSoundDirection').selectOption('punch');
   await page.locator('#makerSoundTry').click();
   await page.locator('#makerSoundKeep').click();
   const punchy=await save(page);
   assert(part(punchy,3).punch>0,'Punchier must change musical envelope');
   await page.locator('#makerSoundDirection').selectOption('surprise');
   await page.locator('#makerSoundAmount').fill('100');
   await page.locator('#makerSoundTry').click();
   await page.locator('#makerSoundKeep').click();
   const randomised=await save(page);
   checkSafe(part(randomised,3));
   assert.deepEqual(randomised.tracks,original.tracks);
   assert.deepEqual(randomised.songWorkspace,original.songWorkspace);
   // Legacy tracker mixers lacking Stage 4 fields should normalise as before, without a format change.
   const oldMix=structuredClone(original.tracker);
   oldMix.channels.forEach(c=>{delete c.warmth;delete c.punch;delete c.space;delete c.brightness;});
   const normalized=await page.evaluate(t=>window.OP1Tracker.normalize(t),oldMix);
   for(const c of normalized.channels)assert.deepEqual([c.warmth,c.punch,c.space,c.brightness],[0,0,0,0]);
   if(name==='chromium'){
    const pending=page.waitForEvent('download',{timeout:120000});
    await page.locator('#makerFinish').click();
    const wav=readFileSync(await(await pending).path());
    assert.equal(wav.toString('ascii',0,4),'RIFF');
    assert.equal(wav.readUInt16LE(22),2);
    assert.equal(wav.readUInt16LE(34),16);
    let audible=false;
    for(let i=44;i<Math.min(wav.length,220044);i+=2){if(wav.readInt16LE(i)!==0){audible=true;break}}
    assert(audible,'Stage 4 shaped-song WAV is silent');
    const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
    assert(overflow<=1,'Stage 4 UI overflows 390px mobile width by '+overflow);
   }
   assert.deepEqual(errors,[],'Unexpected page JavaScript errors: '+errors.join('; '));
   console.log('PASS Stage 4 sound preview, A/B, Keep, Undo, warmth, brightness, space, punch, random, project',name);
  }finally{await ctx.close()}
 }finally{await browser.close()}
}
