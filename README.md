# 爱分你 · 联名商店

移动端交互设计 Demo，基于 uni-app、Vue 3 和 TypeScript。首页三款主推产品与四段公益介绍，联名商城、作品画廊、收藏、购物车和演示订单已打通。当前记录保存在本机，尚未接入真实账号、支付与后台。

```sh
pnpm install
pnpm dev
pnpm build
pnpm build:mp-weixin
pnpm typecheck
```

H5 使用 hash 路由。微信构建输出在 `dist/build/mp-weixin`，使用微信开发者工具导入并配置自己的 AppID。正式发布前仍需真机验证、授权素材与交易能力接入。

- 设计标准与待补资料：`docs/DESIGN.md`
- 商品和作品数据：`src/data/catalog.ts`
- 主推、逐款详情与演示规格：`src/data/editorial.ts`
- 本机购物与订单状态：`src/stores/commerce.ts`
- 图片资产：`src/static/assets/`
- 生成提示词：`docs/image-prompts.json`、`docs/image-prompts-v3.json`

## GitHub Pages

线上演示：https://898862530-alt.github.io/Share-Love-Society-Store/

推送到 main 后，GitHub Actions 会检查类型、构建 H5 并部署 Pages。在仓库 Settings → Pages 中，发布来源设为 GitHub Actions。

```sh
pnpm run build:pages
```

产物位于 `dist/github-pages`，默认适配仓库子路径。`PAGES_BASE_PATH` 可以覆盖部署路径。普通根目录部署继续使用 `pnpm build`，微信构建继续使用 `pnpm build:mp-weixin`。
