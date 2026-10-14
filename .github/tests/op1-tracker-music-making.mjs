// v2.3 Music-Making Update. Original editing, mixer, mobile and sample handoff regression.
import {chromium,firefox,webkit} from 'playwright';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {rawHtml} from './op1-test-html.mjs';
const src=readFileSync('homepages/op-1/tracker.js','utf8');
{
 const box={window:{},structuredClone,console};vm.runInNewContext(src,box);
 const tracker=box.window.OP1Tracker,d=tracker.defaults();
 assert.equal(d.channels.length,4);
 assert.equal(tracker.normalize(d).channels[0].level,1);
 const old=structuredClone(d);delete old.channels;
 assert.equal(tracker.normalize(old).channels.length,4,'Older projects need default mixer settings');
 const bad=structuredClone(d);bad.channels[0].level=9;
 assert.throws(()=>tracker.normalize(bad),/mixer channel/);
 const invalid=structuredClone(d);invalid.channels[0].pan=Infinity;
 assert.throws(()=>tracker.normalize(invalid));
}
for(const [name,engine] of Object.entries({chromium,firefox,webkit})){
 const browser=await engine.launch({headless:true});
 try{
  for(const width of (name==='chromium'?[1440,390]:[1100])){
   const ctx=await browser.newContext({viewport:{width,height:850},acceptDownloads:true});
   try{
    const page=await ctx.newPage(),errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    await page.setContent(rawHtml,{waitUntil:'domcontentloaded'});
    assert.match(await page.title(),/v2\.3/);
    await page.locator('[data-studio-group="Compose"]').click();
    await page.locator('[data-studio-tool="trackerStudio"]').click();
    assert(await page.locator('#trackerStudio').isVisible());
    assert.equal(await page.locator('.tracker-mixer-strip').count(),4);
    assert.equal(await page.locator('#trackerGrid [data-tracker-row]').count(),128);
    if(width===390){
     assert.equal(await page.locator('#trackerView').inputValue(),'0','Phone should focus one channel');
     assert.equal(await page.locator('.tracker-cell:visible').count(),32);
     await page.locator('#trackerView').selectOption('2');
     assert.equal(await page.locator('.tracker-cell:visible').count(),32);
     await page.locator('#trackerView').selectOption('0');
     const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
     assert(overflow<=1,'Mobile page overflow: '+overflow);
    }
    await page.locator('#trackerMidi').fill('60');
    await page.locator('#trackerWrite').click();
    await page.locator('.tracker-batch-editor summary').click();
    await page.locator('#trackerBlockRows').selectOption('1');
    await page.locator('[data-tracker-row="0"][data-tracker-ch="0"]').click();
    await page.locator('#trackerCopyBlock').click();
    await page.locator('[data-tracker-row="1"][data-tracker-ch="0"]').click();
    await page.locator('#trackerPasteBlock').click();
    const notes=()=>page.evaluate(()=>window.OP1Tracker.prepare().notes.filter(n=>n.ch===0).map(n=>({row:n.row,midi:n.midi})));
    assert((await notes()).some(n=>n.row===1&&n.midi===60),'Row paste failed');
    await page.locator('#trackerUndo').click();
    assert(!(await notes()).some(n=>n.row===1),'Undo failed');
    await page.locator('#trackerRedo').click();
    assert((await notes()).some(n=>n.row===1&&n.midi===60),'Redo failed');
    await page.locator('#trackerTranspose').fill('2');
    await page.locator('#trackerTransposeButton').click();
    assert((await notes()).some(n=>n.row===1&&n.midi===62),'Transpose failed');
    await page.locator('#trackerMute0').click();
    assert.equal(await page.locator('#trackerMute0').getAttribute('aria-pressed'),'true');
    await page.locator('#trackerMute0').click();
    await page.locator('#trackerSolo0').click();
    assert.equal(await page.locator('#trackerSolo0').getAttribute('aria-pressed'),'true');
    await page.locator('#trackerSolo0').click();
    await page.locator('#trackerLevel0').evaluate(el=>{el.value='65';el.dispatchEvent(new Event('change',{bubbles:true}))});
    await page.locator('#trackerPan0').evaluate(el=>{el.value='-30';el.dispatchEvent(new Event('change',{bubbles:true}))});
    assert.equal(await page.locator('#trackerLevelText0').innerText(),'65%');
    assert.equal(await page.locator('#trackerPanText0').innerText(),'L30');
    const saved=page.waitForEvent('download',{timeout:25000});
    await page.locator('#saveProject').click();
    const project=JSON.parse(readFileSync(await(await saved).path(),'utf8'));
    assert.equal(project.version,5,'Project format changed');
    assert.equal(project.tracker.channels[0].level,.65);
    assert.equal(project.tracker.channels[0].pan,-.3);
    assert.deepEqual(errors,[],'Unexpected browser JS errors');
    console.log('PASS v2.3 editing, mixer, persistence and mobile',name,width);
   }finally{await ctx.close()}
  }
 }finally{await browser.close()}
}
// Three wholly original compositions must differ in tempo and arrangement.
{
 const browser=await chromium.launch({headless:true});
 try{
  const ctx=await browser.newContext({viewport:{width:1280,height:900}});
  const page=await ctx.newPage();await page.setContent(rawHtml,{waitUntil:'domcontentloaded'});
  await page.locator('[data-studio-group="Compose"]').click();
  await page.locator('[data-studio-tool="trackerStudio"]').click();
  page.on('dialog',dialog=>dialog.accept());
  for(const [key,bpm] of [['midnight','104'],['subway','92'],['arcade','126']]){
   await page.locator('#trackerDemo').selectOption(key);
   await page.locator('#trackerExample').click();
   assert.equal(await page.locator('#trackerBpm').inputValue(),bpm);
   assert.equal(await page.locator('#trackerPattern option').count(),4);
   assert.equal(await page.locator('#trackerChain').inputValue(),'00 01 02 03');
   assert((await page.evaluate(()=>window.OP1Tracker.prepare().notes.length))>65);
  }
  await ctx.close();
 }finally{await browser.close()}
 console.log('PASS v2.3 original composition library');
}
function sampleWav(){
 const rate=22050,len=rate*2,bytes=Buffer.alloc(44+len*2),v=new DataView(bytes.buffer,bytes.byteOffset,bytes.byteLength);
 for(const [at,word] of [[0,'RIFF'],[8,'WAVE'],[12,'fmt '],[36,'data']])for(let i=0;i<word.length;i++)v.setUint8(at+i,word.charCodeAt(i));
 v.setUint32(4,36+len*2,true);v.setUint32(16,16,true);v.setUint16(20,1,true);v.setUint16(22,1,true);
 v.setUint32(24,rate,true);v.setUint32(28,rate*2,true);v.setUint16(32,2,true);v.setUint16(34,16,true);v.setUint32(40,len*2,true);
 for(let i=0;i<len;i++)v.setInt16(44+i*2,Math.round(Math.sin(i*2*Math.PI*220/rate)*5500),true);
 return bytes;
}
{
 const browser=await chromium.launch({headless:true});
 try{
  const ctx=await browser.newContext({viewport:{width:1280,height:850},acceptDownloads:true});
  const page=await ctx.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.setContent(rawHtml,{waitUntil:'domcontentloaded'});
  await page.locator('[data-studio-group="Compose"]').click();
  await page.locator('[data-studio-tool="trackerStudio"]').click();
  await page.locator('#sampleAudioFile').setInputFiles({name:'original-tone.wav',mimeType:'audio/wav',buffer:sampleWav()});
  await page.waitForFunction(()=>document.querySelector('#sampleWorkshopStatus')?.textContent.includes('2.00 SECONDS'),null,{timeout:25000});
  await page.locator('#trackerKind').selectOption('sample');
  await page.locator('#trackerInstrument').selectOption('1');
  await page.locator('#trackerWrite').click();
  await page.locator('#trackerToSong').click();
  assert.match(await page.locator('#trackerStatus').innerText(),/appended/i);
  const pending=page.waitForEvent('download',{timeout:25000});
  await page.locator('#saveProject').click();
  const project=JSON.parse(readFileSync(await(await pending).path(),'utf8'));
  const sample=project.songWorkspace.clips.find(c=>c.kind==='pattern'&&c.voice==='sample');
  assert(sample,'Sample-slice pattern did not reach Song Workspace');
  assert.equal(sample.pattern[0],1);
  assert(sample.sampleId&&project.audioSamples[sample.sampleId],'Song sample missing from portable backup');
  assert.deepEqual(errors,[]);
  await ctx.close();
 }finally{await browser.close()}
 console.log('PASS sample-slice handoff and portable audio backup');
}
