import { chromium } from 'playwright';

const profiles = [
  { label: 'mobile-375', width: 375, height: 812 },
  { label: 'desktop-1280', width: 1280, height: 900 },
];
const pages = [
  { path: '/blog/', label: 'blog' },
  { path: '/capture-tests-from-composite-and-mac/', label: 'three-videos' },
];
const variants = [{ label: 'baseline', port: 8051 }, { label: 'trial', port: 8052 }];
const browser = await chromium.launch({ headless: true });
const results = [];
try {
  for (const size of profiles) for (const item of pages) for (const variant of variants) {
    const context = await browser.newContext({viewport: {width:size.width,height:size.height},deviceScaleFactor:1});
    const page = await context.newPage();
    const requested = [];
    page.on('request', request => {
      const url = request.url();
      if (url.includes('youtube.com/embed/') && request.isNavigationRequest()) requested.push('youtube-iframe');
      else if (url.includes('img.youtube.com/')) requested.push('youtube-thumbnail');
      else if (request.resourceType() === 'image') requested.push('local-image');
    });
    // Offline third-party stubs permit repeatable loading-priority comparisons;
    // request counts are not real production transferred bytes.
    await page.route('**/*', async route => {
      const url = route.request().url();
      if (url.startsWith('http://127.0.0.1:' + variant.port + '/')) return route.continue();
      if (route.request().resourceType() === 'image') return route.fulfill({
        status:200,contentType:'image/gif',body:Buffer.from('R0lGODlhAQABAIAAAP///wAAACH5BAEAAAEALAAAAAABAAEAAAICTAEAOw==','base64')
      });
      return route.fulfill({status:200,contentType:'text/html',body:'<!doctype html><title>External stub</title>'});
    });
    await page.goto('http://127.0.0.1:' + variant.port + item.path,{waitUntil:'domcontentloaded',timeout:30000});
    await page.waitForTimeout(1300);
    const d = await page.evaluate(() => ({
      width:document.documentElement.clientWidth,
      scrollWidth:document.documentElement.scrollWidth,
      thumbs:[...document.querySelectorAll('.post-thumbnail-img')].map(img=>({
        loading:img.getAttribute('loading')??'unspecified',width:img.getAttribute('width'),height:img.getAttribute('height')
      })),
      embeds:[...document.querySelectorAll('iframe[src*="youtube.com/embed/"]')].map(f=>f.getAttribute('loading')??'unspecified'),
      footerGifCount:document.querySelectorAll('.site-footer img[src$=".gif"]').length
    }));
    const result={profile:size.label,page:item.label,variant:variant.label,...d,
      requests:{
        youtubeIframes:requested.filter(x=>x==='youtube-iframe').length,
        youtubeThumbs:requested.filter(x=>x==='youtube-thumbnail').length,
        localImages:requested.filter(x=>x==='local-image').length
      }
    };
    results.push(result);
    if(d.scrollWidth>d.width+3) throw Error('Horizontal overflow: '+JSON.stringify(result));
    if(variant.label==='trial'&&item.label==='three-videos'&&d.embeds.join(',')!=='eager,lazy,lazy'){
      throw Error('Video priorities wrong: '+JSON.stringify(result));
    }
    if(variant.label==='trial'&&item.label==='blog'&&d.thumbs.length&&
       (d.thumbs[0].loading!=='eager'||d.thumbs.slice(1).some(t=>t.loading!=='lazy'))) {
      throw Error('Thumbnail priorities wrong: '+JSON.stringify(result));
    }
    await context.close();
  }
} finally { await browser.close(); }
console.log('CONTROLLED BROWSER PILOT (third-party stubs, not production transferred bytes):');
console.log(JSON.stringify(results,null,2));
console.log('PASS: phone/desktop layout and loading-priority smoke tests');
