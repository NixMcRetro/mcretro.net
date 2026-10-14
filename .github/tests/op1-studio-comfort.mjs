// OP-1 Browser Lab v2.0.1: navigation, MIDI round-trips, demo previews and Retina.
import {chromium,firefox,webkit} from 'playwright';
import {readFileSync} from 'node:fs';
import assert from 'node:assert/strict';
import {rawHtml} from './op1-test-html.mjs';
async function exportMidi(page){
 const download=page.waitForEvent('download',{timeout:20000});await page.locator('#pianolaExportMidi').click();return readFileSync(await(await download).path());
}
async function importVia(page,button,midi){
 const chooser=page.waitForEvent('filechooser',{timeout:12000});
 await page.locator(button).click();
 const f=await chooser;
 await f.setFiles({name:'roundtrip.mid',mimeType:'audio/midi',buffer:midi});
 await page.waitForTimeout(140);
}
for(const [name,engine] of Object.entries({chromium,firefox,webkit})){
 const browser=await engine.launch({headless:true});
 try{for(const width of(name==='chromium'?[1440,390]:[1100])){
  const ctx=await browser.newContext({viewport:{width,height:900},acceptDownloads:true}),page=await ctx.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));await page.setContent(rawHtml,{waitUntil:'domcontentloaded'});
  assert.match(await page.title(),/v2\.0\.1/);
  assert.equal(await page.locator('#comfortTabs [role=tab]').count(),6);
  assert(await page.locator('#piano').isVisible(),'Physical keyboard is not visible');
  assert(await page.locator('#soundPanel').isVisible(),'Play tab did not open');
  assert(!(await page.locator('#pianolaPanel').isVisible()),'Unused Composer panel was not hidden');
  await page.getByRole('tab',{name:'Compose'}).click();
  assert(await page.locator('#pianolaPanel').isVisible(),'Compose tab not functional');
  assert(await page.locator('#piano').isVisible(),'Switching tabs hid the instrument');
  assert(!(await page.locator('#soundPanel').isVisible()),'Play panel remained visible');
  await page.locator('#comfortOctUp').click();
  assert.equal(await page.locator('#comfortOctValue').innerText(),'OCT +1');
  assert.match(await page.locator('#comfortOctRange').innerText(),/C4 to B5/);
  await page.locator('#comfortOctDown').click();
  assert.equal(await page.locator('#comfortOctValue').innerText(),'OCT +0');
  const lightBackground=await page.locator('body').evaluate(el=>getComputedStyle(el).backgroundColor);
  await page.locator('#comfortTheme').click();
  assert.equal(await page.locator('html').getAttribute('data-op1-theme'),'dark');
  assert.notEqual(await page.locator('body').evaluate(el=>getComputedStyle(el).backgroundColor),lightBackground,'Theme switch only changed its label');
  await page.locator('#comfortTheme').click();
  assert.equal(await page.locator('html').getAttribute('data-op1-theme'),'light');
  await page.locator('#pianolaPitch').selectOption('60');
  await page.locator('#pianolaAdd').click();
  await page.locator('#pianolaPitch').selectOption('64');
  await page.locator('#pianolaAdd').click();
  const midi=await exportMidi(page);
  assert.equal(midi.toString('ascii',0,4),'MThd');
  await importVia(page,'#comfortMidiSynth',midi);
  assert.match(await page.locator('#synthScoreStatus').innerText(),/2 EVENTS/);
  await page.locator('#pianolaAdd').click();
  page.once('dialog',d=>d.accept());
  await importVia(page,'#comfortMidiPianola',midi);
  assert.equal(await page.locator('.pianola-cell').count(),2,'Pianola MIDI round-trip failed');
  await page.getByRole('tab',{name:'Song'}).click();
  await importVia(page,'#comfortMidiSong',midi);
  assert.equal(await page.locator('.workspace-clip-item').count(),1,'MIDI did not arrive in song timeline');
  await page.getByRole('tab',{name:'Drums'}).click();
  assert.equal(await page.locator('#seqRun + button').innerText(),'IMPORT MIDI');
  await importVia(page,'#seqRun + button',midi);
  assert.match(await page.locator('#feedback').innerText(),/Imported 2 MIDI notes into Drum Sequencer/, 'Drum MIDI failure notice');
  await page.getByRole('tab',{name:'Tape'}).click();
  page.once('dialog',d=>d.accept());
  await importVia(page,'#goTape + button',midi);
  await page.locator('#comfortMidiDestination').selectOption('roll');
  await importVia(page,'#comfortMidiChoose',midi);
  const savedPromise=page.waitForEvent('download');
  await page.locator('#saveProject').click();
  const project=JSON.parse(readFileSync(await(await savedPromise).path(),'utf8'));
  assert.equal(project.format,'op1-browser-lab-v05');
  assert.equal(project.songWorkspace.clips.length,1);
  assert.equal(project.tracks[0].events.length,2);
  assert.equal(project.pianola.notes.length,2);
  assert.equal(project.synthScore.notes.length,2);
  assert.equal(project.pianoRoll.notes.length,2,'Global destination MIDI import did not reach Piano Roll');
  const notesInPattern=project.seqPattern.filter(n=>n!==null).length;
  assert.equal(notesInPattern,2,'Drum MIDI not loaded: '+JSON.stringify({patternSlot:project.patternSlot,sequence:project.seqPattern,feedback:await page.locator('#feedback').innerText(),patternSlots:project.patternSlots}));
  await page.locator('#comfortDemoOpen').click();
  assert(await page.locator('#comfortDemoDialog').isVisible());
  assert.equal(await page.locator('.comfort-demo-card').count(),10);
  const filter=page.locator('#comfortDemoCategories').getByText('Tape',{exact:true});await filter.click();
  assert.equal(await page.locator('.comfort-demo-card').count(),3);
  page.once('dialog',d=>d.accept());
  await page.locator('.comfort-demo-card').first().getByText('＋ LOAD SONG CLIPS').click();
  // The initial song import is 120 BPM and the first tape demo has its own BPM.
  const clips=await page.locator('.workspace-clip-item').count();
  assert.equal(clips,5,'Demo loading did not preserve the MIDI song clip plus add four parts');
  await page.locator('#comfortDemoClose').click();
  assert(!(await page.locator('#comfortDemoDialog').isVisible()));
  const postDemoDownload=page.waitForEvent('download');await page.locator('#saveProject').click();
  const postDemo=JSON.parse(readFileSync(await(await postDemoDownload).path(),'utf8'));
  assert.deepEqual(postDemo.songWorkspace.clips[0],project.songWorkspace.clips[0],'Demo loading changed the original MIDI clip');
  assert.deepEqual(postDemo.tracks[0].events,project.tracks[0].events,'Demo loading changed tape notes');
  if(width>800){await page.evaluate(()=>window.scrollTo(0,document.documentElement.scrollHeight));await page.waitForFunction(()=>document.querySelector('#comfortKeyboardDock')?.hidden===false,null,{timeout:5000});assert(await page.locator('#comfortKeyboardDock').isVisible(),'Keyboard dock did not appear when the instrument was scrolled away')}
  if(width===390){const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);assert(overflow<=1,'Mobile page horizontally overflows by '+overflow+'px');assert(await page.locator('#mobileKeys').isVisible())}
  assert.deepEqual(errors,[],'Unexpected browser exceptions: '+errors.join('; '));
  console.log(name,width,'tabs, theme, octave, Pianola/Synth/Song/Drum/Tape MIDI, demo safety passed');
  await ctx.close();
 }}finally{await browser.close()}
}
const browser=await chromium.launch({headless:true});
try{
 const ctx=await browser.newContext({viewport:{width:1300,height:900},deviceScaleFactor:2,acceptDownloads:true}),page=await ctx.newPage(),errors=[];
 page.on('pageerror',e=>errors.push(e.message));await page.setContent(rawHtml,{waitUntil:'domcontentloaded'});
 await page.locator('#expandDisplay').click();
 const retina=await page.locator('#displayZoomCanvas').evaluate(c=>({width:c.width,height:c.height,css:c.getBoundingClientRect().width,dpr:devicePixelRatio,peak:Array.from(c.getContext('2d').getImageData(0,0,20,20).data).some(v=>v>0)}));
 assert.equal(retina.dpr,2);assert(retina.width>1300,'Expanded display still uses low-resolution backing pixels');
 assert(Math.abs(retina.width/retina.height-680/325)<.01);
 assert(retina.peak,'Expanded display was never drawn');
 await page.locator('#closeDisplay').click();
 await page.locator('#comfortDemoOpen').click();
 await page.locator('.comfort-demo-card').first().getByText('▶ PREVIEW').click();
 await page.waitForFunction(()=>document.querySelector('#comfortDemoStatus')?.textContent.startsWith('Playing'),null,{timeout:12000});
 await page.locator('#comfortDemoStop').click();
 assert.match(await page.locator('#comfortDemoStatus').innerText(),/Preview stopped/);
 await page.locator('#comfortDemoClose').click();
 assert.deepEqual(errors,[]);
 await ctx.close();console.log('Chromium Retina native-pixel display and non-destructive audio demo passed');
}finally{await browser.close()}
