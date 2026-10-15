// v2.8: playable keyboard riff takes, safe section edits and Undo.
import {chromium,firefox,webkit} from 'playwright';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {beginnerHtml} from './op1-test-html.mjs';
async function backup(page){
 const download=page.waitForEvent('download',{timeout:60000});
 await page.locator('#saveProject').click();
 return JSON.parse(readFileSync(await (await download).path(),'utf8'));
}
function cellsOf(p,ch){return p.cells.filter((_,i)=>i%4===ch)}
for(const [name,engine] of Object.entries({chromium,firefox,webkit})){
 const browser=await engine.launch({headless:true});
 try{
  const ctx=await browser.newContext({viewport:{width:name==='chromium'?390:1200,height:860},acceptDownloads:true}),page=await ctx.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(String(e)));
  await page.setContent(beginnerHtml,{waitUntil:'domcontentloaded'});
  assert.match(await page.title(),/v2\.8/);
  assert.equal(await page.locator('#makerEasySection option').count(),0);
  await page.locator('#makerGenerate').click();
  const original=await backup(page);
  assert.equal(original.version,5);
  assert.equal(await page.locator('#makerEasySection option').count(),4);
  assert.equal(await page.locator('#riffRecorder').count(),1);
  await page.locator('#makerEasyPart').selectOption('3');
  await page.locator('#makerEasySection').selectOption('2');
  await page.locator('#makerEasyDirection').selectOption('lower');
  await page.locator('#makerEasyApply').click();
  const higher=await backup(page);
  assert.notDeepEqual(cellsOf(higher.tracker.patterns[2],3),cellsOf(original.tracker.patterns[2],3),'Lower must transpose melody');
  for(const ch of [0,1,2])assert.deepEqual(cellsOf(higher.tracker.patterns[2],ch),cellsOf(original.tracker.patterns[2],ch));
  for(const sec of [0,1,3])assert.deepEqual(higher.tracker.patterns[sec],original.tracker.patterns[sec]);
  await page.locator('#makerEasyUndo').click();
  assert.deepEqual((await backup(page)).tracker,original.tracker,'Guided undo restores all previous notes');
  await page.locator('#makerEasyDirection').selectOption('simpler');
  await page.locator('#makerEasyApply').click();
  const simpler=await backup(page);
  assert(cellsOf(simpler.tracker.patterns[2],3).filter(Boolean).length<cellsOf(original.tracker.patterns[2],3).filter(Boolean).length);
  await page.locator('#makerEasyUndo').click();
  assert.deepEqual((await backup(page)).tracker,original.tracker);
  await page.locator('#makerEasyDirection').selectOption('regenerate');
  await page.locator('#makerEasyApply').click();
  const fresh=await backup(page);
  assert.notDeepEqual(cellsOf(fresh.tracker.patterns[2],3),cellsOf(original.tracker.patterns[2],3));
  assert.deepEqual(fresh.tracks,original.tracks);
  assert.deepEqual(fresh.songWorkspace,original.songWorkspace);
  await page.locator('#makerEasyUndo').click();
  assert.deepEqual((await backup(page)).tracker,original.tracker);
  // Busier should add notes without touching other sections or channels.
  await page.locator('#makerEasyDirection').selectOption('busier');
  await page.locator('#makerEasyApply').click();
  const busier=await backup(page);
  assert(cellsOf(busier.tracker.patterns[2],3).filter(Boolean).length>=cellsOf(original.tracker.patterns[2],3).filter(Boolean).length);
  await page.locator('#makerEasyUndo').click();
  assert.deepEqual((await backup(page)).tracker,original.tracker);
  await page.locator('#makerLock3').click();
  await page.locator('#makerEasyApply').click();
  assert.deepEqual((await backup(page)).tracker,original.tracker,'Locked melody may not change');
  await page.locator('#makerLock3').click();
  // Shared section patterns must be cloned, never overwritten in other sections.
  const shared=structuredClone(original.tracker);
  shared.arrangement[1].pattern=shared.arrangement[0].pattern;
  page.once('dialog',dialog=>dialog.accept());
  assert(await page.evaluate(song=>window.OP1Tracker.applyMusicMakerSong(song),shared));
  const priorShared=await page.evaluate(()=>window.OP1Tracker.musicMakerSnapshot());
  const synth={midi:60,inst:0,kind:'synth',vel:95,fx:'none',param:0,length:1,chance:100};
  const newTake=Array.from({length:32},(_,i)=>i===4?synth:null);
  const isolated=await page.evaluate(t=>window.OP1Tracker.applyMusicMakerRecording(1,3,t),newTake);
  assert(isolated);
  const split=await page.evaluate(()=>window.OP1Tracker.musicMakerSnapshot());
  assert.equal(split.patterns.length,priorShared.patterns.length+1);
  assert.equal(split.arrangement[0].pattern,0);
  assert.notEqual(split.arrangement[1].pattern,0);
  assert.deepEqual(split.patterns[0],priorShared.patterns[0],'Original section must not change');
  await page.evaluate(()=>window.OP1Tracker.undo());
  assert.deepEqual(await page.evaluate(()=>window.OP1Tracker.musicMakerSnapshot()),priorShared,'Undo restores shared pattern arrangement');
  // Undo the shared-pattern fixture to restore the original composition.
  await page.evaluate(()=>window.OP1Tracker.undo());
  assert.deepEqual(await page.evaluate(()=>window.OP1Tracker.musicMakerSnapshot()),original.tracker);
  const unit=60000/120/4;
  const result=await page.evaluate(({unit})=>window.OP1RiffRecorder.quantize([
   {midi:60,startMs:1000+unit*.08,endMs:1000+unit*1.8},
   {midi:64,startMs:1000+unit*2.1,endMs:1000+unit*2.7},
   {midi:60,startMs:1000-unit*4,endMs:1000-unit*2},
   {midi:67,startMs:1000+unit*34,endMs:1000+unit*35}
  ],1000,120,5),{unit});
  assert.equal(result.length,32);
  assert.equal(result[0].midi,60);
  assert.equal(result[0].length,2);
  assert.equal(result[2].midi,64);
  assert.equal(result[2].length,.5);
  assert.equal(result.filter(Boolean).length,2);
  assert.equal(result[0].inst,5);
  await page.locator('#makerTabKeyboard').click();
  assert(await page.locator('#riffRecorder').isVisible());
  assert.equal(await page.locator('#riffSection option').count(),4);
  const replacement=Array.from({length:32},(_,i)=>i===4?result[0]:null);
  const before=original;
  const worked=await page.evaluate(({cells})=>window.OP1Tracker.applyMusicMakerRecording(2,3,cells),{cells:replacement});
  assert(worked,'A completed take should become normal tracker notes');
  const recorded={tracker:await page.evaluate(()=>window.OP1Tracker.musicMakerSnapshot()),tracks:original.tracks,songWorkspace:original.songWorkspace};
  assert.equal(recorded.tracker.patterns[2].cells[4*4+3].midi,60);
  for(const ch of [0,1,2])assert.deepEqual(cellsOf(recorded.tracker.patterns[2],ch),cellsOf(before.tracker.patterns[2],ch));
  assert.deepEqual(recorded.songWorkspace,before.songWorkspace);
  assert.deepEqual(recorded.tracks,before.tracks);
  await page.evaluate(()=>window.OP1Tracker.undo());
  assert.deepEqual(await page.evaluate(()=>window.OP1Tracker.musicMakerSnapshot()),before.tracker);
  if(name==='chromium'){
   await page.locator('#riffSection').selectOption('0');
   await page.locator('#riffRecord').click();
   await page.waitForFunction(()=>window.OP1RiffRecorder.phase==='recording',null,{timeout:15000});
   await page.keyboard.down('z');await page.waitForTimeout(200);await page.keyboard.up('z');
   await page.locator('#riffStop').click();
   assert(await page.locator('#riffKeep').isEnabled(),'Physical keyboard should capture note presses');
   assert.deepEqual(await page.evaluate(()=>window.OP1Tracker.musicMakerSnapshot()),before.tracker,'Take must not save before Keep');
   await page.locator('#riffTry').click();
   assert.match(await page.locator('#riffStatus').innerText(),/Playing the proposed riff/);
   assert.deepEqual(await page.evaluate(()=>window.OP1Tracker.musicMakerSnapshot()),before.tracker,'Take audition must remain unsaved');
   await page.locator('#riffKeep').click();
   const done=await backup(page);
   assert.notDeepEqual(cellsOf(done.tracker.patterns[0],3),cellsOf(before.tracker.patterns[0],3));
   await page.locator('#riffUndo').click();
   assert.deepEqual(await page.evaluate(()=>window.OP1Tracker.musicMakerSnapshot()),before.tracker,'Undo Take restores the complete original project');
   const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
   assert(overflow<=1,'Phone view overflows by '+overflow);
  }
  assert.deepEqual(errors,[],'Unexpected browser errors: '+errors.join('; '));
  console.log('PASS v2.8 beginner riff recorder, quantisation, section-local changes and Undo',name);
  await ctx.close();
 }finally{await browser.close()}
}
