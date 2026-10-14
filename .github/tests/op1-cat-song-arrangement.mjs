// v1.7 split Meow instrument, named sections, portable project and real PCM exports.
import {chromium,firefox,webkit} from 'playwright';
import {readFileSync} from 'node:fs';
import assert from 'node:assert/strict';
const html=readFileSync('homepages/op-1/index.html','utf8');
const pcmPeak=buffer=>{assert.equal(buffer.toString('ascii',0,4),'RIFF');assert.equal(buffer.toString('ascii',8,12),'WAVE');let peak=0;for(let i=44;i+1<buffer.length;i+=2)peak=Math.max(peak,Math.abs(buffer.readInt16LE(i)));return peak};
for(const [name,engine] of Object.entries({chromium,firefox,webkit})){
 const browser=await engine.launch({headless:true});
 try{
 for(const width of (name==='chromium'?[1440,390]:[1000])){
 const context=await browser.newContext({viewport:{width,height:850},acceptDownloads:true});
 const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.setContent(html,{waitUntil:'domcontentloaded'});
 assert.match(await page.title(),/v1\.7/);
 assert.equal(await page.locator('#soundKeys .sound-key').count(),8,'Original eight sound slots must remain');
 assert.equal(await page.locator('#soundKeys .cat-split button').count(),2);
 assert.equal(await page.locator('#soundKeys > :last-child').getAttribute('class'),'cat-split','Cat control must follow Slot 8');
 assert.equal(await page.locator('[data-cat="drum"]').getAttribute('title'),'Meow Drum');
 assert.equal(await page.locator('[data-cat="keyboard"]').getAttribute('title'),'Meow Keyboard');
 const sizes=await page.locator('#soundKeys .cat-split button').evaluateAll(buttons=>buttons.map(b=>({part:b.getBoundingClientRect().height,whole:b.parentElement.getBoundingClientRect().height})));
 assert(sizes.every(({part,whole})=>part>0&&Math.abs(part/whole-.5)<.07),'Each split button must occupy half the slot even when board scales on mobile');
 await page.locator('[data-cat="keyboard"]').click();
 assert.equal(await page.locator('[data-cat="keyboard"]').getAttribute('aria-pressed'),'true');
 assert.match(await page.locator('#deviceHint').innerText(),/MEOW KEYBOARD/);
 await page.locator('[data-cat="drum"]').click();assert.equal(await page.locator('[data-cat="drum"]').getAttribute('aria-pressed'),'true');
 assert.match(await page.locator('#deviceHint').innerText(),/MEOW DRUM/);
 await page.locator('[data-cat="drum"]').click();assert.equal(await page.locator('[data-cat="drum"]').getAttribute('aria-pressed'),'false');
 await page.locator('[data-cat="keyboard"]').click();await page.locator('#expandDisplay').click();
 assert(await page.locator('#displayZoomCanvas').isVisible(),'Cat must appear in live expanded display');
 await page.locator('#closeDisplay').click();
 assert.equal(await page.locator('.song-section').count(),1);
 await page.locator('#songAdd').click();assert.equal(await page.locator('.song-section').count(),2);
 await page.locator('.song-section').first().locator('input').fill('Verse');
 await page.locator('.song-section').first().locator('input').dispatchEvent('change');
 assert.equal(await page.locator('.song-section').first().locator('input').inputValue(),'Verse');
 await page.locator('.song-section').nth(1).locator('select').nth(0).selectOption('B');
 await page.locator('.song-section').nth(1).locator('select').nth(1).selectOption('1');
 await page.locator('.song-section').nth(1).locator('select').nth(2).selectOption('catDrum');
 await page.locator('.song-section').nth(1).locator('select').nth(3).selectOption('2');
 assert.match(await page.locator('#songSummary').innerText(),/5 bars/);
 await page.locator('#songRepeat').click();assert.equal(await page.locator('#songRepeat').getAttribute('aria-pressed'),'true');
 const save=page.waitForEvent('download');await page.locator('#saveProject').click();const project=JSON.parse(readFileSync(await (await save).path(),'utf8'));
 assert.equal(project.format,'op1-browser-lab-v05');assert.equal(project.version,5,'Schema version must not break');
 assert.equal(project.catMode,'keyboard');assert.equal(project.songSections[0].name,'Verse');
 assert.equal(project.songSections[1].slot,'B');assert.equal(project.songSections[1].voice,'catDrum');
 assert.equal(project.songSections[1].track,2);assert.equal(project.songRepeat,true);
 // Test older v1.6 projects that never knew about the cat or song fields.
 const legacy=structuredClone(project);delete legacy.catMode;delete legacy.songSections;delete legacy.songRepeat;
 await page.locator('#projectFile').setInputFiles({name:'v16-legacy.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(legacy))});
 await page.waitForFunction(()=>document.querySelector('#feedback')?.textContent.includes('Project loaded'),null,{timeout:12000});
 assert.equal(await page.locator('[data-cat="keyboard"]').getAttribute('aria-pressed'),'false');
 assert.equal(await page.locator('.song-section').count(),1,'Legacy project must get a safe default song');
 assert.deepEqual(errors,[],'Page errors: '+errors.join('; '));
 console.log(name,width,'cat split button, saved song sections and v1.6 migration passed');
 await context.close();
 }
 }finally{await browser.close()}
}
// Rendered PCM and recorded-note tests only on Chromium, because headless
// Firefox/WebKit AudioContext clocks can stall even when their UI/state tests pass.
const browser=await chromium.launch({headless:true});
try{
 const ctx=await browser.newContext({viewport:{width:1440,height:900},acceptDownloads:true});
 const page=await ctx.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));await page.setContent(html,{waitUntil:'domcontentloaded'});
 await page.locator('#quickSeq').click();await page.locator('#screenOverlay [data-seq-mode="pattern"]').click();
 await page.locator('#steps .step').first().click();
 await page.locator('.song-section').first().locator('select').nth(1).selectOption('1');
 const songFile=page.waitForEvent('download',{timeout:45000});await page.locator('#songExport').click();
 const songWav=readFileSync(await (await songFile).path());assert(pcmPeak(songWav)>50,'Arranged song WAV is silent');
 await page.locator('[data-cat="keyboard"]').click();
 await page.locator('#startAudio').click();await page.waitForTimeout(100);await page.locator('#recButton').click();await page.locator('#playButton').click();
 assert.equal(await page.locator('#recButton').getAttribute('aria-pressed'),'true','Recording should be armed');await page.waitForTimeout(100);
 await page.locator('.piano-key[data-note="0"]').dispatchEvent('pointerdown',{button:0,pointerId:11});await page.waitForTimeout(175);
 await page.locator('.piano-key[data-note="0"]').dispatchEvent('pointerup',{button:0,pointerId:11});
 await page.locator('.piano-key[data-note="12"]').dispatchEvent('pointerdown',{button:0,pointerId:12});await page.waitForTimeout(150);
 await page.locator('.piano-key[data-note="12"]').dispatchEvent('pointerup',{button:0,pointerId:12});await page.locator('#stopButton').click();
 const savedFile=page.waitForEvent('download');await page.locator('#saveProject').click();const project=JSON.parse(readFileSync(await (await savedFile).path(),'utf8'));
 const meows=project.tracks.flatMap(t=>t.events).filter(e=>e.kind==='catKeyboard');assert(meows.length>=2,'Recorded cat notes were not preserved: '+JSON.stringify({catMode:project.catMode,allEvents:project.tracks.map(t=>t.events),status:await page.locator('#statusText').innerText()}));
 assert(new Set(meows.map(e=>e.n)).size>=2,'Keyboard pitch did not follow distinct musical notes');
 await page.locator('#stemTrack').selectOption('0');
 const stemFile=page.waitForEvent('download',{timeout:45000});await page.locator('#stemExport').click();
 assert(pcmPeak(readFileSync(await (await stemFile).path()))>50,'Cat meow WAV stem contains only silence');
 await page.locator('#projectFile').setInputFiles({name:'v17-roundtrip.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(project))});
 await page.waitForFunction(()=>document.querySelector('#feedback')?.textContent.includes('Project loaded'),null,{timeout:12000});
 const saveAgain=page.waitForEvent('download');await page.locator('#saveProject').click();const reloaded=JSON.parse(readFileSync(await (await saveAgain).path(),'utf8'));
 assert.equal(reloaded.tracks[0].events.filter(e=>e.kind==='catKeyboard').length,meows.length,'Cat recordings were changed by roundtrip');
 assert.deepEqual(errors,[],'PCM audio tests raised browser errors');
 console.log('chromium stereo song WAV, pitched cat event recording, cat stem WAV and project audio roundtrip passed');
 await ctx.close();
}finally{await browser.close()}
