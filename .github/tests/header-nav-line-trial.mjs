import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

const read = path => readFileSync(new URL('../../' + path, import.meta.url), 'utf8');
const script = read('assets/js/confetti.js');
const nav = read('assets/js/mobile-navigation.js');
const files = [
  '/homepages/sonic/images/swalk.gif',
  '/homepages/sonic/images/twalk.gif',
  '/homepages/sonic/images/trun.gif',
  '/homepages/sonic/images/srun.gif',
  '/assets/images/about/0CATRUNY.gif'
];

function fixture({ width=1280, pathname='/', reducedMotion=false, random=0, navRect=null }={}) {
  const nodes=[], timeouts=[], listeners=new Map(), menuListeners=new Map();
  const rect=navRect || {left:40,top:130,right:1240,width:1200,height:50};
  const navElem={
    getBoundingClientRect() { return rect; },
    setAttribute(k,v) { this[k]=v; },
    getAttribute(k) { return this[k]??null; },
    contains() { return false; }
  };
  const toggle={
    setAttribute(k,v){this[k]=v;},
    getAttribute(k){return this[k]??null;},
    classList:{toggle(){},remove(){}},
    addEventListener(k,fn){menuListeners.set(k,fn);},
    focus(){}
  };
  const doc={
    querySelector(q){return {
      '.main-nav':navElem,
      '.nav-toggle':toggle,
      '[data-nav]':navElem,
      '#random-post-link':{}
    }[q]??null;},
    addEventListener(k,fn){listeners.set(k,fn);},
    createElement(tag){
      const el={
        tag,attrs:{},vars:new Map(),children:[],handlers:new Map(),removed:false,
        classList:{classes:new Set(),add(c){this.classes.add(c)},contains(c){return this.classes.has(c)}},
        style:{setProperty(k,v){el.vars.set(k,v)}},
        setAttribute(k,v){this.attrs[k]=v;},
        getAttribute(k){return this.attrs[k]??null;},
        appendChild(child){this.children.push(child);},
        addEventListener(k,fn){this.handlers.set(k,fn);},
        fire(k){this.handlers.get(k)?.();},
        remove(){this.removed=true;}
      };
      return el;
    },
    body:{appendChild(node){nodes.push(node)}}
  };
  const math=Object.create(Math); math.random=()=>random;
  const env={
    document:doc,
    window:{
      innerWidth:width,location:{pathname},
      matchMedia(q){
        if(q==='(prefers-reduced-motion: reduce)')return {matches:reducedMotion};
        if(q==='(max-width: 750px)')return {matches:width<=750};
        throw Error('Unexpected media query '+q);
      }
    },
    Math:math,
    setTimeout(fn,delay){timeouts.push({fn,delay});}
  };
  runInNewContext(nav,env);
  runInNewContext(script,env);
  listeners.get('DOMContentLoaded')?.();
  return {nodes,timeouts,toggle,navElem,menuListeners,doc};
}

function spriteFor(f){
  assert.equal(f.nodes.length,1);
  const lane=f.nodes[0];
  assert.equal(lane.classList.contains('header-runner-lane'),true);
  assert.equal(lane.getAttribute('aria-hidden'),'true');
  assert.equal(lane.children.length,1);
  const sprite=lane.children[0];
  assert.equal(sprite.tag,'img');
  assert.equal(sprite.alt,'');
  assert.equal(sprite.classList.contains('header-runner-sprite'),true);
  assert.ok(files.includes(sprite.src));
  return {lane,sprite};
}

test('all five original GIFs are present and remain referenced',()=>{
  for(const f of files){
    const data=readFileSync(new URL('../../'+f.slice(1),import.meta.url));
    assert.match(data.subarray(0,6).toString(),/^GIF8[79]a$/);
    assert.ok(script.includes("'"+f+"'"));
  }
});

test('one desktop homepage sprite follows measured nav top line',()=>{
  const f=fixture();
  const {sprite}=spriteFor(f);
  assert.equal(sprite.vars.get('--runner-start-x'),'-70px');
  assert.equal(sprite.vars.get('--runner-end-x'),'1350px');
  // 48px sprite feet touch navigation border at y=130.
  assert.equal(sprite.vars.get('--runner-y'),'82px');
  assert.equal(parseFloat(sprite.style.animationDuration),8.5);
  assert.equal(f.timeouts[0].delay,9500);
});

test('geometry responds to the main-nav box at other desktop widths',()=>{
  const f=fixture({width:800,navRect:{left:25,top:175,right:775,width:750,height:46}});
  const {sprite}=spriteFor(f);
  assert.equal(sprite.vars.get('--runner-start-x'),'-85px');
  assert.equal(sprite.vars.get('--runner-end-x'),'885px');
  assert.equal(sprite.vars.get('--runner-y'),'127px');
});

test('selects each of five GIFs; walking has lower speed than running',()=>{
  const times=[];
  for(let i=0;i<5;i++){
    const {sprite}=spriteFor(fixture({width:800,random:(i+0.5)/5,
      navRect:{left:25,top:175,right:775,width:750,height:46}}));
    assert.equal(sprite.src,files[i]);
    times.push(parseFloat(sprite.style.animationDuration));
  }
  assert.ok(times[0]>times[2]);
  assert.ok(times[1]>times[3]);
});

test('only / and /index.html get a desktop welcome',()=>{
  spriteFor(fixture({pathname:'/index.html'}));
  for(const pathname of ['/blog/','/about/','/goodies/']){
    assert.equal(fixture({pathname}).nodes.length,0);
  }
});

test('mobile nav and homepage never animate, including hamburger open/close',()=>{
  for(const width of [320,375,600,750]){
    const f=fixture({width});
    assert.equal(f.nodes.length,0);
    f.menuListeners.get('click')?.({stopPropagation(){}});
    assert.equal(f.navElem.getAttribute('data-nav'),'open');
    assert.equal(f.nodes.length,0);
    f.menuListeners.get('click')?.({stopPropagation(){}});
    assert.equal(f.nodes.length,0);
  }
  spriteFor(fixture({width:751}));
});

test('reduced motion prevents animation, non-visible nav does not animate',()=>{
  assert.equal(fixture({reducedMotion:true}).nodes.length,0);
  assert.equal(fixture({navRect:{left:0,top:130,right:0,width:0,height:50}}).nodes.length,0);
});

test('cleanup on completion and interrupted timeout',()=>{
  const f=fixture();
  const {lane,sprite}=spriteFor(f);
  sprite.fire('animationend');
  assert.equal(lane.removed,true);
  const f2=fixture();
  f2.timeouts[0].fn();
  assert.equal(f2.nodes[0].removed,true);
});

test('CSS aligns a 48px sprite, hides motion for mobile/reduced motion, no star effects',()=>{
  const css=read('assets/css/style.css');
  assert.match(css, /\.header-runner-sprite\s*\{/);
  assert.match(css, /height:\s*48px/);
  assert.match(css, /image-rendering:\s*pixelated/);
  assert.match(css, /overflow:\s*hidden/);
  assert.match(css, /@keyframes header-runner-cross/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.ok(!css.includes('.pride-star-particle'));
  assert.ok(!script.includes('burstFromMenu'));
  assert.ok(!script.includes('random-post-link'));
});
