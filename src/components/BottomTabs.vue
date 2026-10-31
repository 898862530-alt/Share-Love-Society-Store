<script setup lang="ts">
import LineIcon from './LineIcon.vue';
defineProps<{active:string}>();
const tabs=[{id:'home',name:'首页',icon:'home'},{id:'store',name:'商城',icon:'store'},{id:'mine',name:'我的',icon:'user'}];
function go(id:string){uni.reLaunch({url:`/pages/${id}/index`})}
</script>
<template><view class="bottom-tabs" role="navigation" aria-label="主导航"><button role="button" v-for="t in tabs" :key="t.id" class="tab" :class="{selected:active===t.id}" @click="go(t.id)" :aria-label="t.name" :aria-current="active===t.id?'page':undefined"><LineIcon :name="t.icon" :size="24" :color="active===t.id?'#126fa4':'#5d7482'"/><text>{{t.name}}</text></button></view></template>
<style scoped>
.bottom-tabs{position:fixed;bottom:0;left:0;right:0;z-index:40;display:flex;background:rgba(255,255,255,.97);border-top:1px solid var(--color-line);padding:4px 24px calc(4px + env(safe-area-inset-bottom));backdrop-filter:blur(20px)}.tab{flex:1;min-height:56px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;padding:4px 8px;color:var(--color-muted);font-size:var(--font-caption);background:none;line-height:1.3}.selected{color:var(--color-accent);font-weight:600}
</style>