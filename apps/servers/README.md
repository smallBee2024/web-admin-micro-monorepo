# NestJS 最小示例服务

该目录提供一个最小可运行的 NestJS HTTP 服务，默认监听 3000 端口。

## 快速开始

方式一：在该目录内独立安装并运行

```bash
cd examples/servers/nestjs
pnpm install
pnpm dev
```

方式二：在仓库根目录使用 filter 运行（如工作空间已包含该包）

```bash
pnpm --filter wujie-demo-nestjs-server dev
```

## 生产构建

```bash
pnpm --filter wujie-demo-nestjs-server build
pnpm --filter wujie-demo-nestjs-server start
```

## 访问
- 根路径：http://localhost:3000/ 返回 "Hello from NestJS!"
- 健康检查：http://localhost:3000/health 返回 { status: 'ok' }

## 环境变量
- PORT：服务端口，默认 3000

## 目录结构
- src/main.ts：应用入口
- src/app.module.ts：根模块
- src/app.controller.ts：示例控制器
- src.app.service.ts：示例服务
