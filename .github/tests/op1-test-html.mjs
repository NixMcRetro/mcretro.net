// Inline the static OP-1 assets for Playwright page.setContent() regressions.
// rawHtml preserves production tabs; html exposes legacy panels for older test suites.
import {readFileSync} from 'node:fs';
const base=readFileSync('homepages/op-1/index.html','utf8');
let rendered=base;
for(const name of ['workspace.js','comfort.js','simplified.js']){
 const js=readFileSync('homepages/op-1/'+name,'utf8');
 rendered=rendered.replace('<script src="./'+name+'"></script>','<script>'+js+'</script>');
}
for(const name of ['workspace.css','comfort.css','simplified.css']){
 const css=readFileSync('homepages/op-1/'+name,'utf8');
 rendered=rendered.replace('<link rel="stylesheet" href="./'+name+'">','<style>'+css+'</style>');
}
export const rawHtml=rendered;
const allowLegacyPanels='<style id="legacy-test-panels">html.comfort-tabs-enabled .below .panel[data-comfort-tab],html.comfort-tabs-enabled .below .song-studio[data-comfort-tab]{display:block!important}html.comfort-tabs-enabled .below #sequencePanel{display:block!important}html.studio-simple .below [data-comfort-tab]{display:block!important}html.studio-simple .below [data-comfort-tab].comfort-visible:not(.studio-current){display:block!important}html.studio-simple .quick-strip{display:flex!important}</style>';
export const html=rendered.replace('</head>',allowLegacyPanels+'</head>');
if(!rawHtml.includes('window.OP1Workspace')||!rawHtml.includes('window.OP1Comfort')||!rawHtml.includes('window.OP1Simplified')||!rawHtml.includes('id="workspacePanel"'))throw Error('Missing v2.0.1 static test fixture');