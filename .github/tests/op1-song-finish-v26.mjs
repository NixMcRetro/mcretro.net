// Stage 4: finished song stereo audio export, editable project backup, safe rendering and mobile UX.
import {chromium,firefox,webkit} from 'playwright';
import {createServer} from 'node:http';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {rawHtml} from './op1-test-html.mjs';

function checkWav(bytes,expectedSeconds){
 assert.equal(bytes.toString('ascii',0,4),'RIFF');
 assert.equal(bytes.toString('ascii',8,12),'WAVE');
 assert.equal(bytes.toString('ascii',12,16),'fmt ');
 assert.equal(bytes.readUInt16LE(20),1,'Expected uncompressed PCM');
 assert.equal(bytes.readUInt16LE(22),2,'Expected two stereo channels');
 assert.equal(bytes.readUInt32LE(24),32000,'Expected 32 kHz sample rate');
 assert.equal(bytes.readUInt16LE(34),16,'Expected 16-bit PCM');
 assert.equal(bytes.toString('ascii',36,40),'data');
 assert(bytes.length>44,'Audio body missing');
 const frames=bytes.readUInt32LE(40)/4;
 assert(Math.abs(frames/32000-(expectedSeconds+.6))<.1,'Unexpected duration '+frames/32000);
 let nonzero=false;
 for(let i=44;i<Math.min(bytes.length,44+240000);i+=2){
  if(bytes.readInt16LE(i)!==0){nonzero=true;break}
 }
 assert(nonzero,'Rendered song contains only digital silence');
}
const server=createServer((req,res)=>{
 const path=new URL(req.url,'http://localhost').pathname;
 if(path==='/'){res.writeHead(200,{'Content-Type':'text/html'});res.end(rawHtml);return}
 const file=path==='/sw.js'?'homepages/op-1/sw.js':path==='/manifest.webmanifest'?'homepages/op-1/manifest.webmanifest':path.startsWith('/icons/')?'homepages/op-1'+path:null;
 try{if(file){res.writeHead(200,{'Content-Type':path.endsWith('.png')?'image/png':path.endsWith('.webmanifest')?'application/manifest+json':'text/javascript'});res.end(readFileSync(file));return}}catch(_){}
 res.writeHead(404);res.end('Not found');
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const origin='http://127.0.0.1:'+server.address().port+'/';
async function saveProject(page,button='#trackerFinishBackup'){
 const pending=page.waitForEvent('download',{timeout:60000});
 await page.locator(button).click();
 const download=await pending;
 return JSON.parse(readFileSync(await download.path(),'utf8'));
}
try{
 for(const [name,engine] of Object.entries({chromium,firefox,webkit})){
  const browser=await engine.launch({headless:true});
  try{
   for(const width of name==='chromium'?[1350,390]:[1080]){
    const ctx=await browser.newContext({viewport:{width,height:900},acceptDownloads:true});
    try{
     const page=await ctx.newPage(),errors=[];
     page.on('pageerror',e=>errors.push(e.message));
     await page.goto(origin,{waitUntil:'domcontentloaded'});
     await page.locator('#studioQuickFinish').click();
     assert(await page.locator('#trackerFinishPanel').isVisible(),'Finish shortcut should open the Song Builder');
     assert(await page.locator('#trackerFinishSong').isDisabled(),'An empty arrangement cannot be exported');
     assert.match(await page.locator('#trackerFinishStatus').innerText(),/WAV for listening/);
     await page.locator('#trackerStarterType').selectOption('drums');
     await page.locator('#trackerStarterAdd').click();
     await page.locator('#trackerStarterType').selectOption('melody');
     await page.locator('#trackerStarterAdd').click();
     // Reorder and verify that the exported song uses the arrangement instead of the tracker chain.
     await page.locator('[data-arrangement-action="up"]').nth(1).click();
     const expected=await page.evaluate(()=>({
      duration:window.OP1Tracker.compileArrangement().seconds,
      arrangement:structuredClone(window.OP1Tracker.normalize(window.OP1Tracker.defaults()).arrangement)
     }));
     assert.equal(await page.locator('#trackerFinishSong').isEnabled(),true);
     assert.match(await page.locator('#trackerFinishSummary').innerText(),/2 sections/);
     const projectBefore=await saveProject(page);
     assert.equal(projectBefore.version,5);
     assert.equal(projectBefore.tracker.arrangement.length,2);
     assert.equal(projectBefore.tracker.arrangement[0].label,'Chorus');
     const downloadPromise=page.waitForEvent('download',{timeout:120000});
     await page.locator('#trackerFinishSong').click();
     const audio=await downloadPromise;
     assert.equal(audio.suggestedFilename(),'supernicks-op1-finished-song.wav');
     checkWav(readFileSync(await audio.path()),expected.duration);
     assert.match(await page.locator('#trackerFinishStatus').innerText(),/Stereo WAV downloaded/);
     const projectAfter=await saveProject(page);
     assert.deepEqual(projectAfter.tracker,projectBefore.tracker,'Export must never modify tracker data');
     assert.deepEqual(projectAfter.tracks,projectBefore.tracks,'Export must not modify tape');
     assert.deepEqual(projectAfter.songWorkspace,projectBefore.songWorkspace,'Export must not modify Song Workspace');
     assert.equal(projectAfter.format,'op1-browser-lab-v05','Project compatibility must remain v5');
     if(width===390){
      const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
      assert(overflow<=1,'Finish Song overflows phone viewport by '+overflow+'px');
     }
     assert.deepEqual(errors,[],'Browser errors: '+errors.join('; '));
     console.log('PASS Stage 4 stereo WAV, project backup and non-destructive finishing',name,width);
    }finally{await ctx.close()}
   }
  }finally{await browser.close()}
 }
}finally{server.close()}
