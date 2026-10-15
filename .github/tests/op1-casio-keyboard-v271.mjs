// v2.7.1: the production beginner view hides the OP-1 console and offers a real playable keyboard.
import {chromium,firefox,webkit} from 'playwright';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {beginnerHtml} from './op1-test-html.mjs';
const project=async page=>{
 const wait=page.waitForEvent('download',{timeout:60000});
 await page.locator('#saveProject').click();
 return JSON.parse(readFileSync(await(await wait).path(),'utf8'));
};
for(const [name,browserType] of Object.entries({chromium,firefox,webkit})){
 const browser=await browserType.launch({headless:true});
 try{for(const width of (name==='chromium'?[1200,390]:[1100])){
  const ctx=await browser.newContext({viewport:{width,height:880},acceptDownloads:true});
  const page=await ctx.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(String(e)));
  await page.setContent(beginnerHtml,{waitUntil:'domcontentloaded'});
  assert.match(await page.title(),/v2\.7/);
  assert(await page.locator('html').evaluate(el=>el.classList.contains('beginner-studio')),'Expected beginner-first layout');
  for(const id of ['deviceOuter','comfortKeyboardDock','mobileKeys','studioMainNavigation','studioModeBar']){
   assert(!(await page.locator('#'+id).isVisible()),'Old studio unexpectedly visible: '+id);
  }
  assert(await page.locator('#musicMaker').isVisible());
  assert(await page.locator('#makerComposerPanel').isVisible());
  assert.equal(await page.locator('.casio-tabs button').count(),2);
  assert(!(await page.locator('#casioKeyboardPanel').isVisible()));
  const initial=await project(page);
  await page.locator('#makerTabKeyboard').click();
  assert(!(await page.locator('#makerComposerPanel').isVisible()));
  assert(await page.locator('#casioKeyboardPanel').isVisible(),'Keyboard tab must be visible');
  assert.equal(await page.locator('#casioKeys .casio-key').count(),24);
  assert.equal(await page.locator('#casioKeys .casio-key.white').count(),14);
  assert.equal(await page.locator('#casioKeys .casio-key.black').count(),10);
  if(width===390)assert.equal(await page.locator('#casioKeys .casio-key:visible').count(),12,'Phone should display one larger playable octave');
  assert.match(await page.locator('#casioKeys [data-casio-note="0"]').getAttribute('aria-label'),/C3/);
  assert.equal(await page.locator('#casioBank option').count(),3);
  await page.locator('#casioBank').selectOption('1');
  assert.equal(await page.locator('#casioPreset option').count(),8);
  await page.locator('#casioPreset').selectOption('2');
  assert.equal(await page.evaluate(()=>window.OP1KeyboardEngine.status().soundName),'SOFT ORBIT');
  await page.locator('#casioOctaveUp').click();
  assert.match(await page.locator('#casioOctave').innerText(),/\+1/);
  assert.match(await page.locator('#casioKeys [data-casio-note="0"]').getAttribute('aria-label'),/C4/);
  await page.locator('#casioOctaveDown').click();
  assert.match(await page.locator('#casioOctave').innerText(),/\+0/);
  const first=page.locator('#casioKeys [data-casio-note="0"]');
  await first.scrollIntoViewIfNeeded();
  const rect=await first.boundingBox();assert(rect,'White key must have layout');
  await page.mouse.move(rect.x+rect.width/2,rect.y+rect.height*.8);
  await page.mouse.down();
  await page.waitForFunction(()=>document.querySelector('#voiceCount')?.textContent.startsWith('1 '),null,{timeout:8000});
  assert(await first.evaluate(el=>el.classList.contains('down')));
  await page.mouse.up();
  await page.waitForFunction(()=>document.querySelector('#voiceCount')?.textContent.startsWith('0 '),null,{timeout:8000});
  const soundChanged=await project(page);
  assert.deepEqual(soundChanged.tracks,initial.tracks,'Playing keyboard should not erase tape');
  assert.deepEqual(soundChanged.tracker,initial.tracker,'Playing keyboard should not alter tracker');
  assert.deepEqual(soundChanged.songWorkspace,initial.songWorkspace,'Playing should not alter workspace');
  assert.equal(soundChanged.version,5,'Project version should remain portable v5');
  await page.locator('#makerTabCompose').click();
  assert(await page.locator('#makerComposerPanel').isVisible());
  await page.locator('#makerGenerate').click();
  assert.match(await page.locator('#makerSongOverview').innerText(),/4 song sections/);
  const generated=await project(page);
  await page.locator('#makerTabKeyboard').click();
  await page.locator('#casioMore').evaluate(el=>el.open=true);
  await page.locator('#casioClassic').click();
  assert(!(await page.locator('html').evaluate(el=>el.classList.contains('beginner-studio'))));
  assert(await page.locator('#deviceOuter').isVisible(),'Legacy instrument must still be available');
  assert(await page.locator('#comfortTabs').isVisible(),'Classic studio must retain its original tabs');
  assert(await page.locator('#casioReturn').isVisible());
  await page.locator('#casioReturn').click();
  assert(await page.locator('html').evaluate(el=>el.classList.contains('beginner-studio')));
  assert(await page.locator('#casioKeyboardPanel').isVisible(),'Return should remember active Keyboard tab');
  const afterClassic=await project(page);
  assert.deepEqual(afterClassic.tracker,generated.tracker,'Generated notes must not be lost by layout switch');
  assert.deepEqual(afterClassic.tracks,soundChanged.tracks);
  if(width===390){
   const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
   assert(overflow<=1,'Beginner keyboard overflows 390px by '+overflow);
  }
  assert.deepEqual(errors,[],'Unexpected browser exceptions');
  console.log('PASS beginner first / Casio keyboard / sound / playable keys / legacy fallback',name,width);
  await ctx.close();
 }}finally{await browser.close()}
}
