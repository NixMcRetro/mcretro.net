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
function note(midi,start,beats=1,velocity=105){return {midi,start,beats,velocity}}
function seq(pitches,unit=.5,offset=0){return pitches.map((pitch,i)=>note(pitch,offset+i*unit,unit*.92,85+(i%4)*10)).filter(n=>n.midi!==null)}
function chord(tones,start,len){return tones.map((midi,i)=>note(midi,start,len,91-i*5))}
function beat(pattern,bars,meter='4/4'){
 const beats=METERS[meter],out=[];for(let bar=0;bar<bars;bar++)for(const [step,drum] of pattern)out.push(note(48+drum,bar*beats+step*beats/16,.15,110));
 return out;
}
const drumPatterns={
 pocket:[[0,0],[3,2],[4,1],[6,2],[8,0],[10,2],[12,1],[14,2],[15,5]],
 house:[[0,0],[2,2],[4,0],[6,2],[8,0],[10,2],[12,0],[14,2],[4,1],[12,1]],
 halftime:[[0,0],[2,2],[4,2],[7,2],[8,1],[10,2],[12,0],[14,2],[15,5]],
 six:[[0,0],[2,2],[4,1],[6,0],[8,2],[10,5],[12,1],[14,2]]
};
const MELODIES=[
 {id:'neon',name:'Neon Avenue',category:'Synth',description:'Energetic neon melody with a syncopated bass and bright electronic lead.',bpm:118,meter:'4/4',bars:4,parts:[
  {type:'synth',name:'Neon Lead',voice:'lead',notes:seq([72,76,79,76,74,72,71,67,69,72,76,81,79,76,74,72],.5)},
  {type:'synth',name:'Night Bass',voice:'bass',notes:[...seq([48,48,55,48,53,53,60,53],1),...seq([48,55,48,48,53,60,53,55],1,8)]}]},
 {id:'aurora',name:'Aurora Drift',category:'Synth',description:'Slow, floating chords with an evolving high-register motif.',bpm:84,meter:'4/4',bars:4,parts:[
  {type:'synth',name:'Atmosphere',voice:'pad',notes:[...chord([48,55,60,64],0,4),...chord([53,57,60,65],4,4),...chord([45,52,57,60],8,4),...chord([50,57,62,65],12,4)]},
  {type:'synth',name:'Starlight',voice:'bell',notes:seq([76,79,83,79,77,76,72,69,72,76,81,77,74,72,69,65],1)}]},
 {id:'pixel',name:'Pixel Pursuit',category:'Synth',description:'Fast chiptune-style melody with playful leaps and a punchy counterline.',bpm:146,meter:'4/4',bars:4,parts:[
  {type:'synth',name:'Pixel Lead',voice:'chip',notes:seq([72,74,79,76,84,79,76,74,72,67,72,79,81,79,76,72,74,76,81,77,86,81,77,74,76,74,72,67,69,71,72,84],.5)},
  {type:'synth',name:'Pulse Bass',voice:'bass',notes:seq([48,55,48,55,50,57,50,57,53,60,53,60,48,55,48,60],1)}]},
 {id:'glass',name:'Glass Garden',category:'Synth',description:'A gentle 6/8 melody with glimmering intervals and a lilting pulse.',bpm:108,meter:'6/8',bars:4,parts:[
  {type:'synth',name:'Glass Notes',voice:'bell',notes:seq([72,76,79,81,79,76,74,77,81,84,81,77,72,76,79,83,79,76,74,72,69,72,74,72],.5)}]},
 {id:'pocket',name:'Pocket Break',category:'Drums',description:'Punchy kick, snare, hats and syncopated percussion.',bpm:102,meter:'4/4',bars:4,parts:[{type:'drum',name:'Pocket Kit',voice:'drum',pattern:'pocket',notes:beat(drumPatterns.pocket,4)}]},
 {id:'night',name:'Night Drive',category:'Drums',description:'Steady four-on-the-floor groove for dance music.',bpm:124,meter:'4/4',bars:4,parts:[{type:'drum',name:'Night Kit',voice:'drum',pattern:'house',notes:beat(drumPatterns.house,4)}]},
 {id:'half',name:'Half Time Switch',category:'Drums',description:'A spacious halftime groove with sharp hat accents.',bpm:90,meter:'4/4',bars:4,parts:[{type:'drum',name:'Half Kit',voice:'drum',pattern:'halftime',notes:beat(drumPatterns.halftime,4)}]},
 {id:'skyline',name:'Four Track Skyline',category:'Tape',description:'A complete four-part demo showing lead, chords, bass and drum arrangement.',bpm:112,meter:'4/4',bars:4,parts:[
  {type:'synth',name:'Skyline Lead',voice:'lead',notes:seq([72,74,76,79,76,74,72,69,67,69,72,76,74,72,69,67,72,76,79,84,81,79,76,72,74,72,69,67,69,72,74,76],.5)},
  {type:'synth',name:'Skyline Chords',voice:'pad',notes:[...chord([48,55,60,64],0,4),...chord([53,60,65,69],4,4),...chord([50,57,62,65],8,4),...chord([55,59,62,67],12,4)]},
  {type:'synth',name:'Skyline Bass',voice:'bass',notes:seq([48,48,55,48,53,53,60,53,50,50,57,50,55,55,62,55],1)},
  {type:'drum',name:'Skyline Drums',voice:'drum',pattern:'pocket',notes:beat(drumPatterns.pocket,4)}]},
 {id:'downstairs',name:'Downstairs Session',category:'Tape',description:'A slightly slower, warm three-track groove with deliberate space.',bpm:94,meter:'4/4',bars:4,parts:[
  {type:'synth',name:'Warm Keys',voice:'pad',notes:[...chord([50,57,62,65],0,4),...chord([48,55,60,64],4,4),...chord([45,52,57,60],8,4),...chord([43,50,55,59],12,4)]},
  {type:'synth',name:'Low Pulse',voice:'bass',notes:seq([38,45,38,45,36,43,36,43,45,40,45,40,43,38,43,38],1)},
  {type:'drum',name:'Loft Beat',voice:'drum',pattern:'halftime',notes:beat(drumPatterns.halftime,4)}]},
 {id:'sunset',name:'Sunset Signal',category:'Tape',description:'Four tracks of melodic motifs, drum rhythm and a pulsing bassline.',bpm:124,meter:'4/4',bars:4,parts:[
  {type:'synth',name:'Sunset Melody',voice:'bell',notes:seq([76,79,81,79,76,74,72,74,76,81,84,81,79,76,74,72,74,76,79,76,72,69,67,69,72,74,76,79,76,72,69,67],.5)},
  {type:'synth',name:'High Harmony',voice:'pad',notes:[...chord([52,59,64,67],0,4),...chord([57,60,64,69],4,4),...chord([53,60,65,69],8,4),...chord([55,62,67,71],12,4)]},
  {type:'synth',name:'Sunset Bass',voice:'bass',notes:seq([40,47,40,47,45,52,45,52,41,48,41,48,43,50,43,50],1)},
  {type:'drum',name:'Sunset Rhythm',voice:'drum',pattern:'house',notes:beat(drumPatterns.house,4)}]}
];
function patched(voice){const p=structuredClone(api.snapshotPatch());const config={
 lead:{wave:1,cutoff:.76,res:.22,detune:.21},bass:{wave:5,cutoff:.35,res:.26,detune:.13},
 pad:{wave:4,cutoff:.48,res:.16,detune:.33},bell:{wave:6,cutoff:.76,res:.11,detune:.25},
 chip:{wave:2,cutoff:.90,res:.08,detune:.12}
 }[voice]||{};Object.assign(p,config);p.env={...p.env,a:voice==='pad'?.23:.008,d:.24,s:voice==='pad'?.8:.65,r:voice==='pad'?.65:.18};return p}
