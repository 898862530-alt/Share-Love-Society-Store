<script setup lang="ts">
import {ref,computed} from 'vue';import {onLoad} from '@dcloudio/uni-app';import {getProduct,getArt,openProduct} from '../../data/catalog';import PageHeader from '../../components/PageHeader.vue';import BottomTabs from '../../components/BottomTabs.vue';import ProductVisual from '../../components/ProductVisual.vue';import LineIcon from '../../components/LineIcon.vue';
const productId=ref('gayo');const artId=ref(1);onLoad(q=>{productId.value=q?.product||'gayo';artId.value=Number(q?.art)||1});const p=computed(()=>getProduct(productId.value));const a=computed(()=>getArt(artId.value));const partner=computed(()=>p.value.category==='coffee'?'植造社':p.value.category==='bakery'?'烘焙伙伴':'服装伙伴');
</script>
<template><view class="artwork-page screen"><PageHeader label="作品画廊"/><view class="gallery-wall"><text class="gallery-index">SHARE LOVE GALLERY / {{String(a.id).padStart(2,'0')}}</text><view class="framed-art"><view class="frame-mat"><image class="gallery-picture" :src="a.image" mode="aspectFill"/></view></view><view class="art-label"><text class="art-name">{{a.name}}</text><text class="art-name-en">{{a.en}}</text><text class="art-creator">{{a.author}} · 演示作品</text></view><view class="scroll-cue"><text>向下，走近这幅画</text><text class="down-arrow">↓</text></view></view><view class="story-section story-panel"><text class="section-kicker">BEHIND THE ARTWORK</text><text class="story-title">每一种表达，<br/>都有自己的光。</text><view class="story-block"><text class="story-small-heading">关于作品</text><text class="story-body">{{a.story}}</text></view><view class="story-block"><text class="story-small-heading">关于创作者</text><text class="story-body">这里将介绍创作者的绘画经历、日常兴趣，以及这幅作品背后的真实故事。我们期待用创作者自己的表达，让你认识画作背后的那个人。</text></view><text class="story-note">作品故事为演示文案；作者名与个人故事待真实资料提供后替换。当前画作为 AI 生成占位素材。</text></view><view class="collab-story story-panel"><text class="section-kicker">FROM ART TO EVERYDAY</text><text class="story-title">{{p.category==='coffee'?'从一幅画，\n到一袋好咖啡。':'从一幅画，\n到日常的一部分。'}}</text><view class="collab-art-pair"><view class="mini-frame"><image :src="a.image" mode="aspectFill"/></view><text class="pair-plus">×</text><view class="mini-product"><ProductVisual :product="{...p,art:a.id}"/></view></view><text class="collab-brand">爱分你 × {{partner}}</text><text class="story-body">{{p.category==='coffee'?`爱分你连接孤独症艺术家的画作，植造社带来好咖啡。在这次联名的设计中，《${a.name}》成为${p.name}咖啡包装的一部分，让打开咖啡的日常，也成为一次与艺术相遇的机会。`:`爱分你希望与品牌一起，让《${a.name}》走进日常产品。以作品为连接，让更多人认识创作者，也为孤独症公益带来更多关注。`}}</text><text class="story-note">联名包装为概念演示，正式授权、合作方式与支持机制以双方确认的信息为准。</text></view><view class="related-section story-panel"><text class="section-kicker">MEET THE PRODUCT</text><text class="story-title">{{p.category==='coffee'?'认识这杯咖啡。':p.category==='bakery'?'认识这份茶点。':'认识这件联名。'}}</text><view class="related-visual"><ProductVisual :product="{...p,art:a.id}" large/></view><text class="related-name">{{p.name}} <text>{{p.category==='coffee'?p.en:''}}</text></text><text class="related-sub">{{p.subtitle}}</text><text class="story-body">{{p.description}}</text><button class="text-link" @click="openProduct(p.id)">了解这款{{p.category==='coffee'?'咖啡':p.category==='bakery'?'茶点':'产品'}}的更多信息<LineIcon name="arrow" :size="18"/></button></view><BottomTabs active="store"/></view></template>
<style scoped>
.artwork-page{background:var(--color-surface)}
.gallery-wall{min-height:calc(100vh - var(--nav-height) - var(--tab-height) - env(safe-area-inset-top) - env(safe-area-inset-bottom));min-height:calc(100svh - var(--nav-height) - var(--tab-height) - env(safe-area-inset-top) - env(safe-area-inset-bottom));padding:var(--space-8) var(--page-gutter);display:flex;flex-direction:column;align-items:center;justify-content:center;background:var(--color-surface)}
.gallery-index{font-size:var(--font-caption);line-height:var(--line-secondary);letter-spacing:1px;color:var(--color-muted);margin-bottom:var(--space-8);text-align:center}
.framed-art{width:100%;max-width:320px;padding:10px;background:repeating-linear-gradient(92deg,#ae7e4b 0px,#c79865 1px,#d9b48a 3px,#c89a65 5px,#d8b489 7px,#d1a879 10px);box-shadow:8px 14px 20px #32241018,2px 3px 6px #32241022,inset 0 0 0 1px #a5794b,inset 2px 2px 2px #f3d9b8;border:1px solid #c39361}
.frame-mat{padding:var(--space-4);background:#faf9f4;box-shadow:inset 1px 1px 4px #533a2226}
.gallery-picture{width:100%;height:auto;aspect-ratio:1;box-shadow:0 0 2px #352a2320}
.art-label{text-align:center;margin-top:var(--space-6)}
.art-name{font-size:var(--font-title-3);line-height:var(--line-title);display:block;font-weight:var(--weight-semibold)}
.art-name-en{font-size:var(--font-footnote);line-height:var(--line-secondary);letter-spacing:.4px;color:var(--color-muted);display:block;margin-top:var(--space-2)}
.art-creator{font-size:var(--font-footnote);line-height:var(--line-secondary);color:var(--color-secondary);display:block;margin-top:var(--space-2)}
.scroll-cue{margin-top:var(--space-8);text-align:center;font-size:var(--font-footnote);line-height:var(--line-secondary);color:var(--color-muted)}
.down-arrow{display:block;font-size:var(--font-title-3);margin-top:var(--space-1)}
.story-panel{padding:var(--space-16) var(--page-gutter);display:flex;flex-direction:column;justify-content:center}
.story-section{background:var(--color-background)}
.story-title{font-size:var(--font-title-1);line-height:var(--line-title);letter-spacing:-.5px;display:block;margin-top:var(--space-4);font-weight:var(--weight-bold);white-space:pre-line}
.story-block{margin-top:var(--space-8)}
.story-small-heading{display:block;font-size:var(--font-title-3);line-height:var(--line-title);font-weight:var(--weight-semibold);color:var(--color-text);margin-bottom:var(--space-3)}
.story-body{font-size:var(--font-body);line-height:var(--line-body);color:var(--color-secondary);display:block}
.story-note{display:block;font-size:var(--font-footnote);line-height:var(--line-secondary);color:var(--color-muted);margin-top:var(--space-6)}
.collab-story{background:var(--color-surface)}
.collab-art-pair{display:flex;align-items:center;justify-content:space-between;margin:var(--space-8) 0;gap:var(--space-3)}
.mini-frame{width:42%;border:6px solid #cba475;background:#faf8f1;padding:var(--space-2);transform:rotate(-6deg);box-shadow:1px 5px 15px #312b2210}
.mini-frame image{width:100%;height:auto;aspect-ratio:1}
.pair-plus{font-size:var(--font-title-3);color:var(--color-muted);flex:none}
.mini-product{width:42%;border-radius:var(--radius-image);overflow:hidden;transform:rotate(4deg)}
.mini-product :deep(.product-visual){height:176px}
.mini-product :deep(.pouch){transform:scale(.8) rotate(-4deg)}
.mini-product :deep(.shirt){transform:scale(.75)}
.collab-brand{font-size:var(--font-title-3);line-height:var(--line-title);color:var(--color-text);display:block;margin-bottom:var(--space-4);font-weight:var(--weight-semibold)}
.related-section{background:var(--color-soft)}
.related-visual{margin:var(--space-8) 0 var(--space-6);border-radius:var(--radius-card);overflow:hidden}
.related-visual :deep(.product-visual){height:320px}
.related-visual :deep(.large .pouch){transform:scale(1.5) rotate(-4deg)}
.related-name{font-size:var(--font-title-1);font-weight:var(--weight-bold);line-height:var(--line-title);display:block;letter-spacing:-.5px}
.related-name text{font-size:var(--font-footnote);letter-spacing:1px;font-weight:var(--weight-regular);color:var(--color-muted);margin-left:var(--space-2)}
.related-sub{display:block;margin:var(--space-3) 0 var(--space-6);font-size:var(--font-secondary);line-height:var(--line-secondary);color:var(--color-secondary)}
.related-section .text-link{margin-top:var(--space-6)}
</style>
