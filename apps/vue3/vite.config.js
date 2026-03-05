/**
 * Vite 配置文件
 * 用于替代 vue.config.js，提供更快的开发体验和构建速度
 */
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// Tailwind CSS 插件 v40.0 版本后，官方推荐直接在 Vite 配置中使用 @tailwindcss/vite 插件来集成 Tailwind CSS，而不是通过 postcss.config.js 来配置。这种方式更简洁，且与 Vite 的插件系统更好地集成。
// 如果你使用的是 Tailwind CSS v40.0 或更高版本，建议直接在 Vite 配置中使用 @tailwindcss/vite 插件，而不是在 postcss.config.js 中配置 Tailwind CSS。这种方式更简洁，且与 Vite 的插件系统更好地集成。
// import tailwindcss from '@tailwindcss/vite'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // tailwindcss()
  ],
  // 对应 vue.config.js 中的 publicPath
  base: "./",
  server: {
    cors: {
      origin: 'http://localhost:8000',      // 主应用的真实来源
      credentials: true,                    // 允许携带凭证
      methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
      allowedHeaders: ['Content-Type','Authorization']
    },
    // 对应 vue.config.js 中的 devServer.port
    port: 8002,
    // 对应 vue.config.js 中的 devServer.hot
    hmr: true,
    // 对应 vue.config.js 中的 devServer.proxy
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  // 构建配置
  build: {
    // 禁用构建时的 lint 检查，对应 vue.config.js 中的 lintOnSave: false
    minify: 'terser',
    sourcemap: false
  }
});
