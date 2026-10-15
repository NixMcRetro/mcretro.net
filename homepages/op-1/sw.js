/* OP-1 Browser Lab v2.6. Cache only the static application shell, not projects. */
'use strict';
const CACHE='op1-browser-lab-shell-v2.6';
const PREFIX='op1-browser-lab-shell-';
const SCOPE=new URL('./',self.location.href);
const SHELL=['./','./index.html','./workspace.js','./workspace.css','./comfort.js','./comfort.css','./simplified.js','./simplified.css','./tracker.js','./tracker.css','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png','./icons/icon-maskable-512.png','./icons/apple-touch-icon.png'];
self.addEventListener('install',event=>{
 event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(SHELL.map(path=>new URL(path,SCOPE).href))).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',event=>{
 event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith(PREFIX)&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',event=>{
 const req=event.request,url=new URL(req.url);
 if(req.method!=='GET'||url.origin!==self.location.origin||!url.pathname.startsWith(SCOPE.pathname))return;
 if(req.mode==='navigate'){
  event.respondWith(fetch(req).then(response=>{
   if(response.ok && (url.pathname===SCOPE.pathname||url.pathname===SCOPE.pathname+'index.html')){
    const copy=response.clone();event.waitUntil(caches.open(CACHE).then(cache=>cache.put(req,copy)));
   }
   return response;
  }).catch(async()=> (await caches.match(req))||(await caches.match(new URL('./',SCOPE).href))||(await caches.match(new URL('index.html',SCOPE).href))||Response.error()));
 }else{
  event.respondWith(caches.match(req).then(cached=>cached||fetch(req)));
 }
});