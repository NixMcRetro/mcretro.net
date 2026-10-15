// BleepGarden Music Maker 2000: rename is cosmetic, existing projects and engines remain portable.
import {chromium,firefox,webkit} from 'playwright';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {beginnerHtml} from './op1-test-html.mjs';

const manifest=JSON.parse(readFileSync('homepages/op-1/manifest.webmanifest','utf8'));
assert.equal(manifest.name,'BleepGarden Music Maker 2000');
assert.equal(manifest.short_name,'BleepGarden 2000');
assert.equal(manifest.id,'./','Keep installed-app identity');
assert.equal(manifest.scope,'./','Keep older OP-1 browser URL working');
assert.equal(manifest.start_url,'./');
assert.match(manifest.description,/created for SuperNick \(Nick\)/);
const serviceWorker=readFileSync('homepages/op-1/sw.js','utf8');
const htmlSource=readFileSync('homepages/op-1/index.html','utf8');
assert.match(serviceWorker,/bleepgarden/);
assert.match(htmlSource,/op1-browser-lab-shell-v2\.9-bleepgarden/);
assert.match(readFileSync('homepages/op-1/tracker.js','utf8'),/bleepgarden-music-maker-2000-song\.wav/);

for(const [browserName,type] of Object.entries({chromium,firefox,webkit})){
 const browser=await type.launch({headless:true});
 try{
  const page=await browser.newPage({viewport:{width:browserName==='chromium'?390:1150,height:860},acceptDownloads:true});
  const errors=[];page.on('pageerror',error=>errors.push(error.message));
  await page.setContent(beginnerHtml,{waitUntil:'domcontentloaded'});
  assert.match(await page.title(),/^BleepGarden Music Maker 2000 v2\.9 \| Created for SuperNick \(Nick\)$/);
  assert.match(await page.locator('.brand h1').innerText(),/^BleepGarden Music Maker 2000/);
  assert.match(await page.locator('.brand p').innerText(),/Created for SuperNick \(Nick\)/);
  assert.equal((await page.locator('.brandmark').innerText()).replace(/\s/g,''),'bg.');
  assert.equal(await page.locator('meta[name="application-name"]').getAttribute('content'),'BleepGarden Music Maker 2000');
  assert.equal(await page.locator('meta[name="apple-mobile-web-app-title"]').getAttribute('content'),'BleepGarden 2000');
  assert.match(await page.locator('meta[name="description"]').getAttribute('content'),/BleepGarden Music Maker 2000, created for SuperNick \(Nick\)/);
  assert(await page.locator('#makerTabCompose').isVisible());
  assert(await page.locator('#makerTabKeyboard').isVisible());
  assert(!(await page.locator('#deviceOuter').isVisible()),'Legacy console must not become default after rebrand');
  await page.locator('#makerThemeToggle').click();
  assert.equal(await page.locator('html').getAttribute('data-op1-theme'),'dark','Dark mode remains supported');
  await page.locator('#showHelp').click();
  assert.match(await page.locator('#helpOverlay h2').innerText(),/^BleepGarden Music Maker 2000/);
  assert.match(await page.locator('#helpOverlay .modal').innerText(),/created for SuperNick \(Nick\)/);
  await page.locator('#closeHelp').click();
  await page.locator('#makerGenerate').click();
  assert((await page.locator('#makerSongOverview').innerText()).includes('4 song sections'));
  assert.equal((await page.evaluate(()=>window.OP1Tracker.musicMakerSnapshot())).arrangement.length,4,'Tracker must still power songs');
  await page.locator('#makerTabKeyboard').click();
  await page.locator('#casioMore').evaluate(el=>el.open=true);
  await page.locator('#casioClassic').click();
  assert(await page.locator('#deviceOuter').isVisible(),'Preserve Classic Studio');
  assert.equal(await page.locator('.device-name').innerText(),'BG-2000');
  await page.locator('#casioReturn').click();
  assert(await page.locator('#casioKeyboardPanel').isVisible());
  if(browserName==='chromium'){
   const width=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
   assert(width<=1,'BleepGarden mobile header overflows by '+width+' px');
  }
  assert.deepEqual(errors,[]);
  console.log('PASS BleepGarden rename, SuperNick credit, theme, music, keyboard and classic engine',browserName);
  await page.close();
 }finally{await browser.close()}
}
