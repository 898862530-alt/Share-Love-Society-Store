<script setup lang="ts">import BottomTabs from '../../components/BottomTabs.vue';</script>
<template><view class="discover screen"><text class="discover-title">发现爱分你。</text><BottomTabs active="discover"/></view></template>
<style scoped>
.discover{background:var(--color-surface);padding:calc(var(--space-16) + env(safe-area-inset-top)) var(--page-gutter) calc(var(--tab-height) + var(--space-6) + env(safe-area-inset-bottom))}
.discover-title{font-size:var(--font-large-title);line-height:var(--line-title);font-weight:var(--weight-bold);letter-spacing:-.8px}
</style>
