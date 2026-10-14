// v2.0 Unified Song Workspace: portable clips, old projects, sound and tape handoff.
import {chromium,firefox,webkit} from 'playwright';
import {readFileSync} from 'node:fs';
import assert from 'node:assert/strict';
import {html} from './op1-test-html.mjs';
async function getFile(page,id){const pending=page.waitForEvent('download',{timeout:60000});await page.locator(id).click();return readFileSync(await (await pending).path());}
const project=async p=>JSON.parse((await getFile(p,'#saveProject')).toString());
async function draw(page,row){await page.locator('#rollSurface').evaluate((el,row)=>{const box=el.getBoundingClientRect();el.dispatchEvent(new MouseEvent('click',{bubbles:true,clientX:box.left+64,clientY:box.top+32+row*24+9}));},row);}
function peak(wav){assert.equal(wav.toString('ascii',0,4),'RIFF');let m=0;for(let i=44;i<wav.length-1;i+=2)m=Math.max(m,Math.abs(wav.readInt16LE(i)));return m;}
for(const [browserName,engine] of Object.entries({chromium,firefox,webkit})){
 const browser=await engine.launch({headless:true});
 try{for(const width of (browserName==='chromium'?[1440,390]:[1100])){
  const ctx=await browser.newContext({viewport:{width,height:880},acceptDownloads:true}),page=await ctx.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));await page.setContent(html,{waitUntil:'domcontentloaded'});
  assert.match(await page.title(),/v2\.0/);assert.equal(await page.locator('#workspacePanel').count(),1);
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
  await page.waitForFunction(()=>document.querySelectorAll('.workspace-clip-item').length===3);
  assert.deepEqual((await project(page)).songWorkspace,clips);
  const invalid=structuredClone(saved);invalid.songWorkspace.clips[0].startBar=500;
  await page.locator('#projectFile').setInputFiles({name:'invalid.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(invalid))});
  await page.waitForFunction(()=>document.querySelector('#feedback')?.textContent.includes('Could not open project'));
  assert.deepEqual((await project(page)).songWorkspace,clips,'Invalid project damaged active state');
  const old=structuredClone(saved);delete old.songWorkspace;
  await page.locator('#projectFile').setInputFiles({name:'v19.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(old))});
  await page.waitForFunction(()=>document.querySelectorAll('.workspace-clip-item').length===0);
  assert.equal((await project(page)).songWorkspace.clips.length,0);
  assert.deepEqual(errors,[],'Browser exceptions');
  console.log(browserName,width,'clips/edit/undo/project safety passed');await ctx.close();
 }}finally{await browser.close();}
}
const browser=await chromium.launch({headless:true});
try{
 const page=await browser.newPage({viewport:{width:1300,height:850},acceptDownloads:true}),errors=[];
 page.on('pageerror',e=>errors.push(e.message));await page.setContent(html);
 await draw(page,11);await draw(page,7);await page.locator('#rollSendSong').click();
 await page.locator('#startAudio').click();await page.locator('#workspacePlay').click();
 assert.match(await page.locator('#workspacePlay').innerText(),/STOP/);
 await page.locator('#workspaceStop').click();
 const wav=await getFile(page,'#workspaceExport');assert(wav.length>100000&&peak(wav)>30,'Silent timeline WAV');
 await page.locator('#workspaceTape').click();
 await page.waitForFunction(()=>document.querySelector('#feedback')?.textContent.includes('printed to a new PCM clip'),null,{timeout:60000});
 let saved=await project(page);assert.equal(saved.tracks[0].clips.length,1);
 assert.equal(typeof saved.audioSamples[saved.tracks[0].clips[0].sampleId],'string');
 await page.locator('#projectFile').setInputFiles({name:'with-tape.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(saved))});
 await page.waitForFunction(()=>document.querySelector('#feedback')?.textContent.includes('Project loaded'),null,{timeout:60000});
 assert.equal((await project(page)).tracks[0].clips.length,1);
 page.once('dialog',d=>d.accept());await page.locator('#workspaceMeter').selectOption('6/8');
 assert.equal((await project(page)).songWorkspace.meter,'6/8');
 const wav68=await getFile(page,'#workspaceExport');assert(peak(wav68)>30,'6/8 WAV silent');
 assert.deepEqual(errors,[]);
 console.log('Chromium stereo WAV, print to PCM tape, imported backup and 6/8 passed');
}finally{await browser.close();}
