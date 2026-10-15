// v2.6 Stage 2: section limits, live capture, editing, undo and portable saved song playback.
import {chromium,firefox,webkit} from 'playwright';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createServer} from 'node:http';
import vm from 'node:vm';
import {rawHtml} from './op1-test-html.mjs';

const code=readFileSync('homepages/op-1/tracker.js','utf8'),environment={window:{},structuredClone,console};
vm.runInNewContext(code,environment);
const api=environment.window.OP1Tracker;
const legacy=api.defaults();delete legacy.arrangement;
assert.deepEqual(JSON.parse(JSON.stringify(api.normalize(legacy).arrangement)),[],'Older tracker projects must have an empty arrangement');
const invalid=api.defaults();
invalid.arrangement=[{pattern:1,rows:16}];assert.throws(()=>api.normalize(invalid),/arrangement section/);
invalid.arrangement=[{pattern:0,rows:3}];assert.throws(()=>api.normalize(invalid),/arrangement section/);
invalid.arrangement=[{pattern:0,rows:18}];assert.throws(()=>api.normalize(invalid),/arrangement section/);
invalid.arrangement=Array.from({length:65},()=>({pattern:0,rows:4}));assert.throws(()=>api.normalize(invalid),/arrangement count/);
invalid.arrangement=Array.from({length:17},()=>({pattern:0,rows:256}));assert.throws(()=>api.normalize(invalid),/maximum song length/);
assert.deepEqual(JSON.parse(JSON.stringify(api.recordedSections([{row:0,pattern:0},{row:16,pattern:1},{row:32,pattern:0}],48))),[
 {pattern:0,rows:16},{pattern:1,rows:16},{pattern:0,rows:16}]);
assert.deepEqual(JSON.parse(JSON.stringify(api.recordedSections([{row:0,pattern:0},{row:16,pattern:1}],14))),[{pattern:0,rows:16}]);
assert.deepEqual(JSON.parse(JSON.stringify(api.recordedSections([{row:0,pattern:0}],300))),[{pattern:0,rows:256},{pattern:0,rows:44}]);
console.log('PASS legacy v5 tracker data, bounded arrangement and precise recorded section transitions');

const server=createServer((req,res)=>{
 const path=new URL(req.url,'http://localhost').pathname;
 if(path==='/'){res.writeHead(200,{'Content-Type':'text/html'});res.end(rawHtml);return}
 const file=path==='/sw.js'?'homepages/op-1/sw.js':path==='/manifest.webmanifest'?'homepages/op-1/manifest.webmanifest':path.startsWith('/icons/')?'homepages/op-1'+path:null;
 try{if(file){res.writeHead(200,{'Content-Type':path.endsWith('.png')?'image/png':path.endsWith('.webmanifest')?'application/manifest+json':'text/javascript'});res.end(readFileSync(file));return}}catch(_){}
 res.writeHead(404);res.end('Not found');
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const origin='http://127.0.0.1:'+server.address().port+'/';
const saved=async page=>{
 const download=page.waitForEvent('download');
 await page.locator('#saveProject').click();
 return JSON.parse(readFileSync(await(await download).path(),'utf8'));
};
try{
 for(const [browserName,browserType] of Object.entries({chromium,firefox,webkit})){
  const browser=await browserType.launch({headless:true});
  try{
   for(const width of (browserName==='chromium'?[1280,390]:[1100])){
    const context=await browser.newContext({viewport:{width,height:900},acceptDownloads:true});
    try{
     const page=await context.newPage(),errors=[];
     page.on('pageerror',e=>errors.push(e.message));
     page.on('dialog',dialog=>dialog.accept());
     await page.goto(origin,{waitUntil:'domcontentloaded'});
     await page.locator('[data-studio-group="Compose"]').click();
     await page.locator('[data-studio-tool="trackerStudio"]').click();
     assert(await page.locator('#trackerSongBuilder').isVisible(),'Song Builder should be visible even in Focus mode');
     await page.locator('#trackerDemo').selectOption('midnight');
     await page.locator('#trackerExample').click();
     await page.locator('#trackerArrangementAdd').click();
     assert.equal(await page.locator('.tracker-arrangement-item').count(),1);
     await page.locator('[data-arrangement-pattern="0"]').selectOption('2');
     await page.locator('[data-arrangement-rows="0"]').selectOption('32');
     await page.locator('[data-arrangement-action="duplicate"]').first().click();
     assert.equal(await page.locator('.tracker-arrangement-item').count(),2);
     await page.locator('[data-arrangement-pattern="1"]').selectOption('1');
     await page.locator('[data-arrangement-action="up"]').nth(1).click();
     let project=await saved(page);
     assert.equal(project.version,5);
     assert.deepEqual(project.tracker.arrangement,[{pattern:1,rows:32},{pattern:2,rows:32}]);
     const noteSignature=JSON.stringify(project.tracker.patterns);
     await page.locator('#trackerUndo').click();
     project=await saved(page);
     assert.deepEqual(project.tracker.arrangement,[{pattern:2,rows:32},{pattern:1,rows:32}],'Undo should restore section order');
     assert.equal(JSON.stringify(project.tracker.patterns),noteSignature,'Arranging must never change original notes');
     await page.locator('#trackerArrangementPlay').click();
     const mode=await page.evaluate(()=>window.OP1Tracker.transport.mode);
     assert.equal(mode,'song','Arrangement must use Song playback mode');
     await page.locator('#trackerArrangementPlay').click();
     assert.equal(await page.evaluate(()=>window.OP1Tracker.transport.playing),false);
     project=await saved(page);
     assert.equal(project.tracker.arrangement.length,2,'Arrangement must persist in project save');
     if(width===390){const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
      assert(overflow<=1,'Song Builder mobile overflow '+overflow)}
     assert.deepEqual(errors,[],'Browser errors: '+errors.join('; '));
     console.log('PASS Song Builder section edit, undo, audio playback mode and project save',browserName,width);
     if(browserName==='chromium'&&width===1280){
      await page.locator('#startAudio').click();
      await page.locator('#trackerPerformanceOptions').evaluate(el=>el.open=true);
      await page.locator('#trackerQuantize').selectOption('beat');
      await page.locator('#trackerRecordArrangement').click();
      assert.equal(await page.evaluate(()=>window.OP1Tracker.recordingArrangement),true);
      await page.locator('[data-launch="1"]').click();
      await page.waitForFunction(()=>window.OP1Tracker.transport.pattern===1,null,{timeout:6500});
      await page.waitForTimeout(400);
      await page.locator('#trackerRecordArrangement').click();
      assert.equal(await page.evaluate(()=>window.OP1Tracker.recordingArrangement),false);
      const performance=await saved(page);
      assert.equal(performance.tracker.arrangement[0].pattern,0);
      assert(performance.tracker.arrangement.some(x=>x.pattern===1),'Recorded live pattern changes must be saved');
      assert.equal(JSON.stringify(performance.tracker.patterns),noteSignature,'Live recording must preserve original notes');
      console.log('PASS live quantised pattern capture into editable portable song');
     }
     await page.close();
    }finally{await context.close()}
   }
  }finally{await browser.close()}
 }
}finally{server.close()}
