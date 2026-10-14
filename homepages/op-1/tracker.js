/* SuperNick's OP-1 Browser Lab v2.2 Tracker Studio.
   Independent patterns and audio, no proprietary tracker assets or module parsers. */
(function(){
'use strict';
const $=id=>document.getElementById(id), CHANNELS=4, MAX_PATTERNS=8, MAX_CHAIN=16;
const EFFECTS=['none','up','down','vibrato','retrigger'], KINDS=['synth','drum','sample'];
const SEMI=['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
const ROW_CHOICES=[16,32,64];
const GM_DRUM=[36,38,42,46,45,39,56,49];
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
const defPattern=(rows=32)=>({rows,cells:Array(rows*CHANNELS).fill(null)});
const defaults=()=>({patterns:[defPattern()],chain:[0],active:0,bank:0,bpm:120});
const clone=structuredClone;
const validInt=(n,min,max)=>Number.isInteger(n)&&n>=min&&n<=max;
function normalize(value){
 if(value===undefined||value===null)return defaults();
 if(!value||typeof value!=='object'||Array.isArray(value))throw Error('Invalid tracker data');
 if(!Array.isArray(value.patterns)||!value.patterns.length||value.patterns.length>MAX_PATTERNS)throw Error('Invalid tracker pattern count');
 const patterns=value.patterns.map(p=>{
  if(!p||!ROW_CHOICES.includes(p.rows)||!Array.isArray(p.cells)||p.cells.length!==p.rows*CHANNELS)throw Error('Invalid tracker grid');
  return {rows:p.rows,cells:p.cells.map(raw=>{
   if(raw===null)return null;
   if(!raw||typeof raw!=='object'||!validInt(raw.midi,36,95)||!validInt(raw.inst,0,7)||!KINDS.includes(raw.kind)||!validInt(raw.vel,1,127)||!EFFECTS.includes(raw.fx)||!validInt(raw.param,0,15))throw Error('Invalid tracker note or effect');
   if(raw.kind==='sample'&&(typeof raw.sampleId!=='string'||!raw.sampleId||raw.sampleId.length>100||!raw.sampleSettings||typeof raw.sampleSettings!=='object'||Array.isArray(raw.sampleSettings)||JSON.stringify(raw.sampleSettings).length>3000))throw Error('Missing or invalid tracker sample');
   const c={midi:raw.midi,inst:raw.inst,kind:raw.kind,vel:raw.vel,fx:raw.fx,param:raw.param};
   if(raw.kind==='sample'){c.sampleId=raw.sampleId;c.sampleSettings=clone(raw.sampleSettings)}
   return c;
  })};
 });
 if(!Array.isArray(value.chain)||!value.chain.length||value.chain.length>MAX_CHAIN||value.chain.some(i=>!validInt(i,0,patterns.length-1)))throw Error('Invalid tracker pattern chain');
 if(!validInt(value.active,0,patterns.length-1)||!validInt(value.bank,0,2)||!validInt(value.bpm,40,240))throw Error('Invalid tracker settings');
 return {patterns,chain:value.chain.slice(),active:value.active,bank:value.bank,bpm:value.bpm};
}
const pitch=m=>SEMI[m%12]+(Math.floor(m/12)-1);
const formatCell=c=>!c?'··· ·· ··':(c.kind==='drum'?'DR'+(c.inst+1):c.kind==='sample'?'SM'+(c.inst+1):pitch(c.midi).padEnd(3,' '))+' '+String(c.inst+1).padStart(2,'0')+' '+(c.fx==='none'?'··':c.fx.slice(0,2).toUpperCase())+c.param.toString(16).toUpperCase();
const toIndex=(row,ch)=>row*CHANNELS+ch;
let api=null,cursor={row:0,ch:0},clock=null,playing=false,started=0,next=0,events=[],playhead=-1,rendering=false;
let history=[],clipboard=null,context=null,cycle=0,loopEnabled=false,compiledSeconds=0,compiledRows=0;
const data=()=>api.getState().tracker;
const pattern=()=>data().patterns[data().active];
function status(s){$('trackerStatus').textContent=s||data().patterns.length+' PATTERNS · '+data().chain.length+' CHAIN STEPS · '+data().bpm+' BPM'}
function commit(fn){
 if(rendering){status('Finish audio export before editing');return}
 const old=clone(data()),draft=clone(old);
 try{fn(draft);const value=normalize(draft);history.push(old);if(history.length>40)history.shift();stop();api.getState().tracker=value;api.markDirty();render();}
 catch(e){status('Edit rejected: '+e.message);console.warn('Tracker edit rejected',e)}
}
function undo(){if(!history.length)return;stop();api.getState().tracker=history.pop();api.markDirty();cursor.row=Math.min(cursor.row,pattern().rows-1);render()}
function setCursor(row,ch,focus=false){
 cursor={row:clamp(row,0,pattern().rows-1),ch:clamp(ch,0,3)};paintCursor();updateEditor();
 if(focus)$('trackerGrid').querySelector('[data-tracker-row="'+cursor.row+'"][data-tracker-ch="'+cursor.ch+'"]')?.focus({preventScroll:true});
}
function paintCursor(){
 document.querySelectorAll('.tracker-cell').forEach(el=>{
  const is=Number(el.dataset.trackerRow)===cursor.row&&Number(el.dataset.trackerCh)===cursor.ch;
  el.classList.toggle('selected',is);el.setAttribute('aria-selected',String(is));el.tabIndex=is?0:-1;
 });
}
function updateEditor(){
 const c=pattern().cells[toIndex(cursor.row,cursor.ch)];
 $('trackerSelection').textContent='ROW '+cursor.row.toString(16).padStart(2,'0').toUpperCase()+' · CHANNEL '+(cursor.ch+1);
 if(c){$('trackerMidi').value=String(c.midi);$('trackerKind').value=c.kind;$('trackerInstrument').value=String(c.inst);$('trackerVelocity').value=String(c.vel);$('trackerEffect').value=c.fx;$('trackerParam').value=String(c.param);}
 $('trackerSelectedNote').textContent=c?formatCell(c):'EMPTY STEP';
}
function renderGrid(){
 const body=$('trackerGrid');body.replaceChildren();
 const pat=pattern();
 for(let row=0;row<pat.rows;row++){
  const wrapper=document.createElement('div');wrapper.className='tracker-row';wrapper.dataset.row=String(row);
  const head=document.createElement('span');head.className='tracker-row-number';head.textContent=row.toString(16).toUpperCase().padStart(2,'0');wrapper.append(head);
  for(let ch=0;ch<4;ch++){
   const c=pat.cells[toIndex(row,ch)],b=document.createElement('button');b.type='button';b.className='tracker-cell';b.dataset.trackerRow=String(row);b.dataset.trackerCh=String(ch);
   b.textContent=formatCell(c);b.title='Row '+row+' channel '+(ch+1)+(c?' '+(c.kind==='synth'?pitch(c.midi):c.kind.toUpperCase()):' empty');
   b.setAttribute('role','gridcell');b.setAttribute('aria-label',b.title);
   b.addEventListener('click',()=>setCursor(row,ch));
   b.addEventListener('keydown',e=>{
    if((e.ctrlKey||e.metaKey)&&['c','x','v'].includes(e.key.toLowerCase())){
     e.preventDefault();e.stopPropagation();
     if(e.key.toLowerCase()==='c')copyCell();else if(e.key.toLowerCase()==='x')cutCell();else pasteCell();
     return;
    }
    if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Home','End','Delete','Backspace','Enter',' '].includes(e.key)){
     e.preventDefault();e.stopPropagation();
     if(e.key==='ArrowUp')setCursor(row-1,ch,true);
     else if(e.key==='ArrowDown')setCursor(row+1,ch,true);
     else if(e.key==='ArrowLeft')setCursor(row,ch-1,true);
     else if(e.key==='ArrowRight')setCursor(row,ch+1,true);
     else if(e.key==='Home')setCursor(0,ch,true);
     else if(e.key==='End')setCursor(pat.rows-1,ch,true);
     else if(e.key==='Delete'||e.key==='Backspace')erase();
     else writeNote(true);
     return;
    }
    const letters='zsxdcvgbhnjmq2w3er5t6y7u',n=letters.indexOf(e.key.toLowerCase());
    if(n>=0){e.preventDefault();e.stopPropagation();$('trackerMidi').value=String(48+n);writeNote(true)}
   });
   wrapper.append(b);
  }body.append(wrapper);
 }
 paintCursor();
}
function render(){
 if(!api)return;
 $('trackerBpm').value=data().bpm;$('trackerBank').value=data().bank;
 const p=$('trackerPattern');p.replaceChildren(...data().patterns.map((x,i)=>new Option('PATTERN '+i.toString(16).padStart(2,'0').toUpperCase()+' · '+x.rows+' ROWS',String(i))));
 p.value=String(data().active);$('trackerRows').value=String(pattern().rows);
 $('trackerChain').value=data().chain.map(n=>n.toString(16).padStart(2,'0').toUpperCase()).join(' ');
 $('trackerAdd').disabled=data().patterns.length>=MAX_PATTERNS;
 $('trackerDelete').disabled=data().patterns.length===1;
 renderGrid();updateEditor();if($('trackerLoop')){$('trackerLoop').setAttribute('aria-pressed',String(loopEnabled));$('trackerLoop').textContent=loopEnabled?'↻ LOOP ON':'↻ LOOP OFF'}status();
}
function writeNote(advance=false){
 const midi=Number($('trackerMidi').value),inst=Number($('trackerInstrument').value),vel=Number($('trackerVelocity').value),kind=$('trackerKind').value,fx=$('trackerEffect').value,param=Number($('trackerParam').value);
 const index=toIndex(cursor.row,cursor.ch);
 if(!validInt(midi,36,95)||!validInt(inst,0,7)||!validInt(vel,1,127)||!validInt(param,0,15)){status('Select valid MIDI pitch (36-95), instrument, velocity and effect value');return}
 let c={midi,inst,vel,kind,fx,param};
 if(kind==='sample'){
  const s=api.getState();
  if(!s.sampleId){status('Load a sample in Sampling Workshop first');return}
  c.sampleId=s.sampleId;c.sampleSettings=clone(s.sampleSettings);
 }
 commit(d=>{d.patterns[d.active].cells[index]=c});
 if(advance)setCursor(Math.min(cursor.row+1,pattern().rows-1),cursor.ch,true);
}
function erase(){const index=toIndex(cursor.row,cursor.ch);commit(d=>d.patterns[d.active].cells[index]=null)}
function copyCell(){const cell=pattern().cells[toIndex(cursor.row,cursor.ch)];clipboard=cell?clone(cell):null;status(cell?'Step copied. Select another cell and paste.':'Empty step copied. Paste to clear another cell.')}
function cutCell(){copyCell();erase()}
function pasteCell(){const index=toIndex(cursor.row,cursor.ch),saved=clipboard?clone(clipboard):null;commit(d=>{d.patterns[d.active].cells[index]=saved})}
function resetSession(){stop();history=[];clipboard=null;cursor={row:0,ch:0}}
function loadExample(){
 if(data().patterns.some(p=>p.cells.some(Boolean))&&!confirm('Replace tracker patterns with the original eight-bar example? You can undo this change. The rest of your project is untouched.'))return;
 const chords=[
  {bass:38,notes:[62,65,69,72]}, // D minor
  {bass:46,notes:[58,62,65,70]}, // B-flat major
  {bass:41,notes:[60,65,69,72]}, // F major
  {bass:48,notes:[60,64,67,72]}  // C major
 ];
 const patterns=chords.map(({bass,notes},section)=>{
  const p=defPattern(32),put=(row,ch,midi,inst,kind,vel=100)=>{p.cells[toIndex(row,ch)]={midi,inst,kind,vel,fx:'none',param:0}};
  for(let bar=0;bar<2;bar++){
   const n=bar*16;
   for(const [at,inst] of [[0,0],[2,2],[4,1],[6,2],[8,0],[10,2],[12,1],[14,2]])put(n+at,0,48+inst,inst,'drum',inst===2?55:94);
   for(const [at,shift] of [[0,0],[7,0],[10,7],[13,0]])put(n+at,1,bass+shift,0,'synth',at===0?104:79);
   for(const [at,pos] of [[0,0],[3,1],[6,2],[10,3],[14,1]])put(n+at,2,notes[(pos+bar+section)%4],3,'synth',at===0?96:74);
   for(const [at,pos] of [[2,0],[5,2],[9,1],[13,3]])put(n+at,3,notes[pos]+12,5,'synth',55);
  }
  return p;
 });
 commit(d=>{d.patterns=patterns;d.chain=[0,1,2,3];d.active=0;d.bank=1;d.bpm=104});
 cursor={row:0,ch:0};render();status('Original eight-bar tracker sketch loaded. Undo restores your previous patterns.');
}
function resizePattern(n){
 commit(d=>{const p=d.patterns[d.active];p.cells=Array.from({length:n*4},(_,i)=>p.cells[i]||null);p.rows=n});cursor.row=Math.min(cursor.row,n-1);
}
function addPattern(duplicate=false){
 if(data().patterns.length>=MAX_PATTERNS){status('Tracker maximum: 8 patterns');return}
 commit(d=>{d.patterns.push(duplicate?clone(d.patterns[d.active]):defPattern());d.active=d.patterns.length-1});cursor.row=0;
}
function deletePattern(){
 if(data().patterns.length===1)return;
 if(!confirm('Delete selected tracker pattern? References in the tracker chain will be remapped.'))return;
 commit(d=>{const old=d.active;d.patterns.splice(old,1);d.chain=d.chain.filter(n=>n!==old).map(n=>n>old?n-1:n);if(!d.chain.length)d.chain=[0];d.active=Math.min(old,d.patterns.length-1)});cursor.row=0;
}
function chainChange(){
 const tokens=$('trackerChain').value.toUpperCase().trim().split(/[\s,;]+/);
 if(tokens.some(x=>!/^[0-7]$|^0[0-7]$/.test(x))){status('Use pattern numbers 00 to 07 separated by spaces');return}
 const chain=tokens.map(x=>parseInt(x,16));
 commit(d=>d.chain=chain);
}
function prepare(){
 const out=[],rowSec=60/data().bpm/4;let base=0;
 for(const id of data().chain){
  const pat=data().patterns[id];
  for(let row=0;row<pat.rows;row++)for(let ch=0;ch<4;ch++){
   const cell=pat.cells[toIndex(row,ch)];if(!cell)continue;
   const when=(base+row)*rowSec;
   const level=cell.vel/127;
   const parts=cell.fx==='retrigger'?Math.max(2,Math.min(4,cell.param||2)):cell.fx==='up'||cell.fx==='down'?2:1;
   for(let j=0;j<parts;j++){
    const delta=(cell.fx==='up'?1:cell.fx==='down'?-1:0)*Math.round(cell.param/5||2)*j;
    out.push({when:when+j*rowSec/parts,duration:rowSec/parts*.91,midi:clamp(cell.midi+delta,36,95),
     kind:cell.kind,inst:cell.inst,bank:data().bank,vel:level*.76,fx:cell.fx,param:cell.param,ch,
     sampleId:cell.sampleId,sampleSettings:cell.sampleSettings,row:base+row});
   }
  }
  base+=pat.rows;
 }
 return {notes:out.sort((a,b)=>a.when-b.when),seconds:base*rowSec,rows:base};
}
function configure(graph){
 // Initialising the graph explicitly is essential: the default feedback gain is 1.
 const s=api.getState(),fx=s.fx;
 graph.delay.delayTime.value=.11+fx.delay*.55;
 graph.feedback.gain.value=Math.min(.38,fx.feedback*.67);
 graph.wet.gain.value=Math.min(.23,fx.wet*.65);
 graph.chorusSend.gain.value=Math.min(.18,fx.chorus*.38);
 graph.roomSend.gain.value=Math.min(.2,fx.reverb*.45);
 graph.roomWet.gain.value=.5;
 graph.output.gain.value=Math.min(.68,s.volume);
}
function emit(graph,n,when){
 const gain=n.vel*.8;
 if(n.kind==='drum')api.playDrum(graph,48+n.inst,when,api.getState().kit,gain,0,n.ch);
 else if(n.kind==='sample'){
  if(!api.hasSample(n.sampleId))throw Error('Tracker sample is missing: restore the portable audio project backup');
  api.playSampleSlice(graph,n.sampleId,n.inst,when,gain,0,n.sampleSettings,1,n.ch,n.duration);
 }else{
  const p=api.patchForPreset(n.bank,n.inst);
  if(n.fx==='vibrato')p.lfo={rate:4.5+n.param*.3,depth:.06+n.param*.02,type:0,phase:0};
  api.playSynth(graph,n.midi,when,n.duration,p,gain,0,n.ch);
 }
}
function paintPlayhead(row){
 if(playhead===row)return;
 playhead=row;document.querySelectorAll('.tracker-row').forEach(el=>el.classList.toggle('playing',Number(el.dataset.row)===row));
}
function isolatedLiveGraph(base){
 // Only tracker voices use these gates. Muting a tracker must not silence tape or other instruments.
 const graph=Object.create(base),gates=base.trackInputs.map(input=>{
  const gate=base.ctx.createGain();gate.gain.value=1;gate.connect(input);return gate;
 });
 graph.trackInputs=gates;graph.trackerGates=gates;return graph;
}
function stop(){
 if(clock)clearInterval(clock);clock=null;
 if(context?.trackerGates){
  const now=context.ctx.currentTime;
  for(const gate of context.trackerGates){
   gate.gain.cancelScheduledValues(now);
   gate.gain.setTargetAtTime(0,now,.004);
  }
 }
 context=null;playing=false;events=[];next=0;cycle=0;playhead=-1;
 if($('trackerPlay'))$('trackerPlay').textContent='▶ PLAY CHAIN';
 document.querySelectorAll('.tracker-row.playing').forEach(x=>x.classList.remove('playing'));
}
function tick(){
 if(!playing||!context)return;
 const now=context.ctx.currentTime;
 // Background tabs can be throttled for minutes. Skip stale cycles instead of bursting old notes.
 if(loopEnabled&&now-started>compiledSeconds*2){
  const skip=Math.max(0,Math.floor((now-started)/compiledSeconds)-1);
  if(skip>cycle){cycle=skip;next=0}
 }
 let queued=0;
 while(next<events.length&&queued<256){
  const n=events[next],at=started+cycle*compiledSeconds+n.when;
  if(at>=now+.14)break;
  if(at>=now-.1){try{emit(context,n,at)}catch(e){stop();status(e.message);return}}
  next++;queued++;
  if(next===events.length&&loopEnabled){next=0;cycle++}
 }
 const elapsed=Math.max(0,now-started),row=Math.floor(elapsed/(60/data().bpm/4))%compiledRows;
 let sum=0;for(const id of data().chain){const len=data().patterns[id].rows;if(row>=sum&&row<sum+len){paintPlayhead(id===data().active?row-sum:-1);break}sum+=len}
 if(!loopEnabled&&elapsed>=(cycle+1)*compiledSeconds+.1)stop();
}
function play(){
 if(playing){stop();return}
 if(api.isRecording()){status('Stop recording or rendering before tracker playback');return}
 const compiled=prepare();
 if(!compiled.notes.length){status('Place at least one note before playing');return}
 api.stopOthers();
 const base=api.ensureAudio();if(!base){status('Audio engine not available');return}
 try{
  for(const n of compiled.notes)if(n.kind==='sample'&&!api.hasSample(n.sampleId))throw Error('Missing tracker sample; restore the backed-up audio');
  context=isolatedLiveGraph(base);
  events=compiled.notes;compiledSeconds=compiled.seconds;compiledRows=compiled.rows;
  next=0;cycle=0;playing=true;started=context.ctx.currentTime+.09;clock=setInterval(tick,20);
  $('trackerPlay').textContent='■ STOP CHAIN';status('PLAYING · '+data().chain.length+' PATTERNS'+(loopEnabled?' · LOOP':''));
  tick();
 }catch(e){stop();status(e.message)}
}
function toggleLoop(){
 loopEnabled=!loopEnabled;
 const b=$('trackerLoop');
 b.setAttribute('aria-pressed',String(loopEnabled));b.textContent=loopEnabled?'↻ LOOP ON':'↻ LOOP OFF';
 status(loopEnabled?'Continuous playback enabled':'Playback stops after this chain');
}
async function exportWav(){
 if(rendering||api.isRecording()){status('Finish recording or export first');return}
 const compiled=prepare();
 if(!compiled.notes.length){status('Add notes before exporting audio');return}
 if(compiled.seconds>180){status('WAV export is limited to three minutes');return}
 const Ctx=window.OfflineAudioContext||window.webkitOfflineAudioContext;
 if(!Ctx){status('This browser does not support OfflineAudioContext');return}
 rendering=true;const button=$('trackerWav');button.disabled=true;button.textContent='RENDERING…';
 try{
  const rate=32000,ctx=new Ctx(2,Math.ceil((compiled.seconds+.6)*rate),rate),graph=api.makeGraph(ctx);configure(graph);
  for(const n of compiled.notes)emit(graph,n,.06+n.when);
  const buffer=await ctx.startRendering();
  const bytes=await api.wavBufferResponsive(buffer,()=>{});
  api.download(new Blob([bytes],{type:'audio/wav'}),'supernick-tracker-v22.wav');
  status('Stereo tracker WAV exported');
 }catch(e){status('WAV failed: '+e.message);console.error(e)}
 finally{button.disabled=false;button.textContent='⬇ EXPORT WAV';rendering=false}
}
function variable(n){
 const out=[n&127];while(n>>=7)out.unshift((n&127)|128);
 return out;
}
function midiExport(){
 const compiled=prepare();if(!compiled.notes.length){status('No notes to export');return}
 const tempo=Math.round(60000000/data().bpm),div=480;
 const ticks=n=>Math.max(0,Math.round(n.when*data().bpm/60*div));
 const list=[];
 for(const n of compiled.notes){
  const ch=n.kind==='drum'?9:n.ch;
  const midi=n.kind==='drum'?GM_DRUM[n.inst]:n.kind==='sample'?60+n.inst:n.midi;
  const at=ticks(n),end=Math.max(at+1,Math.round((n.when+n.duration)*data().bpm/60*div));
  list.push({tick:at,bytes:[0x90+ch,midi,Math.round(clamp(n.vel*127,1,127))]});
  list.push({tick:end,bytes:[0x80+ch,midi,0]});
 }
 list.sort((a,b)=>a.tick-b.tick||(a.bytes[0]&0xf0)-(b.bytes[0]&0xf0));
 const track=[0,0xff,0x51,3,(tempo>>16)&255,(tempo>>8)&255,tempo&255];let prev=0;
 for(const e of list){track.push(...variable(e.tick-prev),...e.bytes);prev=e.tick}
 track.push(0,0xff,0x2f,0);
 const u32=x=>[(x>>>24)&255,(x>>>16)&255,(x>>>8)&255,x&255],out=new Uint8Array([...Array.from('MThd').map(c=>c.charCodeAt(0)),...u32(6),0,0,0,1,1,224,...Array.from('MTrk').map(c=>c.charCodeAt(0)),...u32(track.length),...track]);
 api.download(new Blob([out],{type:'audio/midi'}),'supernick-tracker-v22.mid');status('Standard MIDI exported (notes and velocities; synth effect parameters remain browser-only)');
}
function sendToSong(){
 const s=api.getState(),compiled=prepare(),barBeats=4,secondsPerBar=60/s.bpm*4,barSecs=60/data().bpm*4;
 if(!compiled.notes.length){status('Enter some tracker notes first');return}
 if(data().bpm!==s.bpm){status('Set main BPM to '+data().bpm+' before copying to Song Workspace. Tracker uses its own tempo.');return}
 const bars=Math.ceil(compiled.seconds/barSecs);if(bars>16){status('The Song Workspace clip limit is 16 bars. Shorten the tracker chain first.');return}
 if(s.songWorkspace.clips.length&&s.songWorkspace.meter!=='4/4'){status('Set the Song Workspace meter to 4/4 before importing');return}
 if(compiled.notes.some(n=>n.kind==='sample')){status('Sample steps cannot be embedded as Song roll clips. Export tracker WAV or use synth/drums.');return}
 const at=Math.max(0,...s.songWorkspace.clips.map(c=>c.startBar+c.bars*c.repeats));
 if(at+bars>64){status('Song Workspace only has 64 bars');return}
 const groups=new Map(),drums=new Map();
 for(const n of compiled.notes){
  const beat=n.when*data().bpm/60;const bar=Math.floor(beat/4);const relative=beat-bar*4;
  if(n.kind==='drum'){
   const key=n.ch+':'+bar;const pat=drums.get(key)||Array(16).fill(null),step=Math.round(relative*4);
   if(step>=0&&step<16&&pat[step]===null)pat[step]=n.inst;drums.set(key,pat);
  }else{
   const key=n.ch+':'+n.inst;const arr=groups.get(key)||[];
   const pos=beat;const duration=Math.min(16,Math.max(.25,n.duration*data().bpm/60));
   arr.push({midi:n.midi,start:Math.round(pos*1000)/1000,beats:duration,velocity:Math.max(1,Math.round(n.vel*127))});groups.set(key,arr);
  }
 }
 const clips=[];let serial=0;const stamp=Date.now().toString(36);
 for(const [key,notes] of groups){
  const [ch,inst]=key.split(':').map(Number);
  if(notes.length>512){status('One tracker instrument has too many notes for a song clip');return}
  clips.push({id:'ws-trk-'+stamp+'-'+serial++,name:'Tracker CH'+(ch+1)+' SYN'+(inst+1),kind:'roll',startBar:at,bars,repeats:1,track:ch,muted:false,notes,patch:api.patchForPreset(data().bank,inst)});
 }
 for(const [key,steps] of drums){
  const [ch,bar]=key.split(':').map(Number);
  clips.push({id:'ws-trk-'+stamp+'-'+serial++,name:'Tracker DR'+(ch+1)+' B'+(bar+1),kind:'pattern',startBar:at+bar,bars:1,repeats:1,track:ch,muted:false,pattern:steps,voice:'drum',kit:s.kit});
 }
 if(s.songWorkspace.clips.length+clips.length>32){status('Song Workspace allows 32 clips. Shorten the chain or export audio.');return}
 const draft=clone(s.songWorkspace);if(!draft.clips.length)draft.meter='4/4';draft.clips.push(...clips);
 try{
  const validated=window.OP1Workspace.normalize(draft);
  if(compiled.notes.some(n=>n.fx!=='none')&&!confirm('Song Workspace preserves pattern pitches and timing but may simplify tracker effects, retriggers, and drum velocities. Copy snapshots anyway?'))return;
  window.OP1Workspace.stop();s.songWorkspace=validated;api.markDirty();window.OP1Workspace.render();
  status(clips.length+' tracker clips appended to Song Workspace; tracker patterns unchanged');
 }catch(e){status('Could not copy tracker: '+e.message)}
}
function init(deps){
 api=deps;const root=document.createElement('section');root.className='panel tracker-studio';root.id='trackerStudio';root.setAttribute('aria-label','Tracker Studio four-channel editor');
 root.innerHTML='<div class="tracker-heading"><div><h2>TRACKER STUDIO <small>/ v2.2</small></h2><p>Original four-channel pattern tracker. Enter notes, chain patterns, and use existing synths, drums and loaded samples.</p></div><strong id="trackerStatus" role="status" aria-live="polite">TRACKER READY</strong></div>'+
 '<div class="tracker-controls"><label>PATTERN<select id="trackerPattern"></select></label><label>ROWS<select id="trackerRows"><option>16</option><option>32</option><option>64</option></select></label><label>TRACKER BPM<input id="trackerBpm" type="number" min="40" max="240" value="120"></label><label>SOUND BANK<select id="trackerBank"><option value="0">CLASSICS</option><option value="1">AFTER HOURS</option><option value="2">EXPERIMENTAL</option></select></label><button type="button" id="trackerAdd">＋ PATTERN</button><button type="button" id="trackerClone">COPY PATTERN</button><button type="button" id="trackerDelete">DELETE PATTERN</button><button type="button" id="trackerUndo">↶ UNDO</button></div>'+
 '<div class="tracker-chain"><label for="trackerChain">PATTERN CHAIN (hex IDs)</label><input id="trackerChain" value="00" spellcheck="false" autocapitalize="characters" aria-label="Tracker pattern sequence"><button type="button" id="trackerApplyChain">APPLY CHAIN</button><span>Example: 00 00 01 · up to 16 entries</span></div>'+
 '<div class="tracker-headers"><span>ROW</span><span>CH 1</span><span>CH 2</span><span>CH 3</span><span>CH 4</span></div><div class="tracker-grid-scroll"><div id="trackerGrid" class="tracker-grid" role="grid" aria-label="Tracker pattern note grid"></div></div>'+
 '<div class="tracker-editor"><div><strong id="trackerSelection">ROW 00</strong><small id="trackerSelectedNote">EMPTY STEP</small></div><label>PITCH (MIDI)<input id="trackerMidi" type="number" min="36" max="95" value="60"></label><label>TYPE<select id="trackerKind"><option value="synth">SYNTH</option><option value="drum">DRUM</option><option value="sample">SAMPLE SLICE</option></select></label><label>INSTRUMENT<select id="trackerInstrument">'+Array.from({length:8},(_,i)=>'<option value="'+i+'">'+String(i+1).padStart(2,'0')+'</option>').join('')+'</select></label><label>VELOCITY<input type="number" id="trackerVelocity" min="1" max="127" value="100"></label><label>EFFECT<select id="trackerEffect"><option value="none">NONE</option><option value="up">PITCH UP</option><option value="down">PITCH DOWN</option><option value="vibrato">VIBRATO</option><option value="retrigger">RETRIGGER</option></select></label><label>AMOUNT (HEX 0-F)<input id="trackerParam" min="0" max="15" type="number" value="0"></label><button id="trackerWrite" type="button">PLACE NOTE</button><button id="trackerErase" type="button">CLEAR STEP</button></div>'+
 '<div class="tracker-edit-tools" role="group" aria-label="Tracker step editing"><button type="button" id="trackerCopy">COPY STEP</button><button type="button" id="trackerCut">CUT STEP</button><button type="button" id="trackerPaste">PASTE STEP</button><button type="button" id="trackerExample">LOAD ORIGINAL EXAMPLE</button></div>'+
 '<div class="tracker-actions"><button type="button" id="trackerPlay">▶ PLAY CHAIN</button><button type="button" id="trackerLoop" aria-pressed="false">↻ LOOP OFF</button><button type="button" id="trackerStop">■ STOP</button><button type="button" id="trackerWav">⬇ EXPORT WAV</button><button type="button" id="trackerMidiExport">⬇ EXPORT MIDI</button><button type="button" id="trackerToSong">＋ SEND TO SONG WORKSPACE</button></div>'+
 '<p class="tracker-guide">Click a step, set its pitch and instrument, then PLACE NOTE. Arrow keys navigate focused cells; Z/S/X/D… enter notes; Delete clears. Ctrl/Cmd+C, X and V copy, cut and paste focused steps. Loop repeats the entire pattern chain until stopped. Four rows equal one beat. Each row holds one sound per channel. Drum instruments 01-08 map to the existing kit. Sample instruments select slices 01-08 from a previously loaded sample. Pitch changes are stepped; vibrato and retriggers play in the browser. MIDI does not contain synthesizer effect parameters. Song Workspace import converts patterns to compatible note/drum clips and may simplify some step effects.</p>';
 $('rollPanel').before(root);
 $('trackerPattern').addEventListener('change',e=>{stop();commit(d=>d.active=Number(e.target.value));cursor.row=0});
 $('trackerRows').addEventListener('change',e=>resizePattern(Number(e.target.value)));
 $('trackerBpm').addEventListener('change',e=>commit(d=>d.bpm=Number(e.target.value)));
 $('trackerBank').addEventListener('change',e=>commit(d=>d.bank=Number(e.target.value)));
 $('trackerAdd').addEventListener('click',()=>addPattern(false));
 $('trackerClone').addEventListener('click',()=>addPattern(true));
 $('trackerDelete').addEventListener('click',deletePattern);
 $('trackerUndo').addEventListener('click',undo);
 $('trackerApplyChain').addEventListener('click',chainChange);
 $('trackerWrite').addEventListener('click',()=>writeNote(false));
 $('trackerErase').addEventListener('click',erase);
 $('trackerCopy').addEventListener('click',copyCell);
 $('trackerCut').addEventListener('click',cutCell);
 $('trackerPaste').addEventListener('click',pasteCell);
 $('trackerExample').addEventListener('click',loadExample);
 $('trackerLoop').addEventListener('click',toggleLoop);
 $('trackerPlay').addEventListener('click',play);
 $('trackerStop').addEventListener('click',stop);
 $('trackerWav').addEventListener('click',exportWav);
 $('trackerMidiExport').addEventListener('click',midiExport);
 $('trackerToSong').addEventListener('click',sendToSong);
 render();
}
window.OP1Tracker={defaults,normalize,init,render,stop,prepare,resetSession,get playing(){return playing}};
})();