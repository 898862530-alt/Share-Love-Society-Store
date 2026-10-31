<script setup lang="ts">
import {computed,getCurrentInstance,nextTick,onUnmounted,ref,watch} from 'vue';
import {onLoad,onReady,onShow} from '@dcloudio/uni-app';
import MiniChrome from '../../components/MiniChrome.vue';
import PagerSurface from '../../components/PagerSurface.vue';
import BottomTabs,{type MainTab} from '../../components/BottomTabs.vue';
import LineIcon from '../../components/LineIcon.vue';
import {campaigns,autismSource} from '../../data/editorial';
import {artworks,openProduct} from '../../data/catalog';
import {useViewport,layoutRects} from '../../composables/viewport';

interface Rect {left:number;top:number;width:number;height:number;}
interface MorphCard {id:'store'|'mine';from:Rect;to:Rect;}
const {viewport,frameHeight,styles:viewportStyles}=useViewport();
const instance=getCurrentInstance();
const productIndex=ref(0),sectionIndex=ref(0),joinOpen=ref(false),interest=ref('品牌合作');
const selectedTab=ref<MainTab>('home'),navPeeking=ref(false),morphing=ref(false),morphTarget=ref(false);
const cards=ref<MorphCard[]>([]),overflowing=ref([false,false,false,false]);
const dock=ref<InstanceType<typeof BottomTabs>>();
const dockVisible=computed(()=>sectionIndex.value>0||navPeeking.value||morphing.value);
const density=computed(()=>frameHeight.value<520?'tiny':frameHeight.value<680?'compact':'regular');
const sections=['home','origin','understanding','exhibition','join'];
let requestedSection=0,ready=false,disposed=false,navigationPending=false,animationTimer:ReturnType<typeof setTimeout>|undefined;
let wheelAt=0,wheelLatched=false,wheelTotal=0,gestureLockedUntil=0;
let pointerStart:{x:number;y:number}|undefined,suppressClickUntil=0;
function pointerDown(e:PointerEvent){if(sectionIndex.value>0&&overflowing.value[sectionIndex.value-1]){pointerStart=undefined;return;}if(e.pointerType==='mouse')pointerStart={x:e.clientX,y:e.clientY};}
function pointerUp(e:PointerEvent){
  if(e.pointerType!=='mouse'||!pointerStart)return;
  const dx=e.clientX-pointerStart.x,dy=e.clientY-pointerStart.y;pointerStart=undefined;
  if(Math.max(Math.abs(dx),Math.abs(dy))<40)return;
  suppressClickUntil=Date.now()+500;
  if(Math.abs(dy)>Math.abs(dx))goSection(sectionIndex.value+(dy<0?1:-1));
  else if(sectionIndex.value===0)productIndex.value=Math.max(0,Math.min(2,productIndex.value+(dx<0?1:-1)));
}
function guardClick(e:MouseEvent){if(Date.now()<suppressClickUntil){e.preventDefault();e.stopPropagation();}}
function motionDuration(){
  // #ifdef H5
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return 0;
  // #endif
  return 360;
}
onLoad(q=>{requestedSection=Math.max(0,sections.indexOf(q?.section||'home'));});
onReady(async()=>{ready=true;sectionIndex.value=requestedSection;await nextTick();checkOverflow();});
onShow(()=>{if(ready){resetNavigation();checkOverflow();}});
onUnmounted(()=>{disposed=true;if(animationTimer)clearTimeout(animationTimer);});
watch(()=>[viewport.width,viewport.height],async()=>{await nextTick();if(ready)checkOverflow();});
function resetNavigation(){navigationPending=false;morphing.value=false;morphTarget.value=false;cards.value=[];selectedTab.value='home';navPeeking.value=false;}
function changeSection(e:{detail:{current:number}}){if(sectionIndex.value!==e.detail.current)sectionIndex.value=e.detail.current;}
function transitionSection(e:{detail:{dy?:number}}){if(sectionIndex.value===0&&!morphing.value)navPeeking.value=Math.abs(e.detail.dy||0)>24;}
function finishSection(){navPeeking.value=false;}
function goSection(index:number){if(joinOpen.value||navigationPending)return;sectionIndex.value=Math.max(0,Math.min(4,index));gestureLockedUntil=Date.now()+motionDuration()+80;}
function onWheel(e:WheelEvent){
  if(e.ctrlKey||Math.abs(e.deltaX)>Math.abs(e.deltaY)||joinOpen.value||navigationPending)return;
  const now=Date.now();if(now-wheelAt>180){wheelLatched=false;wheelTotal=0;}wheelAt=now;
  // Exceptionally short windows or enlarged type can read within the current panel.
  // A fresh gesture at the end then advances to the adjacent panel.
  if(sectionIndex.value>0&&overflowing.value[sectionIndex.value-1]){
    const reader=(e.target as HTMLElement|null)?.closest('.chapter-scroll')?.querySelector<HTMLElement>('.uni-scroll-view[style]');
    if(reader&&((e.deltaY>0&&reader.scrollTop+reader.clientHeight<reader.scrollHeight-2)||(e.deltaY<0&&reader.scrollTop>2))){wheelLatched=true;return;}
  }
  e.preventDefault();
  if(wheelLatched||now<gestureLockedUntil)return;
  wheelTotal+=e.deltaY;
  if(Math.abs(wheelTotal)>=32){wheelLatched=true;goSection(sectionIndex.value+(wheelTotal>0?1:-1));}
}
function onKey(e:KeyboardEvent){
  if(joinOpen.value||navigationPending||['INPUT','TEXTAREA'].includes((e.target as HTMLElement|null)?.tagName||''))return;
  const offsets:Record<string,number>={ArrowDown:1,PageDown:1,ArrowUp:-1,PageUp:-1};
  if(e.key in offsets){e.preventDefault();goSection(sectionIndex.value+offsets[e.key]);}
}
function checkOverflow(){
  const query=uni.createSelectorQuery().in(instance?.proxy);
  query.selectAll('.chapter-scroll').boundingClientRect();
  query.selectAll('.chapter-content').boundingClientRect();
  query.exec(result=>{
    const frames=result[0] as Rect[]|undefined,contents=result[1] as Rect[]|undefined;
    if(!frames||!contents)return;
    overflowing.value=contents.map((r,i)=>r.height>(frames[i]?.height||Infinity)+2);
  });
}
function measureEntries():Promise<Rect[]>{return new Promise(resolve=>uni.createSelectorQuery().in(instance?.proxy).selectAll('.entry').boundingClientRect(rects=>resolve(layoutRects(rects))).exec());}
function navigate(tab:'store'|'mine'){
  uni.navigateTo({url:`/pages/${tab}/index`,animationType:'none',animationDuration:0,fail:()=>{resetNavigation();uni.showToast({title:'暂时无法打开，请再试一次',icon:'none'});}});
}
async function selectNavigation(tab:MainTab){
  if(navigationPending||joinOpen.value)return;
  if(tab==='home'){goSection(0);return;}
  navigationPending=true;selectedTab.value=tab;
  if(sectionIndex.value!==0){navigate(tab);return;}
  const [entries,targets]=await Promise.all([measureEntries(),dock.value?.measureTabs()||Promise.resolve([])]);
  if(disposed)return;
  if(entries.length!==2||targets.length!==3||motionDuration()===0){navigate(tab);return;}
  cards.value=[{id:'store',from:entries[0],to:targets[1]},{id:'mine',from:entries[1],to:targets[2]}];
  morphing.value=true;await nextTick();
  // Start on the next painted frame through the cross-platform animation scheduler.
  animationTimer=setTimeout(()=>{morphTarget.value=true;animationTimer=setTimeout(()=>{if(!disposed)navigate(tab);},motionDuration());},32);
}
function cardStyle(card:MorphCard){const r=morphTarget.value?card.to:card.from;return {left:`${r.left}px`,top:`${r.top}px`,width:`${r.width}px`,height:`${r.height}px`};}
function source(){
  // #ifdef H5
  window.open(autismSource.url,'_blank','noopener');
  // #endif
  // #ifndef H5
  uni.setClipboardData({data:autismSource.url});
  // #endif
}
</script>

