import assert from 'node:assert/strict';
import {mkdirSync} from 'node:fs';
import {chromium} from 'playwright';
const browser=await chromium.launch({headless:true});
const folder='/tmp/mobile-blog-divider-shots';
mkdirSync(folder,{recursive:true});
let total=0;
try {
  for(const width of [320,375,430,600,750,751,1024,1280]) {
    const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});
    const errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    await page.goto('http://127.0.0.1:8784/blog/',{waitUntil:'domcontentloaded'});
    const data=await page.evaluate(()=>{
      const entry=document.querySelector('.blog-list:not(.archive-blog-list) .post-entry');
      const link=entry?.querySelector('.read-more');
      const es=getComputedStyle(entry),ls=getComputedStyle(link);
      return {padding:parseFloat(es.paddingBottom),margin:parseFloat(es.marginBottom),readMoreMargin:parseFloat(ls.marginBottom),border:es.borderBottomWidth,overflow:document.documentElement.scrollWidth>innerWidth+1};
    });
    assert.ok(data.border,'Divider remains present');
    if(width<=750) {
      assert.ok(Math.abs(data.padding-12)<1,'Mobile padding '+JSON.stringify(data));
      assert.ok(Math.abs(data.margin-20)<1,'Mobile margin '+JSON.stringify(data));
      assert.ok(data.readMoreMargin<1,'Mobile read more margin '+JSON.stringify(data));
    } else {
      assert.ok(data.padding>=23,'Desktop padding not changed '+JSON.stringify(data));
      assert.ok(data.margin>=31,'Desktop margin not changed '+JSON.stringify(data));
      assert.ok(data.readMoreMargin>=25,'Desktop read more margin not changed '+JSON.stringify(data));
    }
    assert.ok(!data.overflow,'No horizontal overflow at '+width);
    assert.deepEqual(errors,[],'No page errors at '+width);
    if([320,375,750,1280].includes(width)) {
      const entry=page.locator('.blog-list .post-entry').first();
      await entry.screenshot({path:folder+'/blog-post-'+width+'px.png'});
    }
    console.log('PASS '+width+'px '+JSON.stringify(data));
    total++;
    await page.close();
  }
  const page=await browser.newPage({viewport:{width:375,height:850}});
  await page.goto('http://127.0.0.1:8784/archive/2026/09/',{waitUntil:'domcontentloaded'});
  const archive=page.locator('.archive-blog-list .post-entry').first();
  assert.equal(await archive.count(),1);
  const v=await archive.evaluate(el=>({padding:getComputedStyle(el).paddingBottom,margin:getComputedStyle(el).marginBottom}));
  assert.ok(parseFloat(v.padding)>12,'Monthly archive unchanged');
  console.log('PASS monthly archive unaffected '+JSON.stringify(v));
  await page.close();

  // Footer checks against actual Jekyll output, including either side of
  // the 860px single-column breakpoint.
  for(const width of [320,375,600,750,860,861,1024,1280]) {
    const page=await browser.newPage({viewport:{width,height:950},reducedMotion:'reduce'});
    const errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    await page.goto('http://127.0.0.1:8784/blog/',{waitUntil:'domcontentloaded'});
    const result=await page.evaluate(()=>{
      const sidebar=document.querySelector('.sidebar');
      const last=sidebar.querySelector('.widget:last-of-type');
      const badgeWrap=document.querySelector('.site-footer .footer-badges');
      const br=document.querySelector('.site-footer .footer-badges + br');
      const details=document.querySelector('.site-footer .footer-details');
      const rule=document.querySelector('.site-footer .footer-rule');
      const badges=[...badgeWrap.querySelectorAll('img.footer-badge')];
      return {
        direction:getComputedStyle(document.querySelector('.site-content')).flexDirection,
        border:parseFloat(getComputedStyle(last).borderBottomWidth),
        brDisplay:getComputedStyle(br).display,
        marginTop:parseFloat(getComputedStyle(details).marginTop),
        gap:details.getBoundingClientRect().top - badgeWrap.getBoundingClientRect().bottom,
        footerRuleWidth:parseFloat(getComputedStyle(rule).borderTopWidth),
        count:badges.length,
        title:details.textContent.includes('Established February 2012'),
        overflow:document.documentElement.scrollWidth>innerWidth+1,
        paragraphCount:details.querySelectorAll(':scope > p').length,
        footerLineBreakCount:details.querySelectorAll('br').length,
        fullText:details.textContent.replace(/\s+/g,' ').trim(),
        dateText:details.querySelector('a[href="/changelog.txt"]')?.textContent?.trim(),
        dotAdjacent:details.querySelector('a[href="/changelog.txt"]')?.nextSibling?.textContent?.startsWith('.'),
        links:[...details.querySelectorAll('a')].map(a=>a.getAttribute('href')),
        counterCount:details.querySelectorAll('img[src="/assets/images/footer/counter.gif"]').length,
        paraMargin:getComputedStyle(details.querySelector('p')).margin,
        maxWidth:getComputedStyle(details).maxWidth,
        minWidth:getComputedStyle(details).minWidth
      };
    });
    assert.equal(result.paragraphCount,1,'Exactly one footer paragraph at '+width);
    assert.equal(result.footerLineBreakCount,0,'No forced line breaks at '+width);
    assert.equal(result.dotAdjacent,true,'Full stop directly follows date link at '+width);
    assert.ok(/\\b\\d{4}\\. You are visitor number/.test(result.fullText),'No space before date full stop at '+width+': '+result.fullText);
    assert.ok(result.fullText.endsWith('We are powered by GitHub Pages.'),'No Jekyll suffix at '+width+': '+result.fullText);
    assert.ok(!result.fullText.includes('and Jekyll'),'Jekyll removed at '+width);
    assert.deepEqual(result.links,['/changelog.txt','https://github.com/NixMcRetro/mcretro.net'],'Both links retained');
    assert.equal(result.counterCount,1,'Visitor counter preserved at '+width);
    assert.equal(result.paraMargin,'0px','No default paragraph margins at '+width);
    if(width<=860){
      assert.equal(result.maxWidth,'100%','Full footer text width on narrow screens');
      assert.equal(result.minWidth,'0px','No width minimum on narrow screens');
    }else{
      assert.equal(result.maxWidth,'80%','Desktop footer width retained');
      assert.equal(result.minWidth,'50%','Desktop footer minimum retained');
    }
    if(width<=860){
      assert.equal(result.direction,'column','Sidebar stacks at '+width);
      assert.equal(result.border,0,'Last thick sidebar rule removed at '+width+': '+JSON.stringify(result));
      assert.equal(result.brDisplay,'none','Redundant footer br hidden at '+width);
      assert.ok(result.marginTop>=8&&result.marginTop<=11,'Controlled margin after badges at '+width+': '+JSON.stringify(result));
      assert.ok(result.gap>=8&&result.gap<=15,'Compact badge-to-text gap at '+width+': '+JSON.stringify(result));
    }else{
      assert.equal(result.direction,'row','Desktop columns unchanged at '+width);
      assert.ok(result.border>=3.5,'Desktop sidebar rule retained at '+width);
      assert.notEqual(result.brDisplay,'none','Desktop footer spacing remains at '+width);
    }
    assert.equal(result.count,8,'All eight badges retained at '+width);
    assert.ok(result.footerRuleWidth>0,'Thin footer rule remains at '+width);
    assert.equal(result.title,true,'Footer copy preserved at '+width);
    assert.ok(!result.overflow,'No viewport overflow at '+width);
    assert.deepEqual(errors,[],'No JavaScript errors at '+width);
    if([320,375,750,860,861,1280].includes(width)){
      await page.locator('.sidebar').screenshot({path:folder+'/sidebar-'+width+'px.png'});
      await page.locator('.site-footer').screenshot({path:folder+'/footer-'+width+'px.png'});
    }
    console.log('PASS footer '+width+'px '+JSON.stringify(result));
    await page.close();
  }

  console.log('PASS all '+total+' blog viewport checks');
}finally{await browser.close()}
