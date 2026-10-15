// v2.8 Stage 4: single transport, true dark beginner theme and explicit stereo/backup finishing.
import {chromium,firefox,webkit} from 'playwright';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {beginnerHtml} from './op1-test-html.mjs';
async function save(page){
 const pending=page.waitForEvent('download',{timeout:60000});
 await page.locator('#makerSave').click();
 return JSON.parse(readFileSync(await (await pending).path(),'utf8'));
}
async function colors(page){
 return page.evaluate(()=>{
  const color=id=>{const style=getComputedStyle(document.querySelector(id));return style.backgroundImage!=='none'?style.backgroundImage:style.backgroundColor};
  return {
   maker:color('.music-maker'),parts:color('.maker-parts'),arrangement:color('.maker-song-sections'),
   finish:color('#makerFinishPanel'),riff:color('#riffRecorder'),
   note:getComputedStyle(document.querySelector('.music-maker .maker-heading p')).color
  };
 });
}
for(const [name,engine] of Object.entries({chromium,firefox,webkit})){
 const browser=await engine.launch({headless:true});
 try{
  const ctx=await browser.newContext({viewport:{width:name==='chromium'?390:1180,height:900},acceptDownloads:true});
  const page=await ctx.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.setContent(beginnerHtml,{waitUntil:'domcontentloaded'});
  assert(await page.locator('#musicMaker').isVisible());
  assert.equal(await page.locator('#makerThemeToggle').innerText(),'☾ Dark mode');
  assert(await page.locator('#makerFinish').isDisabled());
  assert(await page.locator('#makerStop').isHidden(),'The beginner should see exactly one Play/Stop button');
  assert.equal(await page.locator('.casio-tabs button').count(),2,'Do not introduce another studio tab');
  const light=await colors(page);
  await page.locator('#makerThemeToggle').click();
  assert.equal(await page.locator('html').getAttribute('data-op1-theme'),'dark');
  assert.equal(await page.locator('#makerThemeToggle').getAttribute('aria-pressed'),'true');
  assert.equal(await page.locator('#makerThemeToggle').innerText(),'☀ Light mode');
  const dark=await colors(page);
  for(const part of ['maker','parts','arrangement','finish','riff'])assert.notEqual(dark[part],light[part],part+' did not switch to a dark background');
  assert.notEqual(dark.note,light.note,'Beginner text contrast did not change');
  await page.locator('#makerTabKeyboard').click();
  assert(await page.locator('#casioKeyboardPanel').isVisible());
  const whiteKey=await page.locator('.casio-key.white').first().evaluate(el=>getComputedStyle(el).backgroundImage);
  assert.match(whiteKey,/linear-gradient/,'The dark piano should keep its recognisable white keys');
  await page.locator('#makerThemeToggle').click();
  assert.equal(await page.locator('html').getAttribute('data-op1-theme'),'light');
  await page.locator('#makerThemeToggle').click();
  assert.equal(await page.locator('html').getAttribute('data-op1-theme'),'dark');
  await page.locator('#makerTabCompose').click();
  await page.locator('#makerGenerate').click();
  const original=await save(page);
  assert.equal(original.version,5);
  assert.equal(original.tracker.arrangement.length,4);
  assert(await page.locator('#makerFinish').isEnabled());
  assert.match(await page.locator('#makerFinishDetail').innerText(),/WAV to listen and share/);
  assert.match(await page.locator('#makerFinishStatus').innerText(),/Independent Tape Studio and Song Workspace/);
  await page.locator('#makerPlay').click();
  assert.equal(await page.locator('#makerPlay').getAttribute('aria-pressed'),'true');
  assert.match(await page.locator('#makerPlay').innerText(),/Stop Song/);
  await page.locator('#makerPlay').click();
  assert.equal(await page.locator('#makerPlay').getAttribute('aria-pressed'),'false');
  const afterward=await save(page);
  assert.deepEqual(afterward.tracker,original.tracker,'Playback or theme changes must not edit the song');
  assert.deepEqual(afterward.tracks,original.tracks);
  if(name==='chromium'){
   const pending=page.waitForEvent('download',{timeout:120000});
   await page.locator('#makerFinish').click();
   const wav=readFileSync(await (await pending).path());
   assert.equal(wav.toString('ascii',0,4),'RIFF');
   assert.equal(wav.readUInt16LE(22),2);
   assert.equal(wav.readUInt16LE(34),16);
   assert.match(await page.locator('#makerFinishStatus').innerText(),/stereo WAV has downloaded/);
   assert.deepEqual((await save(page)).tracker,original.tracker,'Finishing must never rewrite notes');
  }
  const longer=await page.evaluate(()=>{
   for(let i=0;i<4;i++)if(!window.OP1Tracker.musicMakerArrange('rows',i,128))return false;
   for(let i=0;i<9;i++)if(!window.OP1Tracker.musicMakerArrange('duplicate',0))return false;
   return true;
  });
  assert(longer);
  assert(await page.locator('#makerFinish').isDisabled(),'Overlong song must not render beyond 3 minutes');
  assert.match(await page.locator('#makerFinishDetail').innerText(),/longer than three minutes/);
  assert(await page.locator('#makerSave').isEnabled(),'Project backup must remain possible when WAV is too long');
  const tooLong=await save(page);
  assert.equal(tooLong.tracker.arrangement.length,13);
  if(name==='chromium'){
   const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
   assert(overflow<=1,'Beginner Stage 4 overflows a 390px viewport by '+overflow);
  }
  assert.deepEqual(errors,[],'Unexpected browser exceptions: '+errors.join('; '));
  console.log('PASS v2.8 Stage 4 unified transport, theme, export, save and mobile',name);
  await ctx.close();
 }finally{await browser.close()}
}
