import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

const read = path => readFileSync(new URL('../../' + path, import.meta.url), 'utf8');
const config = read('_config.yml');
const post = read('_layouts/post.html');
const blog = read('blog/index.html');
const sidebar = read('_includes/sidebar.html');
const css = read('assets/css/style.css');
const code = read('assets/js/rotating-tag-cloud.js');
const search = read('assets/js/search-page.js');

test('post and blog metadata display original categories as plain text', () => {
  for(const text of [post,blog]) {
    assert.match(text, /<span class="category-label">Categories:<\/span>/);
    assert.match(text, /\{\{\s*site\.data\.categories\[cat\]\s*\|\s*default:\s*cat\s*\}\}/);
    assert.match(text, /\{% unless forloop\.last %\},\s*\{% endunless %\}/);
    assert.ok(!text.includes('href="/category/'));
  }
  assert.match(post, /<div class="post-meta" data-pagefind-ignore="all">/);
});

test('Jekyll generates monthly but not category archive pages', () => {
  assert.match(config, /jekyll-archives:[\s\S]*enabled:\s*\n\s*- month/);
  assert.ok(!/\n\s+- categories\s*\n/.test(config));
  assert.ok(!/category: ['"]\/category\//.test(config));
  assert.match(config, /month: '\/archive\/:year\/:month\/'/);
  assert.ok(!sidebar.includes('data-url="/category/'));
  assert.match(sidebar, /data-count="\{\{ count \}\}"/);
});

test('site search is unchanged and remains above the cloud', () => {
  assert.match(sidebar, /class="widget search-widget"/);
  assert.ok(sidebar.indexOf('search-widget') < sidebar.indexOf('tag-cloud-container'));
  assert.match(sidebar, /action="\/search\/"/);
  assert.ok(!sidebar.includes('Search posts'));
  assert.match(search, /new PagefindUI/);
  assert.match(post, /data-pagefind-ignore="all"/);
});

test('cloud preserves size weighting and animation, without links or visible counts', () => {
  assert.match(code, /0\.8 \+ item\.count \/ maxCount/);
  assert.match(code, /createElement\('span'\)/);
  assert.ok(!code.includes("createElement('a')"));
  assert.ok(!code.includes('.href ='));
  assert.ok(!code.includes('.dataset.url'));
  assert.ok(!code.includes('item.name} ('));
  assert.match(code, /requestAnimationFrame\(animate\)/);
  assert.match(code, /prefers-reduced-motion: reduce/);
  assert.match(css, /\.rotating-tag\s*\{/);
  assert.match(css, /pointer-events:\s*none/);
  assert.ok(!css.includes('.rotating-tag:hover'));
});

function cloudFixture(reduced=false){
  const events=new Map(), listeners=new Map(), elements=[], requested=[];
  const items=[{dataset:{name:'Sega Saturn',count:'20'}},{dataset:{name:'Macintosh',count:'5'}},{dataset:{name:'YouTube',count:'0'}}];
  function tag(){
    const style={removeProperty(){}};
    return {tagName:'SPAN',style,dataset:{},textContent:'',className:'',href:undefined,
      setAttribute(k,v){this[k]=v;},removeAttribute(k){delete this[k]}};
  }
  const container={
    offsetWidth:300,offsetHeight:180,
    appendChild(el){elements.push(el);},
    addEventListener(k,fn){listeners.set(k,fn);},
    contains(){return false;},
    classList:{classes:new Set(),toggle(k,b){if(b)this.classes.add(k);else this.classes.delete(k);}}
  };
  const list={querySelectorAll(selector){assert.equal(selector,'li');return items;}};
  const doc={
    hidden:false,
    getElementById(k){return k==='tag-cloud-container'?container:k==='tag-data'?list:null;},
    createElement(k){assert.equal(k,'span');return tag();},
    addEventListener(k,fn){events.set(k,fn);}
  };
  const motion={matches:reduced,addEventListener(){}};
  const math=Object.create(Math);math.random=()=>0.25;
  const env={document:doc,window:{matchMedia(){return motion},addEventListener(){}},
    Math:math,requestAnimationFrame(fn){requested.push(fn);return requested.length;},
    cancelAnimationFrame(){}};
  runInNewContext(code,env);
  events.get('DOMContentLoaded')();
  return {elements,requested,container,motion,listeners};
}

test('live cloud renders name-only SPAN elements and weighted sizes',()=>{
  const {elements,requested}=cloudFixture(false);
  assert.equal(elements.length,2);
  assert.deepEqual(elements.map(x=>x.textContent),['Sega Saturn','Macintosh']);
  assert.ok(elements.every(x=>x.tagName==='SPAN' && x.href===undefined));
  assert.equal(elements[0].style.fontSize,'1.8rem');
  assert.equal(elements[1].style.fontSize,'1.05rem');
  assert.ok(elements.every(x=>typeof x.style.transform==='string'));
  assert.ok(requested.length>0,'animation should be scheduled');
});

test('reduced motion shows static name-only cloud, without scheduled rotation',()=>{
  const {elements,requested,container}=cloudFixture(true);
  assert.deepEqual(elements.map(x=>x.textContent),['Sega Saturn','Macintosh']);
  assert.equal(requested.length,0);
  assert.ok(container.classList.classes.has('tag-cloud-static'));
  assert.ok(elements.every(x=>x.href===undefined));
});
