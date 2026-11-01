import assert from 'node:assert/strict';
import {mkdirSync} from 'node:fs';
import {chromium} from 'playwright';
const browser=await chromium.launch({headless:true});
const output='/tmp/xtide-quote-table-previews';
mkdirSync(output,{recursive:true});
const pageURL='http://127.0.0.1:8784/disk-on-modules-and-the-xtide-bios-on-the-sega-teradrive/';
try{
  for(const width of [320,375,402,430,600,750,860,861,1024,1280]){
    const page=await browser.newPage({viewport:{width,height:920},deviceScaleFactor:1,reducedMotion:'reduce'});
    const pageErrors=[];
    page.on('pageerror',e=>pageErrors.push(e.message));
    const response=await page.goto(pageURL,{waitUntil:'domcontentloaded'});
    assert.equal(response.status(),200,'XTIDE article rendered '+width);
    const quote=page.locator('.post-full .post-content blockquote').first();
    const table=page.locator('.post-full .post-content table').first();
    assert.equal(await quote.count(),1,'Quote exists '+width);
    assert.equal(await table.count(),1,'Table exists '+width);
    const data=await page.evaluate(()=>{
      const article=document.querySelector('.post-full .post-content');
      const quote=article.querySelector('blockquote');
      const table=article.querySelector('table');
      const rectQ=quote.getBoundingClientRect();
      const rectT=table.getBoundingClientRect();
      const rectA=article.getBoundingClientRect();
      return {
        quoteText:quote.textContent.trim(),
        rows:[...table.tBodies[0].rows].map(row=>[...row.cells].map(c=>c.textContent.trim())),
        heading:[...table.tHead.rows[0].cells].map(c=>c.textContent.trim()),
        quote:{left:rectQ.left,right:rectQ.right,border:getComputedStyle(quote).borderLeftWidth,background:getComputedStyle(quote).backgroundColor,fontWeight:getComputedStyle(quote).fontWeight},
        table:{left:rectT.left,right:rectT.right,border:getComputedStyle(table).borderTopWidth,width:rectT.width,background:getComputedStyle(table.tHead).backgroundColor},
        content:{left:rectA.left,right:rectA.right},
        headerBg:getComputedStyle(table.tHead.rows[0].cells[0]).backgroundColor,
        rowsBg:[...table.tBodies[0].rows].map(r=>getComputedStyle(r).backgroundColor),
        pageOverflow:document.documentElement.scrollWidth>innerWidth+1,
        images:article.querySelectorAll('img').length
      };
    });
    assert.ok(data.quoteText.startsWith('Some CF cards and microdrives do not work properly'),'Quote text retained');
    assert.ok(data.quoteText.endsWith('cannot be fixed by software.'),'Quote ending unchanged');
    assert.deepEqual(data.heading,['DOM tested','5 V from pin 20','Recognised with XTIDE'],'Column headings intact');
    assert.deepEqual(data.rows,[['Transcend 4 GB','Yes','No'],['KingSpec 2 GB','No','Yes'],['TopSSD 4 GB','Yes','Yes']],'Comparison data intact');
    assert.equal(data.images,3,'All three article images intact');
    assert.equal(data.quote.border,'4px','Teal quote border visible');
    assert.equal(data.table.border,'3px','Table accent rule visible');
    assert.notEqual(data.headerBg,'rgba(0, 0, 0, 0)','Table headings shaded');
    assert.notEqual(data.rowsBg[0],data.rowsBg[1],'Alternating row backgrounds');
    assert.equal(data.quote.fontWeight,'400','Quotes are not unexpectedly bold');
    assert.ok(data.quote.left>=data.content.left-1&&data.quote.right<=data.content.right+1,'Quote within article width at '+width);
    assert.ok(data.table.left>=data.content.left-1&&data.table.right<=data.content.right+1,'Table within article width at '+width+': '+JSON.stringify(data));
    assert.ok(!data.pageOverflow,'No horizontal page overflow at '+width+': '+JSON.stringify(data));
    assert.deepEqual(pageErrors,[],'No JavaScript errors at '+width);
    if([320,375,402,750,861,1280].includes(width)){
      await quote.screenshot({path:output+'/quote-'+width+'px.png'});
      await table.screenshot({path:output+'/table-'+width+'px.png'});
      const both=await page.locator('.post-full .post-content').screenshot({path:output+'/article-content-'+width+'px.png'});
    }
    console.log('PASS '+width+'px: quote, table and preserved images; '+JSON.stringify({quote:data.quote,table:data.table,headings:data.heading}));
    await page.close();
  }
  console.log('PASS 10 responsive viewport checks');
}finally{await browser.close()}
