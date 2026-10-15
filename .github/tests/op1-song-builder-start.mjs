// v2.6 Song Builder stage 1: an approachable start screen with no project mutations.
import { chromium, firefox, webkit } from 'playwright';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { rawHtml } from './op1-test-html.mjs';

const save=async page=>{
 const pending=page.waitForEvent('download');
 await page.locator('#saveProject').click();
 return JSON.parse(readFileSync(await(await pending).path(),'utf8'));
};
for(const [name,engine] of Object.entries({chromium,firefox,webkit})){
 const browser=await engine.launch({headless:true});
 try{
  for(const width of (name==='chromium'?[1440,390]:[1080])){
   const context=await browser.newContext({viewport:{width,height:900},acceptDownloads:true});
   try{
    const page=await context.newPage(),errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    await page.setContent(rawHtml,{waitUntil:'domcontentloaded'});
    const welcome=page.locator('#studioWelcome');
    assert(await welcome.isVisible(),'The Make a Song screen must be visible in Focus');
    assert.equal(await page.locator('.studio-start-card').count(),3);
    assert.match(await welcome.innerText(),/Make a song, one idea at a time/);
    const before=await save(page);
    await page.locator('#studioQuickBeat').click();
    assert(await page.locator('#sequencePanel').isVisible(),'Beat must open the existing drum sequencer');
    assert.match(await page.locator('#studioJourneyHint').innerText(),/drums are ready/);
    await page.locator('#studioQuickMelody').click();
    assert(await page.locator('#rollPanel').isVisible(),'Melody must open the existing Piano Roll');
    assert.match(await page.locator('#studioJourneyHint').innerText(),/melody editor is ready/);
    await page.locator('#studioQuickSongs').click();
    assert(await page.locator('#trackerStudio').isVisible(),'Song browser must open Tracker Studio');
    assert(await page.locator('#trackerLibrary').evaluate(el=>el.open),'Song library should be expanded');
    assert.equal(await page.locator('#trackerDemo option').count(),18);
    await page.locator('#studioQuickTape').click();
    assert(await page.locator('#comfortTapePanel').isVisible(),'Tape shortcut must reach recording');
    await page.evaluate(()=>window.__openClicks=0);
    await page.locator('#openProject').evaluate(el=>el.addEventListener('click',()=>window.__openClicks++));
    await page.locator('#studioQuickOpen').click();
    assert.equal(await page.evaluate(()=>window.__openClicks),1,'Open Project shortcut must forward to native project loader');
    const after=await save(page);
    assert.deepEqual(after.tracker,before.tracker,'Navigation must not change tracker data');
    assert.deepEqual(after.tracks,before.tracks,'Navigation must not change tape tracks');
    assert.deepEqual(after.songWorkspace,before.songWorkspace,'Navigation must not change the song');
    assert.equal(after.version,5,'Portable project format must remain v5');
    await page.locator('#studioAdvancedButton').click();
    assert(!(await welcome.isVisible()),'All Tools must hide the song start UI');
    assert(await page.locator('#comfortTabs').isVisible(),'All Tools must restore original tab layout');
    await page.locator('#studioSimpleButton').click();
    assert(await welcome.isVisible(),'Returning to Focus should restore the start screen');
    assert(await page.locator('#comfortTapePanel').isVisible(),'Focused tool must remain selected');
    if(width===390){
     const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
     assert(overflow<=1,'Mobile content overflows: '+overflow+'px');
    }
    assert.deepEqual(errors,[],'Browser page errors: '+errors.join('; '));
    console.log('PASS v2.6 Song Builder start screen',name,width);
   }finally{await context.close()}
  }
 }finally{await browser.close()}
}
