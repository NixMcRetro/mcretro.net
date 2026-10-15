/* v2.8: record two-bar riffs through the existing synth and tracker. */
(function(){
'use strict';
const $=id=>document.getElementById(id),PARTS=['Drums','Bass','Chords','Melody'];
const lengths=[.5,1,2,4],cap=(x,a,b)=>Math.max(a,Math.min(b,x));
let phase='idle',take=null,interval=null,review=null,undoReady=false,auditioning=false;
function quantize(events,startAtMs,bpm,inst=0){
 const cells=Array(32).fill(null),step=60000/bpm/4;
 if(!Array.isArray(events)||!Number.isFinite(startAtMs)||!Number.isFinite(step)||step<=0)return cells;
 for(const e of events.filter(e=>e&&Number.isInteger(e.midi)&&e.midi>=36&&e.midi<=95&&Number.isFinite(e.startMs)&&Number.isFinite(e.endMs)).sort((a,b)=>a.startMs-b.startMs)){
  const row=Math.round((e.startMs-startAtMs)/step);
  if(row<0||row>=32||cells[row])continue;
  const held=cap((Math.max(e.endMs,e.startMs+step*.15)-e.startMs)/step,.4,4);
  const length=lengths.reduce((best,v)=>Math.abs(v-held)<Math.abs(best-held)?v:best,1);
  cells[row]={midi:e.midi,inst:cap(Math.round(inst),0,7),kind:'synth',vel:95,fx:'none',param:0,length,chance:100};
 }
 return cells;
}
function say(msg){if($('riffStatus').textContent!==msg)$('riffStatus').textContent=msg}
function buttons(){
 const busy=phase==='countin'||phase==='recording',ready=phase==='review';
 $('riffRecord').disabled=busy||ready;$('riffRecord').textContent=busy?'● Recording…':'● Record Two Bars';
 $('riffStop').disabled=!busy;
 for(const id of ['riffTry','riffKeep'])$(id).disabled=!ready||!review?.cells.some(Boolean);
 $('riffRetry').disabled=!ready;$('riffDiscard').disabled=!(busy||ready);$('riffUndo').disabled=!undoReady;
 for(const id of ['riffPart','riffSection'])$(id).disabled=busy||ready;
}
function refresh(){
 if(!$('riffSection'))return;
 const choices=window.OP1Tracker?.musicMakerSectionChoices?.()||[],select=$('riffSection'),selected=select.value;
 if(choices.length!==select.options.length||choices.some((x,i)=>select.options[i]?.value!==String(x.index)||select.options[i]?.textContent!==x.name)){
  select.replaceChildren(...choices.map(x=>new Option(x.name,String(x.index))));
  if(choices.some(x=>String(x.index)===selected))select.value=selected;
 }
 if(!choices.length&&phase==='idle')say('Generate a song first, then return here to record your own riff.');
}
function stopClock(){if(interval!==null)clearInterval(interval);interval=null}
function complete(){
 if(phase!=='countin'&&phase!=='recording')return;
 stopClock();
 const now=performance.now();
 for(const e of take.active.values())take.events.push({...e,endMs:now});
 take.active.clear();window.OP1Tracker.stop();
 const cells=quantize(take.events,take.startAtMs,take.bpm,take.inst);
 review={cells,section:take.section,ch:take.ch};phase='review';take=null;
 const count=cells.filter(Boolean).length;
 say(count?'Captured '+count+' note(s). Listen, Keep, Retry or Discard. Your song is still unchanged.':'No notes were captured. Retry or Discard.');
 buttons();
 if(!$('casioKeyboardPanel').hidden)$('riffRecorder').scrollIntoView({block:'nearest',behavior:'instant'});
}
function tick(){
 if(!take)return;
 const now=performance.now();
 if(now>=take.finishAtMs){complete();return}
 if(now<take.startAtMs){
  phase='countin';say('Count in: '+cap(Math.ceil((take.startAtMs-now)/(60000/take.bpm)),1,4)+' · Play when the backing starts.');
 }else{
  phase='recording';const bar=cap(Math.floor((now-take.startAtMs)/(60000/take.bpm*4))+1,1,2);
  say('● Recording bar '+bar+' of 2 · Play a simple riff!');
 }
 buttons();
}
function begin(){
 if(phase==='recording'||phase==='countin')return;
 refresh();
 const ch=Number($('riffPart').value),section=Number($('riffSection').value);
 const target=window.OP1Tracker.musicMakerRecordingTarget(section,ch);
 if(!target.ok){say(target.reason);return}
 const timing=window.OP1Tracker.startMusicMakerBacking(section,ch);
 if(!timing){say('Unable to start. Stop song playback or export, then enable audio and try again.');return}
 review=null;undoReady=false;auditioning=false;
 take={section,ch,inst:timing.inst,bpm:timing.bpm,startAtMs:timing.startAtMs,finishAtMs:timing.finishAtMs,events:[],active:new Map()};
 phase='countin';buttons();tick();interval=setInterval(tick,45);
 $('casioKeys').scrollIntoView({block:'center',behavior:'instant'});
}
function noteOn(note,id,octave){
 if(!take||!(phase==='countin'||phase==='recording')||take.active.has(id))return;
 const now=performance.now(),midi=48+Number(note)+Number(octave)*12;
 if(now<take.startAtMs||now>=take.finishAtMs||!Number.isInteger(midi)||midi<36||midi>95)return;
 take.active.set(id,{midi,startMs:now});
}
function noteOff(note,id){
 if(!take||!take.active.has(id))return;
 const event=take.active.get(id);take.active.delete(id);
 take.events.push({...event,endMs:Math.min(performance.now(),take.finishAtMs)});
}
function discard(){
 if(take){stopClock();window.OP1Tracker.stop();take=null}
 if(auditioning){window.OP1Tracker.cancelMusicMakerRecordingPreview();auditioning=false}
 review=null;phase='idle';say('Take discarded. Your song is unchanged. Press Record to try again.');buttons();
}
function listen(){
 if(!review)return;
 auditioning=window.OP1Tracker.previewMusicMakerRecording(review.section,review.ch,review.cells);
 say(auditioning?'Playing the proposed riff in your song. Use Stop Song to finish. Nothing is saved yet.':'Stop other playback or exports before listening.');
}
function keep(){
 if(phase!=='review'||!review?.cells.some(Boolean))return;
 if(auditioning){window.OP1Tracker.cancelMusicMakerRecordingPreview();auditioning=false}
 const {section,ch,cells}=review;
 if(!window.OP1Tracker.applyMusicMakerRecording(section,ch,cells)){say('Could not save. Stop other recording or playback and try Keep again.');return}
 review=null;phase='idle';undoReady=true;
 say('Your riff is saved in '+PARTS[ch]+'. Press Play Song to hear it or Undo Take to restore the previous part.');
 buttons();window.OP1MusicMaker?.refresh?.();
}
function undoTake(){
 if(!undoReady||phase!=='idle')return;
 window.OP1Tracker.undo();undoReady=false;say('Take undone. Previous notes restored.');buttons();
}
function init(){
 const keyboard=$('casioKeyboardPanel');if(!keyboard)return;
 const area=document.createElement('section');area.id='riffRecorder';area.className='riff-recorder';area.setAttribute('aria-label','Record keyboard notes into your song');
 area.innerHTML='<div class="riff-title"><span>v2.8 · PLAY IT, KEEP IT</span><h3>Record your own riff</h3><p>Four beats count you in. Play along for two bars, then decide whether to keep it.</p></div>'+
 '<div class="riff-choices"><label>Record which part?<select id="riffPart"><option value="3">Melody</option><option value="1">Bass</option><option value="2">Chords (arpeggio)</option></select></label><label>Where in the song?<select id="riffSection"></select></label></div>'+
 '<div class="riff-buttons"><button type="button" id="riffRecord" class="maker-primary">● Record Two Bars</button><button type="button" id="riffStop" disabled>■ Stop Take</button><button type="button" id="riffTry" disabled>▶ Listen to Take</button><button type="button" id="riffKeep" disabled>✓ Keep</button><button type="button" id="riffRetry" disabled>↻ Retry</button><button type="button" id="riffDiscard" disabled>Discard</button><button type="button" id="riffUndo" disabled>↶ Undo Take</button></div>'+
 '<p id="riffStatus" aria-live="polite" role="status">Generate a song, choose a part, then press Record. Nothing changes until you Keep the take.</p>'+
 '<p class="riff-note">The other parts play as your backing. The saved riff stays editable in Tracker Studio and uses the song part’s instrument. Each two-bar phrase repeats if the section loops.</p>';
 keyboard.querySelector('.casio-case').before(area);
 $('riffRecord').addEventListener('click',begin);$('riffStop').addEventListener('click',complete);
 $('riffTry').addEventListener('click',listen);$('riffKeep').addEventListener('click',keep);
 $('riffRetry').addEventListener('click',()=>{discard();begin()});
 $('riffDiscard').addEventListener('click',discard);$('riffUndo').addEventListener('click',undoTake);
 document.addEventListener('visibilitychange',()=>{if(document.hidden&&take)complete()});
 window.addEventListener('blur',()=>{if(take)complete()});
 window.addEventListener('pagehide',stopClock);
 refresh();buttons();
}
window.OP1RiffRecorder={init,refresh,quantize,noteOn,noteOff,cancel:discard,finish:complete,get phase(){return phase}};
})();