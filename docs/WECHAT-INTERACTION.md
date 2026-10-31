# 微信顶部区域与首页分页

2026-10-31：完整阅读微信官方设计指南，并阅读以下配置、API 与组件文档。官方网页通过直接请求读取；未依赖第三方转载的规范。

## 官方依据

- [微信小程序设计指南](https://developers.weixin.qq.com/miniprogram/design/)：重点突出、流程明确、导航明确、及时反馈、异常有路可退、避免误操作、统一稳定、响应式布局。官方菜单位置固定，应预留空间，业务元素不能与其交互冲突。次级页面建议提供左上角返回。
- [页面配置](https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/page.html)：`navigationStyle: custom` 保留右上角胶囊；`disableScroll` 控制页面整体滚动。
- [getMenuButtonBoundingClientRect](https://developers.weixin.qq.com/miniprogram/dev/api/ui/menu/wx.getMenuButtonBoundingClientRect.html)：胶囊矩形坐标以屏幕左上角为原点。
- [getWindowInfo](https://developers.weixin.qq.com/miniprogram/dev/api/base/system/wx.getWindowInfo.html)：使用实际窗口宽高、状态栏、安全区与窗口上边缘偏移；兼容安全区缺失。
- [swiper](https://developers.weixin.qq.com/miniprogram/dev/component/swiper.html)：纵向、单个可见滑块、非循环、change/transition/animationfinish 事件。只以 `swiper-item` 为直接子节点。

## 落地

1. `MiniChrome` 与共享窗口布局 为所有现有页面预留完整顶部控件带。微信端读取真实窗口与胶囊数据；胶囊 API 不可用或数据异常时，以状态栏加 44px 导航区回退。窗口已经排除底部区域时，不重复扣减。
2. 次级页自己的返回/标题栏从控件带下方开始，滚动时停在同一位置。商城头部不占用原生胶囊所在区域。H5 显示简化的非交互胶囊，预留 46px 加浏览器安全区，仅用于版式预览。
3. 首屏入口 52–60px 高，保留至少 44px 的交互热区。点击“商城中心”或“我的”，测量入口和目标 tab 的矩形，执行约 360ms 的收拢动画，选中目标后进入对应页。重复点击不会重复入栈；失败恢复入口并提示。
4. 首页纵向五屏；三款主推仍横向浏览。非循环限制首尾，窗口变化后按可用高度重新布局。触摸由跨端 swiper 处理；H5 补充滚轮、鼠标拖动与上下方向键，同一段滚轮惯性只推进一屏。
5. 下滑即出现“首页 / 商城 / 我的”，进入介绍章节后保持可见，点击首页回到首屏并收起。内容下方预留导航与底部安全区。
6. 极矮横屏或大字阅读造成内容超高时，当前章节允许内部阅读滚动，保留章节跳转与固定导航；普通手机尺寸无需内部滚动。减少动态效果偏好跳过收拢动画。

## 验证

- 类型检查、网页构建、微信小程序构建。
- `pnpm test:viewport`：小屏 iPhone、刘海屏、Android、窗口偏移、胶囊缺失/异常、底部已排除等七组独立几何用例。
- 浏览器：320×568、375×667、390×844、430×932 竖屏布局与 844×390 极矮窗口；顶部避让、首屏无 tab、章节吸附、浮动导航、末屏限位、返回首屏、两个入口收拢与选中态。
- H5 修正 `scrollIntoView` 对被平移 swiper 容器的位移，避免鼠标/键盘焦点导致半屏停靠；隐藏非当前屏的辅助功能节点。

当前微信 AppID 未配置，尚未在微信真机运行。编译与几何用例通过不能替代真机验证；正式导入微信开发者工具后，应再核对 iOS/Android 胶囊数据与纵横嵌套滑动。
