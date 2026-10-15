/* v2.7.1 friendly performance keyboard. Existing synth/recording engine stays unchanged. */
(function(){
'use strict';
const $=id=>document.getElementById(id);
const sharps=new Set([1,3,6,8,10]);
const names=['C','C♯','D','D♯','E','F','F♯','G','G♯','A','A♯','B'];
const shortcuts=['Z','S','X','D','C','V','G','B','H','N','J','M','Q','2','W','3','E','R','5','T','6','Y','7','U'];
let view='compose',pressed=new Map(),classic=false,api=null,root=null;
function keyLabel(note){const status=api.status();const midi=48+note+status.octave*12;return names[midi%12]+(Math.floor(midi/12)-1)}
function stopAll(){
 for(const [id,n] of pressed)api.noteOff(n,id);
 pressed.clear();
 root?.querySelectorAll('.casio-key.down').forEach(b=>b.classList.remove('down'));
}
function keyPress(button,n,id){
 if(pressed.has(id))return;
 pressed.set(id,n);button.classList.add('down');api.noteOn(n,id);
}
function keyRelease(button,id){
 if(!pressed.has(id))return;
 const n=pressed.get(id);pressed.delete(id);button.classList.remove('down');api.noteOff(n,id);
}
function buildKeys(holder){
 for(let n=0,white=0;n<24;n++){
  const black=sharps.has(n%12),btn=document.createElement('button');
  btn.type='button';btn.className='casio-key '+(black?'black':'white');btn.dataset.casioNote=String(n);
  const label=document.createElement('span');label.className='casio-note-label';label.textContent=names[n%12];
  const shortcut=document.createElement('small');shortcut.className='casio-shortcut';shortcut.textContent=shortcuts[n];
  btn.append(label,shortcut);
  btn.style.setProperty('--white-position',String(white));
  if(!black){btn.style.left=(white*100/14)+'%';btn.style.width=(100/14)+'%';white++}
  else{btn.style.left='calc('+(white*100/14)+'% - 2.35%)';btn.style.width='4.7%'}
  const id='casio-pointer-'+n;
  btn.addEventListener('pointerdown',e=>{
   if(e.button!==0)return;
   e.preventDefault();
   btn.setPointerCapture(e.pointerId);keyPress(btn,n,id);
  });
  for(const event of ['pointerup','pointercancel','lostpointercapture'])btn.addEventListener(event,()=>keyRelease(btn,id));
  const keyboardId='casio-button-'+n;
  btn.addEventListener('keydown',e=>{if((e.key===' '||e.key==='Enter')&&!e.repeat){e.preventDefault();keyPress(btn,n,keyboardId)}});
  btn.addEventListener('keyup',e=>{if(e.key===' '||e.key==='Enter'){e.preventDefault();keyRelease(btn,keyboardId)}});
  holder.append(btn);
 }
}
function refresh(){
 if(!root)return;
 const state=api.status();
 $('casioCurrentSound').textContent=state.soundName;
 $('casioOctave').textContent='Octave '+(state.octave>=0?'+':'')+state.octave;
 $('casioBank').value=String(state.bank);
 $('casioPreset').value=String(state.preset);
 $('casioSoundName').textContent=state.bankName+' · '+state.soundName;
 root.querySelectorAll('.casio-key').forEach(b=>{
  const n=Number(b.dataset.casioNote),label=keyLabel(n);
  b.setAttribute('aria-label','Play '+label+' ('+shortcuts[n]+')');
  b.title=label+' · '+shortcuts[n]+' on your computer keyboard';
 });
 $('casioOctaveDown').disabled=state.octave<=-2;
 $('casioOctaveUp').disabled=state.octave>=2;
}
function populateSounds(){
 const banks=api.banks();
 const select=$('casioBank');
 banks.forEach((b,i)=>select.add(new Option(b.name,String(i))));
 function changeBank(bank,preferred=0){
  const target=banks[bank]||banks[0];
  $('casioPreset').replaceChildren();
  target.patches.forEach((name,i)=>$('casioPreset').add(new Option(name,String(i))));
  $('casioPreset').value=String(preferred);
 }
 $('casioBank').addEventListener('change',()=>{stopAll();changeBank(Number(select.value));api.chooseSound(Number(select.value),0);refresh()});
 $('casioPreset').addEventListener('change',()=>{stopAll();api.chooseSound(Number(select.value),Number($('casioPreset').value));refresh()});
 changeBank(api.status().bank,api.status().preset);
}
function selectTab(next){
 if(!root)return;
 const keyboard=next==='keyboard';
 if(!keyboard)stopAll();
 view=keyboard?'keyboard':'compose';
 $('makerComposerPanel').hidden=keyboard;
 $('casioKeyboardPanel').hidden=!keyboard;
 for(const [id,on] of [['makerTabCompose',!keyboard],['makerTabKeyboard',keyboard]]){
  const btn=$(id);btn.setAttribute('aria-selected',String(on));btn.tabIndex=on?0:-1;
 }
 if(keyboard)refresh();
}
function openClassic(open=true){
 if(open){
  stopAll();classic=true;document.documentElement.classList.remove('beginner-studio');
  window.OP1Simplified.setMode('advanced');
  $('casioReturn').hidden=false;return;
 }
 classic=false;window.OP1Simplified.setMode('simple');
 document.documentElement.classList.add('beginner-studio');
 $('casioReturn').hidden=true;selectTab(view);
 window.scrollTo?.({top:0,behavior:'instant'});
}
function init(deps){
 api=deps;root=$('musicMaker');if(!root)return;
 const content=document.createElement('div');content.id='makerComposerPanel';
 while(root.firstChild)content.append(root.firstChild);
 const nav=document.createElement('div');nav.className='casio-tabs';nav.setAttribute('role','tablist');nav.setAttribute('aria-label','Everyday music tools');
 nav.innerHTML='<button type="button" id="makerTabCompose" role="tab" aria-controls="makerComposerPanel" aria-selected="true">♫ Make Music</button><button type="button" id="makerTabKeyboard" role="tab" aria-controls="casioKeyboardPanel" aria-selected="false" tabindex="-1">🎹 Play Keyboard</button>';
 const panel=document.createElement('section');panel.id='casioKeyboardPanel';panel.className='casio-panel';panel.setAttribute('role','tabpanel');panel.setAttribute('aria-label','Casio-style playable keyboard');panel.hidden=true;
 panel.innerHTML='<div class="casio-top"><div><span class="casio-eyebrow">MY LITTLE KEYBOARD</span><h2>Pick a sound. Play some notes.</h2><p>A straightforward two-octave keyboard. Use your mouse, fingers, or the letter keys shown below.</p></div><strong id="casioCurrentSound" aria-live="polite"></strong></div>'+
 '<div class="casio-controls"><label>Sound bank<select id="casioBank" aria-label="Choose keyboard sound bank"></select></label><label>Instrument<select id="casioPreset" aria-label="Choose keyboard instrument"></select></label><div class="casio-octave"><span>Pitch</span><div><button type="button" id="casioOctaveDown" aria-label="Play lower notes">− Lower</button><strong id="casioOctave">Octave +0</strong><button type="button" id="casioOctaveUp" aria-label="Play higher notes">Higher +</button></div></div></div>'+
 '<div class="casio-case"><div class="casio-case-display"><span>CASIO-STYLE KEYS</span><strong id="casioSoundName"></strong><span>24 keys · 2 octaves</span></div><div id="casioKeys" class="casio-keybed" role="group" aria-label="Playable two-octave piano keyboard"></div></div>'+
 '<p class="casio-help">Tip: Z, X, C, V and nearby keys play notes. Black keys use S, D, G, H and J. Change Octave for lower bass or higher melodies. This plays your current synth; it does not replace any song or recording.</p>';
 const settings=document.createElement('details');settings.className='casio-more';settings.id='casioMore';
 settings.innerHTML='<summary>Need the original studio tools?</summary><p>The sequencers, synthesizer settings, tape recorder and MIDI editors still run underneath. Open the classic interface only when you need those controls.</p><button type="button" id="casioClassic">Open Classic Studio</button>';
 root.append(nav,content,panel,settings);
 const comeback=document.createElement('button');comeback.type='button';comeback.id='casioReturn';comeback.className='action';comeback.textContent='← BACK TO MUSIC MAKER';comeback.hidden=true;
 $('showHelp').before(comeback);
 comeback.addEventListener('click',()=>openClassic(false));
 $('casioClassic').addEventListener('click',()=>openClassic(true));
 $('makerAdvanced').textContent='Classic Studio';
 $('makerAdvanced').addEventListener('click',e=>{e.stopImmediatePropagation();openClassic(true)},true);
 $('makerTabCompose').addEventListener('click',()=>selectTab('compose'));
 $('makerTabKeyboard').addEventListener('click',()=>selectTab('keyboard'));
 nav.addEventListener('keydown',e=>{
  if(!['ArrowLeft','ArrowRight'].includes(e.key))return;
  e.preventDefault();const other=e.target.id==='makerTabCompose'?'makerTabKeyboard':'makerTabCompose';
  $(other).click();$(other).focus();
 });
 buildKeys($('casioKeys'));populateSounds();
 for(const [id,delta] of [['casioOctaveDown',-1],['casioOctaveUp',1]])$(id).addEventListener('click',()=>{stopAll();api.octave(delta);refresh()});
 window.addEventListener('blur',stopAll);
 document.addEventListener('visibilitychange',()=>{if(document.hidden)stopAll()});
 root.addEventListener('keydown',e=>{if(e.key==='Escape'){stopAll()}});
 // Current projects, synthesis, MIDI, sequence and tape runtime all stay mounted.
 if(document.documentElement.dataset.op1TestLegacy!=='true')document.documentElement.classList.add('beginner-studio');
 refresh();selectTab('compose');
}
window.OP1CasioKeyboard={init,refresh,selectTab,openClassic,get view(){return view},get classic(){return classic}};
})();