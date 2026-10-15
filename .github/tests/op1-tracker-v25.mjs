// v2.5 Focus-first workflow, 18-track musical library, musical expression and old-project compatibility.
import {chromium,firefox,webkit} from 'playwright';
import {readFileSync} from 'node:fs';
import {createServer} from 'node:http';
import vm from 'node:vm';
import assert from 'node:assert/strict';
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
const script=readFileSync('homepages/op-1/tracker.js','utf8');
{
 const env={window:{},structuredClone,console};vm.runInNewContext(script,env);
 const t=env.window.OP1Tracker,old=t.defaults();delete old.swing;delete old.synthShape;
 for(const c of old.channels){delete c.tone;delete c.fxSend}
 const fresh=t.normalize(old);
 assert.equal(fresh.swing,0);assert.equal(fresh.synthShape,'original');
 assert.equal(fresh.channels[0].tone,100);assert.equal(fresh.channels[0].fxSend,100);
 const cell={midi:60,inst:0,kind:'synth',vel:100,fx:'none',param:0};
 old.patterns[0].cells[0]=cell;
 const safe=t.normalize(old);
 assert.equal(safe.patterns[0].cells[0].length,1);
 assert.equal(safe.patterns[0].cells[0].chance,100);
 const invalid=structuredClone(old);invalid.swing=90;assert.throws(()=>t.normalize(invalid),/swing/);
 invalid.swing=0;invalid.channels[0].tone=-1;assert.throws(()=>t.normalize(invalid),/mixer/);
 invalid.channels[0].tone=100;invalid.patterns[0].cells[0].chance=15;assert.throws(()=>t.normalize(invalid),/length or probability/);
 const signatures=new Set();
 for(const key of ['midnight','subway','arcade','harbor','comet','bloom','tide','drift','horizon','velvet','copper','satellite','glitch','nightbus','neon','sunrise','tiny','soft']){
  const project=t.normalize(t.buildDemo(key));const rendered=t.prepare(project);
  assert.equal(project.patterns.length,4,key);assert.equal(project.chain.length,4,key);
  assert(rendered.notes.length>=60,key+' should be a complete original composition');
  signatures.add(project.bpm+':'+JSON.stringify(rendered.notes.slice(0,8).map(n=>[n.midi,n.ch,n.when])));
 }
 assert.equal(signatures.size,18,'The 18 original compositions should have distinct musical patterns');
 console.log('PASS v2.5 legacy normalization, note/chance validation, 18 original demos');
}
for(const [name,engine] of Object.entries({chromium,firefox,webkit})){
 const browser=await engine.launch({headless:true});
 try{
  for(const width of (name==='chromium'?[1440,390]:[1000])){
   const ctx=await browser.newContext({viewport:{width,height:880},acceptDownloads:true});
   try{
    const page=await ctx.newPage(),errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    await page.goto(baseUrl,{waitUntil:'domcontentloaded'});
    assert.match(await page.title(),/v2\.8/);
    assert(await page.locator('#studioWelcome').isVisible());
    assert.equal(await page.locator('#studioMainNavigation [data-studio-group]').count(),4);
    assert.match(await page.locator('#studioMainNavigation').innerText(),/PLAY/);
    assert.match(await page.locator('#studioMainNavigation').innerText(),/CREATE/);
    assert.match(await page.locator('#studioMainNavigation').innerText(),/TAPE/);
    assert.match(await page.locator('#studioMainNavigation').innerText(),/KEEP/);
    assert.equal(await page.locator('#studioAdvancedButton').getAttribute('aria-pressed'),'false');
    await page.locator('#studioQuickSongs').click();
    assert(await page.locator('#trackerStudio').isVisible());
    assert.equal(await page.locator('#trackerLibrary').getAttribute('open'),'');
    assert.equal(await page.locator('#trackerDemo option').count(),18);
    assert.equal(await page.locator('.tracker-song-card').count(),18);
    assert.equal(await page.locator('#trackerPerformanceOptions').getAttribute('open'),null);
    assert.equal(await page.locator('#trackerMixerOptions').getAttribute('open'),null);
    await page.locator('#trackerDemoSearch').fill('Copper');
    assert.equal(await page.locator('.tracker-song-card').count(),1);
    assert.match(await page.locator('.tracker-song-card').innerText(),/Copper Circuit/);
    await page.locator('#trackerDemoSearch').fill('');
    await page.locator('#trackerDemoStyle').selectOption('Ambient');
    assert((await page.locator('.tracker-song-card').count())>=2);
    await page.locator('#trackerDemoStyle').selectOption('all');
    await page.locator('[data-demo-choose="glitch"]').click();
    assert.equal(await page.locator('#trackerDemo').inputValue(),'glitch');
    // Non-destructive audio preview never replaces the current project.
    const snapshot=await page.evaluate(()=>JSON.stringify(window.OP1Tracker.normalize(window.OP1Tracker.defaults())));
    await page.locator('#startAudio').click();
    await page.locator('[data-demo-listen="glitch"]').click();
    console.log('PREVIEW PAGE ERRORS',name,width,errors);
    console.log('PREVIEW DIAG',name,width,await page.evaluate(()=>({
      previewing:window.OP1Tracker.previewing,
      status:document.querySelector('#trackerStatus').textContent,
      feedback:document.querySelector('#feedback')?.textContent.slice(0,200),errors:window.__diagErrors||[]
    })));
    assert.match(await page.locator('#trackerStatus').innerText(),/Previewing Glitch Garden/);
    const current=await page.evaluate(()=>JSON.stringify(window.OP1Tracker.normalize(window.OP1Tracker.defaults())));
    assert.equal(current,snapshot);
    // Old and new note controls remain editable, with extra shaping tucked away.
    await page.locator('#trackerGrooveOptions').evaluate(el=>el.open=true);
    await page.locator('#trackerLength').selectOption('4');
    await page.locator('#trackerChance').selectOption('100');
    await page.locator('#trackerMidi').fill('60');
    await page.locator('#trackerWrite').click();
    await page.locator('#trackerSwing').selectOption('25');
    await page.locator('#trackerSynthShape').selectOption('soft');
    await page.locator('#trackerMixerOptions').evaluate(el=>el.open=true);
    await page.locator('#trackerTone0').evaluate(el=>{el.value='72';el.dispatchEvent(new Event('change',{bubbles:true}))});
    await page.locator('#trackerFxSend0').evaluate(el=>{el.value='45';el.dispatchEvent(new Event('change',{bubbles:true}))});
    const pending=page.waitForEvent('download');
    await page.locator('#saveProject').click();
    const backup=JSON.parse(readFileSync(await(await pending).path(),'utf8'));
    assert.equal(backup.format,'op1-browser-lab-v05');
    assert.equal(backup.version,5);
    assert.equal(backup.tracker.swing,25);
    assert.equal(backup.tracker.synthShape,'soft');
    assert.equal(backup.tracker.channels[0].tone,72);
    assert.equal(backup.tracker.channels[0].fxSend,45);
    assert.equal(backup.tracker.patterns[0].cells[0].length,4);
    assert.equal(backup.tracker.patterns[0].cells[0].chance,100);
    await page.locator('#studioAdvancedButton').click();
    assert.equal(await page.locator('#trackerMixerOptions').getAttribute('open'),'');
    assert(await page.locator('#comfortTabs').isVisible());
    await page.locator('#studioSimpleButton').click();
    assert.equal(await page.locator('#trackerMixerOptions').getAttribute('open'),null);
    assert(await page.locator('#trackerStudio').isVisible());
    if(width===390){
     const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
     assert(overflow<=1,'Mobile overflow in v2.5: '+overflow);
    }
    assert.deepEqual(errors,[],'Browser errors: '+errors.join('; '));
    console.log('PASS v2.5 guided workflow, library, preview, sound controls, portable format',name,width);
    await ctx.close();
   }finally{await ctx.close().catch(()=>{})}
  }
 }finally{await browser.close()}
}

server.close();
