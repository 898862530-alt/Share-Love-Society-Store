<script setup lang="ts">
import ProductVisual from './ProductVisual.vue';import {openProduct,type Product} from '../data/catalog';defineProps<{product:Product}>();
</script>
<template><button class="product-card" @click="openProduct(product.id)" :aria-label="`查看${product.name}`"><ProductVisual :product="product"/><view class="card-copy"><text class="card-eyebrow">{{product.category==='coffee'?'爱分你 × 植造社':product.category==='bakery'?'福建风土 · 茶点系列':'ART IN EVERYDAY'}}</text><text class="card-name">{{product.name}}</text><text class="card-subtitle">{{product.subtitle}}</text><view class="card-bottom"><text class="card-price">{{product.category==='clothing'?'概念展示':'售价待公布'}}</text><view class="card-arrow">↗</view></view></view></button></template>
<style scoped>
.product-card{text-align:left;width:100%;height:100%;padding:0;background:var(--color-surface);overflow:hidden;border-radius:var(--radius-card);line-height:var(--line-secondary);box-shadow:var(--shadow-card);white-space:normal;display:flex;flex-direction:column}
.card-copy{padding:var(--space-5);position:relative;flex:1;display:flex;flex-direction:column;width:100%}
.card-eyebrow{display:block;font-size:var(--font-caption);color:var(--color-muted);margin-bottom:var(--space-2);line-height:var(--line-secondary)}
.card-name{display:block;font-size:var(--font-title-3);font-weight:var(--weight-semibold);line-height:1.4;min-height:2.8em}
.card-subtitle{display:block;color:var(--color-secondary);font-size:var(--font-secondary);margin-top:var(--space-2);min-height:3em}
.card-bottom{display:flex;align-items:center;justify-content:space-between;gap:var(--space-3);margin-top:var(--space-5)}
.card-price{display:block;font-size:var(--font-footnote);color:var(--color-muted)}
.card-arrow{border:1px solid var(--color-line);border-radius:50%;width:var(--touch-target);height:var(--touch-target);display:flex;align-items:center;justify-content:center;color:var(--color-accent);font-size:var(--font-title-3);flex:none}
</style>
