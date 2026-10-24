import { chromium, firefox, webkit } from 'playwright';

const origins = 'http://127.0.0.1:8097';
const pages = [
  { path: '/about/', group: 'mcretro-about', count: 4 },
  { path: '/channels/', group: 'mcretro-channels', count: 4 },
  { path: '/goodies/', group: 'mcretro-goodies', count: 3 }
];
const sizes = [
  { name: 'mobile-320', width: 320, height: 730 },
  { name: 'mobile-375', width: 375, height: 812 },
  { name: 'desktop-1280', width: 1280, height: 900 }
];
const browsers = { chromium, firefox, webkit };
const results = [];
const errors = [];
for (const [browserName, browserType] of Object.entries(browsers)) {
  const browser = await browserType.launch({headless:true});
  try {
    for (const profile of sizes) {
      const context = await browser.newContext({
        viewport: {width:profile.width,height:profile.height},
        isMobile: profile.width < 500 && browserName==='webkit'
      });
      try {
        for (const item of pages) {
          const page = await context.newPage();
          // Block off-site assets and services for deterministic browser testing.
          await page.route('**/*', route => route.request().url().startsWith(origins)
            ? route.continue()
            : route.abort());
          const issues = [];
          try {
            await page.goto(origins+item.path,{waitUntil:'domcontentloaded',timeout:30000});
            const elements = page.locator('main details.about-panel');
            const n = await elements.count();
            if (n!==item.count) throw Error('Expected '+item.count+' panels, got '+n);
            const details = await elements.evaluateAll(nodes=>nodes.map(d=>({
              name:d.getAttribute('name'),open:d.open,label:d.querySelector('summary')?.textContent?.trim()
            })));
            if (details.some(d=>d.name!==item.group || d.open)) throw Error('Unexpected initial panels '+JSON.stringify(details));
            const openIndices=()=>page.locator('main details.about-panel[open]').evaluateAll(nodes=>nodes.map(node=>[...node.parentElement.querySelectorAll('details.about-panel')].indexOf(node)));
            const assertOpen=async(expected,step)=>{
              const got=await openIndices();
              if (JSON.stringify(got)!==JSON.stringify(expected))throw Error(step+' expected '+JSON.stringify(expected)+' got '+JSON.stringify(got));
            };
            await elements.nth(0).locator('summary').click();
            await assertOpen([0],'click first');
            await elements.nth(1).locator('summary').click();
            await assertOpen([1],'click second should close first');
            await elements.nth(2).locator('summary').click();
            await assertOpen([2],'click third should close second');
            const thirdVisible = await elements.nth(2).locator('summary').evaluate(el=>{
              const r=el.getBoundingClientRect();return r.bottom>0&&r.top<innerHeight;
            });
            await elements.nth(2).locator('summary').click();
            await assertOpen([],'click current closes all');
            const firstSummary=elements.nth(0).locator('summary');
            await firstSummary.focus();
            await page.keyboard.press('Enter');
            await assertOpen([0],'keyboard Enter');
            const secondSummary=elements.nth(1).locator('summary');
            await secondSummary.focus();
            await page.keyboard.press('Space');
            await assertOpen([1],'keyboard Space');
            await page.keyboard.press('Enter');
            await assertOpen([],'keyboard Enter closes current');
            const metrics=await page.evaluate(()=>({
              clientWidth:document.documentElement.clientWidth,
              scrollWidth:document.documentElement.scrollWidth,
              gifs:[...document.querySelectorAll('main img[src$=".gif"]')].length
            }));
            if(metrics.scrollWidth>metrics.clientWidth+3) issues.push('horizontal-overflow');
            if(!thirdVisible) issues.push('third-summary-not-visible-after-opening');
            if(issues.length)errors.push({browserName,profile:profile.name,page:item.path,issues,metrics});
            results.push({browser:browserName,viewport:profile.name,path:item.path,count:n,thirdVisible,...metrics});
          } finally {await page.close();}
        }
      } finally {await context.close();}
    }
  } finally {await browser.close();}
}
console.log(JSON.stringify({results,errors},null,2));
if(errors.length)process.exitCode=1;
