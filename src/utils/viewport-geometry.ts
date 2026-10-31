export interface LayoutRect {left:number;top:number;width:number;height:number;}
export function layoutRects(value:unknown):LayoutRect[]{
  return Array.isArray(value)?value.filter((r):r is LayoutRect=>r&&[r.left,r.top,r.width,r.height].every(v=>typeof v==='number'&&Number.isFinite(v))):[];
}

export interface WindowMetrics {
  windowWidth:number; windowHeight:number; screenHeight?:number; screenTop?:number;
  statusBarHeight?:number; safeArea?:{top:number;bottom:number};
}
export interface MenuRect {top:number;bottom:number;height:number;width:number;left:number;right:number;}
export function calculateInsets(info:WindowMetrics,menu?:MenuRect){
  const width=Math.max(1,info.windowWidth||375);
  const height=Math.max(1,info.windowHeight||667);
  const offset=info.screenTop||0;
  const status=Math.max(0,(info.statusBarHeight||0)-offset);
  const hasMenu=!!menu&&menu.width>0&&menu.height>0&&menu.top>=Math.max(0,info.statusBarHeight||0)&&menu.bottom>menu.top;
  const gap=hasMenu?Math.max(4,menu!.top-(info.statusBarHeight||0)):6;
  const chromeTop=hasMenu?Math.max(status,menu!.bottom-offset+gap):status+44;
  const safeBottom=info.safeArea?Math.max(0,Math.min(64,offset+height-info.safeArea.bottom)):0;
  return {width,height,chromeTop:Math.min(chromeTop,height),safeBottom};
}
