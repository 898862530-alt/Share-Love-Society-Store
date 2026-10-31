<template><view class="mini-chrome" aria-hidden="true"><!-- #ifdef H5 --><view class="preview-capsule"><text>···</text><view/><text>◉</text></view><!-- #endif --></view></template>
<style scoped>
.mini-chrome{position:fixed;top:0;left:0;right:0;max-width:480px;margin:auto;height:var(--chrome-top);background:#fff;z-index:70;pointer-events:none}
.preview-capsule{position:absolute;right:12px;bottom:6px;height:32px;width:86px;border:1px solid #d9e0e5;border-radius:18px;display:flex;align-items:center;justify-content:space-evenly;color:#273b48;background:#ffffffed;font-family:Arial,sans-serif}
.preview-capsule text:first-child{font-size:26px;line-height:20px;letter-spacing:1px;margin-top:-10px}.preview-capsule text:last-child{font-size:19px;line-height:1}.preview-capsule view{height:18px;width:1px;background:#dde4e8}
</style>
