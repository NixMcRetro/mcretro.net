/* SuperNick's OP-1 Browser Lab v2.1: a focused studio UI, not a new project format. */
(function(){
'use strict';
const $=id=>document.getElementById(id);
const groups=[
 {name:'Sounds',tag:'01',intro:'Choose a sound, play the keyboard, or build a beat.',tools:[
  {id:'soundLibrary',name:'Sound Library',tab:'Play',hint:'Select one of the original synthesizer sounds. Then play the instrument keyboard.'},
  {id:'soundPanel',name:'Shape a Sound',tab:'Play',hint:'Adjust polyphony, warmth, brightness and synthesizer effects.'},
  {id:'sequencePanel',name:'Make a Beat',tab:'Drums',hint:'Build a 16-step drum pattern or choose another sequencer.'},
  {id:'comfortPlayPanel',name:'Getting Started',tab:'Play',hint:'A short introduction to the instrument, recording and exporting.'}]},
 {name:'Compose',tag:'02',intro:'Write a melody, record chords, and assemble your song.',tools:[
  {id:'rollPanel',name:'Piano Roll',tab:'Compose',hint:'Draw or record polyphonic notes, import MIDI, and send your score to Song Workspace.'},
  {id:'trackerStudio',name:'Tracker Studio',tab:'Compose',hint:'Four-channel pattern tracker, chains, note effects, MIDI/WAV and song arrangements.'},
  {id:'pianolaPanel',name:'Pianola',tab:'Compose',hint:'Enter a melody using written notes, rests and time signatures.'},
  {id:'songStudio',name:'Song Workspace',tab:'Song',hint:'Arrange piano, Pianola, drum and tape clips on four lanes. Legacy Song Arrangement is here too.'},
  {id:'synthScorePanel',name:'Synth Note Player',tab:'Compose',hint:'Play a saved melody through the selected instrument sound.'}]},
 {name:'Record & Mix',tag:'03',intro:'Record the instrument, adjust the four-track mix, and export audio.',tools:[
  {id:'comfortTapePanel',name:'Tape Studio',tab:'Tape',hint:'Record, edit and bounce notes or audio clips on four tape tracks.'},
  {id:'performancePanel',name:'Track Mixer',tab:'Tape',hint:'Adjust each tape track’s level, pan, mute and solo, or capture the live mix.'}]},
 {name:'Tools',tag:'04',intro:'Protect your work and set up offline access.',tools:[
  {id:'recoveryPanel',name:'Recovery & Backups',tab:'Tools',hint:'Make a portable project backup and inspect local recovery checkpoints.'},
  {id:'offlinePanel',name:'Offline & Install',tab:'Tools',hint:'Check your browser cache and learn how to install the app.'}]}
];
const all=groups.flatMap(g=>g.tools);
const GROUP_BY_TAB={Play:'Sounds',Drums:'Sounds',Compose:'Compose',Song:'Compose',Tape:'Record & Mix',Tools:'Tools'};
const KEY_MODE='op1-lab-layout-v21',KEY_TOOL='op1-lab-editor-v21';
let mode='simple',selected=all[0].id,busy=false,viewListener;
function store(k,v){try{localStorage.setItem(k,v)}catch(_){}}
function read(k){try{return localStorage.getItem(k)}catch(_){return null}}
function activeTool(){return all.find(t=>t.id===selected)||all[0]}
function getGroup(){return groups.find(g=>g.tools.some(t=>t.id===selected))||groups[0]}
function focusWorkspace(){const nav=$('studioMainNavigation');nav?.scrollIntoView({block:'start',behavior:'smooth'})}
function sync(){
 const tool=activeTool(),group=getGroup(),simple=mode==='simple';
 document.documentElement.classList.toggle('studio-simple',simple);
 document.documentElement.classList.toggle('studio-advanced',!simple);
 $('studioSimpleButton').setAttribute('aria-pressed',String(simple));
 $('studioAdvancedButton').setAttribute('aria-pressed',String(!simple));
 $('studioMainNavigation').hidden=!simple;
 $('studioToolNavigation').hidden=!simple;
 $('studioGuide').hidden=!simple;
 $('studioAdvancedNote').hidden=simple;
 $('studioModeDescription').textContent=simple?'Simple: focus on one tool at a time. All music features remain available.':'Advanced: all six original workspaces and full instrument shortcuts.';
 for(const button of document.querySelectorAll('[data-studio-group]')){
  const on=button.dataset.studioGroup===group.name;button.setAttribute('aria-selected',String(on));button.tabIndex=on?0:-1;
 }
 const sub=$('studioToolNavigation');sub.replaceChildren();
 for(const t of group.tools){
  const b=document.createElement('button');b.type='button';b.textContent=t.name;b.dataset.studioTool=t.id;
  b.setAttribute('aria-pressed',String(t.id===selected));
  b.title=t.hint;
  b.addEventListener('click',()=>selectTool(t.id,{scroll:false}));sub.append(b);
 }
 for(const panel of document.querySelectorAll('.below [data-comfort-tab]')){
  panel.classList.toggle('studio-current',simple&&panel.id===selected);
 }
 $('studioCurrentHeading').textContent=group.name+' / '+tool.name;
 $('studioCurrentHelp').textContent=tool.hint;
 const steps=group.name==='Sounds'?['Try a few presets, or build a drum pattern.','Compose a melody when ready.']:
  group.name==='Compose'?['Use Piano Roll for chords, or Pianola for a single-note melody.','Use SEND TO SONG, then arrange your clips in Song Workspace.']:
  group.name==='Record & Mix'?['Choose a tape track before recording.','Mix your levels, then EXPORT WAV or SAVE PROJECT.']:
  ['Save a portable project JSON after recording.','Offline storage helps, but a downloaded backup is safer.'];
 $('studioGuideSteps').replaceChildren(...steps.map(t=>{const p=document.createElement('span');p.textContent=t;return p}));
 const next=$('studioNextStep');
 if(group.name==='Sounds'){next.textContent='NEXT: COMPOSE →';next.hidden=false}
 else if(group.name==='Compose'){next.textContent=tool.id==='songStudio'?'NEXT: RECORD & MIX →':'NEXT: SONG WORKSPACE →';next.hidden=false}
 else if(group.name==='Record & Mix'){next.textContent='NEXT: BACK UP →';next.hidden=false}
 else next.hidden=true;
}
function selectTool(id,{scroll=false}={}){
 const tool=all.find(t=>t.id===id);
 if(!tool)return;
 selected=id;store(KEY_TOOL,id);
 busy=true;window.OP1Comfort.chooseTab(tool.tab);busy=false;
 sync();
 if(scroll)focusWorkspace();
}
function selectGroup(name,{scroll=false}={}){
 const group=groups.find(g=>g.name===name);
 if(!group)return;
 const target=group.tools.find(t=>t.id===selected)||group.tools[0];
 selectTool(target.id,{scroll});
}
function setMode(next){
 mode=next==='advanced'?'advanced':'simple';store(KEY_MODE,mode);
 if(mode==='simple')selectTool(selected);else{sync();const t=activeTool();window.OP1Comfort.chooseTab(t.tab)}
 sync();
}
function onLegacyTab(tab){
 if(busy)return;
 const group=groups.find(g=>g.name===GROUP_BY_TAB[tab]);
 if(!group)return;
 selected=group.tools.find(t=>t.tab===tab)?.id||group.tools[0].id;
 store(KEY_TOOL,selected);sync();
}
function initPrimaryNav(){
 const main=document.createElement('nav');main.className='studio-main-navigation';main.id='studioMainNavigation';main.setAttribute('aria-label','Simple studio stages');
 const header=document.createElement('div');header.className='studio-heading';
 header.innerHTML='<strong>YOUR MUSIC STUDIO</strong><span>Choose a stage. The keyboard stays ready to play.</span>';
 main.append(header);
 const row=document.createElement('div');row.className='studio-stage-row';row.setAttribute('role','tablist');row.setAttribute('aria-label','Music-making stages');
 for(const g of groups){
  const b=document.createElement('button');b.type='button';b.dataset.studioGroup=g.name;b.setAttribute('role','tab');
  b.innerHTML='<span class="studio-stage-number">'+g.tag+'</span><strong>'+g.name+'</strong><small>'+g.intro+'</small>';
  b.addEventListener('click',()=>selectGroup(g.name));
  b.addEventListener('keydown',e=>{if(e.key!=='ArrowLeft'&&e.key!=='ArrowRight')return;e.preventDefault();
   const step=e.key==='ArrowRight'?1:-1;const i=groups.indexOf(g),next=groups[(i+step+groups.length)%groups.length];selectGroup(next.name);row.querySelector('[data-studio-group="'+next.name+'"]').focus();
  });
  row.append(b);
 }
 main.append(row);
 const detail=document.createElement('div');detail.className='studio-detail';
 detail.innerHTML='<div class="studio-detail-head"><strong>WORKSPACE</strong><span>Select one editor, or switch to Advanced for all the original panels.</span></div><div class="studio-tool-navigation" id="studioToolNavigation" role="group" aria-label="Choose a focused editor"></div>';
 main.append(detail);
 const guide=document.createElement('section');guide.className='studio-guide';guide.id='studioGuide';
 guide.innerHTML='<div class="studio-guide-heading"><div><strong id="studioCurrentHeading"></strong><p id="studioCurrentHelp"></p></div><button type="button" id="studioNextStep">NEXT →</button></div><div class="studio-guide-steps" id="studioGuideSteps"></div>';
 main.append(guide);
 const next=guide.querySelector('#studioNextStep');next.addEventListener('click',()=>{
  const group=getGroup().name;if(group==='Sounds')selectGroup('Compose',{scroll:true});
  else if(group==='Compose')activeTool().id==='songStudio'?selectGroup('Record & Mix',{scroll:true}):selectTool('songStudio',{scroll:true});
  else if(group==='Record & Mix')selectGroup('Tools',{scroll:true});
 });
 $('comfortTabs').before(main);
}
function initToolbar(){
 const controls=document.createElement('div');controls.className='studio-mode-bar';controls.id='studioModeBar';
 controls.innerHTML='<div><strong>STUDIO LAYOUT</strong><p id="studioModeDescription"></p></div><div class="studio-layout-choice" role="group" aria-label="Studio layout"><button type="button" id="studioSimpleButton">SIMPLE</button><button type="button" id="studioAdvancedButton">ADVANCED</button></div>';
 $('comfortTabs').before(controls);
 $('studioSimpleButton').addEventListener('click',()=>setMode('simple'));
 $('studioAdvancedButton').addEventListener('click',()=>setMode('advanced'));
 const advanced=document.createElement('p');advanced.id='studioAdvancedNote';advanced.className='studio-advanced-note';
 advanced.textContent='Advanced shows every panel in each original workspace. Select SIMPLE to focus on one editor.';
 $('comfortTabs').after(advanced);
}
function initQuickActions(){
 const bar=document.createElement('div');bar.className='studio-shortcuts';bar.id='studioShortcuts';
 bar.innerHTML='<button type="button" id="studioDemo">♫ BROWSE DEMOS</button><button type="button" id="studioMidi" aria-expanded="false" aria-controls="comfortMidiEntry">♫ IMPORT MIDI</button><button type="button" id="studioArrange">▦ SONG WORKSPACE</button><button type="button" id="studioMix">◫ MIXER</button><button type="button" id="studioBackup">⬇ SAVE BACKUP</button><button type="button" id="studioKeyboardHelp" aria-expanded="false" aria-controls="studioShortcutHelp">? SHORTCUTS</button><div id="studioShortcutHelp" hidden>Play notes with Z, S, X and the keyboard labels. Press ← / → for octaves when not editing. Space controls tape playback. Ctrl/Cmd + Z undoes applicable edits. The full guide remains in the top menu.</div>';
 $('studioModeBar').after(bar);
 $('studioDemo').addEventListener('click',()=>$('comfortDemoOpen').click());
 $('studioMidi').addEventListener('click',()=>{
  const picker=$('comfortMidiEntry'),open=!picker.classList.contains('studio-midi-open');
  picker.classList.toggle('studio-midi-open',open);$('studioMidi').setAttribute('aria-expanded',String(open));
  if(open){if(mode==='simple')selectTool('rollPanel');else window.OP1Comfort.chooseTab('Compose');
   $('comfortMidiDestination').focus();picker.scrollIntoView({block:'center',behavior:'smooth'});
  }else $('studioMidi').focus();
 });
 $('studioArrange').addEventListener('click',()=>{if(mode==='simple')selectTool('songStudio',{scroll:true});else window.OP1Comfort.chooseTab('Song')});
 $('studioMix').addEventListener('click',()=>{if(mode==='simple')selectTool('performancePanel',{scroll:true});else window.OP1Comfort.chooseTab('Tape')});
 $('studioBackup').addEventListener('click',()=>$('saveProject').click());
 $('studioKeyboardHelp').addEventListener('click',()=>{const help=$('studioShortcutHelp'),show=help.hidden;help.hidden=!show;$('studioKeyboardHelp').setAttribute('aria-expanded',String(show))});
}
function initPanelLinks(){
 // A direct, non-destructive path from the first editor into an arrangement.
 const row=document.createElement('div');row.className='studio-compose-flow';
 row.innerHTML='<strong>WHAT NEXT?</strong><span>Finished a melody? Send it to the Song Workspace using the existing editor controls, then arrange the clips together.</span><button type="button" id="studioGoSong">OPEN SONG WORKSPACE →</button>';
 $('rollPanel')?.append(row);
 $('studioGoSong').addEventListener('click',()=>selectTool('songStudio',{scroll:true}));
 const links=document.createElement('div');links.className='studio-compose-flow';
 links.innerHTML='<strong>MAKE A FULL SONG</strong><span>To preserve your Pianola melody as an arrangement clip, open Song Workspace and select + PIANOLA SCORE.</span><button type="button" id="studioPianolaToSong">OPEN SONG WORKSPACE →</button>';
 $('pianolaPanel')?.append(links);
 $('studioPianolaToSong').addEventListener('click',()=>selectTool('songStudio',{scroll:true}));
}
function init(){
 if(!$('comfortTabs')||!window.OP1Comfort)return;
 initToolbar();initPrimaryNav();initQuickActions();initPanelLinks();
 window.addEventListener('op1:tabchange',e=>onLegacyTab(e.detail?.tab));
 const remembered=read(KEY_TOOL);
 if(remembered&&all.some(t=>t.id===remembered))selected=remembered;
 mode=read(KEY_MODE)==='advanced'?'advanced':'simple';
 setMode(mode);
}
window.OP1Simplified={init,selectTool,selectGroup,setMode,getMode:()=>mode,getTool:()=>selected};
})();
