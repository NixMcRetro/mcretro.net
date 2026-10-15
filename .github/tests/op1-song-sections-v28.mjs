// v2.8 Stage 3: beginner visual song arrangement and saved project compatibility.
import {chromium,firefox,webkit} from 'playwright';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {beginnerHtml} from './op1-test-html.mjs';
async function snapshot(page){return page.evaluate(()=>window.OP1Tracker.musicMakerSnapshot());}
async function project(page){
 const downloading=page.waitForEvent('download',{timeout:60000});
 await page.locator('#saveProject').click();
 return JSON.parse(readFileSync(await(await downloading).path(),'utf8'));
}
for(const [name,engine] of Object.entries({chromium,firefox,webkit})){
 const browser=await engine.launch({headless:true});
 try{
  const width=1150;
  const ctx=await browser.newContext({viewport:{width,height:870},acceptDownloads:true});
  const page=await ctx.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.setContent(beginnerHtml,{waitUntil:'domcontentloaded'});
  assert.equal(await page.locator('#makerSongSections').count(),1);
  assert.equal(await page.locator('.maker-section-card').count(),0);
  await page.locator('#makerGenerate').click();
  const start=await snapshot(page);
  assert.equal(start.arrangement.length,4);
  assert.deepEqual(start.arrangement.map(x=>x.label),['Intro','Verse','Chorus','Outro']);
  assert.equal(await page.locator('.maker-section-card').count(),4);
  assert.equal(await page.locator('#makerSectionsSummary').textContent().then(x=>x.includes('4 sections')),true);
  assert.equal(await page.locator('#makerSectionAdd').isEnabled(),true);
  await page.locator('[data-song-select="2"]').click();
  assert.equal(await page.locator('#makerEasySection').inputValue(),'2');
  assert.equal(await page.locator('#riffSection').inputValue(),'2');
  // Rename one section and restore in a single tracker undo.
  await page.locator('#makerSectionRole').selectOption('Break');
  let changed=await snapshot(page);
  assert.equal(changed.arrangement[2].label,'Break');
  assert.deepEqual(changed.patterns,start.patterns,'Renaming a section must not touch notes');
  await page.locator('#makerSectionUndo').click();
  assert.deepEqual(await snapshot(page),start);
  // Shorten a section without changing its source music.
  await page.locator('#makerSectionLength').selectOption('16');
  changed=await snapshot(page);
  assert.equal(changed.arrangement[2].rows,16);
  assert.equal(changed.patterns.length,start.patterns.length);
  assert.deepEqual(changed.patterns,start.patterns);
  await page.locator('#makerSectionUndo').click();
  assert.deepEqual(await snapshot(page),start);
  // Copying a section creates another song entry, not a destructive pattern replacement.
  await page.locator('#makerSectionDuplicate').click();
  const copied=await snapshot(page);
  assert.equal(copied.arrangement.length,5);
  assert.equal(copied.arrangement[3].pattern,copied.arrangement[2].pattern);
  assert.deepEqual(copied.patterns,start.patterns);
  assert.equal(await page.locator('.maker-section-card').count(),5);
  // Label the copy to distinguish it and move it with accessible arrows.
  await page.locator('#makerSectionRole').selectOption('Break');
  await page.locator('#makerSectionBefore').click();
  changed=await snapshot(page);
  assert.equal(changed.arrangement[2].label,'Break');
  assert.equal(changed.arrangement[3].label,'Chorus');
  await page.locator('#makerSectionUndo').click();
  changed=await snapshot(page);
  assert.equal(changed.arrangement[2].label,'Chorus');
  assert.equal(changed.arrangement[3].label,'Break');
  // The stage 2 part editor must split the copied pattern before changing notes.
  await page.locator('#makerSectionChange').click();
  assert.equal(await page.locator('#makerEasySection').inputValue(),'3');
  await page.locator('#makerEasyPart').selectOption('3');
  await page.locator('#makerEasyDirection').selectOption('lower');
  await page.locator('#makerEasyApply').click();
  const separate=await snapshot(page);
  assert.notEqual(separate.arrangement[3].pattern,separate.arrangement[2].pattern);
  assert.deepEqual(separate.patterns[2],start.patterns[2]);
  await page.locator('#makerEasyUndo').click();
  assert.deepEqual(await snapshot(page),changed);
  // Remove only the duplicate, retaining all original patterns and arrangements.
  page.once('dialog',d=>d.accept());
  await page.locator('#makerSectionDelete').click();
  assert.deepEqual(await snapshot(page),start);
  // Adding from a selected section creates a reusable musical section.
  await page.locator('#makerSectionAdd').click();
  assert.equal((await snapshot(page)).arrangement.length,5);
  await page.locator('#makerSectionUndo').click();
  assert.deepEqual(await snapshot(page),start);
  // Desktop drag-and-drop is supplemental to the arrow buttons for phones/keyboard.
  if(name==='chromium'){
   const from=page.locator('[data-song-select="0"]'),to=page.locator('[data-song-select="2"]');
   await from.dragTo(to);
   const moved=await snapshot(page);
   assert.equal(moved.arrangement[2].label,'Intro','Dragged card should land at its new position');
   await page.locator('#makerSectionUndo').click();
   assert.deepEqual(await snapshot(page),start);
  }
  // Selecting a card should open recording for exactly that section, without edits.
  await page.locator('[data-song-select="1"]').click();
  await page.locator('#makerSectionRecord').click();
  assert(await page.locator('#casioKeyboardPanel').isVisible());
  assert.equal(await page.locator('#riffSection').inputValue(),'1');
  await page.locator('#makerTabCompose').click();
  // More than three minutes should be clearly flagged and disable WAV export.
  const over=await page.evaluate(()=>{
   for(let i=0;i<4;i++)if(!window.OP1Tracker.musicMakerArrange('rows',i,128))return false;
   for(let i=0;i<9;i++)if(!window.OP1Tracker.musicMakerArrange('duplicate',0))return false;
   return true;
  });
  assert(over);
  assert(await page.locator('#makerSectionsLimit').isVisible());
  assert(await page.locator('#makerFinish').isDisabled());
  // Existing version 5 projects load with their visual section layout retained.
  const saved=await project(page);
  assert.equal(saved.version,5);
  assert.equal(saved.tracks.length,4);
  const fresh=await ctx.newPage();fresh.on('pageerror',e=>errors.push(e.message));
  await fresh.setContent(beginnerHtml,{waitUntil:'domcontentloaded'});
  await fresh.locator('#projectFile').setInputFiles({name:'v28-song.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(saved))});
  await fresh.waitForFunction(()=>document.querySelector('#feedback')?.textContent.includes('Project loaded'),null,{timeout:30000});
  assert.equal(await fresh.locator('.maker-section-card').count(),saved.tracker.arrangement.length);
  assert.deepEqual(await fresh.evaluate(()=>window.OP1Tracker.musicMakerSnapshot()),saved.tracker);
  // Narrow phone view should scroll card strip, not the entire page.
  if(name==='chromium'){
   await page.setViewportSize({width:390,height:870});
   const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
   assert(overflow<=1,'Song section layout overflows phone screen by '+overflow);}
  assert.deepEqual(errors,[],'Unexpected browser exceptions');
  console.log('PASS Stage 3 visual arrangement, shared-pattern isolation, Undo, recording link, backup',name);
  await ctx.close();
 }finally{await browser.close()}
}