<template>
  <view class="landing screen" :class="density" :style="viewportStyles"><MiniChrome/>
    <PagerSurface class="landing-frame" @wheel="onWheel" @key="onKey" @pointer-start="pointerDown" @pointer-end="pointerUp" @capture-click="guardClick">
      <swiper class="section-swiper" vertical :current="sectionIndex" :duration="motionDuration()" :circular="false" :disable-touch="morphing||joinOpen" @change="changeSection" @transition="transitionSection" @animationfinish="finishSection">
        <swiper-item class="section-slide" :aria-hidden="sectionIndex!==0">
          <view class="opening">
            <view class="landing-brand"><text>爱分你<text class="brand-dot"> · </text></text><text>SHARE LOVE SOCIETY</text></view>
            <swiper class="campaign-swiper" :current="productIndex" :duration="motionDuration()" @change="productIndex=$event.detail.current">
              <swiper-item v-for="(c,i) in campaigns" :key="c.id" :aria-hidden="productIndex!==i">
                <button role="button" class="campaign" :disabled="morphing" @click="openProduct(c.id)" :aria-label="`了解${c.title}`">
                  <view class="campaign-heading"><text class="campaign-name">{{c.title}}</text><text class="campaign-en">{{c.en}}</text><text class="campaign-line">{{c.line}}</text></view>
                  <image class="campaign-image" :src="c.image" mode="aspectFit"/><text class="campaign-link">探索这份联名 ↗</text>
                </button>
              </swiper-item>
            </swiper>
            <view class="dots"><button role="button" v-for="(c,i) in campaigns" :key="c.id" :class="{active:productIndex===i}" @click="productIndex=i" :aria-label="`切换至${c.title}`"><view/></button></view>
            <view class="entry-grid" :class="{'entries-morphing':morphing}">
              <button role="button" class="entry primary-entry" :disabled="morphing" @click="selectNavigation('store')"><LineIcon name="store" :size="22" color="#fff"/><text>商城中心</text><LineIcon name="arrow" :size="18" color="#fff"/></button>
              <button role="button" class="entry" :disabled="morphing" @click="selectNavigation('mine')"><LineIcon name="user" :size="22"/><text>我的</text><LineIcon name="arrow" :size="18"/></button>
            </view>
            <button role="button" class="down-cue" @click="goSection(1)" aria-label="向下了解爱分你"><text>向下，认识爱分你</text><text>⌄</text></button>
          </view>
        </swiper-item>
        <swiper-item :aria-hidden="sectionIndex!==1">
          <scroll-view class="chapter-scroll origin" :scroll-y="overflowing[0]" :show-scrollbar="false"><view class="chapter-content">
            <text class="chapter-index">01 / OUR BEGINNING</text><text class="chapter-title">从一份喜欢，<br/>到更多人的看见。</text>
            <view class="chapter-visual origin-art"><image :src="artworks[0].image" mode="aspectFit"/><text class="orbit">爱 · 分 · 你</text></view>
            <text class="chapter-body">以艺术为桥梁，与品牌一起，让孤独症艺术家的画作走进日常，让不同的表达被更多人看见。</text>
            <text class="muted-note chapter-note">爱分你 · Share Love Society<br/>创始故事与创立时间待团队补充。</text>
          </view></scroll-view>
        </swiper-item>
        <swiper-item :aria-hidden="sectionIndex!==2">
          <scroll-view class="chapter-scroll understanding" :scroll-y="overflowing[1]" :show-scrollbar="false"><view class="chapter-content">
            <text class="chapter-index">02 / A LITTLE UNDERSTANDING</text><text class="chapter-title">每个人，<br/>都有自己的节奏。</text>
            <view class="chapter-visual understanding-visual" aria-hidden="true"><view v-for="word in ['表达','感受','理解','陪伴']" :key="word" class="bubble">{{word}}</view></view>
            <text class="chapter-body">每个人的沟通方式、感官体验与支持需求可能不同。尊重差异，先认识一个人，再理解 TA 的表达。</text>
            <button role="button" class="text-link source-link" @click="source">了解更多 · 世界卫生组织<LineIcon name="arrow" :size="18"/></button>
          </view></scroll-view>
        </swiper-item>
        <swiper-item :aria-hidden="sectionIndex!==3">
          <scroll-view class="chapter-scroll exhibition" :scroll-y="overflowing[2]" :show-scrollbar="false"><view class="chapter-content">
            <text class="chapter-index">03 / A WORLD IN COLOUR</text><text class="chapter-title">画里有一个世界，<br/>等你走近。</text>
            <view class="chapter-visual exhibition-grid"><image v-for="n in [2,3,4,7]" :key="n" :src="artworks[n-1].image" mode="aspectFill"/></view>
            <text class="chapter-body">从颜色与线条出发，认识画作背后的创作者。让作品走上展墙，也走进日常。</text>
            <text class="muted-note chapter-note">画展版式示意，使用 AI 占位作品。<br/>真实记录与授权作品待补充。</text>
          </view></scroll-view>
        </swiper-item>
        <swiper-item :aria-hidden="sectionIndex!==4">
          <scroll-view class="chapter-scroll join" :scroll-y="overflowing[3]" :show-scrollbar="false"><view class="chapter-content">
            <text class="chapter-index">04 / TOGETHER, WE SHARE</text><view class="join-symbol">爱<text>分你</text></view><text class="chapter-title">把你的喜欢，<br/>也分给这个世界。</text>
            <text class="chapter-body">带着好产品来合作，带着时间来参与，或从了解一位创作者开始。</text>
            <button role="button" class="primary-button join-button" @click="joinOpen=true">加入爱分你<LineIcon name="arrow" :size="22" color="#fff"/></button>
            <button role="button" class="text-link" @click="selectNavigation('store')">先逛逛联名商店<LineIcon name="arrow" :size="20"/></button><text class="landing-footer">让不同的表达，都有被看见的地方。</text>
          </view></scroll-view>
        </swiper-item>
      </swiper>
      <view v-if="sectionIndex>0" class="section-progress" aria-label="介绍章节"><button role="button" v-for="(name,i) in ['初识','创始','理解','画展','加入']" :key="name" :class="{active:sectionIndex===i}" @click="goSection(i)" :aria-label="`前往${name}`"><view/></button></view>
    </PagerSurface>
    <BottomTabs ref="dock" :active="selectedTab" :visible="dockVisible" manual :morphing="morphing" @select="selectNavigation"/>
    <view v-if="morphing" class="morph-layer" aria-hidden="true"><view v-for="card in cards" :key="card.id" class="morph-card" :class="[card.id,{'is-target':morphTarget,'is-selected':selectedTab===card.id}]" :style="cardStyle(card)"><view class="morph-icon"><LineIcon :name="card.id==='store'?'store':'user'" :size="morphTarget?24:22" :color="morphTarget?(selectedTab===card.id?'#126fa4':'#5d7482'):(card.id==='store'?'#fff':'#126fa4')"/></view><text class="morph-label">{{card.id==='store'?(morphTarget?'商城':'商城中心'):'我的'}}</text><view class="morph-arrow"><LineIcon name="arrow" :size="18" :color="card.id==='store'?'#fff':'#126fa4'"/></view></view></view>
    <view v-if="joinOpen" class="modal-mask" @click="joinOpen=false"><view class="dialog-card" role="dialog" aria-label="加入爱分你" @click.stop><view class="dialog-heading"><text>一起，让喜欢发生。</text><button role="button" class="icon-button" @click="joinOpen=false" aria-label="关闭"><LineIcon name="close" :size="22"/></button></view><text class="body-text">你想以哪种方式参与？</text><view class="join-options"><button role="button" v-for="x in ['品牌合作','志愿参与','艺术项目']" :key="x" :class="{chosen:interest===x}" @click="interest=x">{{x}}</button></view><text class="body-text">{{interest==='品牌合作'?'让好产品与艺术作品相遇，探索联名合作。':interest==='志愿参与'?'用你的时间与专长，参与公益行动。':'一起探索展览、创作与艺术家的更多可能。'}}</text><text class="muted-note">正式联系渠道待团队补充，目前不收集或提交个人信息。</text><button role="button" class="primary-button" @click="joinOpen=false">好的，期待相遇</button></view></view>
  </view>
