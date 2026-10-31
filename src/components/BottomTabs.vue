<script setup lang="ts">
import {getCurrentInstance} from 'vue';
import LineIcon from './LineIcon.vue';
import {layoutRects} from '../composables/viewport';
export type MainTab='home'|'store'|'mine';
const props=withDefaults(defineProps<{active:string;visible?:boolean;manual?:boolean;morphing?:boolean}>(),{visible:true,manual:false,morphing:false});
const emit=defineEmits<{select:[tab:MainTab]}>();
const tabs=[{id:'home' as MainTab,name:'首页',icon:'home'},{id:'store' as MainTab,name:'商城',icon:'store'},{id:'mine' as MainTab,name:'我的',icon:'user'}];
const instance=getCurrentInstance();
function go(tab:MainTab){if(!props.visible)return;if(props.manual)emit('select',tab);else uni.reLaunch({url:`/pages/${tab}/index`});}
function measureTabs():Promise<{left:number;top:number;width:number;height:number}[]>{
  return new Promise(resolve=>{
    const query=uni.createSelectorQuery().in(instance?.proxy);
    query.selectAll('.tab-slot').boundingClientRect(rects=>resolve(layoutRects(rects))).exec();
  });
}
defineExpose({measureTabs});
</script>
<template><view class="bottom-tabs" :class="{'dock-hidden':!visible,'dock-visible':visible,'dock-morphing':morphing}" role="navigation" aria-label="主导航" :aria-hidden="!visible"><view v-for="t in tabs" :key="t.id" class="tab-slot"><button role="button" class="tab" :class="{selected:active===t.id,'awaiting-morph':morphing&&t.id!=='home'}" @click="go(t.id)" :aria-label="t.name" :aria-current="active===t.id?'page':undefined" :tabindex="visible?0:-1"><LineIcon :name="t.icon" :size="24" :color="active===t.id?'#126fa4':'#5d7482'"/><text>{{t.name}}</text></button></view></view></template>
<style scoped>
.bottom-tabs{position:fixed;bottom:0;left:0;right:0;z-index:50;display:flex;max-width:480px;margin:auto;background:rgba(255,255,255,.98);border-top:1px solid var(--color-line);box-shadow:0 -6px 24px #1d5c7b06;padding:4px 24px calc(4px + var(--safe-bottom, env(safe-area-inset-bottom)));transition:opacity 200ms ease}
.tab-slot{flex:1;min-width:0;min-height:56px}.tab{width:100%;min-height:56px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;padding:4px 8px;color:var(--color-muted);font-size:var(--font-caption);background:none;line-height:1.3;border-radius:12px}.selected{color:var(--color-accent);font-weight:600}.dock-hidden{opacity:0;pointer-events:none}.dock-hidden .tab{pointer-events:none}.dock-visible .tab{animation:dock-arrive 240ms ease-out}.awaiting-morph{opacity:0!important;animation:none!important}@keyframes dock-arrive{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
</style>
