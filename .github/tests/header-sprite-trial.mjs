import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

const load = path => readFileSync(new URL('../../' + path, import.meta.url), 'utf8');
const code = load('assets/js/confetti.js');
const nav = load('assets/js/mobile-navigation.js');
const images = [
  '/homepages/sonic/images/swalk.gif',
  '/homepages/sonic/images/twalk.gif',
  '/homepages/sonic/images/trun.gif',
  '/homepages/sonic/images/srun.gif',
  '/assets/images/about/0CATRUNY.gif'
];
function fixture({ width = 1280, path = '/', reduced = false, random = 0 } = {}) {
  const appended = [], timers = [];
  let observer = null;
  function el(rect = { left:0, top:0, width:0, height:0, right:0 }) {
    const listeners = new Map(), attrs = new Map(), classNames = new Set();
    const vars = new Map();
    const element = {
      rect, vars, children: [], listeners, removed:false,
      style: { setProperty(k,v) { vars.set(k, v); } },
      classList: {
        add(n) { classNames.add(n); },
        remove(n) { classNames.delete(n); },
        toggle(n,on) { if(on) classNames.add(n); else classNames.delete(n); },
        contains(n) { return classNames.has(n); }
      },
      appendChild(e) { this.children.push(e); },
      addEventListener(type,fn) { listeners.set(type, [...(listeners.get(type)||[]),fn]); },
      fire(type,event={}) { for (const f of listeners.get(type)||[]) f(event); },
      setAttribute(key,value) {
        attrs.set(key,String(value));
        if (observer?.target === element && key === 'aria-expanded') observer.callback();
      },
      getAttribute(key) { return attrs.get(key) ?? null; },
      getBoundingClientRect() { return rect; },
      contains(node) { return node === element; },
      remove() { this.removed = true; },
      focus() { this.fire('focus'); }
    };
    return element;
  }
  const logo = el({left:55, top:23, width:1000, height:80, right:1055});
  // Actual glyph bounds are much narrower than the flex-column link box.
  logo.textBounds = {left:70,top:23,width:300,height:44,right:370};
  const menu = el({left:280,top:22,width:44,height:44,right:324});
  const randomLink = el({left:400,top:100,width:100,height:30,right:500});
  const navigation = el();
  menu.setAttribute('aria-expanded','false');
  navigation.setAttribute('data-nav','');
  const doc = el();
  doc.querySelector = selector => ({
    '.site-logo':logo, '.nav-toggle':menu,
    '#random-post-link': randomLink, '[data-nav]': navigation
  })[selector]||null;
  doc.createRange = () => ({
    selectNodeContents(target) { this.target = target; },
    getBoundingClientRect() { return this.target.textBounds; }
  });
  doc.createElement = () => el();
  doc.body = { appendChild(child) { appended.push(child); } };
  const m = Object.create(Math);
  m.random = () => random;
  const context = {
    document:doc,
    window:{
      innerWidth:width, location:{pathname:path},
      matchMedia(q) {
        if(q === '(prefers-reduced-motion: reduce)') return {matches:reduced};
        if(q === '(max-width: 750px)') return {matches:width<=750};
        throw Error('Unexpected media query '+q);
      }
    },
    Math:m,
    MutationObserver:class {
      constructor(callback) { this.callback=callback;observer=this; }
      observe(target,options) {
        assert.deepEqual([...options.attributeFilter],['aria-expanded']);
        this.target=target;
      }
    },
    setTimeout(fn,delay) { timers.push({fn,delay}); }
  };
  // Include the real navigation script, proving opening/closing is unaffected.
  runInNewContext(nav,context);
  runInNewContext(code,context);
  doc.fire('DOMContentLoaded');
  return {appended,timers,logo,menu,randomLink,navigation,doc};
}

