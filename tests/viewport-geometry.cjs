const fs=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const ts=require('typescript');
const source=fs.readFileSync('src/utils/viewport-geometry.ts','utf8');
const js=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;
const context={exports:{}};vm.runInNewContext(js,context);
const {calculateInsets}=context.exports;
const capsule=(top,height=32)=>({top,bottom:top+height,height,width:87,left:276,right:363});
const fixtures=[
  ['small iPhone',{windowWidth:375,windowHeight:667,statusBarHeight:20,safeArea:{top:20,bottom:667}},capsule(26),{chromeTop:64,safeBottom:0}],
  ['notched iPhone',{windowWidth:390,windowHeight:844,statusBarHeight:47,safeArea:{top:47,bottom:810}},capsule(51),{chromeTop:87,safeBottom:34}],
  ['Android',{windowWidth:360,windowHeight:800,statusBarHeight:24,safeArea:{top:24,bottom:800}},capsule(32),{chromeTop:72,safeBottom:0}],
  ['offset window',{windowWidth:480,windowHeight:720,screenTop:24,statusBarHeight:24,safeArea:{top:24,bottom:744}},capsule(30),{chromeTop:44,safeBottom:0}],
  ['unavailable capsule',{windowWidth:375,windowHeight:667,statusBarHeight:20},capsule(0,0),{chromeTop:64,safeBottom:0}],
  ['capsule before status bar',{windowWidth:375,windowHeight:667,statusBarHeight:20},capsule(0),{chromeTop:64,safeBottom:0}],
  ['window already excludes bottom',{windowWidth:390,windowHeight:777,statusBarHeight:47,safeArea:{top:47,bottom:810}},capsule(51),{chromeTop:87,safeBottom:0}],
];
for(const [name,info,menu,expected] of fixtures){const actual=calculateInsets(info,menu);assert.equal(actual.chromeTop,expected.chromeTop,name+' top');assert.equal(actual.safeBottom,expected.safeBottom,name+' bottom');assert.equal(actual.width,info.windowWidth,name+' width');assert.equal(actual.height,info.windowHeight,name+' height');}
console.log(`${fixtures.length} viewport and capsule fixtures passed`);
