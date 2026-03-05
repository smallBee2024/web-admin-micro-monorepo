// apps/vue3/tailwind.config.js
const pxToViewport = require('tailwindcss-px-to-viewport');

module.exports = {
  content: ["./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    // 引入插件
    pxToViewport({
      viewportWidth: 1920,
      viewportHeight: 1080,
      unitPrecision: 5,
      propList: ['*'],
      selectorBlackList: [],
      minPixelValue: 1,
      mediaQuery: false,
    })
  ],
};