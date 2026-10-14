// Validate demo music and effect defaults without relying on subjective loudness.
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const source=readFileSync('homepages/op-1/comfort.js','utf8');
assert(source.includes('function configureDemoGraph'));
const code=source.replace(/\}\)\(\);\s*$/, "api={snapshotPatch:()=>({env:{},fx:{},lfo:{}})};window.__demos={MELODIES,patched,configureDemoGraph,demoSongClips};})();");
assert(code!==source,'Cannot inject isolated demo audit');
const sandbox={window:{},structuredClone,console,Date,Math};
vm.runInNewContext(code,sandbox);
vm.runInNewContext(readFileSync('homepages/op-1/workspace.js','utf8'),sandbox);
const {MELODIES,patched,configureDemoGraph,demoSongClips}=sandbox.window.__demos;
assert.equal(MELODIES.length,10);
assert.deepEqual(Array.from(new Set(MELODIES.map(d=>d.category))).sort(),['Drums','Synth','Tape']);
let totalNotes=0;
for(const d of MELODIES){
 assert.equal(d.bars,8,d.name+' should be an arranged eight-bar miniature');
 const beatsPerBar={'4/4':4,'6/8':3}[d.meter],duration=d.bars*beatsPerBar*60/d.bpm;
 assert(duration<59,d.name+' exceeds tape duration');
 const partNames=new Set();
 for(const part of d.parts){
  assert(!partNames.has(part.name),'Duplicate part name');partNames.add(part.name);
  assert(part.notes.length>8,'Musical part too short');
  for(const n of part.notes){
   assert(Number.isInteger(n.midi)&&n.midi>=36&&n.midi<=95,'Pitch outside supported import range');
   assert(n.velocity>=1&&n.velocity<=127,'Invalid note velocity');
   assert(n.beats>=.25&&n.beats<=16,'Note outside song workspace timing range');
   assert(n.start>=0&&n.start+n.beats<=d.bars*beatsPerBar+.001,'Note crosses clip boundary');
   totalNotes++;
  }
  if(part.type==='synth')assert(![6,7].includes(patched(part.voice).wave),'Unwanted bright FM timbre');
 }
 const clips=demoSongClips(d,0);
 assert(clips.length<=32,'Demo exceeds workspace clip limit');
 const saved=sandbox.window.OP1Workspace.normalize({meter:d.meter,clips});
 assert.equal(saved.clips.length,clips.length,'Workspace silently discarded demo parts');
 const drums=d.parts.filter(p=>p.type==='drum').flatMap(p=>p.notes);
 if(drums.length){const steps=clips.filter(c=>c.kind==='pattern').reduce((sum,c)=>sum+c.pattern.filter(n=>n!==null).length,0);assert.equal(steps,drums.length,'Overlapping drum hits lost during import');}
 console.log('PASS',d.name,d.parts.length,'parts',clips.length,'clips',Math.round(duration),'seconds');
}
const gain=()=>({gain:{value:1}});
const graph={delay:{delayTime:{value:0}},feedback:gain(),wet:gain(),chorusSend:gain(),roomSend:gain(),roomWet:gain(),tone:gain(),body:gain(),satDry:gain(),satWet:gain(),output:gain(),trackBuses:[gain(),gain(),gain(),gain()],trackPanners:Array.from({length:4},()=>({pan:{value:0}}))};
configureDemoGraph(graph);
assert(graph.delay.delayTime.value>=.12,'Demo delay still zero');
assert(graph.feedback.gain.value<=.15,'Demo delay feedback is not constrained');
assert(graph.wet.gain.value<=.15&&graph.output.gain.value<=.65,'Demo mix too loud');
assert(graph.tone.gain.value<0,'Demo high shelf not softened');
console.log('PASS safe audio graph and',totalNotes,'notes across 10 original demos');
