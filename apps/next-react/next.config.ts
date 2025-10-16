import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // 允许跨域
  headers: async () => {
    return [
      // {
      //   // source: '/:path*',
      //   source: '/(.*)',
      //   headers: [
      //     { key: 'Access-Control-Allow-Origin', value: '*' },
      //     { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE, OPTIONS' },
      //     { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
      //   ],
      // },
      // {
      //   // 明确匹配 _next 下的静态资源
      //   source: '/_next/static/:path*',
      //   headers: [
      //     { key: 'Access-Control-Allow-Origin', value: '*' },
      //     { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS' },
      //     { key: 'Access-Control-Allow-Headers', value: 'Content-Type' },
      //   ],
      // },
    ];
  },
};

export default nextConfig;
