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
  console.log('PASS all '+total+' blog viewport checks');
}finally{await browser.close()}
