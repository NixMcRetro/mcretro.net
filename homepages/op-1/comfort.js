/* SuperNick's OP-1 Browser Lab v2.0.1: non-destructive studio comfort UI. */
(function(){
'use strict';
const $=id=>document.getElementById(id);
const TABS=['Play','Drums','Tape','Compose','Song','Tools'];
const METERS={'2/4':2,'3/4':3,'4/4':4,'6/8':3};
const lengths=[4,2,1,.5,.25];
let api,activeTab='Play',demoDialog=null,demoContext=null,demoTimer=0,demoCategory='All',midiTarget='roll',midiInput=null,previousFocus=null;
const state=()=>api.getState();
function safeStore(key,value){try{localStorage.setItem(key,value)}catch(e){}}
function safeRead(key){try{return localStorage.getItem(key)}catch(e){return null}}
function note(midi,start,beats=1,velocity=85){return {midi,start,beats,velocity}}
/* Original eight-bar miniatures. '-' is a rest and '_' extends the preceding note. */
function line(rows,beats=4,level=78){
 const notes=[];
 for(let bar=0;bar<rows.length;bar++){
  const tokens=rows[bar].trim().split(/\s+/),unit=beats/tokens.length;
  for(let i=0;i<tokens.length;i++){
   const pitch=tokens[i];if(pitch==='-'||pitch==='_')continue;
   let holds=0;while(tokens[i+holds+1]==='_')holds++;
   const duration=Math.max(.25,unit*(holds+1)*.88);
   notes.push(note(Number(pitch),bar*beats+i*unit,duration,Math.max(35,level+(i%4===0?6:0)-(bar%2?3:0))));
  }
 }
 return notes;
}
function harmonic(bars,beatLength=4,level=66){
 return bars.flatMap((p,bar)=>p.map((midi,i)=>note(midi,bar*beatLength+.04,beatLength*.81,level-i*3)));
}
function bass(roots,beats=4,level=79){
 return roots.flatMap((midi,bar)=>{
  const at=bar*beats;return [
   note(midi,at,Math.max(.25,beats*.46),level+4),
   note(midi+7,at+beats*.5,Math.max(.25,beats*.18),level-10),
   note(midi,at+beats*.75,Math.max(.25,beats*.22),level-3)
  ];
 });
}
function drums(style,bars=8,meter='4/4'){
 const out=[],beats=METERS[meter],step=beats/16;
 for(let b=0;b<bars;b++){
  const first=b===0,last=b===bars-1;
  const push=(pos,instrument,velocity)=>out.push(note(48+instrument,b*beats+pos*step,.25,velocity));
  // Distinct rhythmic foundations with controlled hat dynamics and occasional endings.
  if(style==='break'){
   for(const x of [0,7,10])push(x,0,x===0?103:78);
   for(const x of [4,12])push(x,1,91);
   for(const x of [2,4,6,8,10,12,14])push(x,2,x%4===0?48:38);
   if(b%2===1)push(15,5,47);
   if(last){push(14,1,52);push(15,4,62)}
  }else if(style==='house'){
   [0,4,8,12].forEach(x=>push(x,0,x===0?103:91));
   [4,12].forEach(x=>push(x,1,78));
   [2,6,10,14].forEach(x=>push(x,2,38));
   if(b%2)push(15,5,43);
   if(last){push(11,5,44);push(15,4,58)}
  }else if(style==='half'){
   [0,7,11].forEach(x=>push(x,0,x===0?102:75));
   push(8,1,96);
   [2,4,6,10,12,14].forEach(x=>push(x,2,36+(x%4)*2));
   if(b%2===1)push(15,5,42);
   if(last){push(14,1,54);push(15,4,65)}
  }else if(style==='waltz'){
   [0,8].forEach(x=>push(x,0,95));
   [5,13].forEach(x=>push(x,1,68));
   [2,4,6,10,12,14].forEach(x=>push(x,2,32));
  }
 }
 return out;
}
const songs={
 neon:{id:'neon',name:'Neon Avenue',category:'Synth',description:'A minor electro-pop. A real two-phrase hook, warm bass and chord changes.',bpm:112,meter:'4/4',bars:8,parts:[
  {type:'synth',name:'After Dark Lead',voice:'lead',notes:line([
   '69 _ - 72 76 _ 74 -','72 _ 69 - 65 _ 69 -','67 _ 72 76 - 74 72 -','71 _ 67 - 69 _ - -',
   '69 _ - 72 76 _ 79 -','77 _ 76 72 - 69 _ -','67 _ 72 76 - 74 72 -','71 _ 69 _ - - - -'])},
  {type:'synth',name:'Minor Changes',voice:'pad',notes:harmonic([[57,60,64],[53,57,60],[55,60,64],[55,59,62],[57,60,64],[53,57,60],[55,60,64],[55,59,62]])},
  {type:'synth',name:'Sub Pulse',voice:'bass',notes:bass([45,41,48,43,45,41,48,43])}]},
 aurora:{id:'aurora',name:'Aurora Drift',category:'Synth',description:'Reflective D minor theme with space, breath and slow-moving harmony.',bpm:86,meter:'4/4',bars:8,parts:[
  {type:'synth',name:'Quiet Motif',voice:'soft',notes:line([
   '69 _ _ 72 - 74 _ -','72 _ 69 _ - 65 _ -','65 _ 69 _ 72 _ - -','67 _ 64 _ - - - -',
   '69 _ _ 72 - 77 _ -','74 _ 72 _ - 69 _ -','72 _ 69 _ 65 _ - -','62 _ _ _ - - - -'],4,70)},
  {type:'synth',name:'Deep Atmosphere',voice:'pad',notes:harmonic([[50,53,57],[46,50,53],[53,57,60],[48,52,55],[50,53,57],[46,50,53],[53,57,60],[50,53,57]],4,57)},
  {type:'synth',name:'Steady Low D',voice:'bass',notes:bass([38,46,41,36,38,46,41,38],4,67)}]},
 pixel:{id:'pixel',name:'Pixel Pursuit',category:'Synth',description:'An eight-bar minor-key tracker lead with rests, counter-melody and punchy pulse.',bpm:138,meter:'4/4',bars:8,parts:[
  {type:'synth',name:'Tracker Lead',voice:'chip',notes:line([
   '67 70 74 - 72 70 67 -','65 67 70 - 67 _ - -','70 74 77 74 - 70 67 -','65 67 65 - 62 _ - -',
   '67 70 74 - 77 74 70 -','67 70 74 70 - 67 _ -','70 74 77 74 70 67 65 -','67 _ 62 _ 67 _ - -'],4,76)},
  {type:'synth',name:'Counter Pulse',voice:'bass',notes:bass([43,39,46,41,43,39,46,43],4,70)},
  {type:'synth',name:'Warm Triangle',voice:'pluck',notes:line([
   '55 - 58 - 62 - 58 -','51 - 55 - 58 - 55 -','58 - 62 - 65 - 62 -','53 - 57 - 60 - 57 -',
   '55 - 58 - 62 - 58 -','51 - 55 - 58 - 55 -','58 - 62 - 65 - 62 -','55 - 58 - 62 - 55 -'],4,59)}]},
 glass:{id:'glass',name:'Glass Garden',category:'Synth',description:'Lyrical 6/8, with gentle triads and a waltzing melodic answer.',bpm:108,meter:'6/8',bars:8,parts:[
  {type:'synth',name:'Garden Melody',voice:'soft',notes:line([
   '67 _ 72 76 _ -','69 _ 72 76 - -','65 69 72 _ 69 -','67 _ _ 64 - -',
   '67 _ 72 76 _ -','69 _ 72 79 - -','77 76 72 _ 69 -','67 _ _ _ - -'],3,70)},
  {type:'synth',name:'Glass Harmony',voice:'pad',notes:harmonic([[48,52,55],[45,48,52],[41,45,48],[43,47,50],[48,52,55],[45,48,52],[41,45,48],[48,52,55]],3,55)},
  {type:'synth',name:'Three Beat Bass',voice:'bass',notes:bass([36,45,41,43,36,45,41,36],3,67)}]},
 pocket:{id:'pocket',name:'Pocket Break',category:'Drums',description:'8-bar dry breakbeat with accented snares, ghost notes and a final fill.',bpm:102,meter:'4/4',bars:8,parts:[{type:'drum',name:'Pocket Kit',voice:'drum',notes:drums('break')}]},
 night:{id:'night',name:'Night Drive',category:'Drums',description:'An even club kick, crisp offbeat hats and a restrained turnaround.',bpm:120,meter:'4/4',bars:8,parts:[{type:'drum',name:'Night Kit',voice:'drum',notes:drums('house')}]},
 half:{id:'half',name:'Half Time Switch',category:'Drums',description:'An unhurried halftime groove with a backbeat and closing drum fill.',bpm:88,meter:'4/4',bars:8,parts:[{type:'drum',name:'Half Kit',voice:'drum',notes:drums('half')}]},
 skyline:{id:'skyline',name:'Four Track Skyline',category:'Tape',description:'An arranged 8-bar synth-pop miniature with hook, chords, bass and drum kit.',bpm:114,meter:'4/4',bars:8,parts:[
  {type:'synth',name:'City Lights Hook',voice:'lead',notes:line([
   '64 - 67 69 - 72 _ -','69 - 67 - 64 _ - -','60 64 67 - 72 69 - -','67 _ 64 - 62 _ - -',
   '64 - 67 69 - 72 76 -','74 - 72 - 69 _ - -','67 69 72 - 76 74 72 -','69 _ 67 _ 64 _ - -'],4,76)},
  {type:'synth',name:'Skyline Chords',voice:'pad',notes:harmonic([[48,52,55],[45,48,52],[41,45,48],[43,47,50],[48,52,55],[45,48,52],[41,45,48],[48,52,55]],4,61)},
  {type:'synth',name:'Subway Bass',voice:'bass',notes:bass([36,45,41,43,36,45,41,36],4,77)},
  {type:'drum',name:'Late Train Kit',voice:'drum',notes:drums('break')}]},
 downstairs:{id:'downstairs',name:'Downstairs Session',category:'Tape',description:'A subdued D minor lo-fi set with simple keys, low bass and half-time drums.',bpm:92,meter:'4/4',bars:8,parts:[
  {type:'synth',name:'Late Night Keys',voice:'soft',notes:line([
   '62 _ 65 - 69 _ - -','58 _ 62 - 65 _ - -','65 _ 69 - 72 _ - -','64 _ 67 - 69 _ - -',
   '62 _ 65 - 69 72 - -','70 _ 69 - 65 _ - -','69 _ 65 - 62 _ - -','62 _ _ _ - - - -'],4,69)},
  {type:'synth',name:'Warm Three Voice',voice:'pad',notes:harmonic([[50,53,57],[46,50,53],[53,57,60],[48,52,55],[50,53,57],[46,50,53],[53,57,60],[50,53,57]],4,58)},
  {type:'synth',name:'Basement Sub',voice:'bass',notes:bass([38,46,41,36,38,46,41,38],4,74)},
  {type:'drum',name:'Soft Break Kit',voice:'drum',notes:drums('half')}]},
 sunset:{id:'sunset',name:'Sunset Signal',category:'Tape',description:'Bright, major-key tracker-pop with a clear resolving melody and a four-track backing.',bpm:118,meter:'4/4',bars:8,parts:[
  {type:'synth',name:'Sunset Theme',voice:'lead',notes:line([
   '66 _ 69 74 - 73 69 -','67 _ 71 74 - 71 _ -','69 _ 73 76 - 73 69 -','66 _ 69 - 74 _ - -',
   '66 _ 69 74 - 78 76 -','74 _ 71 67 - 71 _ -','69 _ 73 76 - 78 76 -','74 _ _ _ - - - -'],4,76)},
  {type:'synth',name:'Golden Chords',voice:'pad',notes:harmonic([[50,54,57],[55,59,62],[57,61,64],[50,54,57],[50,54,57],[55,59,62],[57,61,64],[50,54,57]],4,61)},
  {type:'synth',name:'Warm Bass',voice:'bass',notes:bass([38,43,45,38,38,43,45,38],4,79)},
  {type:'drum',name:'Sunset Groove',voice:'drum',notes:drums('house')}]}
};
const MELODIES=Object.values(songs);
/* Demo voice patches are intentionally independent of the player's current patch. */
function patched(voice){
 const p=structuredClone(api.snapshotPatch());
 const styles={
  lead:{wave:3,cutoff:.46,res:.08,detune:.04,env:{a:.012,d:.2,s:.54,r:.11}},
  soft:{wave:3,cutoff:.30,res:.04,detune:.0,env:{a:.055,d:.38,s:.42,r:.33}},
  pluck:{wave:1,cutoff:.38,res:.06,detune:.04,env:{a:.005,d:.19,s:.12,r:.16}},
  bass:{wave:5,cutoff:.27,res:.04,detune:.0,env:{a:.012,d:.2,s:.64,r:.13}},
  pad:{wave:0,cutoff:.41,res:.03,detune:0,env:{a:.12,d:.35,s:.61,r:.28}},
  chip:{wave:2,cutoff:.37,res:.04,detune:.10,env:{a:.005,d:.17,s:.37,r:.09}}
 }[voice]||{};
 Object.assign(p,styles);
 p.env={...styles.env};p.lfo={rate:1,depth:0,type:0,phase:0};
 p.fx={delay:0,feedback:0,wet:0,drive:0,chorus:0,reverb:0,saturation:0,tone:.43};
 return p;
}
function setTheme(theme){theme=theme==='dark'?'dark':'light';document.documentElement.dataset.op1Theme=theme;const button=$('comfortTheme');if(button){button.textContent=theme==='dark'?'☀ LIGHT MODE':'☾ GRAPHITE';button.setAttribute('aria-label','Switch to '+(theme==='dark'?'light':'graphite')+' theme');button.setAttribute('aria-pressed',String(theme==='dark'))}safeStore('op1-lab-ui-theme-v201',theme)}
function syncOctave(){if(!$('comfortOctValue'))return;const oct=state().octave,label=(oct>=0?'+':'')+oct;const midi=48+oct*12,high=midi+23;const pitch=n=>['C','C♯','D','D♯','E','F','F♯','G','G♯','A','A♯','B'][n%12]+(Math.floor(n/12)-1);$('comfortOctValue').textContent='OCT '+label; $('comfortOctRange').textContent=pitch(midi)+' to '+pitch(high);$('comfortOctDown').disabled=oct<=-2;$('comfortOctUp').disabled=oct>=2;document.querySelectorAll('.comfort-dock-key').forEach(b=>{const n=Number(b.dataset.note),m=48+n+oct*12;b.textContent=pitch(m);b.setAttribute('aria-label','Play '+pitch(m))})}
function initOctave(){
 const bar=document.createElement('div');bar.className='comfort-octave';bar.id='comfortOctave';bar.setAttribute('aria-label','Central keyboard octave controls');
 bar.innerHTML='<button id="comfortOctDown" type="button" title="Down one octave" aria-label="Octave down">−</button><output aria-live="polite"><span id="comfortOctValue">OCT +0</span><small id="comfortOctRange">C3 to B4</small></output><button id="comfortOctUp" type="button" title="Up one octave" aria-label="Octave up">+</button>';
 $('board').append(bar);
 $('comfortOctDown').addEventListener('click',()=>$('octDown').click());$('comfortOctUp').addEventListener('click',()=>$('octUp').click());
 syncOctave();
}
function assignPanels(){
 const tape=$('sessionInfo')?.closest('.panel');if(tape)tape.id='comfortTapePanel';
 const play=$('feedback')?.closest('.panel');if(play)play.id='comfortPlayPanel';
 const map={
  comfortPlayPanel:'Play',soundPanel:'Play',soundLibrary:'Play',
  sequencePanel:'Drums',comfortTapePanel:'Tape',performancePanel:'Tape',
  pianolaPanel:'Compose',synthScorePanel:'Compose',rollPanel:'Compose',
  songStudio:'Song',recoveryPanel:'Tools',offlinePanel:'Tools'
 };
 for(const [id,tab]of Object.entries(map))if($(id))$(id).dataset.comfortTab=tab;
 // Keep all legacy controls mounted and wired. Only their panels change visibility.
 document.documentElement.classList.add('comfort-tabs-enabled');
}
function chooseTab(tab){
 if(!TABS.includes(tab))tab='Play';activeTab=tab;
 document.querySelectorAll('.below [data-comfort-tab]').forEach(el=>el.classList.toggle('comfort-visible',el.dataset.comfortTab===tab));
 document.querySelectorAll('.comfort-tabs button[data-comfort-view]').forEach(b=>{const active=b.dataset.comfortView===tab;b.setAttribute('aria-selected',String(active));b.tabIndex=active?0:-1});
 $('comfortTabStatus').textContent={Play:'SYNTH, sound banks and performance basics',Drums:'Pattern, Endless, Arpeggio, Finger and Tombola sequencers',Tape:'Tape editing, four-track mixing, microphone and sampling',Compose:'Pianola, Synth Note Player and polyphonic Piano Roll',Song:'Song Arrangement and the 64-bar Unified Song Workspace',Tools:'Project recovery, storage, offline installation and backup'}[tab];
 safeStore('op1-lab-ui-tab-v201',tab);
}
function initTabs(){
 assignPanels();const nav=document.createElement('div');nav.className='comfort-tabs';nav.id='comfortTabs';nav.setAttribute('role','tablist');nav.setAttribute('aria-label','Studio workspaces');
 TABS.forEach(tab=>{const b=document.createElement('button');b.type='button';b.textContent=tab;b.dataset.comfortView=tab;b.setAttribute('role','tab');b.addEventListener('click',()=>chooseTab(tab));b.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();const next=TABS[(TABS.indexOf(tab)+(e.key==='ArrowRight'?1:5))%6];chooseTab(next);nav.querySelector('[data-comfort-view="'+next+'"]').focus()}});nav.append(b)});
 const status=document.createElement('p');status.className='comfort-tabs-status';status.id='comfortTabStatus';status.setAttribute('aria-live','polite');$('mobileKeys').after(nav,status);
 chooseTab(safeRead('op1-lab-ui-tab-v201')||'Play');
 // Existing navigation links select a matching workspace without touching audio state.
 const quick={quickSeq:'Drums',quickTape:'Tape',quickMixer:'Tape',quickLibrary:'Play',quickSound:'Play',quickAdvanced:'Drums',quickFx:'Play'};
 for(const [id,tab]of Object.entries(quick))$(id)?.addEventListener('click',()=>chooseTab(tab));
}
function splitDuration(value,midi,out){
 let remaining=Math.round(value*4)/4;
 while(remaining>.00001){const size=lengths.find(n=>n<=remaining+.00001);if(!size)throw Error('MIDI note or rest cannot be expressed in quarter-beat notation');out.push({midi,beats:size});remaining=Math.round((remaining-size)*4)/4;if(out.length>256)throw Error('Pianola limit is 256 note and rest events')}
}
function toMonophonic(score){
 const sorted=score.notes.slice().sort((a,b)=>a.start-b.start||a.midi-b.midi),out=[];let at=0;
 for(const n of sorted){if(n.start<at-.001)throw Error('This MIDI contains overlapping notes or chords. Import it into Piano Roll or Song Workspace instead.');if(n.start>at+.001)splitDuration(n.start-at,null,out);splitDuration(n.beats,n.midi,out);at=n.start+n.beats}
 if(at>128||out.length>256)throw Error('MIDI score exceeds the Pianola limit of 128 beats or 256 events');
 return {meter:score.meter,notes:out,repeat:false,bpm:score.bpm}
}
function importToSong(score){
 const s=state(),existing=s.songWorkspace.clips,bar=METERS[score.meter],bars=Math.ceil(Math.max(...score.notes.map(n=>n.start+n.beats))/bar);
 if(bars>16)throw Error('A Song Workspace MIDI clip is limited to 16 bars. Shorten the MIDI in Piano Roll first.');
 if(existing.length&&s.songWorkspace.meter!==score.meter)throw Error('Set the Song Workspace meter to '+score.meter+' before importing this MIDI.');
 const at=Math.max(0,...existing.map(c=>c.startBar+c.bars*c.repeats));
 if(at+bars>64||existing.length>=32)throw Error('Song Workspace is full. Move or remove a clip first.');
 if(existing.length&&s.bpm!==score.bpm&&!confirm('MIDI is '+score.bpm+' BPM. This song uses '+s.bpm+' BPM. Import notes using the existing song tempo?'))return false;
 if(!existing.length&&s.bpm!==score.bpm&&!confirm('Set the shared song tempo to '+score.bpm+' BPM to match this MIDI? This also changes the legacy tape/song tempo.'))return false;
 const ws=structuredClone(s.songWorkspace);
 if(!existing.length)ws.meter=score.meter;
 ws.clips.push({id:'ws-midi-'+Date.now().toString(36),name:'Imported MIDI',kind:'roll',startBar:at,bars,repeats:1,track:s.selectedTrack,muted:false,notes:structuredClone(score.notes),patch:api.snapshotPatch()});
 s.songWorkspace=window.OP1Workspace.normalize(ws);if(!existing.length)s.bpm=score.bpm;
 window.OP1Workspace.stop();window.OP1Workspace.render();api.syncUI();api.markDirty();return true
}
function importToDrums(score){
 const s=state(),pattern=Array(16).fill(null),bar=METERS[score.meter];
 if(score.notes.some(n=>n.start+n.beats>bar+.001))throw Error('A drum sequencer pattern holds one bar. Import longer drum MIDI into Song Workspace or Tape.');
 for(const n of score.notes){const step=Math.round(n.start/bar*16),index=n.midi>=48&&n.midi<=71?n.midi-48:n.midi>=35&&n.midi<=58?n.midi-35:-1;
  if(index<0||index>23||step<0||step>15)throw Error('Drum MIDI pitches must be 48 to 71 (or 35 to 58 General MIDI pitches).');
  if(pattern[step]!==null)throw Error('Two drum notes share step '+(step+1)+'. Use Piano Roll or Song Workspace for polyphony.');
  pattern[step]=index;
 }
 const old=api.patternForSlot(s.patternSlot);
 if(old.some(n=>n!==null)&&!confirm('Replace Pattern '+s.patternSlot+' with the imported MIDI drum sequence?'))return false;
 old.splice(0,16,...pattern);api.syncUI();api.markDirty();chooseTab('Drums');return true
}
function importToTape(score){
 const s=state(),duration=60/score.bpm,track=s.tracks[s.selectedTrack];
 if(score.notes.length+track.events.length>10000)throw Error('Selected tape track has too many note events.');
 if(score.notes.some(n=>(n.start+n.beats)*duration>60||n.beats*duration>12))throw Error('MIDI exceeds the 60-second tape range or 12-second sustained note limit.');
 if(!confirm('Add '+score.notes.length+' MIDI note events to tape track '+(s.selectedTrack+1)+'? Existing recordings remain.'))return false;
 const p=api.snapshotPatch();api.checkpointEdit();
 for(const n of score.notes)track.events.push({t:n.start*duration,d:n.beats*duration,n:n.midi,kind:'synth',kit:s.kit,patch:p,sampleId:null,sliceIndex:0,sliceSettings:null});
 api.syncUI();api.markDirty();chooseTab('Tape');return true
}
function importScore(score,target){
 const s=state();
 if(target==='roll'){if(s.pianoRoll.notes.length&&!confirm('Replace the current Piano Roll notes? Export or back up this score first if you need both.'))return false;api.importRollScore(score);return true}
 if(target==='song')return importToSong(score);
 if(target==='drums')return importToDrums(score);
 if(target==='tape')return importToTape(score);
 const value=toMonophonic(score);
 if(target==='pianola'){if(s.pianola.notes.length&&!confirm('Replace your Pianola score with this MIDI? Your current score will be lost unless backed up.'))return false;
  api.pianolaMutate(()=>{s.pianola={meter:value.meter,notes:value.notes,repeat:false}});
  if(s.bpm!==value.bpm&&confirm('Match the shared tempo to the MIDI ('+value.bpm+' BPM)?')){s.bpm=value.bpm;api.syncUI();api.markDirty()}return true}
 if(target==='synth'){if(s.synthScore?.notes?.length&&!confirm('Replace the loaded Synth Note Player score?'))return false;
  api.pianolaStop();s.synthScore=value;api.syncSynthScoreStatus();api.markDirty();return true}
 throw Error('Unknown MIDI destination');
}
function midiImport(target){
 midiTarget=target;midiInput.value='';midiInput.click();
}
function initKeyboardDock(){
 const dock=document.createElement('div');dock.className='comfort-keyboard-dock';dock.id='comfortKeyboardDock';dock.setAttribute('role','group');dock.setAttribute('aria-label','Sticky two-octave musical keyboard');dock.hidden=true;
 const sharps=new Set([1,3,6,8,10]);
 for(let n=0;n<24;n++){
  const b=document.createElement('button');b.type='button';b.className='comfort-dock-key';b.classList.toggle('sharp',sharps.has(n%12));b.dataset.note=String(n);
  const id='comfort-dock-'+n;let down=false;
  const on=()=>{if(down)return;down=true;b.classList.add('down');api.liveNoteOn(n,id)};
  const off=()=>{if(!down)return;down=false;b.classList.remove('down');api.liveNoteOff(n,id)};
  b.addEventListener('pointerdown',e=>{if(e.button!==0)return;e.preventDefault();b.setPointerCapture(e.pointerId);on()});
  for(const event of ['pointerup','pointercancel','lostpointercapture'])b.addEventListener(event,off);
  b.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&!e.repeat){e.preventDefault();on()}});
  b.addEventListener('keyup',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();off()}});
  window.addEventListener('blur',off);dock.append(b);
 }
 $('mobileKeys').after(dock);
 const original=$('deviceOuter');
 if('IntersectionObserver' in window){new IntersectionObserver(entries=>{dock.hidden=entries[0]?.isIntersecting!==false},{threshold:.02}).observe(original)}
 else window.addEventListener('scroll',()=>{dock.hidden=original.getBoundingClientRect().bottom>0},{passive:true});
}
function initMidi(){
 midiInput=document.createElement('input');midiInput.type='file';midiInput.accept='.mid,.midi,audio/midi,audio/x-midi';midiInput.id='comfortMidiFile';midiInput.className='hide';
 document.body.append(midiInput);
 midiInput.addEventListener('change',async()=>{const file=midiInput.files?.[0];midiInput.value='';if(!file)return;try{
  if(file.size>2*1024*1024)throw Error('MIDI file exceeds 2 MB');
  const score=api.parseRollMidi(await file.arrayBuffer());const done=importScore(score,midiTarget);
  if(done){api.notice('Imported '+score.notes.length+' MIDI notes into '+({roll:'Piano Roll',pianola:'Pianola',synth:'Synth Note Player',song:'Song Workspace',drums:'Drum Sequencer',tape:'Tape Track'}[midiTarget])+'.');if(midiTarget==='song')chooseTab('Song');else if(midiTarget==='drums')chooseTab('Drums');else if(midiTarget==='tape')chooseTab('Tape');else if(midiTarget!=='roll')chooseTab('Compose')}
 }catch(e){api.notice('MIDI import failed: '+e.message);console.warn('MIDI import refused',e.message)}});
 const btn=(label,target)=>{const b=document.createElement('button');b.type='button';b.className='mini-btn';b.textContent=label;b.addEventListener('click',()=>midiImport(target));return b};
 $('pianolaImportJson')?.after(btn('IMPORT MIDI','pianola'));
 $('synthScoreImport')?.after(btn('IMPORT MIDI','synth'));
 $('workspaceAddPianola')?.after(btn('＋ IMPORT MIDI','song'));
 $('seqRun')?.after(btn('IMPORT MIDI','drums'));
 $('goTape')?.after(btn('IMPORT MIDI','tape'));
 document.querySelector('#pianolaImportJson + button')?.setAttribute('id','comfortMidiPianola');
 document.querySelector('#synthScoreImport + button')?.setAttribute('id','comfortMidiSynth');
 document.querySelector('#workspaceAddPianola + button')?.setAttribute('id','comfortMidiSong');
 const top=document.createElement('button');top.type='button';top.textContent='♫ MIDI IMPORT';top.className='action';top.id='comfortMidiTop';top.title='Choose a MIDI import destination';top.addEventListener('click',()=>{chooseTab('Compose');$('comfortMidiEntry').scrollIntoView({block:'center'});$('comfortMidiDestination').focus()});$('showHelp').before(top);
 // The top entry is a destination picker, rather than always overwriting a score.
 const wrapper=document.createElement('div');wrapper.className='comfort-midi-entry';wrapper.id='comfortMidiEntry';
 wrapper.innerHTML='<label for="comfortMidiDestination">IMPORT INTO <select id="comfortMidiDestination"><option value="roll">Piano Roll</option><option value="pianola">Pianola</option><option value="synth">Synth Note Player</option><option value="song">Song Workspace</option><option value="drums">Drum Sequencer</option><option value="tape">Tape Track</option></select></label>';
 const b=document.createElement('button');b.type='button';b.className='mini-btn';b.textContent='CHOOSE MIDI';b.id='comfortMidiChoose';
 b.addEventListener('click',e=>{e.stopPropagation();midiImport($('comfortMidiDestination').value)});
 wrapper.append(b);$('comfortTabs').after(wrapper);
}
function stopDemo(){clearTimeout(demoTimer);demoTimer=0;if(demoContext){const c=demoContext;demoContext=null;c.close().catch(()=>{})}if($('comfortDemoStatus'))$('comfortDemoStatus').textContent='Preview stopped.'}
function demoDuration(demo){return demo.bars*METERS[demo.meter]*60/demo.bpm}
// A new Web Audio graph has zero DelayNode time and unity feedback by default.
// Always initialise the independent preview/export graph before scheduling sound.
function configureDemoGraph(graph){
 graph.delay.delayTime.value=.24;
 graph.feedback.gain.value=.09;
 graph.wet.gain.value=.09;
 graph.chorusSend.gain.value=.025;
 graph.roomSend.gain.value=.075;
 graph.roomWet.gain.value=.35;
 graph.tone.gain.value=-2.5;
 graph.body.gain.value=1;
 graph.satDry.gain.value=1;
 graph.satWet.gain.value=0;
 graph.output.gain.value=.53;
 graph.trackBuses.forEach((bus,i)=>{bus.gain.value=i===0?.62:i===3?.57:.58});
 graph.trackPanners.forEach((pan,i)=>{if(pan)pan.pan.value=[-.13,.12,-.07,.05][i]});
}
function emitDemo(graph,demo,origin){
 const quarter=60/demo.bpm;
 for(let i=0;i<demo.parts.length;i++){const p=demo.parts[i],patch=patched(p.voice);for(const n of p.notes){
  const when=origin+n.start*quarter;
  if(p.type==='drum')api.playDrum(graph,n.midi,when,0,n.velocity/127*.52,0,i);
  else api.playSynth(graph,n.midi,when,n.beats*quarter*.94,patch,n.velocity/127*.74,0,i);
 }}
}
async function preview(demo){
 stopDemo();try{
  if(api.isRecording())throw Error('Finish recording before previewing a demo.');
  const Ctx=window.AudioContext||window.webkitAudioContext;if(!Ctx)throw Error('Web Audio is unavailable');
  const ctx=new Ctx({latencyHint:'interactive'});demoContext=ctx;await ctx.resume();
  const graph=api.makeGraph(ctx);configureDemoGraph(graph);emitDemo(graph,demo,ctx.currentTime+.08);
  $('comfortDemoStatus').textContent='Playing '+demo.name+' · '+demo.bpm+' BPM · '+demo.meter+'. Your project is unchanged.';
  demoTimer=setTimeout(()=>{if(demoContext===ctx)stopDemo()},(demoDuration(demo)+1.2)*1000)
 }catch(e){stopDemo();$('comfortDemoStatus').textContent='Preview unavailable: '+e.message}
}
// Every drum bar is laid out exactly as heard, including overlapping hats and
// bar-ending fills. The old implementation silently overwrote simultaneous hits.
function demoSongClips(demo,start){
 const clips=[],beatCount=METERS[demo.meter],stamp=Date.now().toString(36);
 const add=(part,fields)=>clips.push({id:'ws-demo-'+stamp+'-'+clips.length,name:part.name.slice(0,28),startBar:start,bars:demo.bars,repeats:1,track:demo.parts.indexOf(part)%4,muted:false,...fields});
 for(const part of demo.parts){
  if(part.type!=='drum'){add(part,{kind:'roll',patch:patched(part.voice),notes:structuredClone(part.notes)});continue}
  for(let bar=0;bar<demo.bars;bar++){
   const patterns=[Array(16).fill(null),Array(16).fill(null)];
   for(const n of part.notes){if(n.start<bar*beatCount||n.start>=(bar+1)*beatCount)continue;
    const step=Math.round((n.start-bar*beatCount)/beatCount*16),pitch=n.midi-48;
    if(step<0||step>=16||pitch<0||pitch>23)throw Error('Invalid drum step in demo arrangement');
    const lane=patterns.find(p=>p[step]===null);if(!lane)throw Error('More than two simultaneous drum notes cannot fit in demo patterns');
    lane[step]=pitch;
   }
   for(let lane=0;lane<patterns.length;lane++){
    if(patterns[lane].every(n=>n===null))continue;
    add(part,{kind:'pattern',voice:'drum',kit:0,pattern:patterns[lane]});
    const clip=clips[clips.length-1];clip.startBar=start+bar;clip.bars=1;clip.name=(part.name+' '+(bar+1)+(lane?'H':'')).slice(0,28);
   }
  }
 }
 return clips;
}
function fromDemoToSong(demo){
 const s=state(),existing=s.songWorkspace.clips,at=Math.max(0,...existing.map(c=>c.startBar+c.bars*c.repeats));
 if(existing.length&&s.songWorkspace.meter!==demo.meter)throw Error('Change the Song Workspace meter to '+demo.meter+' first.');
 const parts=demoSongClips(demo,at);
 if(at+demo.bars>64||existing.length+parts.length>32)throw Error('Song Workspace has insufficient room for '+parts.length+' demo clips. Remove some unused clips or try another demo.');
 if(!existing.length&&s.bpm!==demo.bpm&&!confirm('Set shared song tempo to '+demo.bpm+' BPM to match this demo?'))return false;
 if(existing.length&&s.bpm!==demo.bpm&&!confirm('Append demo at current tempo '+s.bpm+' BPM instead of '+demo.bpm+' BPM?'))return false;
 const ws=structuredClone(s.songWorkspace);if(!existing.length)ws.meter=demo.meter;
 ws.clips.push(...parts);const normalized=window.OP1Workspace.normalize(ws);
 window.OP1Workspace.stop();s.songWorkspace=normalized;if(!existing.length)s.bpm=demo.bpm;
 window.OP1Workspace.render();api.syncUI();api.markDirty();return true
}
async function printDemoTape(demo,btn){
 if(api.isRecording())throw Error('Stop audio recording before printing demo.');
 const length=demoDuration(demo),s=state();if(length>59)throw Error('Tape print must fit in 59 seconds.');
 const Ctx=window.OfflineAudioContext||window.webkitOfflineAudioContext;if(!Ctx)throw Error('Offline audio rendering unavailable.');
 if(!confirm('Render '+demo.name+' into a NEW audio clip on tape track '+(s.selectedTrack+1)+'? The existing project and audio clips will remain.'))return false;
 btn.disabled=true;const oldText=btn.textContent;btn.textContent='RENDERING…';
 try{const ctx=new Ctx(2,Math.ceil((length+.3)*22050),22050),graph=api.makeGraph(ctx);configureDemoGraph(graph);emitDemo(graph,demo,.06);
  const buffer=await ctx.startRendering(),id=await api.registerAudio(buffer);
  api.checkpointEdit();s.tracks[s.selectedTrack].clips.push({sampleId:id,t:0,d:length,offset:0,captureSpeed:1});
  api.syncUI();api.markDirty();return true
 }finally{btn.disabled=false;btn.textContent=oldText}
}
function updateDemoList(){
 const list=$('comfortDemoList');if(!list)return;list.replaceChildren();
 for(const d of MELODIES.filter(x=>demoCategory==='All'||x.category===demoCategory)){
  const card=document.createElement('div');card.className='comfort-demo-card';
  const h=document.createElement('h3');h.textContent=d.name;
  const detail=document.createElement('small');detail.textContent=d.category+' · '+d.bars+' bars · '+d.bpm+' BPM · '+d.meter;
  const desc=document.createElement('p');desc.textContent=d.description;card.append(h,detail,desc);
  const play=document.createElement('button');play.textContent='▶ PREVIEW';play.addEventListener('click',()=>preview(d));card.append(play);
  const load=document.createElement('button');load.textContent='＋ LOAD SONG CLIPS';load.addEventListener('click',()=>{try{if(fromDemoToSong(d)){stopDemo();$('comfortDemoStatus').textContent=d.name+' added to the Unified Song Workspace. Existing clips preserved.'}}catch(e){$('comfortDemoStatus').textContent=e.message}});card.append(load);
  if(d.category==='Tape'){const print=document.createElement('button');print.textContent='PRINT DEMO TO TAPE';print.id='comfortDemoPrint-'+d.id;print.addEventListener('click',async()=>{try{if(await printDemoTape(d,print))$('comfortDemoStatus').textContent=d.name+' printed as a new PCM tape clip. Existing clips preserved.'}catch(e){$('comfortDemoStatus').textContent='Tape print failed: '+e.message}});card.append(print)}
  list.append(card);
 }
}
function closeDemos(){stopDemo();demoDialog.classList.remove('visible');demoDialog.setAttribute('aria-hidden','true');(previousFocus?.isConnected?previousFocus:$('comfortDemoOpen')).focus()}
function openDemos(){previousFocus=document.activeElement;demoDialog.classList.add('visible');demoDialog.setAttribute('aria-hidden','false');updateDemoList();$('comfortDemoClose').focus()}
function initDemos(){
 const launch=document.createElement('button');launch.className='action';launch.id='comfortDemoOpen';launch.type='button';launch.textContent='♫ DEMOS';launch.addEventListener('click',openDemos);$('showHelp').before(launch);
 demoDialog=document.createElement('div');demoDialog.className='overlay comfort-overlay';demoDialog.id='comfortDemoDialog';demoDialog.setAttribute('role','dialog');demoDialog.setAttribute('aria-modal','true');demoDialog.setAttribute('aria-label','Interactive original instrument demonstrations');demoDialog.setAttribute('aria-hidden','true');
 demoDialog.innerHTML='<div class="comfort-dialog"><div class="comfort-dialog-top"><div><h2>♫ SOUND & SONG DEMOS</h2><p>Original browser-generated melodies and drum grooves. Preview without replacing your project, or copy parts into the Song Workspace.</p></div><button type="button" id="comfortDemoClose">✕ CLOSE</button></div><div class="comfort-dialog-tabs" id="comfortDemoCategories" role="group" aria-label="Demo category"></div><div class="comfort-demo-grid" id="comfortDemoList"></div><div class="comfort-demo-status" id="comfortDemoStatus" role="status" aria-live="polite">Choose a demo to begin.</div><button type="button" id="comfortDemoStop">■ STOP PREVIEW</button></div>';
 document.body.append(demoDialog);$('comfortDemoClose').addEventListener('click',closeDemos);$('comfortDemoStop').addEventListener('click',stopDemo);
 demoDialog.addEventListener('click',e=>{if(e.target===demoDialog)closeDemos()});
 demoDialog.addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();closeDemos()}if(e.key==='Tab'){const list=Array.from(demoDialog.querySelectorAll('button:not(:disabled)')).filter(x=>x.getClientRects().length);if(!list.length)return;const first=list[0],last=list[list.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});
 ['All','Synth','Drums','Tape'].forEach(cat=>{const b=document.createElement('button');b.textContent=cat;b.type='button';b.setAttribute('aria-pressed',String(cat===demoCategory));b.addEventListener('click',()=>{demoCategory=cat;Array.from($('comfortDemoCategories').children).forEach(x=>x.setAttribute('aria-pressed',String(x===b)));updateDemoList()});$('comfortDemoCategories').append(b)});
 updateDemoList();
}
function init(deps){
 api=deps;
 const theme=document.createElement('button');theme.id='comfortTheme';theme.type='button';theme.className='action comfort-theme-toggle';
 $('showHelp').before(theme);theme.addEventListener('click',()=>setTheme(document.documentElement.dataset.op1Theme==='dark'?'light':'dark'));
 setTheme(safeRead('op1-lab-ui-theme-v201')||'light');
 initOctave();initTabs();initKeyboardDock();initMidi();initDemos();syncOctave();
}
window.OP1Comfort={init,syncOctave,chooseTab,get demos(){return MELODIES.map(({id,name,category,bpm,meter})=>({id,name,category,bpm,meter}))}};
})();