function onlySprite(f) {
  assert.equal(f.appended.length,1);
  const lane=f.appended[0];
  assert.equal(lane.classList.contains('header-runner-lane'),true);
  assert.equal(lane.getAttribute('aria-hidden'),'true');
  assert.equal(lane.children.length,1);
  const sprite=lane.children[0];
  assert.equal(sprite.classList.contains('header-runner-sprite'),true);
  assert.equal(sprite.alt,'');
  assert.ok(images.includes(sprite.src),sprite.src);
  assert.equal(sprite.vars.get('--runner-start-x'),'386px');
  assert.equal(sprite.vars.get('--runner-end-x'),'1400px');
  assert.equal(sprite.vars.get('--runner-y'),'21px');
  const d=parseFloat(sprite.style.animationDuration);
  assert.ok(d>=3.5 && d<=8.5);
  assert.equal(f.timers[0].delay,9500);
  return {lane,sprite,d};
}
test('all five unchanged GIF files exist and have GIF headers', () => {
  for(const src of images) {
    const bytes=readFileSync(new URL('../../'+src.slice(1),import.meta.url));
    assert.match(bytes.subarray(0,6).toString('ascii'),/^GIF8[79]a$/);
    assert.ok(bytes.readUInt16LE(6)>0);
    assert.ok(bytes.readUInt16LE(8)>0);
  }
});

test('desktop / launches one GIF to the right of rendered title, not one Pride burst', () => {
  const f=fixture();
  const {lane,sprite}=onlySprite(f);
  f.randomLink.fire('mouseenter');
  f.randomLink.fire('focus');
  f.logo.fire('mouseenter');
  f.menu.fire('click',{stopPropagation(){}});
  assert.equal(f.appended.length,1);
  sprite.fire('animationend');
  assert.equal(lane.removed,true);
});

test('one of five sprites chosen across deterministic random values', () => {
  for(let i=0;i<5;i++){
    const f=fixture({random:i/5+0.01});
    const {sprite,d}=onlySprite(f);
    assert.equal(sprite.src,images[i]);
    if(i<=1) assert.ok(d>=8,'walking should be slower');
    else assert.ok(d<=5,'running should be faster');
  }
});

test('mobile homepage has no animation at 320, 375, 600 or 750px, even opening menu', () => {
  for(const width of [320,375,600,750]) {
    const f=fixture({width});
    assert.equal(f.appended.length,0);
    f.menu.fire('click',{stopPropagation(){}});
    assert.equal(f.navigation.getAttribute('data-nav'),'open');
    assert.equal(f.menu.getAttribute('aria-expanded'),'true');
    assert.equal(f.appended.length,0);
    f.menu.fire('click',{stopPropagation(){}});
    assert.equal(f.navigation.getAttribute('data-nav'),'');
    assert.equal(f.appended.length,0);
  }
});

test('751px breakpoint uses desktop sprite and no Random stars', () => {
  const f=fixture({width:751});
  assert.equal(f.appended.length,1);
  assert.equal(f.appended[0].classList.contains('header-runner-lane'),true);
  f.randomLink.fire('mouseenter');
  assert.equal(f.appended.length,1);
});

test('inner pages never auto-run and mobile menu remains animation-free', () => {
  const d=fixture({path:'/blog/',width:1280});
  const m=fixture({path:'/about/',width:375});
  assert.equal(d.appended.length,0);
  assert.equal(m.appended.length,0);
  d.randomLink.fire('mouseenter');
  m.menu.fire('click',{stopPropagation(){}});
  assert.equal(d.appended.length,0);
  assert.equal(m.appended.length,0);
});

test('index.html equivalent homepage, reduced motion blocks the runner', () => {
  onlySprite(fixture({path:'/index.html'}));
  const desktop=fixture({reduced:true});
  assert.equal(desktop.appended.length,0);
  const mobile=fixture({reduced:true,width:375});
  mobile.menu.fire('click',{stopPropagation(){}});
  assert.equal(mobile.appended.length,0);
});

test('runner cleanup fallback and original CSS plus layout remain intact', () => {
  const f=fixture();
  const {lane}=onlySprite(f);
  f.timers[0].fn();
  assert.equal(lane.removed,true);
  const css=load('assets/css/style.css');
  const layout=load('_layouts/default.html');
  assert.match(css,/\.header-runner-lane\s*\{/);
  assert.match(css,/overflow:\s*hidden/);
  assert.match(css,/@keyframes header-runner-cross/);
  assert.match(css,/image-rendering:\s*pixelated/);
  assert.match(css,/prefers-reduced-motion:\s*reduce/);
  assert.ok(!css.includes('.pride-star-particle'));
  assert.ok(!css.includes('@keyframes pride-star-burst'));
  assert.ok(!code.includes('burstFromMenu'));
  assert.ok(!code.includes('MutationObserver'));
  assert.ok(layout.includes("'/assets/js/confetti.js' | relative_url"));
  assert.ok(!code.includes("querySelector('#random-post-link')"));
});
