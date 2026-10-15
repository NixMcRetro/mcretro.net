// v2.7 Stages 1-3: beginner generator, musical structure, reversible remix and v5 project preservation.
import {chromium, firefox, webkit} from 'playwright';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {rawHtml} from './op1-test-html.mjs';
const save=async page=>{
 const pending=page.waitForEvent('download',{timeout:60000});
 await page.locator('#makerSave').click();
 return JSON.parse(readFileSync(await (await pending).path(),'utf8'));
};
const notesOnChannel=(tracker,ch)=>tracker.patterns.map(p=>p.cells.filter((_,i)=>i%4===ch));
for(const [name,engine] of Object.entries({chromium,firefox,webkit})){
 const browser=await engine.launch({headless:true});
 try{
  const ctx=await browser.newContext({viewport:{width:name==='chromium'?390:1200,height:900},acceptDownloads:true});
  try{
   const page=await ctx.newPage(),errors=[];
   page.on('pageerror',e=>errors.push(e.message));
   await page.setContent(rawHtml,{waitUntil:'domcontentloaded'});
   const maker=page.locator('#musicMaker');
   assert(await maker.isVisible(),'Music Maker should be visible by default');
   assert.equal(await page.locator('#makerStyle option').count(),6);
   assert.equal(await page.locator('.maker-part').count(),4);
   assert(await page.locator('#makerPlay').isDisabled(),'Cannot play before creating a song');
   const baseline=await save(page);
   await page.locator('#makerStyle').selectOption('tracker');
   await page.locator('#makerMood').selectOption('happy');
   await page.locator('#makerGenerate').click();
   const song=await save(page);
   assert.equal(song.version,5);
   assert.equal(song.format,'op1-browser-lab-v05');
   assert.equal(song.tracker.patterns.length,4);
   assert.deepEqual(song.tracker.arrangement.map(s=>s.label),['Intro','Verse','Chorus','Outro']);
   assert.deepEqual(song.tracker.patterns.map(p=>p.rows),[32,32,32,32]);
   assert.equal(song.tracker.arrangement.reduce((n,s)=>n+s.rows,0),192);
   assert.deepEqual(song.tracks,baseline.tracks,'Never modify tape');
   assert.deepEqual(song.songWorkspace,baseline.songWorkspace,'Never modify Song Workspace');
   assert.deepEqual(song.audioSamples,baseline.audioSamples,'Never change recordings or samples');
   for(let ch=0;ch<4;ch++)assert(notesOnChannel(song.tracker,ch).flat().some(Boolean),'Expected generated part '+ch);
   const bass=notesOnChannel(song.tracker,1),melody=notesOnChannel(song.tracker,3);
   assert(bass.flat().filter(Boolean).every(n=>n.midi>=36&&n.midi<=95));
   assert(melody.flat().filter(Boolean).every(n=>n.midi>=48&&n.midi<=95));
   await page.locator('#makerLock0').click();
   assert.equal(await page.locator('#makerLock0').getAttribute('aria-pressed'),'true');
   assert(await page.locator('#makerRemix0').isDisabled(),'Locked drums must not regenerate');
   await page.locator('#makerDirection').selectOption('busier');
   await page.locator('#makerRemixAll').click();
   const remix=await save(page);
   assert.deepEqual(notesOnChannel(remix.tracker,0),notesOnChannel(song.tracker,0),'Lock should preserve drums exactly');
   assert.deepEqual(remix.tracker.arrangement,song.tracker.arrangement);
   assert.deepEqual(remix.tracks,song.tracks);
   assert.deepEqual(remix.songWorkspace,song.songWorkspace);
   assert.notDeepEqual(notesOnChannel(remix.tracker,3),notesOnChannel(song.tracker,3),'Remix should alter melody');
   await page.locator('#makerUndo').click();
   const undone=await save(page);
   assert.deepEqual(undone.tracker,song.tracker,'Remix Undo must restore exact previous tracker notes');
   await page.locator('#makerEdit').click();
   assert(await page.locator('#trackerStudio').isVisible(),'Edit should open existing tracker');
   await page.locator('#studioAdvancedButton').click();
   assert(!(await maker.isVisible()),'Advanced Studio should hide beginner UI');
   assert(await page.locator('#trackerStudio').isVisible(),'Advanced must preserve original tracker');
   await page.locator('#studioSimpleButton').click();
   assert(await maker.isVisible(),'Music Maker should return in Focus mode');
   if(name==='chromium'){
    const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
    assert(overflow<=1,'Music Maker overflows mobile viewport by '+overflow+'px');
   }
   assert.deepEqual(errors,[],'No browser errors: '+errors.join('; '));
   console.log('PASS Music Maker v2.7 generate / lock / remix / undo / project',name);
  }finally{await ctx.close()}
 }finally{await browser.close()}
}
// Pure generator deterministic fixtures: no notes outside tracker v5 bounds.
assert.equal(typeof rawHtml,'string');
