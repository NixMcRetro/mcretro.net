/* v2.8 Stage 3: arrange the song with plain-language sections. Existing tracker is the engine. */
(function(){
'use strict';
const $=id=>document.getElementById(id);
const ROLES=['Intro','Verse','Chorus','Break','Outro','Part'];
const LENGTHS=[16,32,64,128];
let root=null,selected=0,dragFrom=null,lastSignature='',lastFeedback='';
const barText=rows=>{const bars=rows/16;return bars+' bar'+(bars===1?'':'s')};
function message(value){lastFeedback=value;const status=$('makerSectionsStatus');if(status)status.textContent=value}
function currentSnapshot(){return window.OP1Tracker.musicMakerSnapshot()}
function focusSelection(){
 const x=String(selected);
 if($('makerEasySection')&&[...$('makerEasySection').options].some(o=>o.value===x))$('makerEasySection').value=x;
 if($('riffSection')&&[...$('riffSection').options].some(o=>o.value===x))$('riffSection').value=x;
}
function choose(index){
 const size=currentSnapshot().arrangement.length;
 selected=Math.max(0,Math.min(size-1,index));
 focusSelection();refresh();
}
function mutate(action,index=selected,value=null){
 const snapshot=currentSnapshot(),n=snapshot.arrangement.length;
 if(action==='delete'&&!confirm('Remove this section from your song? Its original patterns and notes will not be deleted. Use Undo Latest Change to restore it.'))return false;
 if(action==='delete'&&n===0)return false;
 if((action==='add'||action==='duplicate')&&n>=64){message('The song already has the maximum 64 sections.');return false}
 if(action==='rows'){
  const difference=value-snapshot.arrangement[index].rows,rows=snapshot.arrangement.reduce((sum,x)=>sum+x.rows,0);
  if(rows+difference>4096){message('That would exceed the song arrangement length limit. Shorten another section first.');return false}
 }
 const ok=window.OP1Tracker.musicMakerArrange(action,index,value);
 if(!ok){message('Could not change the song. Stop playback or recording first; for longer arrangements, try shorter sections.');return false}
 const size=currentSnapshot().arrangement.length;
 if(action==='duplicate'||action==='add')selected=index>=0&&n>0?index+1:0;
 else if(action==='move')selected=value;
 else if(action==='delete')selected=Math.max(0,Math.min(size-1,index));
 else selected=index;
 message('Song updated. Your notes, recordings and other studios are unchanged. Undo Latest Change restores the previous arrangement.');
 focusSelection();lastSignature='';refresh();window.OP1MusicMaker?.refresh?.();window.OP1RiffRecorder?.refresh?.();
 return true;
}
function button(title,text,click,disabled=false,klass=''){
 const el=document.createElement('button');el.type='button';el.title=title;el.setAttribute('aria-label',title);
 el.textContent=text;el.disabled=disabled;if(klass)el.className=klass;
 el.addEventListener('click',click);return el;
}
function renderCard(item,index,busy){
 const card=document.createElement('div');card.className='maker-section-card';
 card.dataset.section=String(index);card.dataset.role=(item.label||'Part').toLowerCase();
 card.setAttribute('role','listitem');
 const name=item.label||'Part',active=selected===index;
 const chooseButton=button('Select '+name+' section '+(index+1),'',()=>choose(index),false,'maker-section-select');
 chooseButton.dataset.songSelect=String(index);chooseButton.setAttribute('aria-pressed',String(active));
 chooseButton.setAttribute('aria-current',active?'true':'false');
 chooseButton.draggable=!busy;
 const position=document.createElement('span');position.className='maker-section-number';position.textContent='SECTION '+(index+1);
 const title=document.createElement('strong');title.textContent=name;
 const length=document.createElement('small');length.textContent=barText(item.rows);
 chooseButton.append(position,title,length);
 const tools=document.createElement('div');tools.className='maker-section-card-tools';
 tools.append(
  button('Move '+name+' section earlier','←',()=>mutate('move',index,index-1),busy||index===0),
  button('Move '+name+' section later','→',()=>mutate('move',index,index+1),busy||index===currentSnapshot().arrangement.length-1)
 );
 card.classList.toggle('selected',active);card.append(chooseButton,tools);return card;
}
function refresh(){
 if(!root)return;
 const snapshot=currentSnapshot(),sections=snapshot.arrangement;
 if(selected>=sections.length)selected=Math.max(0,sections.length-1);
 const busy=window.OP1Tracker.playing||window.OP1Tracker.recordingArrangement;
 const current=window.OP1Tracker.activeSection;
 const signature=JSON.stringify([sections,snapshot.bpm,selected,busy,current]);
 if(signature===lastSignature)return;
 lastSignature=signature;
 const list=$('makerSectionCards');list.replaceChildren();
 sections.forEach((section,index)=>{
  const card=renderCard(section,index,busy);
  card.classList.toggle('playing',index===current&&busy);
  list.append(card);
 });
 $('makerSectionsEmpty').hidden=sections.length>0;
 const rows=sections.reduce((n,x)=>n+x.rows,0),seconds=rows*60/snapshot.bpm/4;
 const duration=Math.floor(seconds/60)+':'+String(Math.floor(seconds%60)).padStart(2,'0');
 $('makerSectionsSummary').textContent=sections.length?sections.length+' section'+(sections.length===1?'':'s')+' · '+duration+' total':'No song sections yet';
 const over=seconds>180;
 $('makerSectionsLimit').hidden=!over;
 const available=sections.length>0&&!busy;
 $('makerSectionAdd').disabled=busy||sections.length>=64;
 $('makerSectionUndo').disabled=busy||!window.OP1Tracker.canUndo;
 $('makerSectionRecord').disabled=!available;
 $('makerSectionChange').disabled=!available;
 for(const id of ['makerSectionRole','makerSectionLength','makerSectionDuplicate','makerSectionDelete'])$(id).disabled=!available;
 $('makerSectionBefore').disabled=!available||selected===0;
 $('makerSectionAfter').disabled=!available||selected===sections.length-1;
 const chosen=sections[selected];
 if(chosen){
  $('makerSectionRole').value=chosen.label||'Part';
  const dropdown=$('makerSectionLength'),found=LENGTHS.includes(chosen.rows);
  dropdown.replaceChildren(...LENGTHS.map(n=>new Option(barText(n),String(n))));
  if(!found)dropdown.add(new Option(barText(chosen.rows)+' (current)',String(chosen.rows)));
  dropdown.value=String(chosen.rows);
 }
 $('makerSectionAdd').textContent=sections.length?'＋ Add After Selected':'＋ Add First Section';
 if(lastFeedback&&$('makerSectionsStatus').textContent!==lastFeedback)$('makerSectionsStatus').textContent=lastFeedback;
}
function init(){
 const composer=$('makerComposerPanel');if(!composer||!window.OP1Tracker)return;
 root=document.createElement('section');root.id='makerSongSections';root.className='maker-song-sections';root.setAttribute('aria-label','Visual song sections');
 root.innerHTML='<div class="maker-section-heading"><div><span>SONG SECTIONS</span><h3>Put your song together</h3><p>Tap a section to edit it. Drag to reorder on desktop, or use the arrows. No pattern numbers needed.</p></div><strong id="makerSectionsSummary">No song sections yet</strong></div>'+
 '<div id="makerSectionCards" class="maker-section-cards" role="list" aria-label="Song arrangement in playback order"></div>'+
 '<p id="makerSectionsEmpty" class="maker-section-empty">Generate a song, then arrange its Intro, Verse, Chorus and Outro here. You can also add the current pattern as a section.</p>'+
 '<div class="maker-section-tools"><label>Selected section role<select id="makerSectionRole">'+ROLES.map(s=>'<option value="'+s+'">'+s+'</option>').join('')+'</select></label><label>How long?<select id="makerSectionLength"></select></label><div class="maker-section-actions"><button type="button" id="makerSectionBefore">← Earlier</button><button type="button" id="makerSectionAfter">Later →</button><button type="button" id="makerSectionDuplicate">＋ Copy</button><button type="button" id="makerSectionDelete">Remove</button></div></div>'+
 '<div class="maker-section-next"><button type="button" id="makerSectionAdd">＋ Add First Section</button><button type="button" id="makerSectionChange">♫ Change This Part</button><button type="button" id="makerSectionRecord">● Record Here</button><button type="button" id="makerSectionUndo">↶ Undo Latest Change</button></div>'+
 '<p id="makerSectionsLimit" class="maker-section-limit" hidden>This arrangement is over three minutes. Save your editable project, or shorten the song before exporting WAV.</p>'+
 '<p id="makerSectionsStatus" role="status" aria-live="polite">Changes use the existing song and preserve your other recordings. A copied section shares the same music until you edit its notes.</p>';
 const anchor=$('makerStatus');if(anchor)anchor.after(root);else composer.prepend(root);
 $('makerSectionRole').addEventListener('change',e=>mutate('label',selected,e.target.value));
 $('makerSectionLength').addEventListener('change',e=>mutate('rows',selected,Number(e.target.value)));
 $('makerSectionBefore').addEventListener('click',()=>mutate('move',selected,selected-1));
 $('makerSectionAfter').addEventListener('click',()=>mutate('move',selected,selected+1));
 $('makerSectionDuplicate').addEventListener('click',()=>mutate('duplicate'));
 $('makerSectionDelete').addEventListener('click',()=>mutate('delete'));
 $('makerSectionAdd').addEventListener('click',()=>mutate('add',selected));
 $('makerSectionUndo').addEventListener('click',()=>{window.OP1Tracker.undo();selected=Math.min(selected,currentSnapshot().arrangement.length-1);lastSignature='';message('Undid the latest tracker or song edit.');refresh()});
 $('makerSectionChange').addEventListener('click',()=>{focusSelection();$('.maker-easy')?.scrollIntoView({block:'center',behavior:'smooth'});$('makerEasyDirection')?.focus({preventScroll:true})});
 $('makerSectionRecord').addEventListener('click',()=>{
  focusSelection();window.OP1CasioKeyboard?.selectTab('keyboard');
  window.OP1RiffRecorder?.refresh?.();if($('riffSection'))$('riffSection').value=String(selected);
  $('riffRecorder')?.scrollIntoView({block:'start',behavior:'smooth'});
 });
 $('makerSectionCards').addEventListener('dragstart',e=>{
  const control=e.target.closest('[data-song-select]');
  if(!control||window.OP1Tracker.playing)return;
  dragFrom=Number(control.dataset.songSelect);
  if(e.dataTransfer){e.dataTransfer.effectAllowed='move';e.dataTransfer.setData('text/plain','song-section-'+dragFrom)}
 });
 $('makerSectionCards').addEventListener('dragover',e=>{
  if(dragFrom===null||!e.target.closest('.maker-section-card'))return;
  e.preventDefault();if(e.dataTransfer)e.dataTransfer.dropEffect='move';
 });
 $('makerSectionCards').addEventListener('drop',e=>{
  const target=e.target.closest('.maker-section-card');if(!target||dragFrom===null)return;
  e.preventDefault();const to=Number(target.dataset.section),from=dragFrom;dragFrom=null;
  if(to!==from)mutate('move',from,to);
 });
 $('makerSectionCards').addEventListener('dragend',()=>{dragFrom=null});
 $('makerEasySection')?.addEventListener('change',e=>{selected=Number(e.target.value);lastSignature='';refresh()});
 refresh();
}
window.OP1SongSections={init,refresh,select:choose,get selected(){return selected}};
})();
