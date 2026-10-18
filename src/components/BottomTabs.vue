<script setup lang="ts">
import LineIcon from './LineIcon.vue';
defineProps<{active:string}>();
function go(tab:string){uni.reLaunch({url:tab==='discover'?'/pages/discover/index':'/pages/home/index'})}
</script>
<template><view class="bottom-tabs" role="tablist" aria-label="主导航"><button class="tab" :class="{selected:active==='discover'}" @click="go('discover')" aria-label="发现" role="tab" :aria-selected="active==='discover'"><LineIcon name="discover" :size="24" :color="active==='discover'?'#315b43':'#60695d'"/><text>发现</text></button><button class="tab" :class="{selected:active==='store'}" @click="go('store')" aria-label="商城" role="tab" :aria-selected="active==='store'"><LineIcon name="store" :size="24" :color="active==='store'?'#315b43':'#60695d'"/><text>商城</text></button></view></template>
<style scoped>
.bottom-tabs{position:fixed;bottom:0;left:0;right:0;z-index:40;display:flex;align-items:stretch;background:rgba(255,255,255,.97);border-top:1px solid var(--color-line);padding:var(--space-1) var(--space-6) calc(var(--space-1) + env(safe-area-inset-bottom));backdrop-filter:blur(20px)}
.tab{flex:1;min-height:56px;min-width:var(--touch-target);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:var(--space-1);padding:var(--space-1) var(--space-2);color:var(--color-muted);font-size:var(--font-caption);background:none;border:0;line-height:1.3}
.selected{color:var(--color-accent);font-weight:var(--weight-semibold)}
</style>