function setTheme(theme){theme=theme==='dark'?'dark':'light';document.documentElement.dataset.op1Theme=theme;const button=$('comfortTheme');if(button){button.textContent=theme==='dark'?'☀ LIGHT MODE':'☾ GRAPHITE';button.setAttribute('aria-label','Switch to '+(theme==='dark'?'light':'graphite')+' theme');button.setAttribute('aria-pressed',String(theme==='dark'))}safeStore('op1-lab-ui-theme-v201',theme)}
function syncOctave(){if(!$('comfortOctValue'))return;const oct=state().octave,label=(oct>=0?'+':'')+oct;const midi=48+oct*12,high=midi+23;const pitch=n=>['C','C♯','D','D♯','E','F','F♯','G','G♯','A','A♯','B'][n%12]+(Math.floor(n/12)-1);$('comfortOctValue').textContent='OCT '+label; $('comfortOctRange').textContent=pitch(midi)+' to '+pitch(high);$('comfortOctDown').disabled=oct<=-2;$('comfortOctUp').disabled=oct>=2}
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
function initMidi(){
 midiInput=document.createElement('input');midiInput.type='file';midiInput.accept='.mid,.midi,audio/midi,audio/x-midi';midiInput.id='comfortMidiFile';midiInput.className='hide';
 document.body.append(midiInput);
 midiInput.addEventListener('change',async()=>{const file=midiInput.files?.[0];midiInput.value='';if(!file)return;try{
  if(file.size>2*1024*1024)throw Error('MIDI file exceeds 2 MB');
  const score=api.parseRollMidi(await file.arrayBuffer());const done=importScore(score,midiTarget);
  if(done){api.notice('Imported '+score.notes.length+' MIDI notes into '+({roll:'Piano Roll',pianola:'Pianola',synth:'Synth Note Player',song:'Song Workspace',drums:'Drum Sequencer',tape:'Tape Track'}[midiTarget])+'.');if(midiTarget==='song')chooseTab('Song');else if(midiTarget!=='roll')chooseTab('Compose')}
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
function emitDemo(graph,demo,origin){
 const quarter=60/demo.bpm;
 for(let i=0;i<demo.parts.length;i++){const p=demo.parts[i],patch=patched(p.voice);for(const n of p.notes){
  const when=origin+n.start*quarter;
  if(p.type==='drum')api.playDrum(graph,n.midi,when,0,n.velocity/127,0,i);
  else api.playSynth(graph,n.midi,when,n.beats*quarter*.94,patch,n.velocity/127,0,i);
 }}
}
async function preview(demo){
 stopDemo();try{
  if(api.isRecording())throw Error('Finish recording before previewing a demo.');
  const Ctx=window.AudioContext||window.webkitAudioContext;if(!Ctx)throw Error('Web Audio is unavailable');
  const ctx=new Ctx({latencyHint:'interactive'});demoContext=ctx;await ctx.resume();
  const graph=api.makeGraph(ctx);emitDemo(graph,demo,ctx.currentTime+.08);
  $('comfortDemoStatus').textContent='Playing '+demo.name+' · '+demo.bpm+' BPM · '+demo.meter+'. Your project is unchanged.';
  demoTimer=setTimeout(()=>{if(demoContext===ctx)stopDemo()},(demoDuration(demo)+1.2)*1000)
 }catch(e){stopDemo();$('comfortDemoStatus').textContent='Preview unavailable: '+e.message}
}
function fromDemoToSong(demo){
 const s=state(),existing=s.songWorkspace.clips,at=Math.max(0,...existing.map(c=>c.startBar+c.bars*c.repeats));
 if(existing.length&&s.songWorkspace.meter!==demo.meter)throw Error('Change the Song Workspace meter to '+demo.meter+' first.');
 if(at+demo.bars>64||existing.length+demo.parts.length>32)throw Error('Song Workspace has insufficient room.');
 if(!existing.length&&s.bpm!==demo.bpm&&!confirm('Set shared song tempo to '+demo.bpm+' BPM to match this demo?'))return false;
 if(existing.length&&s.bpm!==demo.bpm&&!confirm('Append demo at current tempo '+s.bpm+' BPM instead of '+demo.bpm+' BPM?'))return false;
 const ws=structuredClone(s.songWorkspace);if(!existing.length)ws.meter=demo.meter;
 for(let i=0;i<demo.parts.length;i++){
  const p=demo.parts[i],common={id:'ws-demo-'+Date.now().toString(36)+'-'+i,name:p.name.slice(0,28),startBar:at,bars:demo.bars,repeats:1,track:i%4,muted:false};
  if(p.type==='drum'){const pattern=Array(16).fill(null);for(const n of p.notes){const step=Math.round((n.start%METERS[demo.meter])/METERS[demo.meter]*16);if(step>=0&&step<16)pattern[step]=n.midi-48}ws.clips.push({...common,kind:'pattern',voice:'drum',kit:0,pattern});}
  else ws.clips.push({...common,kind:'roll',patch:patched(p.voice),notes:structuredClone(p.notes)});
 }
 window.OP1Workspace.stop();s.songWorkspace=window.OP1Workspace.normalize(ws);if(!existing.length)s.bpm=demo.bpm;
 window.OP1Workspace.render();api.syncUI();api.markDirty();return true
}
async function printDemoTape(demo){
 if(api.isRecording())throw Error('Stop audio recording before printing demo.');
 const length=demoDuration(demo),s=state();if(length>59)throw Error('Tape print must fit in 59 seconds.');
 const Ctx=window.OfflineAudioContext||window.webkitOfflineAudioContext;if(!Ctx)throw Error('Offline audio rendering unavailable.');
 if(!confirm('Render '+demo.name+' into a NEW audio clip on tape track '+(s.selectedTrack+1)+'? The existing project and audio clips will remain.'))return false;
 const btn=$('comfortDemoPrint');btn.disabled=true;const oldText=btn.textContent;btn.textContent='RENDERING…';
 try{const ctx=new Ctx(2,Math.ceil((length+.3)*22050),22050),graph=api.makeGraph(ctx);emitDemo(graph,demo,.06);
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
  const detail=document.createElement('small');detail.textContent=d.category+' · '+d.bpm+' BPM · '+d.meter;
  const desc=document.createElement('p');desc.textContent=d.description;card.append(h,detail,desc);
  const play=document.createElement('button');play.textContent='▶ PREVIEW';play.addEventListener('click',()=>preview(d));card.append(play);
  const load=document.createElement('button');load.textContent='＋ LOAD SONG CLIPS';load.addEventListener('click',()=>{try{if(fromDemoToSong(d)){stopDemo();$('comfortDemoStatus').textContent=d.name+' added to the Unified Song Workspace. Existing clips preserved.'}}catch(e){$('comfortDemoStatus').textContent=e.message}});card.append(load);
  if(d.category==='Tape'){const print=document.createElement('button');print.textContent='PRINT DEMO TO TAPE';print.id='comfortDemoPrint';print.addEventListener('click',async()=>{try{if(await printDemoTape(d))$('comfortDemoStatus').textContent=d.name+' printed as a new PCM tape clip. Existing clips preserved.'}catch(e){$('comfortDemoStatus').textContent='Tape print failed: '+e.message}});card.append(print)}
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
 initOctave();initTabs();initMidi();initDemos();syncOctave();
}
window.OP1Comfort={init,syncOctave,chooseTab,get demos(){return MELODIES.map(({id,name,category,bpm,meter})=>({id,name,category,bpm,meter}))}};
})();
