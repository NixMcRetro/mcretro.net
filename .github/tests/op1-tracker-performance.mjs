// v2.4 independent tracker live arrangement, original demo and recording checks.
import {chromium,firefox,webkit} from 'playwright';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createServer} from 'node:http';
import {rawHtml} from './op1-test-html.mjs';
const server=createServer((request,response)=>{
 const path=new URL(request.url,'http://localhost').pathname;
 if(path==='/'){response.writeHead(200,{'Content-Type':'text/html'});response.end(rawHtml);return}
 const file=path==='/sw.js'?'homepages/op-1/sw.js':path==='/manifest.webmanifest'?'homepages/op-1/manifest.webmanifest':path.startsWith('/icons/')?'homepages/op-1'+path:null;
 try{if(file){response.writeHead(200,{'Content-Type':path.endsWith('.png')?'image/png':path.endsWith('.webmanifest')?'application/manifest+json':'text/javascript'});response.end(readFileSync(file));return}}catch(_){}
 response.writeHead(404);response.end('Not found');
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const baseUrl='http://127.0.0.1:'+server.address().port+'/';
const songs={midnight:104,subway:92,arcade:126,harbor:84,comet:140,bloom:112,tide:72,drift:132,horizon:96,velvet:110};
for(const [name,engine] of Object.entries({chromium,firefox,webkit})){
 const browser=await engine.launch({headless:true});
 try{
  for(const width of (name==='chromium'?[1440,390]:[1080])){
   const ctx=await browser.newContext({viewport:{width,height:900},acceptDownloads:true});
   try{
    const page=await ctx.newPage(),errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    await page.goto(baseUrl,{waitUntil:'domcontentloaded'});
    assert.match(await page.title(),/v2\.4/);
    await page.locator('[data-studio-group="Compose"]').click();
    await page.locator('[data-studio-tool="trackerStudio"]').click();
    assert(await page.locator('#trackerPerformance').count()===0||await page.locator('.tracker-performance').isVisible());
    assert.equal(await page.locator('#trackerDemo option').count(),10);
    page.on('dialog',dialog=>dialog.accept());
    for(const [key,bpm] of Object.entries(songs)){
     await page.locator('#trackerDemo').selectOption(key);
     await page.locator('#trackerExample').click();
     assert.equal(await page.locator('#trackerBpm').inputValue(),String(bpm));
     assert.equal(await page.locator('#trackerPattern option').count(),4);
     assert.equal(await page.locator('#trackerChain').inputValue(),'00 01 02 03');
     const count=await page.evaluate(()=>window.OP1Tracker.prepare().notes.length);
     assert(count>=60,key+' is not a complete composition: '+count);
    }
    // Unlock Web Audio through an explicit gesture, especially important in Firefox/WebKit headless.
    await page.evaluate(()=>{
     const Native=window.AudioContext;
     if(Native)window.AudioContext=class InstrumentedAudioContext extends Native{
      constructor(...args){super(...args);window.__testCtx=this}
     };
    });
    await page.locator('#startAudio').click();
    await page.locator('#trackerQuantize').selectOption('beat');
    await page.locator('[data-launch="0"]').click();
    await page.waitForFunction(()=>window.OP1Tracker.transport.mode==='live');
    await page.locator('[data-launch="1"]').click();
    assert.equal(await page.locator('.tracker-launch-pad.queued').count(),1);
    const clock=await page.evaluate(()=>window.__testCtx?.state);
    if(clock==='running'){
     await page.waitForFunction(()=>window.OP1Tracker.transport.pattern===1,null,{timeout:5500});
     assert.equal(await page.locator('.tracker-launch-pad[aria-pressed="true"]').count(),1);
    }else{
     // Some headless Firefox builds permanently suspend Web Audio without an output device.
     // Still assert the queued transport contract, but don't claim an acoustic timing check.
     assert.equal(await page.evaluate(()=>window.OP1Tracker.transport.queued),1);
     console.log('SKIP real-time pattern transition: headless audio context',name,width,clock);
    }
    await page.locator('#trackerAutomation').click();
    await page.locator('#trackerLevel0').evaluate(el=>{el.value='66';el.dispatchEvent(new Event('change',{bubbles:true}))});
    const state=await page.evaluate(()=>window.OP1Tracker.normalize(window.OP1Tracker.defaults()));
    assert(Array.isArray(state.automation));
    await page.waitForFunction(()=>Number(document.querySelector('#trackerAutoCount').textContent.split(' ')[0])>0);
    await page.locator('#trackerAutomation').click();
    await page.locator('#trackerLiveStop').click();
    assert.equal(await page.evaluate(()=>window.OP1Tracker.transport.playing),false);
    const outgoing=page.waitForEvent('download',{timeout:25000});
    await page.locator('#saveProject').click();
    const saved=JSON.parse(readFileSync(await(await outgoing).path(),'utf8'));
    assert.equal(saved.version,5,'Project format has changed');
    assert.equal(saved.tracker.automation.length,4,'Mixer automation did not save');
    assert.equal(saved.tracker.channels[0].level,.66);
    assert.equal(saved.tracker.patterns.length,4);
    assert.deepEqual(errors,[],'Browser errors: '+errors.join('; '));
    console.log('PASS v2.4 10 demos, queued launch, automation, project save',name,width);
    await page.close();
   }finally{await ctx.close()}
  }
 }finally{await browser.close()}
}
const browser=await chromium.launch({headless:true});
try{
 const ctx=await browser.newContext({viewport:{width:1300,height:900},acceptDownloads:true});
 try{
  const page=await ctx.newPage();
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(baseUrl,{waitUntil:'domcontentloaded'});
  await page.locator('[data-studio-group="Compose"]').click();
  await page.locator('[data-studio-tool="trackerStudio"]').click();
  await page.locator('#trackerDemo').selectOption('harbor');
  await page.locator('#trackerExample').click();
  await page.locator('[data-launch="0"]').click();
  await page.locator('#trackerTapeTrack').selectOption('1');
  await page.locator('#trackerTape').click();
  assert.match(await page.locator('#trackerStatus').innerText(),/RECORDING LIVE PERFORMANCE/);
  await page.waitForTimeout(1250);
  await page.locator('#trackerTape').click();
  await page.waitForFunction(()=>document.querySelector('#trackerStatus')?.textContent.includes('Live performance added to tape track 2'),null,{timeout:30000});
  await page.locator('#trackerLiveStop').click();
  const outgoing=page.waitForEvent('download',{timeout:25000});
  await page.locator('#saveProject').click();
  const saved=JSON.parse(readFileSync(await(await outgoing).path(),'utf8'));
  assert(saved.tracks[1].clips.length>=1,'Tape take missing');
  const clip=saved.tracks[1].clips.at(-1);
  assert(saved.audioSamples[clip.sampleId], 'Tape audio was not included in portable backup');
  assert.deepEqual(errors,[]);
  console.log('PASS v2.4 live performance recorded to tape and saved in portable backup');
  await page.close();
 }finally{await ctx.close()}
}finally{await browser.close()}

server.close();
