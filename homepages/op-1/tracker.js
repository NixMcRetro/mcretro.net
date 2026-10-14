/* SuperNick's OP-1 Browser Lab v2.3 Music-Making Studio.
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
const defaultChannels=()=>Array.from({length:CHANNELS},()=>({level:1,pan:0,mute:false,solo:false}));
const defaults=()=>({patterns:[defPattern()],chain:[0],active:0,bank:0,bpm:120,channels:defaultChannels()});
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
 const channels=value.channels===undefined?defaultChannels():value.channels;
 if(!Array.isArray(channels)||channels.length!==CHANNELS)throw Error('Invalid tracker mixer');
 const safeChannels=channels.map(c=>{
  if(!c||typeof c!=='object'||!Number.isFinite(c.level)||c.level<0||c.level>1.5||!Number.isFinite(c.pan)||c.pan< -1||c.pan>1||typeof c.mute!=='boolean'||typeof c.solo!=='boolean')throw Error('Invalid tracker mixer channel');
  return {level:c.level,pan:c.pan,mute:c.mute,solo:c.solo};
 });
 return {patterns,chain:value.chain.slice(),active:value.active,bank:value.bank,bpm:value.bpm,channels:safeChannels};
}
const pitch=m=>SEMI[m%12]+(Math.floor(m/12)-1);
const formatCell=c=>!c?'··· ·· ··':(c.kind==='drum'?'DR'+(c.inst+1):c.kind==='sample'?'SM'+(c.inst+1):pitch(c.midi).padEnd(3,' '))+' '+String(c.inst+1).padStart(2,'0')+' '+(c.fx==='none'?'··':c.fx.slice(0,2).toUpperCase())+c.param.toString(16).toUpperCase();
const toIndex=(row,ch)=>row*CHANNELS+ch;
let api=null,cursor={row:0,ch:0},clock=null,playing=false,started=0,next=0,events=[],playhead=-1,rendering=false;
let history=[],redoHistory=[],clipboard=null,clipboardReady=false,blockClipboard=null;
let context=null,cycle=0,loopEnabled=false,compiledSeconds=0,compiledRows=0,viewChannel='all';
const data=()=>api.getState().tracker;
const pattern=()=>data().patterns[data().active];
function status(s){$('trackerStatus').textContent=s||data().patterns.length+' PATTERNS · '+data().chain.length+' CHAIN STEPS · '+data().bpm+' BPM'}
function commit(fn){
 if(rendering){status('Finish audio export before editing');return}
 const old=clone(data()),draft=clone(old);
 try{fn(draft);const value=normalize(draft);history.push(old);if(history.length>40)history.shift();redoHistory=[];stop();api.getState().tracker=value;api.markDirty();render();}
 catch(e){status('Edit rejected: '+e.message);console.warn('Tracker edit rejected',e)}
}
function restoreSnapshot(snapshot){stop();api.getState().tracker=normalize(snapshot);api.markDirty();cursor.row=Math.min(cursor.row,pattern().rows-1);render()}
function undo(){if(!history.length){status('Nothing to undo');return}redoHistory.push(clone(data()));restoreSnapshot(history.pop())}
function redo(){if(!redoHistory.length){status('Nothing to redo');return}history.push(clone(data()));restoreSnapshot(redoHistory.pop())}
function commitMixer(fn){
 if(rendering){status('Finish audio export before editing the mixer');return}
 const old=clone(data()),draft=clone(old);
 try{fn(draft);const safe=normalize(draft);history.push(old);if(history.length>40)history.shift();redoHistory=[];api.getState().tracker=safe;api.markDirty();applyLiveMixer();renderMixer();$('trackerUndo').disabled=false;$('trackerRedo').disabled=true;status('Tracker channel mixer updated')}
 catch(e){status('Mixer change rejected: '+e.message)}
}
const channelIsAudible=(c,channels=data().channels)=>!channels[c].mute&&(!channels.some(x=>x.solo)||channels[c].solo);
function applyLiveMixer(){
 if(!context?.trackerGates)return;
 const now=context.ctx.currentTime;
 data().channels.forEach((c,i)=>{
  const gate=context.trackerGates[i];
  gate.gain.setTargetAtTime(channelIsAudible(i)?c.level*.72:0,now,.008);
  context.trackerPanners[i]?.pan.setTargetAtTime(c.pan,now,.008);
 });
}
function renderMixer(){
 if(!$('trackerMixer'))return;
 data().channels.forEach((c,i)=>{
  $('trackerLevel'+i).value=String(Math.round(c.level*100));
  $('trackerLevelText'+i).textContent=Math.round(c.level*100)+'%';
  $('trackerPan'+i).value=String(Math.round(c.pan*100));
  $('trackerPanText'+i).textContent=c.pan===0?'C':c.pan<0?'L'+Math.round(Math.abs(c.pan)*100):'R'+Math.round(c.pan*100);
  for(const [key,tag] of [['mute','Mute'],['solo','Solo']]){
   const btn=$('tracker'+tag+i);btn.setAttribute('aria-pressed',String(c[key]));btn.textContent=key.toUpperCase()+(c[key]?' ✓':'');
  }
 });
}
function setCursor(row,ch,focus=false){
 cursor={row:clamp(row,0,pattern().rows-1),ch:clamp(ch,0,3)};paintCursor();updateEditor();
 if(viewChannel!=='all'&&String(cursor.ch)!==viewChannel)changeView(String(cursor.ch));
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
    if((e.ctrlKey||e.metaKey)&&['c','x','v','z','y'].includes(e.key.toLowerCase())){
     e.preventDefault();e.stopPropagation();
     if(e.key.toLowerCase()==='c')copyCell();else if(e.key.toLowerCase()==='x')cutCell();else if(e.key.toLowerCase()==='z'){if(e.shiftKey)redo();else undo()}else if(e.key.toLowerCase()==='y')redo();else pasteCell();
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
 renderGrid();updateEditor();renderMixer();changeView(viewChannel);$('trackerUndo').disabled=!history.length;$('trackerRedo').disabled=!redoHistory.length;if($('trackerLoop')){$('trackerLoop').setAttribute('aria-pressed',String(loopEnabled));$('trackerLoop').textContent=loopEnabled?'↻ LOOP ON':'↻ LOOP OFF'}status();
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
 if($('trackerAudition').checked)audition(c);
 if(advance)setCursor(Math.min(cursor.row+1,pattern().rows-1),cursor.ch,true);
}
function erase(){const index=toIndex(cursor.row,cursor.ch);commit(d=>d.patterns[d.active].cells[index]=null)}
function copyCell(){const cell=pattern().cells[toIndex(cursor.row,cursor.ch)];clipboard=cell?clone(cell):null;clipboardReady=true;status(cell?'Step copied. Select another cell and paste.':'Empty step copied. Paste to clear another cell.')}
function cutCell(){copyCell();erase()}
function pasteCell(){if(!clipboardReady){status('Copy a step before pasting');return}const index=toIndex(cursor.row,cursor.ch),saved=clipboard?clone(clipboard):null;commit(d=>{d.patterns[d.active].cells[index]=saved})}
function resetSession(){stop();history=[];redoHistory=[];clipboard=null;clipboardReady=false;blockClipboard=null;cursor={row:0,ch:0}}
function blockSpec(){
 const count=Number($('trackerBlockRows').value),all=$('trackerBlockScope').value==='all';
 return {start:cursor.row,count:Math.min(count,pattern().rows-cursor.row),channels:all?[0,1,2,3]:[cursor.ch],all};
}
function copyBlock(){
 const {start,count,channels,all}=blockSpec(),p=pattern();
 blockClipboard={rows:Array.from({length:count},(_,i)=>channels.map(ch=>clone(p.cells[toIndex(start+i,ch)]))),all};
 status(count+' row(s) copied from '+(all?'all channels':'channel '+(cursor.ch+1)));
}
function pasteBlock(at=cursor.row,duplicate=false){
 if(!blockClipboard){status('Copy a row or bar first');return}
 const block=clone(blockClipboard),rows=block.rows.length;
 if(at+rows>pattern().rows){status('Not enough rows left in this pattern. Choose an earlier row or resize.');return}
 const destCh=cursor.ch;
 commit(d=>{const p=d.patterns[d.active];for(let y=0;y<rows;y++)for(let x=0;x<block.rows[y].length;x++){const ch=block.all?x:destCh;p.cells[toIndex(at+y,ch)]=block.rows[y][x]}});
 if(duplicate)setCursor(at,destCh);
 status(rows+' rows '+(duplicate?'duplicated':'pasted'));
}
function duplicateBlock(){copyBlock();pasteBlock(cursor.row+blockClipboard.rows.length,true)}
function cutBlock(){
 const {start,count,channels}=blockSpec();copyBlock();
 commit(d=>{const p=d.patterns[d.active];for(let y=0;y<count;y++)for(const ch of channels)p.cells[toIndex(start+y,ch)]=null});
}
function transposeBlock(){
 const semitones=Number($('trackerTranspose').value),{start,count,channels}=blockSpec();
 if(!validInt(semitones,-12,12)||semitones===0){status('Choose a nonzero transpose, from -12 to +12 semitones');return}
 commit(d=>{let changed=0;const p=d.patterns[d.active];for(let y=0;y<count;y++)for(const ch of channels){
  const n=p.cells[toIndex(start+y,ch)];if(n?.kind==='synth'){
   if(!validInt(n.midi+semitones,36,95))throw Error('Transposition exceeds MIDI note range 36-95');
   n.midi+=semitones;changed++;
  }
 }if(!changed)throw Error('Selection contains no synth notes')});
}
function changeView(value){
 viewChannel=value==='all'?'all':String(clamp(Number(value)||0,0,3));
 $('trackerStudio').dataset.focusChannel=viewChannel;
 if(viewChannel!=='all')cursor.ch=Number(viewChannel);
 $('trackerView').value=viewChannel;
 paintCursor();updateEditor();
}
function audition(cell){
 if(!cell||api.isRecording()||rendering)return;
 const graph=api.ensureAudio();if(!graph)return;
 const when=graph.ctx.currentTime+.02,vel=clamp(cell.vel/127*.32,.04,.32);
 try{
  if(cell.kind==='drum')api.playDrum(graph,48+cell.inst,when,api.getState().kit,vel,0,null);
  else if(cell.kind==='sample'){if(api.hasSample(cell.sampleId))api.playSampleSlice(graph,cell.sampleId,cell.inst,when,vel,0,cell.sampleSettings,1,null,.2)}
  else api.playSynth(graph,cell.midi,when,.18,api.patchForPreset(data().bank,cell.inst),vel,0,null);
 }catch(e){status('Preview unavailable: '+e.message)}
}
function previewStep(){
 const c=pattern().cells[toIndex(cursor.row,cursor.ch)];
 if(c)audition(c);else status('Place a note to preview this step');
}
function loadExample(){
 const key=$('trackerDemo').value;
 if(data().patterns.some(p=>p.cells.some(Boolean))&&!confirm('Replace tracker patterns with this original composition? Undo restores your tracker. Tape and Song Workspace stay untouched.'))return;
 const songs={
  midnight:{bpm:104,bank:1,bass:[45,46,41,48],notes:[[62,65,69,72],[58,62,65,70],[60,65,69,72],[60,64,67,72]],label:'Midnight Windows'},
  subway:{bpm:92,bank:0,bass:[43,46,41,45],notes:[[55,58,62,67],[58,62,65,70],[53,57,60,65],[57,60,64,69]],label:'Subway Breaks'},
  arcade:{bpm:126,bank:2,bass:[48,43,45,46],notes:[[60,64,67,72],[55,59,62,67],[57,60,64,69],[58,62,65,70]],label:'Pixel Arcade'}
 };
 const tune=songs[key]||songs.midnight;
 const patterns=tune.bass.map((bass,section)=>{
  const notes=tune.notes[section],p=defPattern(32);
  const put=(row,ch,midi,inst,kind,vel=100,fx='none',param=0)=>{p.cells[toIndex(row,ch)]={midi,inst,kind,vel,fx,param}};
  for(let bar=0;bar<2;bar++){
   const n=bar*16;
   for(const [at,inst] of [[0,0],[2,2],[4,1],[6,2],[8,0],[10,2],[12,1],[14,2]]){
    if(key==='subway'&&(at===6||at===14)&&bar===0)continue;
    put(n+at,0,48+inst,inst,'drum',inst===2?49:inst===1?97:91);
   }
   for(const [at,shift] of [[0,0],[7,0],[10,7],[13,0]]){
    if(key==='subway'&&at===7)continue;
    put(n+at,1,bass+shift,0,'synth',at===0?105:78);
   }
   const pulse=key==='arcade'?[0,2,4,7,10,12,14]:[0,3,6,10,14];
   for(let i=0;i<pulse.length;i++)put(n+pulse[i],2,notes[(i+bar+section)%4],key==='arcade'?2:3,'synth',i===0?97:74);
   for(const [at,pos] of (key==='subway'?[[4,0],[12,2]]:[[2,0],[5,2],[9,1],[13,3]]))
    put(n+at,3,notes[pos]+12,key==='arcade'?4:5,'synth',key==='subway'?53:58,key==='arcade'&&pos===3?'vibrato':'none',key==='arcade'?2:0);
  }
  return p;
 });
 commit(d=>{d.patterns=patterns;d.chain=[0,1,2,3];d.active=0;d.bank=tune.bank;d.bpm=tune.bpm;d.channels=defaultChannels()});
 cursor={row:0,ch:0};render();status(tune.label+' loaded · four patterns · eight bars. Undo restores previous tracker.');
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
 // A tracker-owned mixer avoids changing tape-track gain, pan, mute and solo.
 // Voices still travel through the established safe master effects and limiter.
 const graph=Object.create(base),gates=[],panners=[];
 for(let ch=0;ch<CHANNELS;ch++){
  const c=data().channels[ch],gate=base.ctx.createGain(),pan=base.ctx.createStereoPanner?.()||null;
  gate.gain.value=channelIsAudible(ch)?c.level*.72:0;
  if(pan){pan.pan.value=c.pan;gate.connect(pan)}
  const out=pan||gate;
  for(const sink of [base.dry,base.delay,base.chorusSend,base.roomSend])out.connect(sink);
  gates.push(gate);panners.push(pan);
 }
 graph.trackInputs=gates;graph.trackerGates=gates;graph.trackerPanners=panners;
 return graph;
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
  const rate=32000,ctx=new Ctx(2,Math.ceil((compiled.seconds+.6)*rate),rate),graph=isolatedLiveGraph(api.makeGraph(ctx));configure(graph);
  for(const n of compiled.notes)emit(graph,n,.06+n.when);
  const buffer=await ctx.startRendering();
  const bytes=await api.wavBufferResponsive(buffer,()=>{});
  api.download(new Blob([bytes],{type:'audio/wav'}),'supernick-tracker-v23.wav');
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
 api.download(new Blob([out],{type:'audio/midi'}),'supernick-tracker-v23.mid');status('Standard MIDI exported (notes and velocities; synth effect parameters remain browser-only)');
}
function sendToSong(){
 const s=api.getState(),compiled=prepare(),barBeats=4,secondsPerBar=60/s.bpm*4,barSecs=60/data().bpm*4;
 if(!compiled.notes.length){status('Enter some tracker notes first');return}
 if(data().bpm!==s.bpm){status('Set main BPM to '+data().bpm+' before copying to Song Workspace. Tracker uses its own tempo.');return}
 const bars=Math.ceil(compiled.seconds/barSecs);if(bars>16){status('The Song Workspace clip limit is 16 bars. Shorten the tracker chain first.');return}
 if(s.songWorkspace.clips.length&&s.songWorkspace.meter!=='4/4'){status('Set the Song Workspace meter to 4/4 before importing');return}
 if(compiled.notes.some(n=>n.kind==='sample'&&!api.hasSample(n.sampleId))){status('A tracker sample is missing. Restore its portable audio backup first.');return}
 const at=Math.max(0,...s.songWorkspace.clips.map(c=>c.startBar+c.bars*c.repeats));
 if(at+bars>64){status('Song Workspace only has 64 bars');return}
 const groups=new Map(),drums=new Map(),samples=new Map();
 for(const n of compiled.notes){
  const beat=n.when*data().bpm/60;const bar=Math.floor(beat/4);const relative=beat-bar*4;
  if(n.kind==='drum'){
   const key=n.ch+':'+bar;const pat=drums.get(key)||Array(16).fill(null),step=Math.round(relative*4);
   if(step>=0&&step<16&&pat[step]===null)pat[step]=n.inst;drums.set(key,pat);
  }else if(n.kind==='sample'){
   const key=n.ch+':'+bar+':'+n.sampleId+':'+JSON.stringify(n.sampleSettings);
   const entry=samples.get(key)||{ch:n.ch,bar,id:n.sampleId,settings:clone(n.sampleSettings),steps:Array(16).fill(null)};
   const step=Math.round(relative*4);
   if(step>=0&&step<16&&entry.steps[step]===null)entry.steps[step]=n.inst;
   samples.set(key,entry);
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
 for(const sample of samples.values()){
  clips.push({id:'ws-trk-'+stamp+'-'+serial++,name:'Tracker SAMPLE CH'+(sample.ch+1)+' B'+(sample.bar+1),kind:'pattern',startBar:at+sample.bar,bars:1,repeats:1,track:sample.ch,muted:false,pattern:sample.steps,voice:'sample',kit:s.kit,sampleId:sample.id,sampleSettings:sample.settings});
 }
 if(s.songWorkspace.clips.length+clips.length>32){status('Song Workspace allows 32 clips. Shorten the chain or export audio.');return}
 const draft=clone(s.songWorkspace);if(!draft.clips.length)draft.meter='4/4';draft.clips.push(...clips);
 try{
  const validated=window.OP1Workspace.normalize(draft);
  if((compiled.notes.some(n=>n.fx!=='none')||data().channels.some(c=>c.mute||c.solo||c.level!==1||c.pan!==0))&&!confirm('Song Workspace preserves pitches, timing and sample slices but may simplify effects, retriggers, velocities and tracker channel-mixer settings. Copy snapshots anyway?'))return;
  window.OP1Workspace.stop();s.songWorkspace=validated;api.markDirty();window.OP1Workspace.render();
  status(clips.length+' tracker clips appended to Song Workspace; tracker patterns unchanged');
 }catch(e){status('Could not copy tracker: '+e.message)}
}
function init(deps){
 api=deps;const root=document.createElement('section');root.className='panel tracker-studio';root.id='trackerStudio';root.setAttribute('aria-label','Tracker Studio four-channel editor');
 root.innerHTML='<div class="tracker-heading"><div><h2>TRACKER STUDIO <small>/ v2.3</small></h2><p>Original four-channel pattern tracker. Enter notes, chain patterns, and use existing synths, drums and loaded samples.</p></div><strong id="trackerStatus" role="status" aria-live="polite">TRACKER READY</strong></div>'+
 '<div class="tracker-controls"><label>PATTERN<select id="trackerPattern"></select></label><label>ROWS<select id="trackerRows"><option>16</option><option>32</option><option>64</option></select></label><label>TRACKER BPM<input id="trackerBpm" type="number" min="40" max="240" value="120"></label><label>SOUND BANK<select id="trackerBank"><option value="0">CLASSICS</option><option value="1">AFTER HOURS</option><option value="2">EXPERIMENTAL</option></select></label><button type="button" id="trackerAdd">＋ PATTERN</button><button type="button" id="trackerClone">COPY PATTERN</button><button type="button" id="trackerDelete">DELETE PATTERN</button><button type="button" id="trackerUndo">↶ UNDO</button><button type="button" id="trackerRedo">↷ REDO</button></div>'+
 '<div class="tracker-chain"><label for="trackerChain">PATTERN CHAIN (hex IDs)</label><input id="trackerChain" value="00" spellcheck="false" autocapitalize="characters" aria-label="Tracker pattern sequence"><button type="button" id="trackerApplyChain">APPLY CHAIN</button><span>Example: 00 00 01 · up to 16 entries</span></div>'+
 '<div class="tracker-view"><label for="trackerView">GRID VIEW</label><select id="trackerView"><option value="all">ALL 4 CHANNELS</option><option value="0">CHANNEL 1</option><option value="1">CHANNEL 2</option><option value="2">CHANNEL 3</option><option value="3">CHANNEL 4</option></select><small>Choose one channel for easier touch editing on a phone.</small></div>'+
 '<div class="tracker-headers"><span>ROW</span><span>CH 1</span><span>CH 2</span><span>CH 3</span><span>CH 4</span></div><div class="tracker-grid-scroll"><div id="trackerGrid" class="tracker-grid" role="grid" aria-label="Tracker pattern note grid"></div></div>'+
 '<div class="tracker-editor"><div><strong id="trackerSelection">ROW 00</strong><small id="trackerSelectedNote">EMPTY STEP</small></div><label>PITCH (MIDI)<input id="trackerMidi" type="number" min="36" max="95" value="60"></label><label>TYPE<select id="trackerKind"><option value="synth">SYNTH</option><option value="drum">DRUM</option><option value="sample">SAMPLE SLICE</option></select></label><label>INSTRUMENT<select id="trackerInstrument">'+Array.from({length:8},(_,i)=>'<option value="'+i+'">'+String(i+1).padStart(2,'0')+'</option>').join('')+'</select></label><label>VELOCITY<input type="number" id="trackerVelocity" min="1" max="127" value="100"></label><label>EFFECT<select id="trackerEffect"><option value="none">NONE</option><option value="up">PITCH UP</option><option value="down">PITCH DOWN</option><option value="vibrato">VIBRATO</option><option value="retrigger">RETRIGGER</option></select></label><label>AMOUNT (HEX 0-F)<input id="trackerParam" min="0" max="15" type="number" value="0"></label><button id="trackerWrite" type="button">PLACE NOTE</button><button id="trackerErase" type="button">CLEAR STEP</button></div>'+
 '<div class="tracker-edit-tools" role="group" aria-label="Tracker step editing"><button type="button" id="trackerCopy">COPY STEP</button><button type="button" id="trackerCut">CUT STEP</button><button type="button" id="trackerPaste">PASTE STEP</button><button type="button" id="trackerPreview">♫ PREVIEW STEP</button><label class="tracker-audition"><input type="checkbox" id="trackerAudition"> PREVIEW ON ENTRY</label></div>'+
 '<details class="tracker-batch-editor"><summary>ROW / BAR EDITING</summary><div class="tracker-batch-form"><label>SELECTION<select id="trackerBlockRows"><option value="1">1 STEP</option><option value="4">4 ROWS / BEAT</option><option value="16" selected>16 ROWS / BAR</option><option value="32">32 ROWS / 2 BARS</option></select></label><label>SCOPE<select id="trackerBlockScope"><option value="channel">SELECTED CHANNEL</option><option value="all">ALL CHANNELS</option></select></label><button id="trackerCopyBlock" type="button">COPY ROWS</button><button id="trackerCutBlock" type="button">CUT ROWS</button><button id="trackerPasteBlock" type="button">PASTE ROWS</button><button id="trackerDuplicateBlock" type="button">DUPLICATE NEXT</button><label>TRANSPOSE (SEMITONES)<input type="number" min="-12" max="12" value="2" id="trackerTranspose"></label><button id="trackerTransposeButton" type="button">TRANSPOSE SYNTH</button></div></details>'+
 '<section class="tracker-mixer" id="trackerMixer" aria-label="Tracker channel mixer"><h3>FOUR-CHANNEL MIXER <small>Independent of tape tracks</small></h3><div class="tracker-mixer-grid">'+Array.from({length:4},(_,i)=>'<div class="tracker-mixer-strip"><strong>CHANNEL '+(i+1)+'</strong><label>LEVEL <output id="trackerLevelText'+i+'">100%</output><input type="range" id="trackerLevel'+i+'" min="0" max="150" value="100" aria-label="Channel '+(i+1)+' level"></label><label>PAN <output id="trackerPanText'+i+'">C</output><input type="range" id="trackerPan'+i+'" min="-100" max="100" value="0" aria-label="Channel '+(i+1)+' pan"></label><div><button type="button" id="trackerMute'+i+'" aria-pressed="false">MUTE</button><button type="button" id="trackerSolo'+i+'" aria-pressed="false">SOLO</button></div></div>').join('')+'</div></section>'+
 '<div class="tracker-demos"><label for="trackerDemo">ORIGINAL COMPOSITION</label><select id="trackerDemo"><option value="midnight">MIDNIGHT WINDOWS · CHILLED</option><option value="subway">SUBWAY BREAKS · 92 BPM</option><option value="arcade">PIXEL ARCADE · UPBEAT</option></select><button type="button" id="trackerExample">LOAD COMPOSITION</button></div>'+
 '<div class="tracker-actions"><button type="button" id="trackerPlay">▶ PLAY CHAIN</button><button type="button" id="trackerLoop" aria-pressed="false">↻ LOOP OFF</button><button type="button" id="trackerStop">■ STOP</button><button type="button" id="trackerWav">⬇ EXPORT WAV</button><button type="button" id="trackerMidiExport">⬇ EXPORT MIDI</button><button type="button" id="trackerToSong">＋ SEND TO SONG WORKSPACE</button></div>'+
 '<p class="tracker-guide">Click a step, set its pitch and instrument, then PLACE NOTE. Arrow keys navigate focused cells; Z/S/X/D… enter notes; Delete clears. Ctrl/Cmd+C, X and V copy, cut and paste focused steps. Open ROW / BAR EDITING to copy, duplicate and transpose a selection starting at the selected row. Channel sliders and mute/solo work during playback. The focused grid is easier to edit on mobile. Loop repeats the entire chain until stopped. Four rows equal one beat. Each row holds one sound per channel. Drum instruments 01-08 map to the existing kit. Sample instruments select slices 01-08 from a previously loaded sample. Pitch changes are stepped; vibrato and retriggers play in the browser. MIDI does not contain synthesizer effect parameters. Song Workspace imports synth, drum and sample-slice patterns as compatible clips; retriggers, effects and channel mixing can be simplified.</p>';
 $('rollPanel').before(root);
 $('trackerPattern').addEventListener('change',e=>{stop();commit(d=>d.active=Number(e.target.value));cursor.row=0});
 $('trackerRows').addEventListener('change',e=>resizePattern(Number(e.target.value)));
 $('trackerBpm').addEventListener('change',e=>commit(d=>d.bpm=Number(e.target.value)));
 $('trackerBank').addEventListener('change',e=>commit(d=>d.bank=Number(e.target.value)));
 $('trackerAdd').addEventListener('click',()=>addPattern(false));
 $('trackerClone').addEventListener('click',()=>addPattern(true));
 $('trackerDelete').addEventListener('click',deletePattern);
 $('trackerUndo').addEventListener('click',undo);
 $('trackerRedo').addEventListener('click',redo);
 $('trackerView').addEventListener('change',e=>changeView(e.target.value));
 for(const [id,fn] of [['trackerCopyBlock',copyBlock],['trackerCutBlock',cutBlock],['trackerPasteBlock',()=>pasteBlock()],['trackerDuplicateBlock',duplicateBlock],['trackerTransposeButton',transposeBlock],['trackerPreview',previewStep]])$(id).addEventListener('click',fn);
 for(let ch=0;ch<4;ch++){
  $('trackerLevel'+ch).addEventListener('change',e=>commitMixer(d=>d.channels[ch].level=Number(e.target.value)/100));
  $('trackerPan'+ch).addEventListener('change',e=>commitMixer(d=>d.channels[ch].pan=Number(e.target.value)/100));
  $('trackerMute'+ch).addEventListener('click',()=>commitMixer(d=>d.channels[ch].mute=!d.channels[ch].mute));
  $('trackerSolo'+ch).addEventListener('click',()=>commitMixer(d=>d.channels[ch].solo=!d.channels[ch].solo));
 }
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
 if(window.matchMedia?.('(max-width:640px)')?.matches)viewChannel='0';
 render();
}
window.OP1Tracker={defaults,normalize,init,render,stop,prepare,resetSession,get playing(){return playing}};
})();