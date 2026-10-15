// v2.6 Stage 3: beginner-friendly original patterns and visual song timeline.
import {chromium,firefox,webkit} from 'playwright';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {rawHtml} from './op1-test-html.mjs';

const script=readFileSync('homepages/op-1/tracker.js','utf8');
const env={window:{},structuredClone,console};vm.runInNewContext(script,env);
const tracker=env.window.OP1Tracker;
const legacy=tracker.defaults();legacy.arrangement=[{pattern:0,rows:16}];
assert.deepEqual(JSON.parse(JSON.stringify(tracker.normalize(legacy).arrangement)),[{pattern:0,rows:16}],
 'Stage 2 label-free arrangement must stay exactly compatible');
legacy.arrangement=[{pattern:0,rows:16,label:'Verse'}];
assert.equal(tracker.normalize(legacy).arrangement[0].label,'Verse');
for(const bad of ['Unexpected','<script>','OutroOutro','']){if(bad==='')continue;
 legacy.arrangement[0].label=bad;assert.throws(()=>tracker.normalize(legacy),/song section label/);
}
for(const kind of ['drums','bass','melody','chords']){
 const pattern=tracker.makeStarterPattern(kind);
 assert.equal(pattern.rows,32);
 assert(pattern.cells.filter(Boolean).length>=5,kind+' requires actual notes');
 const test=tracker.defaults();test.patterns=[pattern];
 assert.equal(tracker.normalize(test).patterns.length,1);
}
assert.throws(()=>tracker.makeStarterPattern('random'),/Unknown starter/);
console.log('PASS Stage 3 bounded starter music and optional backwards-compatible song labels');

async function save(page){
 const pending=page.waitForEvent('download');
 await page.locator('#saveProject').click();
 const down=await pending;return JSON.parse(readFileSync(await down.path(),'utf8'));
}
for(const [name,engine] of Object.entries({chromium,firefox,webkit})){
 const browser=await engine.launch({headless:true});
 try{
  for(const width of name==='chromium'?[1366,390]:[1024]){
   const ctx=await browser.newContext({viewport:{width,height:900},acceptDownloads:true});
   try{
    const page=await ctx.newPage(),errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    await page.setContent(rawHtml,{waitUntil:'domcontentloaded'});
    await page.locator('[data-studio-group="Compose"]').click();
    await page.locator('[data-studio-tool="trackerStudio"]').click();
    assert(await page.locator('#trackerSongBuilder').isVisible());
    assert(await page.locator('#trackerArrangementTimelineEmpty').isVisible());
    assert.equal(await page.locator('.tracker-song-block').count(),0);
    const before=await save(page);
    await page.locator('#trackerStarterType').selectOption('drums');
    await page.locator('#trackerStarterAdd').click();
    assert.equal(await page.locator('.tracker-song-block').count(),1);
    assert.equal(await page.locator('.tracker-arrangement-item').count(),1);
    assert.match(await page.locator('.tracker-song-block').first().innerText(),/INTRO/i);
    await page.locator('#trackerStarterType').selectOption('bass');
    await page.locator('#trackerStarterAdd').click();
    await page.locator('#trackerStarterType').selectOption('melody');
    await page.locator('#trackerStarterAdd').click();
    await page.locator('#trackerStarterType').selectOption('chords');
    await page.locator('#trackerStarterAdd').click();
    assert.equal(await page.locator('.tracker-song-block').count(),4);
    assert.equal(await page.locator('#trackerPattern option').count(),5);
    assert.equal(await page.locator('#trackerArrangementCount').innerText(),'4 SECTIONS · 8.0 BARS');
    let project=await save(page);
    assert.equal(project.version,5);
    assert.deepEqual(project.tracker.arrangement.map(x=>x.label),['Intro','Verse','Chorus','Chorus']);
    assert(project.tracker.patterns.slice(1).every(p=>p.cells.some(Boolean)),'Starter music must have editable notes');
    assert.deepEqual(project.tracks,before.tracks,'Starter ideas must never change tape');
    assert.deepEqual(project.songWorkspace,before.songWorkspace,'Starter ideas must not replace song workspace');
    assert.deepEqual(project.tracker.patterns[0],before.tracker.patterns[0],'Starter ideas must not overwrite existing notes');
    const originalPatterns=JSON.stringify(project.tracker.patterns);
    await page.locator('[data-section-select="1"]').click();
    assert.equal(await page.locator('.tracker-song-block[aria-pressed="true"]').count(),1);
    assert.equal(await page.locator('.tracker-song-block[aria-pressed="true"]').getAttribute('data-section-select'),'1');
    await page.locator('[data-arrangement-label="1"]').selectOption('Break');
    project=await save(page);
    assert.equal(project.tracker.arrangement[1].label,'Break');
    await page.locator('#trackerUndo').click();
    project=await save(page);
    assert.equal(project.tracker.arrangement[1].label,'Verse','Undo restores section name');
    await page.locator('[data-arrangement-action="up"]').nth(2).click();
    project=await save(page);
    assert.equal(project.tracker.arrangement[1].label,'Chorus','Timeline reflects the new section order');
    assert.equal(JSON.stringify(project.tracker.patterns),originalPatterns,'Rearrangement must not change original notes');
    const playbackNotes=await page.evaluate(()=>window.OP1Tracker.compileArrangement().notes.length);
    assert(playbackNotes>20,'Starter song should be genuinely playable');
    await page.locator('#studioAdvancedButton').click();
    assert(!(await page.locator('#trackerSongBuilder').isVisible())===false,'All Tools must leave the Song Builder available');
    await page.locator('#studioSimpleButton').click();
    assert(await page.locator('#trackerSongBuilder').isVisible());
    if(width===390){
     const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
     assert(overflow<=1,'Stage 3 causes mobile overflow of '+overflow+'px');
    }
    assert.deepEqual(errors,[],'Browser JavaScript errors: '+errors.join('; '));
    console.log('PASS Stage 3 four starters, editable labels/timeline, save, undo and safe navigation',name,width);
   }finally{await ctx.close()}
  }
 }finally{await browser.close()}
}