</template>

<style scoped>
.landing{height:var(--viewport-height,100dvh);min-height:0;padding-bottom:0;background:#fff;overflow:hidden}.landing-frame{height:100%;outline:none;position:relative;overflow:hidden;touch-action:pan-y}.section-swiper{width:100%;height:100%}.opening{height:100%;display:flex;flex-direction:column;padding:14px var(--page-gutter) calc(8px + var(--safe-bottom));overflow:hidden}.landing-brand{display:flex;align-items:center;justify-content:space-between;gap:12px;color:var(--color-accent);flex:none;height:28px;margin-bottom:6px}.landing-brand>text:first-child{font-size:var(--font-title-3);font-weight:600}.landing-brand>text:last-child{font-size:var(--font-caption);letter-spacing:1px}.brand-dot{color:var(--color-sky)}.campaign-swiper{flex:1;width:100%;min-height:0}.campaign{position:relative;display:flex;align-items:center;flex-direction:column;width:100%;height:100%;padding:16px 0 0;background:#fff}.campaign-heading{text-align:center;flex:none}.campaign-name{font-size:var(--font-large-title);font-weight:400;letter-spacing:4px;display:block;color:var(--color-sky);line-height:1.3}.campaign-en{display:block;font-size:var(--font-secondary);letter-spacing:2.5px;color:var(--color-accent);margin-top:4px}.campaign-line{display:block;font-size:var(--font-secondary);color:var(--color-secondary);margin-top:8px}.campaign-image{width:calc(100% + 32px);flex:1;min-height:0;height:0}.campaign-link{font-size:var(--font-caption);color:var(--color-accent);padding:4px 0;flex:none}.dots{display:flex;justify-content:center;height:44px;flex:none}.dots button{width:44px;height:44px;background:none;padding:18px}.dots button view{width:8px;height:8px;border-radius:50%;background:#d5e6ef}.dots .active view{background:var(--color-sky)}.entry-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;flex:none}.entry{width:100%;height:60px;min-height:44px;display:flex;align-items:center;gap:10px;padding:12px 16px;border:1px solid var(--color-sky);background:#fff;color:var(--color-accent);border-radius:18px;text-align:left}.entry>text{font-size:var(--font-secondary);font-weight:600;flex:1;white-space:nowrap}.primary-entry{background:var(--color-sky);color:#fff}.entry :deep(image){flex:none}.campaign[disabled]{opacity:1}.entries-morphing{opacity:0;pointer-events:none}.down-cue{background:none;color:var(--color-accent);display:flex;align-items:center;justify-content:center;flex-direction:column;padding:8px;min-height:48px;flex:none;font-size:var(--font-caption);gap:0}.down-cue text:last-child{font-size:22px;line-height:16px}.chapter-scroll{width:100%;height:100%;box-sizing:border-box}.chapter-content{min-height:100%;box-sizing:border-box;padding:28px var(--page-gutter) calc(96px + var(--safe-bottom));display:flex;flex-direction:column;justify-content:center}.chapter-index{font-size:var(--font-caption);letter-spacing:1.4px;color:var(--color-accent);display:block}.chapter-title{font-size:var(--font-large-title);line-height:1.35;font-weight:600;letter-spacing:-1px;display:block;margin-top:20px;flex:none}.chapter-visual{height:clamp(120px,calc(var(--page-frame-height) * .27),230px);flex:none;margin:24px 0}.chapter-body{display:block;font-size:var(--font-body);line-height:1.75;color:var(--color-secondary);flex:none}.chapter-note{display:block;margin-top:20px;flex:none}.origin{background:var(--color-soft)}.origin-art{position:relative;display:flex;align-items:center;justify-content:center}.origin-art image{height:100%;width:100%;max-width:230px;transform:rotate(-5deg)}.orbit{position:absolute;right:8px;bottom:0;border:1px solid var(--color-sky);border-radius:50%;padding:10px 16px;background:#fff;color:var(--color-accent);transform:rotate(8deg);font-size:var(--font-footnote)}.understanding-visual{display:flex;align-items:center;justify-content:center;gap:8px}.bubble{border:1px solid var(--color-sky);color:var(--color-accent);border-radius:50%;width:23%;aspect-ratio:1;display:flex;align-items:center;justify-content:center;font-size:var(--font-title-3);font-weight:400;background:var(--color-soft)}.bubble:nth-child(odd){transform:translateY(-12px)}.bubble:nth-child(even){transform:translateY(12px);background:#fff}.source-link{margin-top:20px;font-size:var(--font-footnote);flex:none}.exhibition{background:#f7fbfe}.exhibition-grid{display:grid;grid-template-columns:1fr 1fr;grid-template-rows:minmax(0,1fr) minmax(0,1fr);gap:12px;padding:6px 12px}.exhibition-grid image{width:100%;height:100%;min-height:0;border:5px solid #fff;box-shadow:0 4px 12px #183a4d10;transform:rotate(-4deg)}.exhibition-grid image:nth-child(even){transform:rotate(5deg)}.join-symbol{font-size:100px;color:var(--color-sky);line-height:1.1;letter-spacing:-8px;font-weight:300;margin-bottom:16px}.join-symbol text{font-size:40px;letter-spacing:2px}.join-button{margin-top:28px;width:100%;flex:none}.join .text-link{margin-top:12px;flex:none}.join .chapter-body{margin-top:20px}.landing-footer{font-size:var(--font-caption);line-height:1.5;color:var(--color-muted);margin-top:28px;flex:none}.section-progress{position:absolute;bottom:calc(68px + var(--safe-bottom));left:50%;transform:translateX(-50%);display:flex;z-index:3}.section-progress button{width:44px;height:44px;display:flex;justify-content:center;align-items:center;background:none;padding:0}.section-progress button view{width:5px;height:5px;border-radius:50%;background:#b9d5e5}.section-progress .active view{background:var(--color-accent);width:16px;border-radius:4px}.morph-layer{position:fixed;inset:0;z-index:60;pointer-events:none}.morph-card{position:absolute;border:1px solid var(--color-sky);background:#fff;color:var(--color-accent);border-radius:18px;transition:left 360ms cubic-bezier(.22,.7,.22,1),top 360ms cubic-bezier(.22,.7,.22,1),width 360ms cubic-bezier(.22,.7,.22,1),height 360ms cubic-bezier(.22,.7,.22,1),background-color 280ms,border-color 280ms,border-radius 360ms;overflow:hidden;will-change:left,top,width,height}.morph-card.store{background:var(--color-sky);color:#fff}.morph-icon{position:absolute;left:16px;top:50%;transform:translateY(-50%);transition:left 360ms,top 360ms,transform 360ms}.morph-label{position:absolute;left:48px;top:50%;transform:translateY(-50%);white-space:nowrap;font-size:var(--font-secondary);font-weight:600;transition:left 360ms,top 360ms,transform 360ms,font-size 360ms,color 280ms}.morph-arrow{position:absolute;right:12px;top:50%;transform:translateY(-50%);transition:opacity 100ms}.morph-card.is-target{border-radius:12px;border-color:transparent;background:#fff;color:var(--color-muted)}.is-target.is-selected{color:var(--color-accent)}.is-target .morph-icon{left:50%;top:5px;transform:translate(-50%,0)}.is-target .morph-label{left:50%;top:33px;transform:translate(-50%,0);font-size:var(--font-caption)}.is-target .morph-arrow{opacity:0}.join-options{display:flex;gap:8px;flex-wrap:wrap;margin:24px 0}.join-options button{font-size:var(--font-secondary);padding:10px 14px;background:var(--color-background);border:1px solid var(--color-line);border-radius:12px;min-height:44px}.join-options .chosen{border-color:var(--color-accent);color:var(--color-accent);background:var(--color-soft)}.dialog-card .muted-note{margin:24px 0}.compact .chapter-content,.tiny .chapter-content{padding-top:20px;padding-bottom:calc(88px + var(--safe-bottom))}.compact .chapter-title,.tiny .chapter-title{font-size:var(--font-title-1);line-height:1.3;margin-top:12px}.compact .chapter-visual{height:120px;margin:16px 0}.compact .chapter-body,.tiny .chapter-body{font-size:var(--font-secondary);line-height:1.65}.compact .chapter-note,.tiny .chapter-note{font-size:var(--font-caption);line-height:1.4;margin-top:12px}.compact .join-symbol,.tiny .join-symbol,.compact .landing-footer,.tiny .landing-footer{display:none}.compact .join .chapter-body,.tiny .join .chapter-body{margin-top:16px}.compact .join-button,.tiny .join-button{margin-top:20px}.tiny .chapter-content{padding-top:16px;padding-bottom:calc(84px + var(--safe-bottom))}.tiny .chapter-title{font-size:var(--font-title-1);line-height:1.25;margin-top:10px}.tiny .chapter-visual{height:60px;margin:12px 0}.tiny .exhibition-grid{height:96px}.tiny .orbit{font-size:var(--font-caption);padding:6px 12px;right:16px}.tiny .source-link{margin-top:12px}.tiny .opening{padding-top:8px}.tiny .landing-brand{margin-bottom:0}.tiny .campaign{padding-top:8px}.tiny .campaign-name{font-size:var(--font-title-1)}.tiny .campaign-line{margin-top:4px}.tiny .entry{height:52px;padding:10px 12px;gap:8px}.tiny .entry>text{font-size:var(--font-secondary)}.tiny .entry>image:last-child{display:none}.tiny .bubble{max-width:54px;font-size:var(--font-secondary)}

@media(max-width:360px){.entry{padding:10px 12px;gap:8px}.entry :deep(image:last-child){display:none}}
.compact .opening{padding-top:8px}.compact .landing-brand{height:24px;margin-bottom:0}.compact .campaign{padding-top:8px}.compact .campaign-name{font-size:var(--font-title-1)}.compact .campaign-line{margin-top:4px}.compact .campaign-link{display:none}.compact .entry{height:52px}.compact .down-cue{min-height:44px}
/* #ifdef H5 */
/* Prevent focus and scrollIntoView from displacing a translated swiper frame. */
.section-swiper :deep(.uni-swiper-wrapper){overflow:clip}
/* #endif */
</style>
