# VueProjectFront

这是一个基于 Vue 3、TypeScript、Vite 和 Element Plus 的后台管理前端项目。项目采用前后端分离架构，包含系统管理、设备管理、科研项目管理、登录鉴权、图表展示等页面模块，并已配置 GitHub Pages 自动部署。

## 在线访问

GitHub Pages 地址：

```text
https://chenjingling123.github.io/VueProjectFront/
```

如果页面暂时无法访问，请先到仓库的 `Actions` 页面确认部署任务是否执行成功，并在 `Settings -> Pages` 中确认 Source 已设置为 `GitHub Actions`。

## 技术栈

- Vue 3
- TypeScript
- Vite 2
- Vue Router
- Vuex
- Element Plus
- Axios
- ECharts
- VXE Table
- Sass

## 功能模块

- 登录与用户会话
- 首页工作台
- 系统管理：用户、角色、菜单、部门、岗位等
- 设备管理：跌倒检测设备等业务页面
- 科研管理：科研项目相关接口与页面
- 图表与可视化示例
- 国际化与主题配置
- API 请求封装与开发环境代理

## 项目结构

```text
VueProjectFront
├── .github/workflows        # GitHub Pages 自动部署配置
├── public                   # 静态资源
├── src
│   ├── api                  # 后端接口封装
│   ├── assets               # 本地资源
│   ├── components           # 通用组件
│   ├── i18n                 # 国际化配置
│   ├── layout               # 页面布局
│   ├── router               # 路由配置
│   ├── store                # Vuex 状态管理
│   ├── theme                # 主题样式
│   ├── utils                # 工具函数与请求封装
│   └── views                # 页面模块
├── index.html
├── package.json
└── vite.config.ts
```

## 本地运行

安装依赖：

```bash
npm install
```

启动开发环境：

```bash
npm run dev
```

默认开发端口在 `.env` 中配置：

```text
VITE_PORT = 7789
```

开发环境接口地址在 `.env.development` 中配置。当前开发代理使用 `/api1`，代理目标在 `vite.config.ts` 的 `server.proxy` 中维护。

## 生产构建

```bash
npm run build
```

构建产物会输出到：

```text
dist/
```

`dist` 已加入 `.gitignore`，线上部署由 GitHub Actions 自动构建，不需要手动提交构建产物。

## 环境配置

主要环境变量：

```text
VITE_API_URL
VITE_API_URL2
VITE_PUBLIC_PATH
```

生产环境接口地址在 `.env.production` 中配置。部署到 GitHub Pages 时，前端静态资源会通过仓库配置自动发布，接口服务需要保证线上环境可访问并允许跨域请求。

## 自动部署

项目已配置 GitHub Actions：

```text
.github/workflows/deploy-pages.yml
```

推送到 `master` 或 `main` 分支后，Actions 会自动：

1. 安装依赖
2. 执行 `npm run build`
3. 生成 SPA fallback 文件
4. 发布 `dist` 到 GitHub Pages

## 常用命令

```bash
npm run dev       # 启动本地开发服务
npm run build     # 构建生产版本
npm run lint-fix  # 自动修复部分 ESLint 问题
```

## 注意事项

- 首次部署后，GitHub Pages 可能需要等待几分钟才会生效。
- 如果刷新二级路由出现 404，请确认 Actions 中的部署步骤是否成功生成了 `404.html`。
- 后台接口不是 GitHub Pages 的一部分，需要单独部署并保持可访问。
