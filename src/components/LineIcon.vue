<script setup lang="ts">
import {computed} from 'vue';
const props=withDefaults(defineProps<{name:string;size?:number;color?:string}>(),{size:28,color:'#222522'});
const paths:Record<string,string>={coffee:'<path d="M5 9h15v8a6 6 0 0 1-6 6h-3a6 6 0 0 1-6-6V9Zm15 1h2a3.5 3.5 0 0 1 0 7h-2M4 26h19M9 3v3m5-3v3m5-3v3"/>',bakery:'<path d="M6 10c-4 1-4 7 0 9l2-4m18-5c4 1 4 7 0 9l-2-4M8 8c-3 0-4 3-2 6l4 7c1 2 3 1 4 0l2-3 2 3c1 1 3 2 4 0l4-7c2-3 1-6-2-6l-4-1-4-1-4 1-4 1Zm4-1 1 7m7-7-1 7"/>',clothing:'<path d="m11 5-7 4-3 7 6 3 2-4v13h14V15l2 4 6-3-3-7-7-4a5 5 0 0 1-10 0Z"/>',discover:'<circle cx="16" cy="16" r="12"/><path d="m21 11-3 7-7 3 3-7 7-3Z"/>',store:'<path d="M7 11h18l2 17H5l2-17Zm5 0V8a4 4 0 0 1 8 0v3"/>',arrow:'<path d="M7 16h18m-7-7 7 7-7 7"/>',back:'<path d="m20 7-9 9 9 9"/>',chevron:'<path d="m12 7 9 9-9 9"/>',heart:'<path d="M16 27 4 16C-3 8 8 0 16 9 24 0 35 8 28 16L16 27Z"/>'};
const src=computed(()=>`data:image/svg+xml;charset=utf-8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="${props.color}" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round">${paths[props.name]||paths.arrow}</svg>`)}`);
</script>
<template><image :src="src" :style="{width:size+'px',height:size+'px',flexShrink:0}" mode="aspectFit" aria-hidden="true" /></template>
