// v2.0 Unified Song Workspace: portable clips, old projects, sound and tape handoff.
import {chromium,firefox,webkit} from 'playwright';
import {readFileSync} from 'node:fs';
import {createServer} from 'node:http';
import {resolve,join,extname} from 'node:path';
import assert from 'node:assert/strict';
import {html} from './op1-test-html.mjs';
async function getFile(page,id){const pending=page.waitForEvent('download',{timeout:12000});await page.locator(id).click();await page.waitForTimeout(200);const immediate=await page.evaluate(()=>({feedback:document.querySelector('#feedback')?.textContent,recovery:document.querySelector('#recoveryIndicator')?.textContent,assets:document.querySelector('#audioStatus')?.textContent,errors:window.__op1Errors||[],messages:window.__op1Messages||[]}));try{return readFileSync(await (await pending).path());}catch(e){console.error('DOWNLOAD DIAGNOSTIC',JSON.stringify({id,immediate,feedback:await page.locator('#feedback').innerText(),recovery:await page.locator('#recoveryIndicator').innerText(),audio:await page.locator('#audioStatus').innerText(),workspace:await page.locator('#workspaceStatus').innerText()}));throw e}}
const project=async p=>JSON.parse((await getFile(p,'#saveProject')).toString());
async function draw(page,row){await page.locator('#rollSurface').evaluate((el,row)=>{const box=el.getBoundingClientRect();el.dispatchEvent(new MouseEvent('click',{bubbles:true,clientX:box.left+64,clientY:box.top+32+row*24+9}));},row);}
function peak(wav){assert.equal(wav.toString('ascii',0,4),'RIFF');let m=0;for(let i=44;i<wav.length-1;i+=2)m=Math.max(m,Math.abs(wav.readInt16LE(i)));return m;}
for(const [browserName,engine] of Object.entries({chromium,firefox,webkit})){
 const browser=await engine.launch({headless:true});
 try{for(const width of (browserName==='chromium'?[1440,390]:[1100])){
  const ctx=await browser.newContext({viewport:{width,height:880},acceptDownloads:true}),page=await ctx.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));await page.setContent(html,{waitUntil:'domcontentloaded'});await page.evaluate(()=>{window.__op1Messages=[];new MutationObserver(()=>{window.__op1Messages.push(document.querySelector('#feedback')?.textContent);}).observe(document.querySelector('#feedback'),{childList:true,characterData:true,subtree:true})});
  assert.match(await page.title(),/v2\.7/);assert.equal(await page.locator('#workspacePanel').count(),1);
  assert.equal(await page.evaluate('document.documentElement.scrollWidth'),width);
  await draw(page,11);await draw(page,7);await page.locator('#rollSendSong').click();
  let saved=await project(page);
  assert.equal(saved.format,'op1-browser-lab-v05');assert.equal(saved.version,5);
  assert.equal(saved.songWorkspace.clips.length,1);assert.deepEqual(saved.songWorkspace.clips[0].notes,saved.pianoRoll.notes);
  assert.equal(saved.songSections.length,1);assert.equal(saved.tracks.length,4);
  await page.locator('#workspaceAddPattern').click();
  assert.equal((await project(page)).songWorkspace.clips.length,2);
  const input=page.locator('.workspace-clip-item').first().locator('input').first();
  await input.fill('2');await input.dispatchEvent('change');
  assert.equal((await project(page)).songWorkspace.clips[0].startBar,2);
  await page.locator('.workspace-clip-item').first().getByText('DUPLICATE').click();
  assert.equal((await project(page)).songWorkspace.clips.length,3);
  await page.locator('.workspace-clip-item').first().getByText('MUTE',{exact:true}).click();
  assert.equal((await project(page)).songWorkspace.clips[0].muted,true);
  await page.locator('#workspaceUndo').click();
  assert.equal((await project(page)).songWorkspace.clips[0].muted,false);
  const clips=(await project(page)).songWorkspace;
  page.once('dialog',d=>d.accept());await page.locator('#rollClear').click();
  saved=await project(page);assert.equal(saved.pianoRoll.notes.length,0);
  assert.deepEqual(saved.songWorkspace,clips,'Source roll edit changed its copied clip');
  await page.locator('#projectFile').setInputFiles({name:'workspace.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(saved))});
  await page.waitForFunction(()=>document.querySelectorAll('.workspace-clip-item').length===3&&document.querySelector('#feedback')?.textContent.includes('Project loaded'));
  await page.waitForTimeout(150);
  assert.deepEqual((await project(page)).songWorkspace,clips);
  const invalid=structuredClone(saved);invalid.songWorkspace.clips[0].startBar=500;
  await page.locator('#projectFile').setInputFiles({name:'invalid.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(invalid))});
  await page.waitForFunction(()=>document.querySelector('#feedback')?.textContent.includes('Could not open project'));
  assert.deepEqual((await project(page)).songWorkspace,clips,'Invalid project damaged active state');
  const old=structuredClone(saved);delete old.songWorkspace;
  await page.locator('#projectFile').setInputFiles({name:'v19.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(old))});
  await page.waitForFunction(()=>document.querySelectorAll('.workspace-clip-item').length===0&&document.querySelector('#feedback')?.textContent.includes('Project loaded'));
  await page.waitForTimeout(150);
  assert.equal((await project(page)).songWorkspace.clips.length,0);
  assert.deepEqual(errors,[],'Browser exceptions');
  console.log(browserName,width,'clips/edit/undo/project safety passed');await ctx.close();
 }}finally{await browser.close();}
}
// Audio restoration requires real origin-backed IndexedDB, not about:blank.
const audioRoot=resolve('homepages/op-1');
const audioFiles=new Set(['index.html','workspace.js','workspace.css','comfort.js','comfort.css','simplified.js','simplified.css','tracker.js','tracker.css','music-maker.js','music-maker.css','casio-keyboard.js','casio-keyboard.css','sw.js','manifest.webmanifest','icons/icon-192.png','icons/icon-512.png','icons/icon-maskable-512.png','icons/apple-touch-icon.png']);
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.webmanifest':'application/manifest+json','.png':'image/png'};
const server=createServer((req,res)=>{
 const pathname=new URL(req.url,'http://localhost').pathname;
 const path=pathname==='/'?'index.html':pathname.replace(/^\//,'');
 if(!audioFiles.has(path)){res.writeHead(404);res.end('Not found');return;}
 try{res.writeHead(200,{'Content-Type':mime[extname(path)]||'application/octet-stream','Cache-Control':'no-cache'});res.end(readFileSync(join(audioRoot,path)));}
 catch(e){res.writeHead(404);res.end('Not found');}
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const audioUrl='http://127.0.0.1:'+server.address().port+'/';
const browser=await chromium.launch({headless:true});
try{
 const page=await browser.newPage({viewport:{width:1300,height:850},acceptDownloads:true}),errors=[];
 page.on('pageerror',e=>errors.push(e.message));await page.goto(audioUrl,{waitUntil:'domcontentloaded'});await page.locator('#casioMore').evaluate(el=>el.open=true);await page.locator('#casioClassic').click();await page.addStyleTag({content:"html.comfort-tabs-enabled .below .panel[data-comfort-tab],html.comfort-tabs-enabled .below .song-studio[data-comfort-tab]{display:block!important}html.comfort-tabs-enabled .below #sequencePanel{display:block!important}html.studio-simple .below [data-comfort-tab]{display:block!important}html.studio-simple .below [data-comfort-tab].comfort-visible:not(.studio-current){display:block!important}html.studio-simple #sequencePanel:not(.studio-current){display:block!important}"});
 await draw(page,11);await draw(page,7);await page.locator('#rollSendSong').click();
 await page.locator('#startAudio').click();await page.locator('#workspacePlay').click();
 assert.match(await page.locator('#workspacePlay').innerText(),/STOP/);
 await page.locator('#workspaceStop').click();
 const wav=await getFile(page,'#workspaceExport');assert(wav.length>100000&&peak(wav)>30,'Silent timeline WAV');
 await page.locator('#workspaceTape').click();
 await page.waitForFunction(()=>document.querySelector('#feedback')?.textContent.includes('printed to a new PCM clip'),null,{timeout:60000});
 let saved=await project(page);assert.equal(saved.tracks[0].clips.length,1);
 assert.equal(typeof saved.audioSamples[saved.tracks[0].clips[0].sampleId],'string');
 // The localhost origin must persist imported audio without the memory-only fallback.
 await page.locator('#projectFile').setInputFiles({name:'with-tape.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(saved))});
 await page.waitForFunction(()=>document.querySelector('#feedback')?.textContent.includes('Project loaded with 1 audio sample'),null,{timeout:30000});
 await page.waitForTimeout(150);
 assert.equal((await project(page)).tracks[0].clips.length,1);
 page.once('dialog',d=>d.accept());await page.locator('#workspaceMeter').selectOption('6/8');
 assert.equal((await project(page)).songWorkspace.meter,'6/8');
 const wav68=await getFile(page,'#workspaceExport');assert(peak(wav68)>30,'6/8 WAV silent');
 await page.locator('#comfortDemoOpen').click();
 await page.locator('#comfortDemoCategories').getByText('Tape',{exact:true}).click();
 page.once('dialog',d=>d.accept());
 await page.locator('#comfortDemoPrint-skyline').click();
 await page.waitForFunction(()=>document.querySelector('#comfortDemoStatus')?.textContent.includes('printed as a new PCM tape clip'),null,{timeout:60000});
 await page.locator('#comfortDemoClose').click();
 const withDemo=await project(page);
 assert.equal(withDemo.tracks[0].clips.length,2,'Demo tape render did not preserve existing PCM clip');
 assert.equal(Object.keys(withDemo.audioSamples).length,2,'Demo tape render was not included in portable audio backup');
 assert.deepEqual(errors,[]);
 console.log('Chromium stereo WAV, song and demo print to PCM tape, imported audio backup and 6/8 passed');
}finally{await browser.close();await new Promise(resolve=>server.close(resolve));}
