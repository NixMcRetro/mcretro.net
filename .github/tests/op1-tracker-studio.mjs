// v2.3 Tracker Studio safety and browser integration.
import { chromium, firefox, webkit } from 'playwright';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import { rawHtml } from './op1-test-html.mjs';
const js=readFileSync('homepages/op-1/tracker.js','utf8');
{
 const box={window:{},structuredClone,console};vm.runInNewContext(js,box);
 const t=box.window.OP1Tracker;
 assert.equal(t.normalize(null).patterns[0].cells.length,128);
 assert.throws(()=>t.normalize({patterns:[],chain:[0],bank:0,bpm:120,active:0}));
 const good=t.defaults(),bad=structuredClone(good);bad.patterns[0].cells[0]={midi:200,inst:0,vel:100,fx:'none',kind:'synth',param:0};
 assert.throws(()=>t.normalize(bad));
 const other=structuredClone(good);other.patterns[0].cells[0]={midi:60,inst:1,vel:90,fx:'vibrato',kind:'synth',param:3};
 assert.equal(t.normalize(other).patterns[0].cells[0].fx,'vibrato');
 assert.equal(t.normalize(good).chain.length,1);
}
for(const [name,engine] of Object.entries({chromium,firefox,webkit})){
 const browser=await engine.launch({headless:true});
 try{
  for(const width of (name==='chromium'?[1440,390]:[1100])){
   const ctx=await browser.newContext({viewport:{width,height:880},acceptDownloads:true});
   const page=await ctx.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
   await page.setContent(rawHtml,{waitUntil:'domcontentloaded'});
   assert.match(await page.title(),/v2\.3/);
   await page.locator('[data-studio-group="Compose"]').click();
   await page.locator('[data-studio-tool="trackerStudio"]').click();
   assert(await page.locator('#trackerStudio').isVisible());
   if(width===390)await page.locator('#trackerView').selectOption('all'); // Restore v2.2 four-column test view on phones.
   assert.equal(await page.locator('#trackerGrid [data-tracker-row]').count(),128);
   assert.equal(await page.locator('.tracker-row').count(),32);
   await page.locator('#trackerMidi').fill('60');
   await page.locator('#trackerWrite').click();
   const downloaded=async(button='#saveProject')=>{
    const pending=page.waitForEvent('download',{timeout:25000});
    await page.locator(button).click({timeout:12000});
    const feedbackNow=await page.locator('#feedback').innerText().catch(()=>'(unavailable)');
    const trackerNow=await page.locator('#trackerStatus').innerText().catch(()=>'(unavailable)');
    try{return JSON.parse(readFileSync(await(await pending).path(),'utf8'))}
    catch(e){
     const feedback=await page.locator('#feedback').innerText().catch(()=>'(unavailable)');
     throw Error('Project export via '+button+' failed: '+e.message+'; immediate feedback: '+feedbackNow+'; later feedback: '+feedback+'; tracker: '+trackerNow+'; pageerrors: '+errors.join(' | '));
    }
   };
   let project=await downloaded();
   assert.equal(project.version,5,'portable project version changed');
   assert.equal(project.tracker.patterns[0].cells[0].midi,60);
   assert.equal(project.tracks.length,4);
   assert.equal(project.songWorkspace.clips.length,0);
   // Cell clipboard, undo and chain-loop controls must not mutate unrelated state.
   await page.locator('#trackerCopy').click();
   await page.locator('[data-tracker-row="1"][data-tracker-ch="1"]').click();
   await page.locator('#trackerPaste').click();
   assert.equal((await downloaded()).tracker.patterns[0].cells[5].midi,60);
   await page.locator('#trackerUndo').click();
   assert.equal((await downloaded()).tracker.patterns[0].cells[5],null);
   await page.locator('#trackerLoop').click();
   assert.equal(await page.locator('#trackerLoop').getAttribute('aria-pressed'),'true');
   await page.locator('#trackerLoop').click();
   assert.equal(await page.locator('#trackerLoop').getAttribute('aria-pressed'),'false');
   // Create a drum hit in channel 4.
   await page.locator('[data-tracker-row="4"][data-tracker-ch="3"]').click();
   await page.locator('#trackerKind').selectOption('drum');
   await page.locator('#trackerInstrument').selectOption('0');
   await page.locator('#trackerWrite').click();
   await page.locator('#trackerClone').click();
   assert.equal(await page.locator('#trackerPattern option').count(),2);
   await page.locator('#trackerChain').fill('00 01 00');
   await page.locator('#trackerApplyChain').click();
   await page.locator('#trackerPattern').selectOption('0');
   project=await downloaded();
   assert.deepEqual(project.tracker.chain,[0,1,0]);
   assert.equal(project.tracker.patterns[1].cells[19].kind,'drum');
   // Exported MIDI must be a valid single-track SMF with events.
   {
    const download=page.waitForEvent('download',{timeout:20000});await page.locator('#trackerMidiExport').click();
    const bytes=readFileSync(await(await download).path());
    assert.equal(bytes.toString('ascii',0,4),'MThd');
    assert.equal(bytes.readUInt16BE(8),0);
    assert.equal(bytes.readUInt16BE(10),1);
    assert.equal(bytes.toString('ascii',14,18),'MTrk');
    assert.equal(bytes.readUInt32BE(18),bytes.length-22,'MIDI track length mismatch');
    assert([...bytes.subarray(22)].some(x=>(x&0xf0)===0x90),'MIDI note-on events missing');
   }
   // Legacy v5 projects still load and produce an empty default tracker.
   const original=await downloaded();
   const legacy=structuredClone(original);delete legacy.tracker;
   await page.locator('#projectFile').setInputFiles({name:'older-v5.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(legacy))});
   await page.waitForFunction(()=>document.querySelector('#feedback')?.textContent.includes('Project loaded'),null,{timeout:25000});
   assert.equal((await downloaded()).tracker.patterns.length,1);
   assert.equal((await downloaded()).tracker.patterns[0].cells.filter(Boolean).length,0);
   // Reopen the modern project with its exact chain, effects and existing audio state.
   await page.locator('#projectFile').setInputFiles({name:'tracker-v5.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(original))});
   await page.waitForFunction(()=>document.querySelector('#feedback')?.textContent.includes('Project loaded'),null,{timeout:25000});
   assert.deepEqual((await downloaded()).tracker,original.tracker);
   // Drum + melodic notes copied to song without touching original tracker.
   await page.locator('#trackerToSong').click();
   const withClips=await downloaded();
   assert(withClips.songWorkspace.clips.some(c=>c.kind==='roll'),'Synth notes missing from song');
   assert(withClips.songWorkspace.clips.some(c=>c.kind==='pattern'),'Drum notes missing from song');
   assert.deepEqual(withClips.tracker,original.tracker,'Song transfer mutated tracker patterns');
   await page.locator('#studioAdvancedButton').click();
   await page.getByRole('tab',{name:'Compose'}).click();
   assert(await page.locator('#trackerStudio').isVisible(),'Tracker disappeared in Advanced');
   await page.locator('#studioSimpleButton').click();
   assert(await page.locator('#trackerStudio').isVisible(),'Tracker not restored in Simple');
   // Verify the example in a fresh session. Browsers may throttle repeated automatic downloads
   // after many rapid save clicks in one test context; this also checks portable reload safety.
   const demoCtx=await browser.newContext({viewport:{width,height:880},acceptDownloads:true});
   try{
    const demoPage=await demoCtx.newPage(),demoErrors=[];
    demoPage.on('pageerror',e=>demoErrors.push(e.message));
    await demoPage.setContent(rawHtml,{waitUntil:'domcontentloaded'});
    await demoPage.locator('[data-studio-group="Compose"]').click();
    await demoPage.locator('[data-studio-tool="trackerStudio"]').click();
    await demoPage.locator('#projectFile').setInputFiles({name:'existing-song.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(withClips))});
    await demoPage.waitForFunction(()=>document.querySelector('#feedback')?.textContent.includes('Project loaded'),null,{timeout:25000});
    demoPage.once('dialog',dialog=>dialog.accept());
    await demoPage.locator('#trackerExample').click();
    assert.equal(await demoPage.locator('#trackerPattern option').count(),4);
    assert.equal(await demoPage.locator('#trackerBpm').inputValue(),'104');
    const demoDownloaded=async()=>{
     const download=demoPage.waitForEvent('download',{timeout:25000});
     await demoPage.locator('#saveProject').click();
     return JSON.parse(readFileSync(await(await download).path(),'utf8'));
    };
    const demo=await demoDownloaded();
    assert.equal(demo.tracker.patterns.length,4);
    assert.deepEqual(demo.tracker.chain,[0,1,2,3]);
    assert.equal(demo.tracker.bpm,104);
    assert(demo.tracker.patterns.flatMap(p=>p.cells).filter(Boolean).length>80);
    assert.deepEqual(demo.songWorkspace.clips,withClips.songWorkspace.clips,'Example modified existing song clips');
    await demoPage.locator('#trackerUndo').click();
    assert.deepEqual((await demoDownloaded()).tracker,original.tracker,'Example undo lost original tracker data');
    assert.deepEqual(demoErrors,[],'Example caused unexpected JS exceptions');
   }finally{await demoCtx.close()}
   assert.deepEqual(errors,[],'Unexpected JS exceptions');
   if(width===390){
    const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
    assert(overflow<=1,'Tracker caused horizontal page overflow: '+overflow);
   }
   console.log('PASS tracker patterns, chain, MIDI, legacy projects, Song Workspace',name,width);
   await ctx.close();
  }
 }finally{await browser.close()}
}
// Audio production through the exact Web Audio graph in Chromium.
{
 const browser=await chromium.launch({headless:true});
 try{
  const ctx=await browser.newContext({viewport:{width:1280,height:920},acceptDownloads:true}),page=await ctx.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));await page.setContent(rawHtml,{waitUntil:'domcontentloaded'});
  await page.locator('[data-studio-group="Compose"]').click();
  await page.locator('[data-studio-tool="trackerStudio"]').click();
  await page.locator('#trackerMidi').fill('60');
  await page.locator('#trackerWrite').click();
  await page.locator('#trackerLoop').click();
  await page.locator('#trackerPlay').click();
  assert.match(await page.locator('#trackerPlay').innerText(),/STOP CHAIN/);
  await page.waitForTimeout(320);
  await page.locator('#trackerStop').click();
  assert.match(await page.locator('#trackerPlay').innerText(),/PLAY CHAIN/);
  await page.locator('#trackerLoop').click();
  const download=page.waitForEvent('download',{timeout:60000});await page.locator('#trackerWav').click();
  const wav=readFileSync(await(await download).path());
  assert.equal(wav.toString('ascii',0,4),'RIFF');
  let peak=0;for(let i=44;i<wav.length-1;i+=2)peak=Math.max(peak,Math.abs(wav.readInt16LE(i)));
  assert(peak>100,'Tracker offline WAV was silent');assert.equal(await page.locator('#trackerStatus').innerText(),'Stereo tracker WAV exported');
  assert.deepEqual(errors,[]);
  await ctx.close();
 }finally{await browser.close()}
 console.log('PASS tracker 4-channel Web Audio WAV export');
}
