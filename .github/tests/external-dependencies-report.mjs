import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const root = process.argv[2] || '_site';
const hosts = new Map();
let htmlCount=0, cssCount=0, remoteUrls=0;

function add(raw, file, kind) {
  if (!/^https?:\/\//i.test(raw)) return;
  let url;
  try { url = new URL(raw); } catch { return; }
  if (url.hostname === 'mcretro.net' || url.hostname.endsWith('.mcretro.net')) return;
  const item = hosts.get(url.hostname) || { count:0, kinds:new Map(), examples:[] };
  item.count++;
  remoteUrls++;
  item.kinds.set(kind,(item.kinds.get(kind)||0)+1);
  if(item.examples.length<3) item.examples.push({file, kind,url:url.origin+url.pathname});
  hosts.set(url.hostname,item);
}

function visit(dir) {
  for(const item of readdirSync(dir)) {
    const file=join(dir,item), stats=statSync(file);
    if(stats.isDirectory()) { visit(file); continue; }
    if(!file.endsWith('.html') && !file.endsWith('.css')) continue;
    const data=readFileSync(file,'utf8');
    if(file.endsWith('.html')) {
      htmlCount++;
      for(const tag of data.matchAll(/<(script|iframe|img|link|video|audio|source|track)\b[^>]*>/gi)) {
        const type=tag[1].toLowerCase(),text=tag[0];
        const att=type==='link'?'href':'src';
        const match=new RegExp('\\b'+att+'\\s*=\\s*["\\x27]([^"\\x27]+)["\\x27]','i').exec(text);
        if(!match) continue;
        if(type==='link' && !/\brel\s*=\s*["']?(?:stylesheet|preload|preconnect|dns-prefetch|modulepreload)/i.test(text))continue;
        add(match[1],file,type);
      }
    } else {
      cssCount++;
      for(const match of data.matchAll(/url\(\s*['"]?(https?:\/\/[^)'"]+)/gi))add(match[1],file,'css-url');
      for(const match of data.matchAll(/@import\s+['"](https?:\/\/[^'"]+)/gi))add(match[1],file,'css-import');
    }
  }
}
visit(root);
console.log('EXTERNAL DEPENDENCY AUDIT: static markup and styles only; click-through links excluded.');
console.log('HTML pages inspected: '+htmlCount+'; CSS files inspected: '+cssCount+'; remote asset refs: '+remoteUrls);
for(const [host,item] of [...hosts.entries()].sort((a,b)=>b[1].count-a[1].count)) {
 console.log(JSON.stringify({host,count:item.count,kinds:Object.fromEntries(item.kinds),examples:item.examples}));
}
