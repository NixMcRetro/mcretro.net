// v1.8 Sampling Workshop cross-browser and project compatibility checks.
import { chromium, firefox, webkit } from 'playwright';
import { readFileSync } from 'node:fs';
import { createServer } from 'node:http';
import assert from 'node:assert/strict';

import {html} from './op1-test-html.mjs';
function fixtureWav(){
 const sampleRate=22050,length=sampleRate*2,bytes=new Uint8Array(44+length*2),view=new DataView(bytes.buffer);
 for(const [at,s] of [[0,'RIFF'],[8,'WAVE'],[12,'fmt '],[36,'data']])for(let i=0;i<s.length;i++)view.setUint8(at+i,s.charCodeAt(i));
 view.setUint32(4,36+length*2,true);view.setUint32(16,16,true);view.setUint16(20,1,true);view.setUint16(22,1,true);view.setUint32(24,sampleRate,true);view.setUint32(28,sampleRate*2,true);view.setUint16(32,2,true);view.setUint16(34,16,true);view.setUint32(40,length*2,true);
 for(let i=0;i<length;i++)view.setInt16(44+i*2,Math.round(Math.sin(i*440*2*Math.PI/sampleRate)*12500*(i<length/2?1:.5)),true);
 return Buffer.from(bytes);
}
const wav=fixtureWav();
// Serve localhost so IndexedDB can persist the source WAV; about:blank blocks storage.
const server=createServer((request,response)=>{
 const path=new URL(request.url,'http://localhost').pathname;
 const resources={'/':'homepages/op-1/index.html','/index.html':'homepages/op-1/index.html','/workspace.js':'homepages/op-1/workspace.js','/workspace.css':'homepages/op-1/workspace.css','/comfort.js':'homepages/op-1/comfort.js','/comfort.css':'homepages/op-1/comfort.css','/simplified.js':'homepages/op-1/simplified.js','/simplified.css':'homepages/op-1/simplified.css','/tracker.js':'homepages/op-1/tracker.js','/tracker.css':'homepages/op-1/tracker.css','/music-maker.js':'homepages/op-1/music-maker.js','/music-maker.css':'homepages/op-1/music-maker.css','/casio-keyboard.js':'homepages/op-1/casio-keyboard.js','/casio-keyboard.css':'homepages/op-1/casio-keyboard.css','/riff-recorder.js':'homepages/op-1/riff-recorder.js','/riff-recorder.css':'homepages/op-1/riff-recorder.css','/song-sections.js':'homepages/op-1/song-sections.js','/song-sections.css':'homepages/op-1/song-sections.css','/sw.js':'homepages/op-1/sw.js','/manifest.webmanifest':'homepages/op-1/manifest.webmanifest'};
 const file=resources[path]||(path.startsWith('/icons/')?'homepages/op-1'+path:null);if(!file){response.writeHead(404);response.end('not found');return}
 const mime=path.endsWith('.png')?'image/png':path.endsWith('.js')?'text/javascript':path.endsWith('.css')?'text/css':path.endsWith('.webmanifest')?'application/manifest+json':'text/html';
 response.writeHead(200,{'Content-Type':mime});response.end(readFileSync(file));
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const baseUrl='http://127.0.0.1:'+server.address().port+'/';
for(const [engineName,engine] of Object.entries({chromium,firefox,webkit})){
 const browser=await engine.launch({headless:true});
 try {
  for(const width of (engineName==='chromium'?[1440,390]:[1000])){
   const ctx=await browser.newContext({viewport:{width,height:850},acceptDownloads:true});
   const page=await ctx.newPage(),errors=[];
   page.on('pageerror',e=>errors.push(e.message));
   await page.goto(baseUrl,{waitUntil:'domcontentloaded'});await page.locator('#casioMore').evaluate(el=>el.open=true);await page.locator('#casioClassic').click();await page.addStyleTag({content:"html.comfort-tabs-enabled .below .panel[data-comfort-tab],html.comfort-tabs-enabled .below .song-studio[data-comfort-tab]{display:block!important}html.comfort-tabs-enabled .below #sequencePanel{display:block!important}html.studio-simple .below [data-comfort-tab]{display:block!important}html.studio-simple .below [data-comfort-tab].comfort-visible:not(.studio-current){display:block!important}html.studio-simple #sequencePanel:not(.studio-current){display:block!important}"});
   assert.match(await page.title(),/v2\.8/);
   assert.equal(await page.locator('#sampleWaveform').count(),1);
   assert.equal(await page.locator('#samplePreview').isDisabled(),true,'Audition should require a sample');
   await page.locator('#sampleAudioFile').setInputFiles({name:'workshop-test.wav',mimeType:'audio/wav',buffer:wav});
   await page.waitForFunction(()=>document.querySelector('#sampleWorkshopStatus')?.textContent.includes('2.00 SECONDS'),{timeout:12000});
   assert.equal(await page.locator('#samplePreview').isEnabled(),true);
   assert.equal(await page.locator('#sampleSliceCount').inputValue(),'8');
   await page.locator('#sampleSliceCount').selectOption('4');
   await page.locator('#sampleRegionStart').fill('10');
   await page.locator('#sampleRegionEnd').fill('90');
   await page.locator('#sampleSliceSelect').selectOption('1');
   await page.locator('#sampleSliceRight').fill('55');
   await page.locator('#samplePitch').fill('7');
   await page.locator('#sampleRate').fill('125');
   await page.locator('#sampleLevel').fill('65');
   await page.locator('#sampleReverse').click();
   await page.locator('#sampleLoop').click();
   assert.equal(await page.locator('#samplePitchValue').innerText(),'+7 semitones');
   assert.equal(await page.locator('#sampleRegionStartValue').innerText(),'10%');
   assert.equal(await page.locator('#sampleRegionEndValue').innerText(),'90%');
   assert.equal(await page.locator('#sampleSliceRightValue').innerText(),'55%');
   assert.equal(await page.locator('#sampleReverse').getAttribute('aria-pressed'),'true');
   assert.equal(await page.locator('#sampleLoop').getAttribute('aria-pressed'),'true');
   await page.locator('#samplePreview').click();
   assert.match(await page.locator('#sampleWorkshopMessage').innerText(),/Auditioning slice 2/);
   await page.locator('#sampleStop').click();
   const getFile=page.waitForEvent('download');await page.locator('#saveProject').click();
   const saved=JSON.parse(readFileSync(await (await getFile).path(),'utf8'));
   assert.equal(saved.format,'op1-browser-lab-v05');assert.equal(saved.version,5);
   assert.equal(saved.sampleSettings.slices,4);
   assert.equal(saved.sampleSettings.pitch,7);
   assert.equal(saved.sampleSettings.reverse,true);
   assert.equal(saved.sampleSettings.loop,true);
   assert.equal(saved.sampleSettings.rate,1.25);
   assert.equal(saved.sampleSettings.regionStart,.1);
   assert.equal(saved.sampleSettings.regionEnd,.9);
   assert.equal(saved.sampleSettings.slicePoints.length,5);
   assert(Math.abs(saved.sampleSettings.slicePoints[2]-.55)<.001);
   assert(saved.audioSamples[saved.sampleId]&&saved.audioSamples[saved.sampleId].length>100,'Source audio not embedded');
   await page.evaluate(()=>document.querySelector('#feedback').textContent='');
   await page.locator('#projectFile').setInputFiles({name:'sample-workshop-project.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(saved))});
   await page.waitForFunction(()=>document.querySelector('#feedback')?.textContent.includes('Project loaded with'),null,{timeout:12000});
   assert.equal(await page.locator('#samplePitch').inputValue(),'7');
   assert.equal(await page.locator('#sampleSliceRightValue').innerText(),'30%'); // selected slice resets to 1 after project load
   await page.locator('#sampleSliceSelect').selectOption('1');
   assert.equal(await page.locator('#sampleSliceRightValue').innerText(),'55%');
   const legacy=JSON.parse(JSON.stringify(saved));legacy.sampleSettings={slices:8,rate:1.3,level:.7,start:.25};
   await page.evaluate(()=>document.querySelector('#feedback').textContent='');
   await page.locator('#projectFile').setInputFiles({name:'legacy-sampler-project.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(legacy))});
   await page.waitForFunction(()=>document.querySelector('#feedback')?.textContent.includes('Project loaded with'),null,{timeout:12000});
   const downloadLegacy=page.waitForEvent('download');await page.locator('#saveProject').click();
   const roundtrip=JSON.parse(readFileSync(await (await downloadLegacy).path(),'utf8'));
   assert.equal(roundtrip.sampleSettings.start,.25,'Old per-slice skip changed');
   assert.equal(roundtrip.sampleSettings.regionStart,undefined,'Legacy sample mode should not be rewritten');
   assert.equal(roundtrip.audioSamples[roundtrip.sampleId],saved.audioSamples[saved.sampleId],'Original WAV was changed by metadata edits');
   assert.deepEqual(errors,[],'Browser runtime errors: '+errors.join(', '));
   console.log(engineName,width,'sampling editor, audio source integrity and old project compatibility passed');
   await ctx.close();
  }
 }finally{await browser.close()}
}

await new Promise(resolve=>server.close(resolve));
