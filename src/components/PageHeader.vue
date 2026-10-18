<script setup lang="ts">
import LineIcon from './LineIcon.vue';defineProps<{label?:string}>();function back(){if(getCurrentPages().length>1)uni.navigateBack();else uni.reLaunch({url:'/pages/home/index'})}
</script>
<template><view class="page-header"><button class="back" @click="back" aria-label="返回上一页"><LineIcon name="back" :size="24"/></button><text class="header-label">{{label||'爱分你'}}</text><view class="header-spacer" aria-hidden="true"/></view></template>
<style scoped>
.page-header{min-height:calc(var(--nav-height) + env(safe-area-inset-top));display:grid;grid-template-columns:44px 1fr 44px;align-items:center;padding:env(safe-area-inset-top) var(--page-gutter) 0;position:sticky;top:0;z-index:30;background:rgba(255,255,255,.97);backdrop-filter:blur(16px);border-bottom:1px solid var(--color-line)}
.back{width:var(--touch-target);min-height:var(--touch-target);display:flex;align-items:center;justify-content:flex-start;background:none;padding:0}
.header-label{font-size:var(--font-body);font-weight:var(--weight-semibold);text-align:center;line-height:var(--line-secondary);padding:var(--space-2) 0}
.header-spacer{width:var(--touch-target)}
</style>
