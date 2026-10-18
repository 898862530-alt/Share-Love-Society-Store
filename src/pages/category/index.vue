<script setup lang="ts">
import {ref,computed} from 'vue';import {onLoad} from '@dcloudio/uni-app';import {products,categories,openProduct,type CategoryId} from '../../data/catalog';import PageHeader from '../../components/PageHeader.vue';import ProductVisual from '../../components/ProductVisual.vue';import LineIcon from '../../components/LineIcon.vue';import BottomTabs from '../../components/BottomTabs.vue';
const category=ref<CategoryId>('coffee');onLoad(q=>{if(categories.some(c=>c.id===q?.id))category.value=q?.id as CategoryId});const info=computed(()=>categories.find(c=>c.id===category.value)!);const list=computed(()=>products.filter(p=>p.category===category.value));
</script>
<template><view class="category-page screen"><PageHeader :label="info.name"/><view class="category-intro"><text class="eyebrow">{{info.en.toUpperCase()}}</text><view class="category-title"><text>{{info.name}}</text><text class="count">{{list.length.toString().padStart(2,'0')}}</text></view><text class="category-tagline">{{info.caption}}</text><text v-if="category==='clothing'" class="pending-caption">以下为服装概念展示，商品资料待确认。</text></view><view class="list"><button v-for="p in list" :key="p.id" class="list-row" @click="openProduct(p.id)" :aria-label="`查看${p.name}`"><view class="list-visual"><ProductVisual :product="p"/></view><view class="list-copy"><text class="list-en">{{p.en}}</text><text class="list-title">{{p.name}}</text><text class="list-sub">{{p.subtitle}}</text><view class="list-bottom"><text>{{p.category==='clothing'?'概念展示':'售价待公布'}}</text><LineIcon name="arrow" :size="19"/></view></view></button></view><text class="list-note">产品图片为概念展示，以正式发布资料为准。</text><BottomTabs active="store"/></view></template>
<style scoped>
.category-page{background:var(--color-surface)}
.category-intro{padding:var(--space-8) var(--page-gutter)}
.category-title{font-size:var(--font-large-title);font-weight:var(--weight-bold);line-height:var(--line-title);display:flex;align-items:center;gap:var(--space-3);margin-top:var(--space-3);letter-spacing:-.8px}
.count{font-size:var(--font-secondary);color:var(--color-muted);letter-spacing:0;font-weight:var(--weight-regular)}
.category-tagline{font-size:var(--font-body);line-height:var(--line-body);color:var(--color-secondary);display:block;margin-top:var(--space-3)}
.pending-caption{display:block;font-size:var(--font-footnote);line-height:var(--line-secondary);color:var(--color-muted);margin-top:var(--space-3)}
.list{padding:0 var(--page-gutter)}
.list-row{display:flex;width:100%;text-align:left;background:none;padding:var(--space-6) 0;border-bottom:1px solid var(--color-line);gap:var(--space-4);line-height:var(--line-secondary);align-items:center;border-radius:0}
.list-visual{width:108px;flex:none;border-radius:var(--radius-image);overflow:hidden}
.list-visual :deep(.product-visual){height:144px}
.list-visual :deep(.pouch){transform:scale(.65) rotate(-4deg)}
.list-visual :deep(.shirt){transform:scale(.65)}
.list-visual :deep(.concept){font-size:var(--font-caption);bottom:var(--space-2)}
.list-copy{flex:1;min-width:0}
.list-en{font-size:var(--font-caption);line-height:var(--line-secondary);letter-spacing:.6px;color:var(--color-muted);display:block}
.list-title{font-size:var(--font-title-3);line-height:1.4;font-weight:var(--weight-semibold);display:block;letter-spacing:0;margin-top:var(--space-1)}
.list-sub{font-size:var(--font-secondary);line-height:var(--line-secondary);color:var(--color-secondary);display:block;margin-top:var(--space-2)}
.list-bottom{display:flex;justify-content:space-between;align-items:center;gap:var(--space-2);margin-top:var(--space-3);font-size:var(--font-footnote);color:var(--color-muted);min-height:var(--touch-target)}
.list-note{display:block;font-size:var(--font-footnote);line-height:var(--line-secondary);color:var(--color-muted);text-align:center;padding:var(--space-8) var(--page-gutter)}
@media(min-width:375px){.list-visual{width:120px}.list-visual :deep(.product-visual){height:160px}.list-visual :deep(.pouch){transform:scale(.75) rotate(-4deg)}.list-visual :deep(.shirt){transform:scale(.75)}}
</style>
