/**
 * Vite 配置文件
 * 用于替代 vue.config.js，提供更快的开发体验和构建速度
 */
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 对应 vue.config.js 中的 publicPath
  base: "./",
  server: {
    port: 8000,
    hmr: true,
    proxy: {
      // '/api': {
      //   target: 'http://localhost:3000',
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/api/, '')
      // }
      // '/next-proxy': {
      //   target: 'http://localhost:3000',
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/next-proxy/, '/'),
      // },
      '/_next': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/_next/, '_next'),
      },
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
