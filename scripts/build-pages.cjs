const {spawnSync}=require('node:child_process');
const path=require('node:path');
const fs=require('node:fs');
const repo=(process.env.GITHUB_REPOSITORY||'898862530-alt/Share-Love-Society-Store').split('/')[1];
const base=process.env.PAGES_BASE_PATH||`/${repo}/`;
const output=path.resolve('dist/github-pages');
const result=spawnSync(process.execPath,[path.resolve('node_modules/@dcloudio/vite-plugin-uni/bin/uni.js'),'build','-p','h5'],{
  stdio:'inherit',env:{...process.env,UNI_H5_BASE:base,UNI_OUTPUT_DIR:output}
});
if(result.error)throw result.error;
if(result.status!==0)process.exit(result.status||1);
fs.writeFileSync(path.join(output,'.nojekyll'),'');
console.log(`GitHub Pages build ready: ${output} (base: ${base})`);
