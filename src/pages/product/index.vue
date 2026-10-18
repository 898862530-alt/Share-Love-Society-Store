<script setup lang="ts">
import {ref,computed} from 'vue';import {onLoad} from '@dcloudio/uni-app';import {getProduct,artworks,openArt,openCategory} from '../../data/catalog';import PageHeader from '../../components/PageHeader.vue';import ProductVisual from '../../components/ProductVisual.vue';import BottomTabs from '../../components/BottomTabs.vue';import LineIcon from '../../components/LineIcon.vue';
const id=ref('gayo');onLoad(q=>{id.value=q?.id||'gayo'});const p=computed(()=>getProduct(id.value));const partner=computed(()=>p.value.category==='coffee'?'植造社':p.value.category==='bakery'?'烘焙伙伴':'服装伙伴');
function explore(){uni.pageScrollTo({selector:'#collaboration',duration:500})}
</script>
<template><view class="product-page screen"><PageHeader label="联名产品"/><view class="product-topline"><text>爱分你 × {{partner}}</text><text>{{p.category==='coffee'?'ISLAND COLLECTION':p.category==='bakery'?'FUJIAN TEA COLLECTION':'ART IN EVERYDAY'}}</text></view><view class="product-hero"><ProductVisual :product="p" large/></view><view class="product-info"><text class="section-kicker">{{p.en}}</text><text class="product-title">{{p.name}}</text><text class="product-slogan">{{p.slogan}}</text><view class="product-info-meta"><text>{{p.subtitle}}</text><text class="price-label">{{p.category==='clothing'?'概念展示':'售价待公布'}}</text></view><button class="explore-button" @click="explore">探索联名作品<LineIcon name="arrow" :size="19" color="#fff"/></button><text class="product-image-note">包装与配图为概念展示，实际商品以正式发布为准。</text></view><view class="product-details"><text class="section-kicker">A CLOSER LOOK</text><text class="detail-title">{{p.category==='coffee'?'风味，自有来处。':p.category==='bakery'?'风土，融进每一口。':'让艺术，陪伴日常。'}}</text><text class="detail-description">{{p.description}}</text><view v-if="p.notes" class="flavor-list"><view v-for="(note,i) in p.notes" :key="note" class="flavor"><text>{{['前调','中调','尾调'][i]}}</text><text>{{note}}</text></view></view><view class="spec-list"><view v-if="p.origin" class="spec"><text>产地</text><text>{{p.origin}}</text></view><view v-if="p.process" class="spec"><text>{{p.category==='bakery'?'工艺方向':'处理方式'}}</text><text>{{p.process}}</text></view><view class="spec"><text>{{p.category==='clothing'?'面料 / 尺码':'规格 / 净含量'}}</text><text>待确认</text></view><view class="spec"><text>联名形式</text><text>艺术作品 × 日常产品</text></view></view><text v-if="p.id==='malino'||p.id==='temanggung'" class="muted-note">豆种与批次信息待供应方确认。{{p.id==='temanggung'?'处理方式待确认。':''}}</text><text v-if="p.pending" class="muted-note">{{p.category==='coffee'?'此款产品的产地、风味、处理方式与规格待确认。':'本款为服装概念展示，正式款式及商品信息待补充。'}}</text></view><view id="collaboration" class="collaboration-section"><view class="collaboration-intro"><text class="section-kicker">ART MEETS EVERYDAY</text><text class="collaboration-title">爱分你 × {{partner}}</text><text class="collaboration-sub">{{p.category==='coffee'?'好咖啡，遇见另一种表达。':'让一幅画，拥有日常的模样。'}}</text><text class="collaboration-copy">{{p.category==='coffee'?'爱分你连接孤独症艺术家的创作，植造社带来好咖啡。我们希望让画作离开画册，走进每一袋咖啡，也走进更多人的日常。':'爱分你希望通过与品牌合作，将孤独症艺术家的画作与日常产品联名。让一幅作品被看见，也让一份理解在生活里慢慢发生。'}}</text><text class="gallery-hint">8 幅作品，8 种看世界的方式。点一幅，走近一点。</text></view><view class="art-grid"><view v-for="(a,i) in artworks" :key="a.id" class="art-grid-cell" :class="i%2===1?'offset':''"><button class="art-tile" @click="openArt(p.id,a.id)" :aria-label="`走近作品${a.name}`"><view class="art-thumb"><image :src="a.image" mode="aspectFill"/></view><view class="art-tile-caption"><text>{{a.name}}</text><text class="art-tile-arrow">↗</text></view><text class="art-author">{{a.author}}</text></button></view></view><text class="gallery-disclaimer">以上 8 幅为 AI 生成的演示作品，作者名与故事均为占位内容，非真实艺术家资料。</text></view><view class="product-end"><text class="end-title">让一幅画，<br/>多一种被看见的方式。</text><button class="text-link" @click="openCategory(p.category)">继续探索{{p.category==='coffee'?'咖啡':p.category==='bakery'?'烘焙':'服装'}}<LineIcon name="arrow" :size="18"/></button></view><BottomTabs active="store"/></view></template>
<style scoped>
.product-page{background:var(--color-surface)}
.product-topline{padding:var(--space-4) var(--page-gutter);display:flex;flex-direction:column;gap:var(--space-1);font-size:var(--font-footnote);line-height:var(--line-secondary);color:var(--color-secondary)}
.product-topline text:last-child{font-size:var(--font-caption);letter-spacing:1px;color:var(--color-muted)}
.product-hero{margin:0 var(--page-gutter);border-radius:var(--radius-card);overflow:hidden}
.product-info{padding:var(--space-8) var(--page-gutter)}
.product-title{font-size:var(--font-large-title);letter-spacing:-.8px;display:block;line-height:var(--line-title);font-weight:var(--weight-bold);margin-top:var(--space-3)}
.product-slogan{font-size:var(--font-title-3);line-height:var(--line-secondary);color:var(--color-secondary);display:block;margin-top:var(--space-3);font-weight:var(--weight-regular)}
.product-info-meta{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:baseline;font-size:var(--font-secondary);color:var(--color-secondary);margin:var(--space-6) 0;gap:var(--space-2) var(--space-4);line-height:var(--line-secondary)}
.price-label{font-size:var(--font-footnote)}
.explore-button{display:flex;align-items:center;justify-content:center;gap:var(--space-3);background:var(--color-accent);color:var(--color-on-accent);border-radius:var(--radius-small);min-height:var(--control-height);padding:var(--space-3) var(--space-5);width:100%;font-size:var(--font-body);font-weight:var(--weight-semibold)}
.product-image-note{font-size:var(--font-footnote);line-height:var(--line-secondary);color:var(--color-muted);display:block;margin-top:var(--space-4)}
.product-details{padding:var(--space-12) var(--page-gutter);background:var(--color-background)}
.detail-title{display:block;font-size:var(--font-title-1);line-height:var(--line-title);font-weight:var(--weight-bold);letter-spacing:-.5px;margin-top:var(--space-4)}
.detail-description{font-size:var(--font-body);line-height:var(--line-body);color:var(--color-secondary);display:block;margin-top:var(--space-6)}
.flavor-list{margin-top:var(--space-6);display:flex;border-top:1px solid var(--color-line);border-bottom:1px solid var(--color-line);padding:var(--space-5) 0}
.flavor{flex:1;min-width:0;display:flex;flex-direction:column;gap:var(--space-2);padding:0 var(--space-2);text-align:center;border-right:1px solid var(--color-line);font-size:var(--font-secondary);line-height:var(--line-secondary)}
.flavor:last-child{border:0}
.flavor text:first-child{font-size:var(--font-footnote);color:var(--color-muted)}
.spec-list{margin:var(--space-6) 0}
.spec{padding:var(--space-4) 0;display:flex;justify-content:space-between;gap:var(--space-4);font-size:var(--font-secondary);line-height:var(--line-secondary);color:var(--color-text);border-bottom:1px solid var(--color-line)}
.spec text:first-child{color:var(--color-secondary);flex:none;max-width:42%}
.spec text:last-child{text-align:right}
.collaboration-section{padding:0 var(--page-gutter) var(--space-12);background:var(--color-surface);scroll-margin-top:calc(var(--nav-height) + env(safe-area-inset-top))}
.collaboration-intro{padding:var(--space-16) 0 var(--space-10);display:flex;flex-direction:column}
.collaboration-title{font-size:var(--font-title-1);font-weight:var(--weight-bold);display:block;line-height:var(--line-title);letter-spacing:-.5px;margin-top:var(--space-4)}
.collaboration-sub{display:block;font-size:var(--font-title-3);line-height:var(--line-secondary);color:var(--color-secondary);margin-top:var(--space-3)}
.collaboration-copy{font-size:var(--font-body);line-height:var(--line-body);color:var(--color-secondary);margin-top:var(--space-6);display:block}
.gallery-hint{font-size:var(--font-secondary);line-height:var(--line-secondary);color:var(--color-secondary);margin-top:var(--space-6);display:block}
.art-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:var(--space-8) var(--space-4);padding-bottom:var(--space-12)}
.offset{transform:translateY(var(--space-12))}
.art-tile{width:100%;padding:0;background:none;line-height:var(--line-secondary);text-align:left;white-space:normal}
.art-thumb{padding:6px;background:#faf9f3;border:1px solid #e6e3d8;box-shadow:0 4px 16px #2830200a}
.art-thumb image{width:100%;aspect-ratio:1;height:auto}
.art-tile-caption{display:flex;justify-content:space-between;align-items:baseline;font-size:var(--font-secondary);font-weight:var(--weight-medium);color:var(--color-text);margin-top:var(--space-3);gap:var(--space-1)}
.art-tile-arrow{color:var(--color-accent);flex:none}
.art-author{display:block;font-size:var(--font-caption);color:var(--color-muted);margin-top:var(--space-1)}
.gallery-disclaimer{display:block;font-size:var(--font-footnote);line-height:var(--line-secondary);color:var(--color-muted);margin-top:var(--space-6)}
.product-end{background:var(--color-soft);padding:var(--space-12) var(--page-gutter)}
.end-title{font-size:var(--font-title-1);line-height:var(--line-title);letter-spacing:-.5px;color:var(--color-text);font-weight:var(--weight-bold);display:block;margin-bottom:var(--space-6)}
</style>
