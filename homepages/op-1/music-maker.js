/* v2.7 Music Maker: original, seeded, offline musical ideas. All notes remain standard tracker cells. */
(function(){
'use strict';
const $=id=>document.getElementById(id);
const PARTS=['Drums','Bass','Chords','Melody'];
const STYLES={
 tracker:{name:'Retro tracker / keygen',bpm:132,bank:0,swing:12,inst:[0,5,6,7]},
 chiptune:{name:'Chiptune',bpm:142,bank:0,swing:0,inst:[0,5,6,3]},
 synthpop:{name:'Synthpop',bpm:116,bank:1,swing:12,inst:[0,3,0,4]},
 lofi:{name:'Lo-fi / chill',bpm:86,bank:1,swing:25,inst:[0,3,2,0]},
 dance:{name:'Electronic / dance',bpm:128,bank:0,swing:0,inst:[0,5,6,7]},
 ambient:{name:'Ambient / dreamy',bpm:78,bank:1,swing:0,inst:[0,3,0,2]}
};
const MODES={happy:[0,4,5,3],dreamy:[0,5,3,4],dark:[0,5,2,6],epic:[0,3,4,5]};
const MAJOR=[0,2,4,5,7,9,11],MINOR=[0,2,3,5,7,8,10];
const cap=(n,a,b)=>Math.max(a,Math.min(b,n));
function random(seed){let x=(seed>>>0)||0x713c8a21;return ()=>{x^=x<<13;x^=x>>>17;x^=x<<5;return (x>>>0)/4294967296;};}
function cell(midi,inst=0,kind='synth',length=1,vel=96){
 return {midi:cap(Math.round(midi),36,95),inst,kind,vel:cap(Math.round(vel),1,127),fx:'none',param:0,length,chance:100};
}
function config(input){
 const style=STYLES[input.style]?input.style:'tracker';
 const mood=MODES[input.mood]?input.mood:'happy';
 const energy=['low','medium','high'].includes(input.energy)?input.energy:'medium';
 const spec=STYLES[style];
 return {style,mood,energy,bank:spec.bank,swing:spec.swing,
 bpm:cap(spec.bpm+(energy==='low'?-8:energy==='high'?10:0),40,240),
 scale:mood==='dark'?MINOR:MAJOR,base:mood==='dark'?45:48,
 progression:MODES[mood],inst:spec.inst};
}
function pitch(c,degree,octave=0){
 const index=((degree%7)+7)%7,wrap=Math.floor(degree/7);
 return c.base+c.scale[index]+12*(octave+wrap);
}
function partNotes(c,section,ch,rng,variation='new'){
 const notes=new Array(32).fill(null),energy=c.energy;
 const movement=variation==='simpler'?.65:variation==='busier'?1.4:1;
 const shift=variation==='higher'?12:variation==='lower'?-12:0;
 const density=(energy==='low'?.72:energy==='high'?1.16:1)*movement;
 const drum=ch===0,inst=c.inst[ch];
 const minor=c.mood==='dark';
 const melodicMotif=[0,2,4,3,2,0,1,0];
 for(let bar=0;bar<2;bar++){
  const degree=c.progression[(section*2+bar)%4],root=bar*16;
  const chord=[degree,degree+2,degree+4];
  for(let step=0;step<16;step++){
   const row=root+step,r=rng();
   if(drum){
    if(c.style==='ambient'&&r>.48)continue;
    const onBackbeat=step===4||step===12;
    const onKick=step===0||step===8||(c.style==='dance'&&(step===4||step===12));
    let type=null;
    if(onBackbeat)type=1;else if(onKick)type=0;
    else if(step%4===2 && r<cap(.74*density,0,.98))type=2;
    else if(energy==='high'&&step%4===3&&r<cap(.38*density,0,.85))type=3;
    if(type!==null)notes[row]=cell(48+type,type,'drum',1,type===0?110:type===1?103:65+Math.floor(rng()*15));
   }else if(ch===1){
    const positions=c.style==='ambient'?[0,8]:[0,6,8,12];
    if(!positions.includes(step)||r>(step===0?1:cap(.64*density,0,.96)))continue;
    const degreeOffset=step===12&&r>.65?4:step===6&&r>.6?2:0;
    const bass=pitch(c,degree+degreeOffset,-1)+shift;
    notes[row]=cell(bass,inst,'synth',step===0?4:2,85+Math.floor(rng()*20));
   }else if(ch===2){
    const rate=c.style==='ambient'?8:c.style==='dance'?2:4;
    if(step%rate!==0||r>cap(.88*density,0,1))continue;
    const arpIndex=Math.floor(step/rate)%3;
    const arpDegree=chord[(section%2===0?arpIndex:2-arpIndex)];
    notes[row]=cell(pitch(c,arpDegree,0)+shift,inst,'synth',c.style==='ambient'?4:2,65+Math.floor(rng()*20));
   }else{
    const positions=c.style==='ambient'?[0,8]:c.style==='dance'?[0,4,6,10,12,14]:[0,3,6,8,12,14];
    if(!positions.includes(step)||r>cap((step===0?.98:.74)*density,0,1))continue;
    const motifIndex=(Math.floor(step/2)+section)%melodicMotif.length;
    const deviation=rng()<.15?1:0;
    const melodicDegree=degree+melodicMotif[motifIndex]+deviation;
    const melody=pitch(c,melodicDegree,1)+shift;
    notes[row]=cell(melody,inst,'synth',step%4===0?2:1,79+Math.floor(rng()*23));
   }
  }
 }
 return notes;
}
function patterns(input,seed=1,variation='new',parts=[0,1,2,3]){
 const c=config(input),out=[];
 const wanted=new Set(parts);
 for(let section=0;section<4;section++){
  const cells=new Array(128).fill(null);
  for(let ch=0;ch<4;ch++){
   if(!wanted.has(ch))continue;
   const rng=random((seed+section*1013904223+ch*2654435761)>>>0);
   const n=partNotes(c,section,ch,rng,variation);
   for(let row=0;row<32;row++)cells[row*4+ch]=n[row];
  }
  out.push({rows:32,cells});
 }
 return out;
}
function whole(input,seed){
 const c=config(input),p=patterns(input,seed);
 return {patterns:p,chain:[0,1,2,3],active:0,bank:c.bank,bpm:c.bpm,swing:c.swing,
 arrangement:[{pattern:0,rows:32,label:'Intro'},{pattern:1,rows:64,label:'Verse'},{pattern:2,rows:64,label:'Chorus'},{pattern:3,rows:32,label:'Outro'}]};
}
let session=false,songOptions=null,locks=new Set(),variationCount=[0,0,0,0];
function seed(){if(window.crypto&&crypto.getRandomValues)return crypto.getRandomValues(new Uint32Array(1))[0];return (Math.random()*4294967295)>>>0;}
function options(){return {style:$('makerStyle').value,mood:$('makerMood').value,energy:$('makerEnergy').value};}
function status(message){$('makerStatus').textContent=message;}
function refresh(){
 for(let i=0;i<4;i++){
  const b=$('makerRemix'+i),lock=$('makerLock'+i);
  b.disabled=!session||locks.has(i);
  lock.disabled=!session;
  lock.setAttribute('aria-pressed',String(locks.has(i)));
  lock.textContent=locks.has(i)?'Locked':'Lock';
  $('makerVersion'+i).textContent=session?'Variation '+(variationCount[i]+1):'No part yet';
 }
 $('makerRemixAll').disabled=!session||locks.size===4;
 $('makerUndo').disabled=!session;
 $('makerPlay').disabled=!session;
 $('makerFinish').disabled=!session;
}
function generate(){
 const selected=options(),song=whole(selected,seed());
 if(!window.OP1Tracker.applyMusicMakerSong(song))return;
 session=true;songOptions=selected;locks.clear();variationCount=[0,0,0,0];refresh();
 status('Your song is ready. Press Play, then change any part that needs work. Your other studios and recordings are untouched.');
}
function remix(channels){
 if(!session||!channels.length)return;
 const choice=$('makerDirection').value,origin=songOptions||options();
 const remixPatterns=patterns(origin,seed(),choice,channels);
 if(!window.OP1Tracker.applyMusicMakerParts(remixPatterns,channels))return;
 channels.forEach(ch=>variationCount[ch]++);
 refresh();
 status('Changed '+channels.map(ch=>PARTS[ch]).join(', ')+'. Your locked parts and other tracks are unchanged. Use Undo if you preferred the previous version.');
}
function init(){
 const welcome=$('studioWelcome');
 if(!welcome||!window.OP1Tracker)return;
 const root=document.createElement('section');root.id='musicMaker';root.className='music-maker';root.setAttribute('aria-label','Beginner Music Maker');
 root.innerHTML='<div class="maker-heading"><div><span>v2.7 · MUSIC MAKER</span><h2>Make something that sounds like music.</h2><p>Choose a style, make a song, then change anything you don\'t like. No music experience needed.</p></div><button type="button" id="makerAdvanced">Open Advanced Studio</button></div>'+
 '<div class="maker-settings"><label>Style<select id="makerStyle"><option value="tracker">Retro tracker / keygen</option><option value="chiptune">Chiptune</option><option value="synthpop">Synthpop</option><option value="lofi">Lo-fi / chill</option><option value="dance">Electronic / dance</option><option value="ambient">Ambient / dreamy</option></select></label><label>Mood<select id="makerMood"><option value="happy">Happy and bouncy</option><option value="dreamy">Dreamy and gentle</option><option value="dark">Dark and mysterious</option><option value="epic">Dramatic and energetic</option></select></label><label>Energy<select id="makerEnergy"><option value="low">Relaxed</option><option value="medium" selected>Medium</option><option value="high">Energetic</option></select></label></div>'+
 '<div class="maker-transport"><button type="button" id="makerGenerate" class="maker-primary">✦ Generate a Song</button><button type="button" id="makerPlay">▶ Play Song</button><button type="button" id="makerStop">■ Stop</button><button type="button" id="makerUndo">↶ Undo Change</button></div>'+
 '<p id="makerStatus" role="status" aria-live="polite">Choose your style and press Generate a Song. This replaces tracker patterns only after confirmation if you have existing notes.</p>'+
 '<div class="maker-parts"><div class="maker-parts-heading"><h3>Make it your own</h3><p>Lock what sounds good. Change the rest, without losing the whole song.</p></div>'+
 PARTS.map((name,i)=>'<div class="maker-part"><div><strong>'+name+'</strong><small id="makerVersion'+i+'">No part yet</small></div><button type="button" id="makerLock'+i+'" aria-pressed="false">Lock</button><button type="button" id="makerRemix'+i+'">↻ Change</button></div>').join('')+
 '<div class="maker-remix-tools"><label>Change the feel<select id="makerDirection"><option value="new">Surprise me</option><option value="simpler">Simpler</option><option value="busier">Busier</option><option value="lower">Lower notes</option><option value="higher">Higher notes</option></select></label><button type="button" id="makerRemixAll">↻ Remix Unlocked Parts</button></div></div>'+
 '<div class="maker-footer"><button type="button" id="makerEdit">Edit Individual Notes</button><button type="button" id="makerFinish">⬇ Export Song WAV</button><button type="button" id="makerSave">Save Editable Project</button></div>'+
 '<p class="maker-footnote">Everything is editable in Tracker Studio. Generate and Change use its normal Undo history; your Tape Studio, samples and Song Workspace are never replaced. Chord parts use one-note-at-a-time arpeggios in this four-channel tracker.</p>';
 const header=document.querySelector('main.shell > header.topline');
 if(header)header.after(root);else welcome.before(root);
 for(const field of ['makerStyle','makerMood','makerEnergy'])$(field).addEventListener('change',()=>{
  if(session)status('Changed generation settings. Press Generate a Song to start a new idea; Change keeps the musical key and tempo of your current song.');
 });
 $('makerGenerate').addEventListener('click',generate);
 $('makerPlay').addEventListener('click',()=>{window.OP1Tracker.playArrangement();status('Playing your song. If the browser asks to enable audio, choose Enable Audio above.')});
 $('makerStop').addEventListener('click',()=>{window.OP1Tracker.stop();status('Playback stopped.')});
 $('makerUndo').addEventListener('click',()=>{window.OP1Tracker.undo();status('Tracker change undone. Your original idea is restored.');});
 for(let ch=0;ch<4;ch++){
  $('makerRemix'+ch).addEventListener('click',()=>remix([ch]));
  $('makerLock'+ch).addEventListener('click',()=>{
   if(locks.has(ch))locks.delete(ch);else locks.add(ch);
   refresh();
  });
 }
 $('makerRemixAll').addEventListener('click',()=>remix([0,1,2,3].filter(ch=>!locks.has(ch))));
 $('makerSave').addEventListener('click',()=>$('saveProject').click());
 $('makerFinish').addEventListener('click',()=>window.OP1Tracker.exportFinishedSong());
 $('makerEdit').addEventListener('click',()=>window.OP1Simplified.selectTool('trackerStudio',{scroll:true}));
 $('makerAdvanced').addEventListener('click',()=>window.OP1Simplified.setMode('advanced'));
 refresh();
}
window.OP1MusicMaker={config,patterns,whole,init,get active(){return session}};
})();