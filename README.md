# 裁度 Atelier — 数据化服装选型工坊

通过净体 8 维测量、制版松量几何推演、跨码风格对比与网购尺码表反推验算，引导普通人像专业服装设计师一样用数据选衣。

## 本地开发与构建

```bash
npm install
npm run dev      # 启动本地开发服务 (http://localhost:3000)
npm run build    # 构建生产静态产物至 dist/
```

## 部署至 `atelier.ykx-uas.com`（GitHub + Cloudflare Pages）

1. 将本仓库推送至你的 GitHub（可直接点击 AI Studio 右上角 **Save to GitHub**）。
2. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**，选择该仓库。
3. 构建配置：
   - **Framework preset**：`Vite`
   - **Build command**：`npm run build`
   - **Build output directory**：`dist`
   - （仓库根目录已内置 `.node-version` 指定 Node 22，无需额外配置环境变量）
4. 部署完成后，在项目页进入 **Custom domains（自定义域）** → 添加 `atelier.ykx-uas.com`，Cloudflare 会自动在 `ykx-uas.com` 下创建 CNAME 记录并签发 HTTPS 证书。
