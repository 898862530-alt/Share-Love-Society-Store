import {computed,reactive} from 'vue';

import {calculateInsets,type WindowMetrics,type MenuRect} from '../utils/viewport-geometry';
export {layoutRects} from '../utils/viewport-geometry';

const viewport=reactive({width:375,height:667,chromeTop:46,safeBottom:0});
let listening=false;
export function refreshViewport(){
  try{
    let info:WindowMetrics;
    try{info=(typeof uni.getWindowInfo==='function'?uni.getWindowInfo():uni.getSystemInfoSync()) as WindowMetrics;}catch{info=uni.getSystemInfoSync() as WindowMetrics;}
    let insets={width:Math.max(1,info.windowWidth),height:Math.max(1,info.windowHeight),chromeTop:46,safeBottom:0};
    // #ifdef MP-WEIXIN
    let menu:MenuRect|undefined;
    try{menu=uni.getMenuButtonBoundingClientRect();}catch{/* Use a conservative navigation band if the API is unavailable. */}
    insets=calculateInsets(info,menu);
    // #endif
    Object.assign(viewport,insets);
  }catch{/* Keep usable first-render dimensions when window APIs are not ready. */}
}
export function useViewport(){
  if(!listening){refreshViewport();uni.onWindowResize(refreshViewport);listening=true;}
  const styles=computed(()=>{
    let top=`${viewport.chromeTop}px`,bottom=`${viewport.safeBottom}px`;
    // #ifdef H5
    top='calc(46px + env(safe-area-inset-top, 0px))';bottom='env(safe-area-inset-bottom, 0px)';
    // #endif
    return {'--viewport-height':`${viewport.height}px`,'--viewport-width':`${viewport.width}px`,'--chrome-top':top,'--safe-bottom':bottom,'--page-frame-height':`calc(${viewport.height}px - ${top})`};
  });
  const frameHeight=computed(()=>viewport.height-viewport.chromeTop);
  return {viewport,styles,frameHeight};
}
