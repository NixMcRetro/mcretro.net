/* SuperNick's OP-1 Browser Lab v2.0. Optional clip layer; legacy sections and tape remain unmodified. */
(function(){
'use strict';
const $=id=>document.getElementById(id), METERS={'2/4':2,'3/4':3,'4/4':4,'6/8':3};
const MAX_CLIPS=32, MAX_EVENTS=12000, PX=24;
let api=null, history=[], selected=null, playback={running:false,clock:null,origin:0,next:0,events:[],seconds:0,quarter:0,graph:null},busy=false;
const int=(n,min,max)=>Number.isInteger(n)&&n>=min&&n<=max;
const clone=x=>structuredClone(x);
function normalize(value){
 if(value===undefined||value===null)return {meter:'4/4',clips:[]};
 if(!value||typeof value!=='object'||Array.isArray(value)||!Object.hasOwn(METERS,value.meter)||!Array.isArray(value.clips)||value.clips.length>MAX_CLIPS)throw Error('Invalid unified song workspace');
 const ids=new Set(),clips=value.clips.map((raw,index)=>{
  if(!raw||typeof raw!=='object'||!['roll','pianola','pattern','tape'].includes(raw.kind)||!int(raw.startBar,0,63)||!int(raw.bars,1,16)||!int(raw.repeats,1,8)||raw.startBar+raw.bars*raw.repeats>64||!int(raw.track,0,3))throw Error('Invalid song clip placement');
  if(typeof raw.id!=='string'||!/^ws-[a-z0-9-]{1,48}$/.test(raw.id)||ids.has(raw.id))throw Error('Invalid or duplicate clip ID');
  ids.add(raw.id);
  if(typeof raw.name!=='string'||!raw.name.trim()||raw.name.length>28)throw Error('Invalid clip label');
  const out={id:raw.id,name:raw.name,kind:raw.kind,startBar:raw.startBar,bars:raw.bars,repeats:raw.repeats,track:raw.track,muted:raw.muted===true};
  if(raw.kind==='pattern'){
   if(!Array.isArray(raw.pattern)||raw.pattern.length!==16||raw.pattern.some(v=>v!==null&&!int(v,0,23)))throw Error('Invalid pattern clip');
   if(!['synth','drum','sample'].includes(raw.voice))throw Error('Invalid pattern voice');
   out.pattern=raw.pattern.slice();out.voice=raw.voice;out.kit=int(raw.kit,0,7)?raw.kit:0;
   if(out.voice==='sample'){if(typeof raw.sampleId!=='string'||raw.sampleId.length>100)throw Error('Missing sample reference');out.sampleId=raw.sampleId;out.sampleSettings=clone(raw.sampleSettings||{});}
  }else if(raw.kind==='tape'){
   const a=raw.audio;
   if(!a||typeof a.sampleId!=='string'||!a.sampleId||a.sampleId.length>100||!Number.isFinite(a.d)||a.d<=0||a.d>60||!Number.isFinite(a.offset)||a.offset<0||!Number.isFinite(a.captureSpeed)||a.captureSpeed<=0||a.captureSpeed>2)throw Error('Invalid tape audio clip');
   out.audio={sampleId:a.sampleId,d:a.d,offset:a.offset,captureSpeed:a.captureSpeed};
  }else{
   if(!Array.isArray(raw.notes)||raw.notes.length>512)throw Error('Invalid note clip');
   out.notes=raw.notes.map(n=>{
    if(!n||!int(n.midi,36,95)||!Number.isFinite(n.start)||n.start<0||!Number.isFinite(n.beats)||n.beats<.25||n.beats>16||n.start+n.beats>128||!int(n.velocity,1,127))throw Error('Invalid note in song clip');
    return {midi:n.midi,start:n.start,beats:n.beats,velocity:n.velocity};
   });
  }
  if(raw.kind!=='tape'&&out.voice!=='drum'&&out.voice!=='sample'){
   if(!raw.patch||typeof raw.patch!=='object'||Array.isArray(raw.patch)||JSON.stringify(raw.patch).length>8000)throw Error('Invalid clip sound patch');
   out.patch=clone(raw.patch);
  }
  return out;
 });
 return {meter:value.meter,clips};
}
const state=()=>api.getState(),workspace=()=>state().songWorkspace;
const endBar=()=>Math.max(0,...workspace().clips.map(c=>c.startBar+c.bars*c.repeats));
const beatSize=()=>METERS[workspace().meter];
function status(message){if($('workspaceStatus'))$('workspaceStatus').textContent=message||workspace().clips.length+' CLIPS · '+endBar()+' BARS · '+workspace().meter+' · '+state().bpm+' BPM';}
function stop(){
 if(playback.clock)clearInterval(playback.clock);
 playback.running=false;playback.clock=null;playback.events=[];playback.next=0;
 if($('workspacePlayhead'))$('workspacePlayhead').hidden=true;
 if($('workspacePlay'))$('workspacePlay').textContent='▶ PLAY TIMELINE';
 if(api)status();
}
function saveChange(action){
 if(busy){api.notice('Finish rendering before changing song clips.');return}
 const old=clone(workspace());
 try{const draft=clone(old);action(draft);const next=normalize(draft);history.push(old);if(history.length>40)history.shift();stop();state().songWorkspace=next;api.markDirty();render();}
 catch(e){api.notice(e.message);render();}
}
function clipId(){return 'ws-'+(Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,9));}
function place(part){
 if(workspace().clips.length>=MAX_CLIPS){api.notice('Timeline limit: 32 clips.');return}
 const start=endBar();
 if(start+part.bars>64){api.notice('Timeline limit: 64 bars. Move or shorten an existing clip first.');return}
 saveChange(d=>{d.clips.push({id:clipId(),startBar:start,repeats:1,muted:false,track:state().selectedTrack,...part})});
}
function addRoll(){
 const roll=state().pianoRoll;if(!roll.notes.length){api.notice('Draw or import Piano Roll notes first.');return}
 if(workspace().clips.length&&workspace().meter!==roll.meter){api.notice('Set the timeline meter to '+roll.meter+' before adding this roll.');return}
 const bars=Math.ceil(Math.max(...roll.notes.map(n=>n.start+n.beats))/METERS[roll.meter]);
 if(bars>16){api.notice('A Piano Roll clip is limited to 16 bars. Shorten the phrase first.');return}
 const first=!workspace().clips.length;
 saveChange(d=>{if(first)d.meter=roll.meter;const start=Math.max(0,...d.clips.map(c=>c.startBar+c.bars*c.repeats));if(start+bars>64)throw Error('Timeline limit: 64 bars');
 d.clips.push({id:clipId(),name:'Piano Roll',kind:'roll',startBar:start,bars,repeats:1,track:state().selectedTrack,muted:false,notes:clone(roll.notes),patch:clone(api.snapshotPatch())});});
 api.notice('Piano Roll copied into a song clip. Later roll edits will not replace this snapshot.');
}
function addPianola(){
 const score=state().pianola;
 if(!score.notes.some(n=>n.midi!==null)){api.notice('The Pianola needs notes first.');return}
 if(workspace().clips.length&&workspace().meter!==score.meter){api.notice('Set the timeline meter to '+score.meter+' before adding the Pianola.');return}
 const events=api.pianolaScoreEvents().filter(n=>n.midi!==null).map(n=>({midi:n.midi,start:n.start,beats:n.beats,velocity:100}));
 const bars=Math.ceil(score.notes.reduce((sum,n)=>sum+n.beats,0)/METERS[score.meter]);
 if(bars>16){api.notice('A Pianola clip is limited to 16 bars.');return}
 const first=!workspace().clips.length;
 saveChange(d=>{if(first)d.meter=score.meter;const start=Math.max(0,...d.clips.map(c=>c.startBar+c.bars*c.repeats));if(start+bars>64)throw Error('Timeline limit: 64 bars');
 d.clips.push({id:clipId(),name:'Pianola',kind:'pianola',startBar:start,bars,repeats:1,track:state().selectedTrack,muted:false,notes:events,patch:clone(api.snapshotPatch())});});
}
function patternClip(part,name){
 const s=state(),voice=part?.voice||s.instrument,slot=part?.slot||s.patternSlot;
 if(voice==='sample'&&!s.sampleId)throw Error('Load a sample before adding a sample pattern.');
 const c={name:name||'Pattern '+slot,kind:'pattern',bars:part?.bars||1,track:part?.track??s.selectedTrack,muted:false,repeats:1,startBar:0,id:clipId(),pattern:clone(api.patternForSlot(slot)),voice:voice==='drum'?'drum':voice==='sample'?'sample':'synth',kit:s.kit};
 if(c.voice==='sample'){c.sampleId=s.sampleId;c.sampleSettings=clone(s.sampleSettings);}
 else if(c.voice==='synth')c.patch=clone(api.snapshotPatch());
 return c;
}
function addPattern(){try{place(patternClip(null))}catch(e){api.notice(e.message)}}
function importSections(){
 const parts=state().songSections;
 if(workspace().clips.length&&!confirm('Append snapshot clips from legacy Song Arrangement? Existing timeline clips will remain.'))return;
 try{saveChange(d=>{let at=Math.max(0,...d.clips.map(c=>c.startBar+c.bars*c.repeats));for(const p of parts){const c=patternClip(p,p.name);c.startBar=at;at+=c.bars;if(at>64)throw Error('Legacy sections exceed the 64-bar timeline limit');d.clips.push(c)}})}
 catch(e){api.notice(e.message)}
}
function addTape(){
 const source=state().tracks[state().selectedTrack].clips[0];
 if(!source){api.notice('Import or record audio on the selected tape track first.');return}
 const secondsPerBar=beatSize()*60/state().bpm,bars=Math.min(16,Math.max(1,Math.ceil(source.d/secondsPerBar)));
 place({name:'Tape T'+(state().selectedTrack+1),kind:'tape',bars,audio:{sampleId:source.sampleId,d:source.d,offset:source.offset||0,captureSpeed:source.captureSpeed||1}});
}
function noteEvents(){
 const bpm=state().bpm,barBeats=beatSize(),events=[],quarter=60/bpm;
 for(const c of workspace().clips){
  if(c.muted)continue;
  for(let rep=0;rep<c.repeats;rep++){
   const base=(c.startBar+c.bars*rep)*barBeats,capacity=c.bars*barBeats;
   if(c.kind==='tape'){
    if(!api.hasSample(c.audio.sampleId))throw Error('Tape clip audio missing. Restore an audio project backup.');
    events.push({kind:'tape',beat:base,duration:Math.min(c.audio.d,capacity*quarter),audio:c.audio,track:c.track});
   }else if(c.kind==='pattern'){
    if(c.voice==='sample'&&!api.hasSample(c.sampleId))throw Error('Pattern sample missing. Restore an audio project backup.');
    for(let bar=0;bar<c.bars;bar++)for(let step=0;step<16;step++){
     const n=c.pattern[step];if(n===null)continue;
     events.push({kind:c.voice,beat:base+bar*barBeats+step*barBeats/16,midi:48+n+state().octave*12,duration:barBeats/16*quarter*.7,velocity:.83,track:c.track,patch:c.patch,kit:c.kit,sampleId:c.sampleId,sampleSettings:c.sampleSettings,sliceIndex:n});
    }
   }else for(const n of c.notes){
    if(n.start>=capacity)continue;
    events.push({kind:'synth',beat:base+n.start,midi:n.midi,duration:Math.min(n.beats,capacity-n.start)*quarter*.94,velocity:n.velocity/127,track:c.track,patch:c.patch});
   }
   if(events.length>MAX_EVENTS)throw Error('Too many timeline events. Reduce clips or repeats.');
  }
 }
 return events.sort((a,b)=>a.beat-b.beat);
}
function emit(graph,e,when){
 if(e.kind==='tape'){api.playTapeClip(graph,{...e.audio,t:0},when,0,e.duration,e.track,false);return}
 if(e.kind==='drum')api.playDrum(graph,e.midi,when,e.kit,e.velocity,0,e.track);
 else if(e.kind==='sample')api.playSampleSlice(graph,e.sampleId,e.sliceIndex,when,e.velocity,0,e.sampleSettings,1,e.track,e.duration);
 else api.playSynth(graph,e.midi,when,e.duration,e.patch,e.velocity*.85,0,e.track);
}
function tick(){
 if(!playback.running||!api.getAudio())return;
 const now=playback.graph.ctx.currentTime,elapsed=now-playback.origin,quarter=playback.quarter;
 let guard=0;
 while(playback.next<playback.events.length&&playback.origin+playback.events[playback.next].beat*quarter<now+.12&&guard++<128){
  const e=playback.events[playback.next++];emit(playback.graph,e,playback.origin+e.beat*quarter);
 }
 const cursor=$('workspacePlayhead');if(cursor){cursor.hidden=false;cursor.style.left=Math.max(0,Math.min(64,elapsed/quarter/beatSize()))*PX+'px';}
 if(elapsed>=playback.seconds+.04){
  if(state().songRepeat){playback.origin+=playback.seconds;playback.next=0;}
  else stop();
 }
}
function play(){
 if(playback.running){stop();return}
 if(!workspace().clips.length){api.notice('Add a song clip before playing the timeline.');return}
 if(api.isRecording()){api.notice('Stop recording before playing the song.');return}
 let events;
 try{events=noteEvents()}catch(e){api.notice(e.message);return}
 if(!events.length){api.notice('Timeline contains no playable notes or audio.');return}
 api.stopOthers();const graph=api.ensureAudio();if(!graph)return;
 const seconds=endBar()*beatSize()*60/state().bpm;
 Object.assign(playback,{running:true,origin:graph.ctx.currentTime+.08,next:0,events,seconds,quarter:60/state().bpm,graph});
 playback.clock=setInterval(tick,18);
 $('workspacePlay').textContent='■ STOP TIMELINE';status('PLAYING · '+endBar()+' BARS');tick();
}
async function renderAudio(toTape){
 if(busy||api.isRecording()){api.notice('Finish other audio recording or rendering first.');return}
 if(!workspace().clips.length){api.notice('Add song clips first.');return}
 const seconds=endBar()*beatSize()*60/state().bpm;
 if(seconds>(toTape?59:180)){api.notice(toTape?'Tape print must fit within 59 seconds. Shorten the timeline or increase tempo.':'Song WAV export is limited to three minutes.');return}
 const Ctx=window.OfflineAudioContext||window.webkitOfflineAudioContext;
 if(!Ctx){api.notice('Offline audio rendering is not supported in this browser.');return}
 let events;try{events=noteEvents()}catch(e){api.notice(e.message);return}
 if(!events.length){api.notice('There is no playable audio to render.');return}
 stop();busy=true;const btn=$(toTape?'workspaceTape':'workspaceExport');btn.disabled=true;btn.textContent='RENDERING…';status('RENDERING · PLEASE KEEP THIS TAB OPEN');
 try{
  const rate=44100,ctx=new Ctx(2,Math.ceil((seconds+.4)*rate),rate),graph=api.makeGraph(ctx);
  api.setExportGraphEffects(graph);
  const quarter=60/state().bpm;
  for(const e of events)emit(graph,e,.04+e.beat*quarter);
  const buffer=await ctx.startRendering();
  if(toTape){
   const index=state().selectedTrack,id=await api.registerAudio(buffer);
   api.checkpointEdit();state().tracks[index].clips.push({sampleId:id,t:0,d:seconds,offset:0,captureSpeed:1});
   api.markDirty();api.syncUI();api.notice('Timeline printed to a new PCM clip on tape track '+(index+1)+'. Source song and recordings unchanged.');
  }else{
   const wav=await api.wavBufferResponsive(buffer,()=>{});
   api.download(new Blob([wav],{type:'audio/wav'}),'supernick-op1-v20-timeline-'+new Date().toISOString().slice(0,10)+'.wav');
   api.notice('Unified song exported as stereo WAV. Source scores and tape unchanged.');
  }
 }catch(e){console.error(e);api.notice('Timeline render failed: '+e.message)}
 finally{busy=false;btn.disabled=false;btn.textContent=toTape?'PRINT TO TAPE TRACK':'EXPORT TIMELINE WAV';status();}
}
function render(){
 if(!api)return;
 const ws=workspace();$('workspaceMeter').value=ws.meter;$('workspaceUndo').disabled=!history.length;
 const ruler=$('workspaceRuler');ruler.replaceChildren();
 for(let i=0;i<=64;i+=4){const v=document.createElement('span');v.style.left=i*PX+'px';v.textContent=String(i+1);ruler.append(v);}
 const lanes=$('workspaceLanes');lanes.replaceChildren();
 for(let track=0;track<4;track++){
  const row=document.createElement('div');row.className='workspace-lane';row.dataset.track=String(track);
  const title=document.createElement('span');title.className='workspace-track-label';title.textContent='T'+(track+1);row.append(title);
  for(const c of ws.clips.filter(x=>x.track===track)){
   const b=document.createElement('button');b.type='button';b.className='workspace-block';b.classList.toggle('muted',c.muted);b.classList.toggle('selected',selected===c.id);
   b.style.left=c.startBar*PX+'px';b.style.width=Math.max(22,c.bars*c.repeats*PX-2)+'px';b.textContent=c.name;
   b.setAttribute('aria-label',c.name+', track '+(track+1)+', bar '+(c.startBar+1)+', '+(c.bars*c.repeats)+' bars'+(c.muted?', muted':'')+'. Arrow keys move the clip.');
   b.addEventListener('click',()=>{selected=c.id;render()});
   b.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight'].includes(e.key))return;e.preventDefault();const change=e.key==='ArrowRight'?1:-1;saveChange(d=>{const x=d.clips.find(n=>n.id===c.id);x.startBar+=change});});
   b.addEventListener('pointerdown',e=>{if(e.button!==0)return;const x=e.clientX,base=c.startBar;let moved=false;b.setPointerCapture(e.pointerId);
    const move=ev=>{if(ev.pointerId!==e.pointerId)return;const dx=Math.round((ev.clientX-x)/PX);if(Math.abs(ev.clientX-x)<7)return;moved=true;b.style.left=Math.max(0,Math.min(64-c.bars*c.repeats,base+dx))*PX+'px';ev.preventDefault()};
    const done=ev=>{b.removeEventListener('pointermove',move);b.removeEventListener('pointerup',done);b.removeEventListener('pointercancel',done);if(moved){const dx=Math.round((ev.clientX-x)/PX);saveChange(d=>{d.clips.find(n=>n.id===c.id).startBar=Math.max(0,Math.min(64-c.bars*c.repeats,base+dx))});} };
    b.addEventListener('pointermove',move);b.addEventListener('pointerup',done,{once:true});b.addEventListener('pointercancel',done,{once:true});
   });row.append(b);
  }lanes.append(row);
 }
 const cursor=document.createElement('div');cursor.id='workspacePlayhead';cursor.className='workspace-playhead';cursor.hidden=!playback.running;lanes.append(cursor);
 const editor=$('workspaceClipList');editor.replaceChildren();
 for(const c of ws.clips){
  const item=document.createElement('div');item.className='workspace-clip-item';item.dataset.clip=c.id;
  const heading=document.createElement('strong');heading.textContent=c.name+' · '+c.kind.toUpperCase();item.append(heading);
  function field(title,key,min,max){
   const label=document.createElement('label');label.textContent=title;
   const input=document.createElement('input');input.type='number';input.min=String(min);input.max=String(max);input.step='1';input.value=String(c[key]);input.setAttribute('aria-label',c.name+' '+title);
   input.addEventListener('change',()=>saveChange(d=>{d.clips.find(x=>x.id===c.id)[key]=Number(input.value)}));
   label.append(input);item.append(label);
  }
  field('START BAR (0 BASED)','startBar',0,63);field('BARS','bars',1,16);field('REPEATS','repeats',1,8);field('TRACK','track',0,3);
  const mute=document.createElement('button');mute.type='button';mute.className='mini-btn';mute.textContent=c.muted?'UNMUTE':'MUTE';mute.setAttribute('aria-pressed',String(c.muted));mute.addEventListener('click',()=>saveChange(d=>{d.clips.find(x=>x.id===c.id).muted=!c.muted}));item.append(mute);
  const dup=document.createElement('button');dup.type='button';dup.className='mini-btn';dup.textContent='DUPLICATE';dup.addEventListener('click',()=>saveChange(d=>{if(d.clips.length>=MAX_CLIPS)throw Error('32 clip limit');const original=d.clips.find(x=>x.id===c.id);const copy=clone(original);copy.id=clipId();copy.name=(copy.name+' copy').slice(0,28);copy.startBar=original.startBar+original.bars*original.repeats;d.clips.push(copy)}));item.append(dup);
  const del=document.createElement('button');del.type='button';del.className='mini-btn';del.textContent='REMOVE';del.addEventListener('click',()=>saveChange(d=>{d.clips=d.clips.filter(x=>x.id!==c.id)}));item.append(del);
  editor.append(item);
 }
 status();
}
function init(deps){
 api=deps;
 $('workspaceMeter').addEventListener('change',e=>{if(workspace().clips.length&&!confirm('Change timeline meter? Existing clips remain at their bar numbers, but their timing changes.')){render();return}saveChange(d=>{d.meter=e.target.value})});
 $('workspaceAddPattern').addEventListener('click',addPattern);
 $('workspaceAddPianola').addEventListener('click',addPianola);
 $('workspaceImportLegacy').addEventListener('click',importSections);
 $('workspaceAddTape').addEventListener('click',addTape);
 $('rollSendSong').addEventListener('click',addRoll);
 $('workspacePlay').addEventListener('click',play);$('workspaceStop').addEventListener('click',stop);
 $('workspaceExport').addEventListener('click',()=>renderAudio(false));
 $('workspaceTape').addEventListener('click',()=>renderAudio(true));
 $('workspaceUndo').addEventListener('click',()=>{if(!history.length)return;stop();state().songWorkspace=history.pop();api.markDirty();render()});
 render();
}
window.OP1Workspace={normalize,init,stop,render,get running(){return playback.running}};
})();
