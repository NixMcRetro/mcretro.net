// Inline the v2.0 static workspace assets for page.setContent() regressions.
// PWA/network tests still serve the original linked files from localhost.
import {readFileSync} from 'node:fs';
const base=readFileSync('homepages/op-1/index.html','utf8');
const js=readFileSync('homepages/op-1/workspace.js','utf8');
const css=readFileSync('homepages/op-1/workspace.css','utf8');
export const html=base.replace('<script src="./workspace.js"></script>','<script>'+js+'</script>').replace('<link rel="stylesheet" href="./workspace.css">','<style>'+css+'</style>');
if(!html.includes('window.OP1Workspace')||!html.includes('id="workspacePanel"'))throw Error('Missing unified song test fixture');
