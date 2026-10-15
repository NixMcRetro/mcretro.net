// BleepGarden v2.9 MIDI export reflects arranged song, and Tracker Corner stays optional.
import {chromium,firefox,webkit} from 'playwright';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {beginnerHtml} from './op1-test-html.mjs';

function inspectMidi(buffer){
 let i=0;
 const read4=()=>{const n=buffer.readUInt32BE(i);i+=4;return n};
 const id=()=>{const t=buffer.toString('ascii',i,i+4);i+=4;return t};
 const word=()=>{const n=buffer.readUInt16BE(i);i+=2;return n};
 const vlq=()=>{let v=0,n;do{n=buffer[i++];v=(v<<7)|(n&127)}while(n&128);return v};
 assert.equal(id(),'MThd');assert.equal(read4(),6);
 const type=word(),count=word(),division=word();const tracks=[];
 for(let k=0;k<count;k++){
  assert.equal(id(),'MTrk');const end=i+read4(),events=[];let tick=0;
  while(i<end){
   tick+=vlq();const byte=buffer[i++];
   if(byte===0xff){const code=buffer[i++],length=vlq(),text=buffer.subarray(i,i+length);i+=length;events.push({tick,meta:code,text:text.toString('ascii'),bytes:text});}
   else{const hi=byte&0xf0,n=hi===0xc0||hi===0xd0?1:2,values=Array.from(buffer.subarray(i,i+n));i+=n;events.push({tick,status:byte,values});}
  }
  assert.equal(i,end);tracks.push(events);
 }
 assert.equal(i,buffer.length);
 return {type,count,division,tracks};
}
for(const [browserName,engine] of Object.entries({chromium,firefox,webkit})){
 const browser=await engine.launch({headless:true});
 try{
  const ctx=await browser.newContext({viewport:{width:browserName==='chromium'?390:1140,height:850},acceptDownloads:true});
  const page=await ctx.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.setContent(beginnerHtml,{waitUntil:'domcontentloaded'});
  assert(await page.locator('#makerMidi').isDisabled());
  assert.equal(await page.locator('.casio-tabs button').count(),2,'Keep the two everyday tabs');
  assert.equal(await page.locator('#makerTrackerCorner').count(),1);
  assert.equal(await page.locator('#makerTrackerCorner').getAttribute('open'),null,'Advanced options should start collapsed');
  await page.locator('#makerGenerate').click();
  const original=await page.evaluate(()=>window.OP1Tracker.musicMakerSnapshot());
  assert.equal(original.arrangement.length,4);
  assert(await page.locator('#makerMidi').isEnabled());
  const compiled=await page.evaluate(()=>window.OP1Tracker.compileArrangement(window.OP1Tracker.musicMakerSnapshot(),false));
  const pending=page.waitForEvent('download',{timeout:60000});
  await page.locator('#makerMidi').click();
  const download=await pending;
  assert.equal(download.suggestedFilename(),'bleepgarden-music-maker-2000-song.mid');
  const file=readFileSync(await download.path()),midi=inspectMidi(file);
  assert.equal(midi.type,1);
  assert.equal(midi.count,5,'Conductor plus four editable musical tracks');
  assert.equal(midi.division,480);
  const tempo=midi.tracks[0].find(x=>x.meta===0x51);
  assert(tempo,'MIDI must include tempo');
  const value=(tempo.bytes[0]<<16)|(tempo.bytes[1]<<8)|tempo.bytes[2];
  assert.equal(value,Math.round(60000000/original.bpm));
  assert.deepEqual(midi.tracks[0].filter(x=>x.meta===6).map(x=>x.text),['Intro 1','Verse 2','Chorus 3','Outro 4']);
  assert.deepEqual(midi.tracks.slice(1).map(track=>track.find(x=>x.meta===3).text),['Drums','Bass','Chords','Melody']);
  const on=midi.tracks.slice(1).flat().filter(x=>x.status!==undefined&&(x.status&0xf0)===0x90);
  const off=midi.tracks.slice(1).flat().filter(x=>x.status!==undefined&&(x.status&0xf0)===0x80);
  assert.equal(on.length,compiled.notes.length,'MIDI exports the full arrangement, including repeats');
  assert.equal(off.length,on.length,'Every MIDI note must turn off');
  assert(on.some(x=>x.status===0x99),'Drums should use standard MIDI channel 10');
  assert.deepEqual(await page.evaluate(()=>window.OP1Tracker.musicMakerSnapshot()),original,'MIDI must not edit song');
  // Four coherent sections: the chorus recalls the intro idea, and outro resolves.
  const first=original.patterns[0].cells.filter((_,i)=>i%4===3);
  const chorus=original.patterns[2].cells.filter((_,i)=>i%4===3);
  assert(first.filter(Boolean).length>=1&&chorus.filter(Boolean).length>=1);
  const finalNote=original.patterns[3].cells[24*4+3];
  assert(finalNote?.kind==='synth'&&finalNote.length===4,'Outro should end with a held tonic');
  const seed=12345678,options={style:'tracker',mood:'happy',energy:'medium'};
  const pure=await page.evaluate(({options,seed})=>window.OP1MusicMaker.whole(options,seed),{options,seed});
  assert.deepEqual(pure,await page.evaluate(({options,seed})=>window.OP1MusicMaker.whole(options,seed),{options,seed}),'Seeded ideas must reproduce');
  assert.deepEqual(pure.patterns[0].cells.filter((_,i)=>i%4===3).filter(Boolean).length>0,true);
  await page.locator('#makerTrackerCorner summary').click();
  assert.equal(await page.locator('#makerPatternList option').count(),4);
  assert.match(await page.locator('#makerTrackerInfo').innerText(),/four channels/);
  await page.locator('#makerGroove').selectOption('25');
  assert.equal((await page.evaluate(()=>window.OP1Tracker.musicMakerSnapshot())).swing,25);
  await page.locator('#makerUndo').click();
  assert.equal((await page.evaluate(()=>window.OP1Tracker.musicMakerSnapshot())).swing,original.swing,'Groove Undo should work');
  await page.locator('#makerPatternList').selectOption('2');
  await page.locator('#makerPatternPreview').click();
  await page.waitForFunction(()=>window.OP1Tracker.transport.mode==='live',null,{timeout:8000});
  await page.locator('#makerPatternPreview').click();
  assert.equal(await page.evaluate(()=>window.OP1Tracker.transport.playing),false);
  assert.deepEqual((await page.evaluate(()=>window.OP1Tracker.musicMakerSnapshot())).patterns,original.patterns);
  if(browserName==='chromium'){
   const sum=await page.evaluate(()=>{
    for(let i=0;i<4;i++)if(!window.OP1Tracker.musicMakerArrange('rows',i,128))return false;
    for(let i=0;i<9;i++)if(!window.OP1Tracker.musicMakerArrange('duplicate',0))return false;
    return true;
   });
   assert(sum);
   assert(await page.locator('#makerFinish').isDisabled(),'WAV length guard');
   assert(await page.locator('#makerMidi').isEnabled(),'MIDI should still be available for long arrangements');
   const pending2=page.waitForEvent('download',{timeout:60000});
   await page.locator('#makerMidi').click();
   const bytes=readFileSync(await(await pending2).path());
   assert.equal(inspectMidi(bytes).tracks[0].filter(x=>x.meta===6).length,13);
   const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
   assert(overflow<=1,'Phone should not overflow by '+overflow);
  }
  assert.deepEqual(errors,[],'No JavaScript browser errors');
  console.log('PASS BleepGarden arranged-song MIDI, musical hooks, tracker options and Undo',browserName);
  await ctx.close();
 }finally{await browser.close()}
}
