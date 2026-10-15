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
 scale:mood==='dark'?MINOR:MAJOR,base:mood==='dark'?57:48,
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
    const melody=pitch(c,melodicDegree,minor?0:1)+shift;
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
 if(!$('musicMaker'))return;
 const sections=window.OP1Tracker?.musicMakerSectionChoices?.()||[];
 if($('makerEasySection')){
  const select=$('makerEasySection'),prev=select.value;
  if(select.options.length!==sections.length||sections.some((part,i)=>select.options[i]?.textContent!==part.name)){
   select.replaceChildren(...sections.map(x=>new Option(x.name,String(x.index))));
   if(sections.some(x=>String(x.index)===prev))select.value=prev;
  }
  $('makerEasyApply').disabled=!sections.length;
 } // Tracker initialises before Music Maker inserts its controls.
 const overview=window.OP1Tracker?.musicMakerOverview?.()||{ready:false,sections:0,seconds:0,bpm:120,playing:false};
 const playable=session||overview.ready;
 if($('makerSongOverview'))$('makerSongOverview').textContent=overview.ready?
  overview.sections+' song sections · about '+Math.round(overview.seconds)+' seconds · '+overview.bpm+' BPM'+(overview.seconds>180?' · Export limit 3 minutes':''):
  'No song arranged yet. Choose a style, then Generate a Song.';
 if($('makerPlay')){$('makerPlay').textContent=overview.playing?'■ Stop Song':'▶ Play Song';$('makerPlay').setAttribute('aria-pressed',String(overview.playing))}
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
 $('makerPlay').disabled=!playable;
 $('makerFinish').disabled=!playable;
}
function generate(){
 const selected=options(),song=whole(selected,seed());
 if(!window.OP1Tracker.applyMusicMakerSong(song))return;
 cancelSoundPreview();session=true;songOptions=selected;locks.clear();variationCount=[0,0,0,0];refresh();
 status('Your song is ready. Press Play, then change any part that needs work. Your other studios and recordings are untouched.');window.OP1RiffRecorder?.refresh?.();
}
function easyStatus(message){$('makerEasyStatus').textContent=message}
function adjustPart(){
 const section=Number($('makerEasySection').value),ch=Number($('makerEasyPart').value),action=$('makerEasyDirection').value;
 if(locks.has(ch)){easyStatus(PARTS[ch]+' is locked. Unlock it above before changing its notes.');return}
 const target=window.OP1Tracker.musicMakerRecordingTarget(section,ch);
 if(!target.ok){easyStatus(target.reason);return}
 let generated=null;
 if(action==='regenerate'){
  const original=songOptions||options();
  const fresh=patterns(original,seed(),'new',[ch]);
  generated=Array.from({length:32},(_,row)=>fresh[section%4].cells[row*4+ch]);
 }
 cancelSoundPreview();
 const result=window.OP1Tracker.adjustMusicMakerPart(section,ch,action,generated);
 if(!result){easyStatus('Could not make that change. Stop playback or an export. For higher or lower notes, the part may already be near the keyboard limit.');return}
 if(session)variationCount[ch]++;
 refresh();
 easyStatus(PARTS[ch]+' updated in '+target.name+'. Only this section and part changed. Undo Latest Edit restores the previous version.');
}
function remix(channels){
 if(!session||!channels.length)return;
 cancelSoundPreview();
 const choice=$('makerDirection').value,origin=songOptions||options();
 const remixPatterns=patterns(origin,seed(),choice,channels);
 if(!window.OP1Tracker.applyMusicMakerParts(remixPatterns,channels))return;
 channels.forEach(ch=>variationCount[ch]++);
 refresh();
 status('Changed '+channels.map(ch=>PARTS[ch]).join(', ')+'. Your locked parts and other tracks are unchanged. Use Undo if you preferred the previous version.');
}
/* Stage 4: preview is deliberately separate from the saved v5 tracker mixer. */
let soundCandidate=null,comparison='B';
const SOUND_DIRECTIONS=['warm','bright','punch','soft','space','dark','surprise'];
function soundStatus(message){$('makerSoundStatus').textContent=message;}
const mixerClamp=(n,a,b)=>Math.max(a,Math.min(b,n));
function shapeSound(original,direction,amount,seedValue=1){
 if(!original||!SOUND_DIRECTIONS.includes(direction))throw Error('Invalid sound direction');
 const strength=mixerClamp(Number(amount)/100,0,1),rng=random(seedValue),o={...original};
 let target={...original};
 const rise=(name,delta,max=100)=>target[name]=mixerClamp((original[name]??0)+delta,0,max);
 switch(direction){
  case 'warm':
   target.tone=mixerClamp(original.tone-42,14,100);rise('warmth',72);target.brightness=mixerClamp((original.brightness??0)-32,0,100);break;
  case 'bright':
   target.tone=mixerClamp(original.tone+38,0,100);rise('brightness',76);target.warmth=mixerClamp((original.warmth??0)-16,0,100);break;
  case 'punch':
   rise('punch',82);target.tone=mixerClamp(original.tone+12,0,100);target.space=mixerClamp((original.space??0)-24,0,100);break;
  case 'soft':
   target.tone=mixerClamp(original.tone-26,10,100);target.punch=mixerClamp((original.punch??0)-55,0,100);
   target.level=mixerClamp(original.level*.86,0,1.5);rise('warmth',24);break;
  case 'space':
   rise('space',85);target.fxSend=mixerClamp((original.fxSend??100)+22,0,100);
   target.tone=mixerClamp(original.tone-8,15,100);break;
  case 'dark':
   target.tone=mixerClamp(original.tone-62,7,100);target.brightness=0;rise('warmth',43);break;
  case 'surprise':
   target={...original,tone:40+Math.round(rng()*55),warmth:Math.round(rng()*75),
    brightness:Math.round(rng()*70),punch:Math.round(rng()*68),space:Math.round(rng()*67),
    fxSend:60+Math.round(rng()*40),level:mixerClamp(original.level*(.91+rng()*.13),0,1.5),
    pan:mixerClamp(original.pan+(rng()-.5)*.3,-1,1)};
   break;
 }
 for(const key of ['tone','warmth','brightness','punch','space','fxSend']){
  if(target[key]!==undefined)o[key]=mixerClamp(Math.round((original[key]??0)+((target[key]??0)-(original[key]??0))*strength),0,100);
 }
 for(const key of ['level','pan'])if(target[key]!==undefined){
  o[key]=Math.round(mixerClamp(original[key]+(target[key]-original[key])*strength,key==='pan'?-1:0,key==='pan'?1:1.5)*1000)/1000;
 }
 return o;
}
function cancelSoundPreview(message='Sound preview cancelled. Nothing was changed.'){
 if(soundCandidate){window.OP1Tracker.clearMusicMakerSoundPreview();}
 soundCandidate=null;comparison='B';
 for(const id of ['makerSoundA','makerSoundB','makerSoundKeep','makerSoundCancel'])if($(id))$(id).disabled=true;
 if($('makerSoundA'))$('makerSoundA').setAttribute('aria-pressed','false');
 if($('makerSoundB'))$('makerSoundB').setAttribute('aria-pressed','false');
 if($('makerSoundStatus'))soundStatus(message);
}
function compareSound(which){
 if(!soundCandidate)return;
 comparison=which;
 const value=which==='A'?soundCandidate.before:soundCandidate.after;
 if(!window.OP1Tracker.previewMusicMakerSound(soundCandidate.ch,value)){
  cancelSoundPreview('Preview unavailable during recording or export. Your saved sound is unchanged.');return;
 }
 $('makerSoundA').setAttribute('aria-pressed',String(which==='A'));
 $('makerSoundB').setAttribute('aria-pressed',String(which==='B'));
 soundStatus((which==='A'?'A: Original sound.':'B: Changed sound.')+' Press Play Song if playback is stopped. Keeping B is optional.');
}
function trySound(){
 if(!window.OP1Tracker.musicMakerHasNotes()){
  soundStatus('Generate a song or open an existing tracker song before shaping its sound.');return;
 }
 cancelSoundPreview();
 const ch=Number($('makerSoundPart').value),original=window.OP1Tracker.readMusicMakerSound(ch);
 if(!original){soundStatus('Choose a musical part first.');return}
 const direction=$('makerSoundDirection').value,amount=Number($('makerSoundAmount').value);
 const after=shapeSound(original,direction,amount,seed());
 if(!window.OP1Tracker.previewMusicMakerSound(ch,after)){
  soundStatus('Stop recordings or exports before previewing a new sound.');return;
 }
 soundCandidate={ch,before:original,after};comparison='B';
 for(const id of ['makerSoundA','makerSoundB','makerSoundKeep','makerSoundCancel'])$(id).disabled=false;
 compareSound('B');
}
function keepSound(){
 if(!soundCandidate)return;
 const saved=soundCandidate;
 if(!window.OP1Tracker.commitMusicMakerSound(saved.ch,saved.after)){
  soundStatus('Could not save this sound during recording or export.');return;
 }
 soundCandidate=null;cancelSoundPreview('Sound saved to '+PARTS[saved.ch]+'. Use Undo Change to restore the previous sound. It will also be included in your WAV and portable project backup.');
}
function initSound(){
 $('makerSoundAmount').addEventListener('input',e=>{$('makerSoundAmountLabel').textContent=e.target.value+'%';if(soundCandidate)cancelSoundPreview('Adjustment changed. Press Try Sound to hear it.');});
 for(const id of ['makerSoundPart','makerSoundDirection'])$(id).addEventListener('change',()=>{
  if(soundCandidate)cancelSoundPreview('Selection changed. The old preview was cancelled. Press Try Sound.');
 });
 $('makerSoundTry').addEventListener('click',trySound);
 $('makerSoundA').addEventListener('click',()=>compareSound('A'));
 $('makerSoundB').addEventListener('click',()=>compareSound('B'));
 $('makerSoundKeep').addEventListener('click',keepSound);
 $('makerSoundCancel').addEventListener('click',()=>cancelSoundPreview());
 cancelSoundPreview('Choose a part, then Try Sound. The saved song stays unchanged until you press Keep This Sound.');
}
function init(){
 const welcome=$('studioWelcome');
 if(!welcome||!window.OP1Tracker)return;
 const root=document.createElement('section');root.id='musicMaker';root.className='music-maker';root.setAttribute('aria-label','Beginner Music Maker');
 root.innerHTML='<div class="maker-heading"><div><span>v2.8 · MUSIC MAKER</span><h2>Make something that sounds like music.</h2><p>Choose a style, make a song, then change anything you don\'t like. No music experience needed.</p></div><button type="button" id="makerAdvanced">Open Advanced Studio</button></div>'+
 '<div class="maker-settings"><label>Style<select id="makerStyle"><option value="tracker">Retro tracker / keygen</option><option value="chiptune">Chiptune</option><option value="synthpop">Synthpop</option><option value="lofi">Lo-fi / chill</option><option value="dance">Electronic / dance</option><option value="ambient">Ambient / dreamy</option></select></label><label>Mood<select id="makerMood"><option value="happy">Happy and bouncy</option><option value="dreamy">Dreamy and gentle</option><option value="dark">Dark and mysterious</option><option value="epic">Dramatic and energetic</option></select></label><label>Energy<select id="makerEnergy"><option value="low">Relaxed</option><option value="medium" selected>Medium</option><option value="high">Energetic</option></select></label></div>'+
 '<div class="maker-transport"><button type="button" id="makerGenerate" class="maker-primary">✦ Generate a Song</button><button type="button" id="makerPlay">▶ Play Song</button><button type="button" id="makerStop">■ Stop</button><button type="button" id="makerUndo">↶ Undo Change</button></div>'+
 '<div class="maker-song-overview"><strong id="makerSongOverview" role="status">No song arranged yet.</strong><span>1. Generate · 2. Remix or shape · 3. Play · 4. Export or save</span></div>'+
 '<p id="makerStatus" role="status" aria-live="polite">Choose your style and press Generate a Song. This replaces tracker patterns only after confirmation if you have existing notes.</p>'+
 '<div class="maker-parts"><div class="maker-parts-heading"><h3>Make it your own</h3><p>Lock what sounds good. Change the rest, without losing the whole song.</p></div>'+
 PARTS.map((name,i)=>'<div class="maker-part"><div><strong>'+name+'</strong><small id="makerVersion'+i+'">No part yet</small></div><button type="button" id="makerLock'+i+'" aria-pressed="false">Lock</button><button type="button" id="makerRemix'+i+'">↻ Change</button></div>').join('')+
 '<div class="maker-remix-tools"><label>Change the feel<select id="makerDirection"><option value="new">Surprise me</option><option value="simpler">Simpler</option><option value="busier">Busier</option><option value="lower">Lower notes</option><option value="higher">Higher notes</option></select></label><button type="button" id="makerRemixAll">↻ Remix Unlocked Parts</button></div></div>'+
 '<section class="maker-easy" aria-label="Easy changes for individual song parts"><h3>Fix a part without editing notes</h3><p>Choose one part and section, then tell the song what to change. Everything else stays put.</p><div class="maker-easy-settings"><label>Part<select id="makerEasyPart"><option value="3">Melody</option><option value="1">Bass</option><option value="2">Chords</option></select></label><label>Section<select id="makerEasySection"></select></label><label>Change<select id="makerEasyDirection"><option value="simpler">Simpler</option><option value="busier">Busier</option><option value="higher">Higher</option><option value="lower">Lower</option><option value="regenerate">New Idea</option></select></label></div><div class="maker-easy-actions"><button type="button" id="makerEasyApply">✓ Make This Change</button><button type="button" id="makerEasyUndo">↶ Undo Latest Edit</button></div><p id="makerEasyStatus" role="status" aria-live="polite">Choose a part and try a musical adjustment. Saved projects work too.</p></section>'+
 '<section class="maker-sound" aria-label="Shape the sound of a musical part"><div class="maker-parts-heading"><h3>Shape your sound</h3><p>Try warmer, brighter or another feel. Compare before and after without changing your saved song.</p></div>'+
 '<div class="maker-sound-settings"><label>Choose a part<select id="makerSoundPart"><option value="0">Drums</option><option value="1">Bass</option><option value="2">Chords</option><option value="3" selected>Melody</option></select></label>'+
 '<label>Make it sound<select id="makerSoundDirection"><option value="warm">Warmer</option><option value="bright">Brighter</option><option value="punch">Punchier</option><option value="soft">Softer</option><option value="space">Spacier</option><option value="dark">Darker</option><option value="surprise">Surprise Me (safe random)</option></select></label>'+
 '<label class="maker-intensity">How much? <strong id="makerSoundAmountLabel">55%</strong><input type="range" id="makerSoundAmount" min="0" max="100" value="55" step="5"></label></div>'+
 '<div class="maker-sound-actions"><button type="button" id="makerSoundTry" class="maker-primary">♫ Try Sound</button><button type="button" id="makerSoundA" aria-pressed="false" disabled>A Original</button><button type="button" id="makerSoundB" aria-pressed="false" disabled>B Changed</button><button type="button" id="makerSoundKeep" disabled>✓ Keep This Sound</button><button type="button" id="makerSoundCancel" disabled>Cancel</button></div>'+
 '<p id="makerSoundStatus" role="status" aria-live="polite">Choose a part, then Try Sound.</p><p class="maker-footnote">Preview changes only the tracker sound while you listen. Keep commits one undoable change. Effects are bounded to avoid extreme loudness; your tape, other projects and independent Song Workspace remain untouched.</p></section>'+
 '<div class="maker-footer"><button type="button" id="makerEdit">Edit Individual Notes</button><button type="button" id="makerFinish">⬇ Export Song WAV</button><button type="button" id="makerSave">Save Editable Project</button></div>'+
 '<p class="maker-footnote">Everything is editable in Tracker Studio. Generate and Change use its normal Undo history; your Tape Studio, samples and Song Workspace are never replaced. Chord parts use one-note-at-a-time arpeggios in this four-channel tracker.</p>';
 const header=document.querySelector('main.shell > header.topline');
 if(header)header.after(root);else welcome.before(root);
 for(const field of ['makerStyle','makerMood','makerEnergy'])$(field).addEventListener('change',()=>{
  if(session)status('Changed generation settings. Press Generate a Song to start a new idea; Change keeps the musical key and tempo of your current song.');
 });
 initSound();
 $('makerEasyApply').addEventListener('click',adjustPart);
 $('makerEasyUndo').addEventListener('click',()=>{cancelSoundPreview();window.OP1Tracker.undo();easyStatus('Restored the previous tracker edit.');refresh()});
 $('makerGenerate').addEventListener('click',generate);
 $('makerPlay').addEventListener('click',()=>{
  if(window.OP1Tracker.arrangementPlaying){window.OP1Tracker.stop();status('Playback stopped. Press Play Song whenever you want to listen again.');}
  else{window.OP1Tracker.playArrangement();status(window.OP1Tracker.arrangementPlaying?'Playing your song. Use Stop Song to finish listening.':'Could not begin playback. Enable browser audio, or check that your song has notes.');}
  refresh();
 });
 $('makerStop').addEventListener('click',()=>{window.OP1Tracker.stop();status('Playback stopped.');refresh();});
 $('makerUndo').addEventListener('click',()=>{cancelSoundPreview();window.OP1Tracker.undo();status('Tracker change undone. Your original idea is restored.');});
 for(let ch=0;ch<4;ch++){
  $('makerRemix'+ch).addEventListener('click',()=>remix([ch]));
  $('makerLock'+ch).addEventListener('click',()=>{
   if(locks.has(ch))locks.delete(ch);else locks.add(ch);
   refresh();
  });
 }
 $('makerRemixAll').addEventListener('click',()=>remix([0,1,2,3].filter(ch=>!locks.has(ch))));
 $('makerSave').addEventListener('click',()=>{if(soundCandidate){soundStatus('Keep or cancel the preview before saving your project.');return;}status('Saving an editable project backup with your song, tape and samples.');$('saveProject').click();});
 $('makerFinish').addEventListener('click',async()=>{
  if(soundCandidate){soundStatus('Keep or cancel the preview before exporting your song.');return;}
  const btn=$('makerFinish');btn.disabled=true;btn.textContent='Rendering song…';status('Rendering your finished song to stereo WAV. Keep this tab open.');
  try{
   const success=await window.OP1Tracker.exportFinishedSong();
   status(success?'Your finished WAV was downloaded. Save an editable project backup too.':'Song WAV was not exported. Check the song length (maximum three minutes), audio samples and recording status.');
  }catch(e){status('Could not export your song: '+e.message);}
  finally{btn.textContent='⬇ Export Song WAV';refresh();}
 });
 $('makerEdit').addEventListener('click',()=>window.OP1Simplified.selectTool('trackerStudio',{scroll:true}));
 $('makerAdvanced').addEventListener('click',()=>window.OP1Simplified.setMode('advanced'));
 refresh();
}
window.OP1MusicMaker={config,patterns,whole,shapeSound,init,refresh,get active(){return session}};
})();