// v1.5 PWA test: real localhost origin, cached shell, offline reload, backup.
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { resolve, join, extname } from 'node:path';
import assert from 'node:assert/strict';

const root=resolve('homepages/op-1');
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.webmanifest':'application/manifest+json','.png':'image/png'};
const server=createServer((req,res)=>{
 const url=new URL(req.url,'http://localhost');
 const rel=url.pathname.startsWith('/homepages/op-1/')?url.pathname.slice('/homepages/op-1/'.length):null;
 const name=rel===''?'index.html':rel;
 if(name===null||!['index.html','workspace.js','workspace.css','comfort.js','comfort.css','simplified.js','simplified.css','tracker.js','tracker.css','music-maker.js','music-maker.css','sw.js','manifest.webmanifest','icons/icon-192.png','icons/icon-512.png','icons/icon-maskable-512.png','icons/apple-touch-icon.png'].includes(name)){
  res.writeHead(404);res.end('Not found');return;
 }
 try{const bytes=readFileSync(join(root,name));res.writeHead(200,{'content-type':types[extname(name)]??'application/octet-stream','cache-control':'no-cache'});res.end(bytes)}
 catch(e){res.writeHead(404);res.end('Not found')}
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const origin=`http://127.0.0.1:${server.address().port}/homepages/op-1/`;
let browser;
try{
 browser=await chromium.launch({headless:true});
 const ctx=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,acceptDownloads:true,serviceWorkers:'allow'});
 const page=await ctx.newPage(),errors=[];
 page.on('pageerror',e=>errors.push(String(e)));
 await page.goto(origin,{waitUntil:'domcontentloaded'});
 assert.match(await page.title(),/v2\.6/);
 await page.locator('#studioAdvancedButton').click();
 await page.waitForFunction(async()=>{
  if(!navigator.serviceWorker?.controller)return false;
  const c=await caches.open('op1-browser-lab-shell-v2.7-stage4');
  return !!(await c.match(new URL('index.html',location.href).href));
 },null,{timeout:30000});
 await page.waitForFunction(()=>document.querySelector('#offlineBadge')?.textContent==='CACHED',null,{timeout:15000});
 assert.equal(await page.locator('#offlineBadge').innerText(),'CACHED');
 const registration=await page.evaluate(async()=>{const r=await navigator.serviceWorker.getRegistration();return {scope:r?.scope,controller:!!navigator.serviceWorker.controller}});
 assert(registration.scope.endsWith('/homepages/op-1/'),'Service worker scope escaped instrument path');
 assert(registration.controller,'Page has no controlling service worker');
 const cached=await page.evaluate(async()=>{const c=await caches.open('op1-browser-lab-shell-v2.7-stage4');return (await c.keys()).map(req=>new URL(req.url).pathname)});
 assert(cached.some(x=>x.endsWith('/index.html')),'Application HTML not cached');
 assert(cached.some(x=>x.endsWith('/workspace.js')),'Song workspace logic not cached');
 assert(cached.some(x=>x.endsWith('/workspace.css')),'Song workspace styles not cached');
 assert(cached.some(x=>x.endsWith('/comfort.js')),'Studio Comfort logic not cached');
 assert(cached.some(x=>x.endsWith('/comfort.css')),'Studio Comfort theme not cached');
 assert(cached.some(x=>x.endsWith('/simplified.js')),'Simple studio script not cached');
 assert(cached.some(x=>x.endsWith('/simplified.css')),'Simple studio stylesheet not cached');
 assert(cached.some(x=>x.endsWith('/tracker.js')),'Tracker JS not cached');
 assert(cached.some(x=>x.endsWith('/tracker.css')),'Tracker CSS not cached');
 assert(cached.some(x=>x.endsWith('/music-maker.js')),'Music Maker logic not cached');
 assert(cached.some(x=>x.endsWith('/music-maker.css')),'Music Maker styles not cached');
 assert(cached.some(x=>x.endsWith('/icons/icon-512.png')),'App icon not cached');
 assert(cached.every(x=>x.startsWith('/homepages/op-1/')),'Cache escaped intended scope');
 assert(cached.every(x=>!x.includes('recording')&&!x.includes('sample')&&!x.endsWith('.json')),'Cache contains user data');
 await page.getByRole('tab',{name:'Tools'}).click();
 await page.locator('#installApp').click();
 assert(await page.locator('#offlineInstructions').isVisible(),'Device installation guidance missing');
 await page.locator('#closeOfflineInstructions').click();
 await page.locator('#comfortTheme').click();
 assert.equal(await page.locator('html').getAttribute('data-op1-theme'),'dark');
 await page.getByRole('tab',{name:'Play'}).click();
 await page.locator('#bankNext').click();
 assert.equal(await page.locator('#bankName').innerText(),'AFTER HOURS');
 await page.getByRole('tab',{name:'Tools'}).click();
 const download=page.waitForEvent('download');
 await page.locator('#offlineBackup').click();
 const item=await download;
 const backup=JSON.parse(readFileSync(await item.path(),'utf8'));
 assert.equal(backup.format,'op1-browser-lab-v05','Portable project format was changed');
 assert.equal(backup.soundBank,1,'Backup lost the selected sound bank');
 await page.locator('#checkpointNow').click();
 await page.getByRole('tab',{name:'Play'}).click();
 await page.waitForTimeout(1000);
 await ctx.setOffline(true);
 await page.reload({waitUntil:'domcontentloaded',timeout:20000});
 assert.match(await page.title(),/v2\.6/);
 assert.equal(await page.locator('.sound-key').count(),8,'Instrument did not load offline');
 assert.equal(await page.locator('.knob').count(),4,'Encoder controls missing offline');
 await page.waitForFunction(()=>document.querySelector('#offlineBadge')?.textContent==='CACHED',null,{timeout:10000});
 assert.equal(await page.locator('#bankName').innerText(),'AFTER HOURS','Local project state lost after offline reload');
 assert.equal(await page.locator('html').getAttribute('data-op1-theme'),'dark','Graphite theme preference was not retained offline');
 assert.equal(await page.locator('#studioAdvancedButton').getAttribute('aria-pressed'),'true','Advanced layout preference was not retained offline');
 await page.locator('.mode-btn[data-mode="tape"]').click();
 assert.equal(await page.locator('.mode-btn[data-mode="tape"]').getAttribute('aria-pressed'),'true');
 assert.deepEqual(errors,[],'Browser JavaScript errors');
 await ctx.close();
 console.log('PASS chromium: verified PWA install, scoped shell cache, offline reload, persisted project, mobile controls and portable backup');
}finally{if(browser)await browser.close();await new Promise(resolve=>server.close(resolve))}
