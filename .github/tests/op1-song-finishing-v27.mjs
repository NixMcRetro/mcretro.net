// v2.7 Stage 5: a beginner can make, play, save, reopen, and export without changing studios.
import {chromium,firefox,webkit} from 'playwright';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {rawHtml} from './op1-test-html.mjs';
const save=async(page,button='#makerSave')=>{
 const pending=page.waitForEvent('download',{timeout:60000});
 await page.locator(button).click();
 return JSON.parse(readFileSync(await(await pending).path(),'utf8'));
};
for(const [name,engine] of Object.entries({chromium,firefox,webkit})){
 const browser=await engine.launch({headless:true});
 try{
  const ctx=await browser.newContext({viewport:{width:name==='chromium'?390:1200,height:900},acceptDownloads:true});
  const page=await ctx.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.setContent(rawHtml,{waitUntil:'domcontentloaded'});
  assert.match(await page.title(),/v2\.9/,'The website must identify itself as v2.7');
  assert.match(await page.locator('#makerSongOverview').innerText(),/No song arranged yet/);
  assert(await page.locator('#makerPlay').isDisabled());
  await page.locator('#makerGenerate').click();
  assert.match(await page.locator('#makerSongOverview').innerText(),/4 song sections/);
  assert.match(await page.locator('#makerSongOverview').innerText(),/BPM/);
  assert(await page.locator('#makerPlay').isEnabled());
  await page.locator('#makerPlay').click();
  assert.equal(await page.locator('#makerPlay').getAttribute('aria-pressed'),'true','Play should start song');
  assert.match(await page.locator('#makerPlay').innerText(),/Stop Song/);
  await page.locator('#makerPlay').click();
  assert.equal(await page.locator('#makerPlay').getAttribute('aria-pressed'),'false');
  const original=await save(page);
  assert.equal(original.version,5);
  assert.equal(original.tracker.arrangement.length,4);
  // Opening an editable project from a new page must also enable beginner Play and Finish.
  const reloaded=await ctx.newPage();reloaded.on('pageerror',e=>errors.push(e.message));
  await reloaded.setContent(rawHtml,{waitUntil:'domcontentloaded'});
  await reloaded.locator('#projectFile').setInputFiles({name:'music-maker-v5.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(original))});
  await reloaded.waitForFunction(()=>document.querySelector('#feedback')?.textContent.includes('Project loaded'),null,{timeout:30000});
  await reloaded.waitForFunction(()=>!document.querySelector('#makerPlay').disabled,null,{timeout:20000});
  assert.match(await reloaded.locator('#makerSongOverview').innerText(),/4 song sections/);
  const roundtrip=await save(reloaded);
  assert.deepEqual(roundtrip.tracker,original.tracker);
  assert.deepEqual(roundtrip.tracks,original.tracks);
  assert.deepEqual(roundtrip.songWorkspace,original.songWorkspace);
  if(name==='chromium'){
   const pending=page.waitForEvent('download',{timeout:120000});
   await page.locator('#makerFinish').click();
   const wav=readFileSync(await (await pending).path());
   assert.equal(wav.toString('ascii',0,4),'RIFF');
   assert.equal(wav.readUInt16LE(22),2);
   assert.match(await page.locator('#makerStatus').innerText(),/stereo WAV has downloaded/);
   const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
   assert(overflow<=1,'Stage 5 beginner controls overflow the phone screen');
  }
  assert.deepEqual(errors,[],'Unexpected browser errors: '+errors.join('; '));
  console.log('PASS v2.7 Stage 5 beginner song status, Play/Stop, export, project reopen',name);
  await ctx.close();
 }finally{await browser.close()}
}
