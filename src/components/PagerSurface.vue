<script setup lang="ts">
defineOptions({inheritAttrs:false});
const emit=defineEmits<{wheel:[event:WheelEvent];key:[event:KeyboardEvent];'pointer-start':[event:PointerEvent];'pointer-end':[event:PointerEvent];'capture-click':[event:MouseEvent]}>();
</script>
<template>
  <!-- #ifdef H5 -->
  <div class="pager-surface" v-bind="$attrs" role="region" aria-label="爱分你介绍，可使用上下方向键逐屏浏览" tabindex="0" @wheel.capture="emit('wheel',$event)" @keydown="emit('key',$event)" @pointerdown.capture="emit('pointer-start',$event)" @pointerup.capture="emit('pointer-end',$event)" @click.capture="emit('capture-click',$event)"><slot/></div>
  <!-- #endif -->
  <!-- #ifndef H5 -->
  <view class="pager-surface"><slot/></view>
  <!-- #endif -->
</template>
<style scoped>
.pager-surface{height:100%;position:relative;overflow:hidden;outline:none;touch-action:pan-y}
</style>
