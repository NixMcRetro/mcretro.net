/* BleepGarden Tracker Corner: visible access to the original engine, not another studio. */
(function(){
'use strict';
const $=id=>document.getElementById(id);
let root=null;
function status(message){if($('makerTrackerStatus'))$('makerTrackerStatus').textContent=message}
function refresh(){
 if(!root)return;
 const tracker=window.OP1Tracker.musicMakerSnapshot(),list=$('makerPatternList'),previous=list.value;
 if(list.options.length!==tracker.patterns.length){
  list.replaceChildren(...tracker.patterns.map((pat,i)=>{
   const count=pat.cells.filter(Boolean).length;
   return new Option('Pattern '+(i+1)+' · '+pat.rows+' steps · '+count+' notes',String(i));
  }));
  list.value=tracker.patterns.some((_,i)=>String(i)===previous)?previous:String(tracker.active);
 }
 $('makerGroove').value=String(tracker.swing);
 $('makerTrackerInfo').textContent=tracker.patterns.length+' pattern'+(tracker.patterns.length===1?'':'s')+' · '+tracker.chain.length+' chain positions · '+tracker.bpm+' BPM · four channels';
 const mode=window.OP1Tracker.transport.mode;
 $('makerPatternPreview').textContent=mode==='live'?'■ Stop Pattern':'▶ Hear Pattern';
 $('makerPatternPreview').setAttribute('aria-pressed',String(mode==='live'));
 $('makerPatternPreview').disabled=!!window.OP1RiffRecorder&&['countin','recording','review'].includes(window.OP1RiffRecorder.phase);
}
function init(){
 const composer=$('makerComposerPanel');if(!composer)return;
 root=document.createElement('details');root.id='makerTrackerCorner';root.className='maker-tracker-corner';
 root.innerHTML='<summary>🎛 Tracker Corner · Patterns & Groove</summary>'+
 '<div class="maker-tracker-content"><p>Here are the original tracker tools that make those retro, keygen-style tunes possible. You still have four independent musical channels; this is just a simpler way in.</p>'+
 '<strong id="makerTrackerInfo">Four musical channels</strong>'+
 '<div class="maker-tracker-fields"><label>Choose a pattern<select id="makerPatternList" aria-label="Choose a tracker pattern to preview"></select></label><label>Groove<select id="makerGroove"><option value="0">Straight timing</option><option value="12">Light swing</option><option value="25">Laid-back shuffle</option><option value="36">Deep shuffle</option></select></label></div>'+
 '<div class="maker-tracker-actions"><button type="button" id="makerPatternPreview" aria-pressed="false">▶ Hear Pattern</button><button type="button" id="makerOpenTracker">Open Full Tracker Editor</button><button type="button" id="makerTrackerDemos">Browse Tracker Demos</button></div>'+
 '<p id="makerTrackerStatus" role="status" aria-live="polite">Preview patterns and change the timing without editing notes. The full tracker has step effects, instrument choices, pattern chaining, performance pads and more.</p>'+
 '<p class="maker-tracker-footnote">Pattern preview loops one pattern, unlike Play Song, which follows your song arrangement. Groove affects tracker timing and is saved with your project. Undo Change restores it.</p></div>';
 const panel=$('makerFinishPanel');if(panel)panel.before(root);else composer.append(root);
 $('makerGroove').addEventListener('change',e=>{
  const ok=window.OP1Tracker.setMusicMakerSwing(Number(e.target.value));
  status(ok?'Groove saved! The timing changes for your tracker song, without changing its notes.':'Stop playback and recording before changing groove.');
  refresh();
 });
 $('makerPatternPreview').addEventListener('click',()=>{
  const tracker=window.OP1Tracker,mode=tracker.transport.mode;
  if(mode==='live'){tracker.stop();status('Pattern preview stopped.');}
  else{
   if(tracker.playing)tracker.stop();
   tracker.launch(Number($('makerPatternList').value));
   status('Previewing a pattern through the original tracker. Press Stop Pattern when finished; Play Song returns to your arrangement.');
  }
  refresh();
 });
 function openOriginalTracker(showDemos){
  if(window.OP1Tracker.playing)window.OP1Tracker.stop();
  // The full 18-demo library lives inside the original studio, which the
  // beginner-first CSS otherwise keeps tucked away.
  window.OP1CasioKeyboard?.openClassic?.(true);
  window.OP1Simplified.selectTool('trackerStudio',{scroll:true});
  if(showDemos)window.OP1Tracker.openLibrary();
 }
 $('makerOpenTracker').addEventListener('click',()=>openOriginalTracker(false));
 $('makerTrackerDemos').addEventListener('click',()=>openOriginalTracker(true));
 root.addEventListener('toggle',()=>{if(root.open)refresh()});
 refresh();
}
window.OP1TrackerCorner={init,refresh};
})();