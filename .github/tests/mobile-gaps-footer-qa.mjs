import assert from 'node:assert/strict';
import {mkdirSync} from 'node:fs';
import {chromium} from 'playwright';

const base='http://127.0.0.1:8784';
const out='/tmp/mobile-gaps-footer-review';
mkdirSync(out,{recursive:true});
const browser=await chromium.launch({headless:true});
let cases=0;
try {
  for(const width of [320,375,402,430,600,750,751,860,861,1024,1280]) {
    const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});
    const errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    await page.goto(base+'/blog/',{waitUntil:'domcontentloaded'});
    const state=await page.evaluate(()=>{
      const list=document.querySelector('.blog-list:not(.archive-blog-list)');
      const entries=[...list.querySelectorAll(':scope > .post-entry')];
      const first=entries[0];
      const next=entries[1];
      const read=first.querySelector('.read-more');
      const firstEnd=first.getBoundingClientRect().bottom;
      const nextTop=next.querySelector('h2').getBoundingClientRect().top;
      const readEnd=read.getBoundingClientRect().bottom;
      const style=getComputedStyle(first);
      const lines=[...document.querySelectorAll('.site-footer .footer-detail-line')];
      const details=document.querySelector('.site-footer .footer-details');
      const aside=document.querySelector('aside.sidebar');
      const content=document.querySelector('main.content-area');
      return {
        divider:style.borderBottomWidth,
        padding:parseFloat(style.paddingBottom),
        margin:parseFloat(style.marginBottom),
        before:firstEnd-readEnd,
        after:nextTop-firstEnd,
        sidebarGap:aside.getBoundingClientRect().top-content.getBoundingClientRect().bottom,
        stack:getComputedStyle(document.querySelector('.site-content')).flexDirection,
        rowGap:getComputedStyle(document.querySelector('.site-content')).rowGap,
        textDisplays:lines.map(n=>getComputedStyle(n).display),
        textAlign:getComputedStyle(details).textAlign,
        maxWidth:getComputedStyle(details).maxWidth,
        lineCount:lines.length,
        content:details.textContent.replace(/\s+/g,' ').trim(),
        counter:details.querySelectorAll('img[src="/assets/images/footer/counter.gif"]').length,
        links:[...details.querySelectorAll('a')].map(x=>x.getAttribute('href')),
        overflow:document.documentElement.scrollWidth>innerWidth+1
      };
    });
    assert.ok(parseFloat(state.divider)>0,'Blog divider remains at '+width);
    assert.equal(state.lineCount,3,'All three footer sentences');
    assert.equal(state.counter,1,'Visitor counter still present');
    assert.ok(state.content.includes('We are powered by GitHub Pages.'),'GitHub Pages remains');
    assert.deepEqual(state.links,['/changelog.txt','https://github.com/NixMcRetro/mcretro.net']);
    assert.ok(!state.overflow,'No horizontal overflow at '+width);
    if(width<=750) {
      assert.ok(Math.abs(state.padding-16)<1,'16px above divider at '+width+': '+JSON.stringify(state));
      assert.ok(Math.abs(state.margin-16)<1,'16px after divider at '+width+': '+JSON.stringify(state));
      assert.ok(Math.abs(state.before-state.after)<10,'Visual blog dividers nearly symmetric at '+width+': '+JSON.stringify(state));
    } else {
      assert.ok(state.padding>=23,'Original desktop blog padding at '+width);
      assert.ok(state.margin>=31,'Original desktop blog margin at '+width);
    }
    if(width<=860) {
      assert.equal(state.stack,'column','Single column at '+width);
      assert.ok(state.sidebarGap>=19&&state.sidebarGap<=21,'About 20px before stacked sidebar at '+width+': '+JSON.stringify(state));
      assert.deepEqual(state.textDisplays,['inline','inline','inline'],'Footer flows naturally at '+width);
      assert.equal(state.maxWidth,'100%','Footer text uses available width at '+width);
    } else {
      assert.equal(state.stack,'row','Desktop columns at '+width);
      assert.deepEqual(state.textDisplays,['block','block','block'],'Three footer lines on desktop '+width);
      assert.equal(state.maxWidth,'80%','Desktop footer max width retained at '+width);
      assert.equal(state.textAlign,'center','Footer centred at '+width);
    }
    assert.deepEqual(errors,[],'No browser errors at '+width);
    if([320,402,750,860,861,1280].includes(width)){
      await page.locator('.blog-list .post-entry').first().screenshot({path:out+'/blog-first-'+width+'.png'});
      await page.locator('.site-footer').screenshot({path:out+'/footer-'+width+'.png'});
    }
    console.log('PASS BLOG '+width+'px '+JSON.stringify(state));
    cases++;
    await page.close();
  }
  for(const width of [320,402,600,750,860,861,1280]) {
    const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});
    const errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    await page.goto(base+'/still-dialling-in-my-head/',{waitUntil:'domcontentloaded'});
    const info=await page.evaluate(()=>{
      const nav=document.querySelector('.post-navigation');
      const aside=document.querySelector('.sidebar');
      const main=document.querySelector('main.content-area');
      const r=nav.getBoundingClientRect();
      return {
        nav:r.height,
        prev:nav.querySelector('.nav-previous .nav-title')?.textContent.trim(),
        next:nav.querySelector('.nav-next .nav-title')?.textContent.trim(),
        sidebarGap:aside.getBoundingClientRect().top-main.getBoundingClientRect().bottom,
        overflow:document.documentElement.scrollWidth>innerWidth+1
      }
    });
    assert.ok(info.nav>20,'Previous/Next area exists');
    assert.ok(info.prev&&info.next,'Both navigation links retained');
    if(width<=860) assert.ok(info.sidebarGap>=19&&info.sidebarGap<=21,'Single article stacked sidebar ~20px at '+width+': '+JSON.stringify(info));
    assert.ok(!info.overflow,'No single article overflow '+width);
    assert.deepEqual(errors,[],'No JS errors on single article at '+width);
    if([402,750,860,861,1280].includes(width)){
      await page.locator('main.content-area').screenshot({path:out+'/post-nav-'+width+'.png'});
    }
    console.log('PASS POST '+width+'px '+JSON.stringify(info));
    cases++;
    await page.close();
  }
  console.log('PASS '+cases+' responsive combinations');
} finally { await browser.close(); }
