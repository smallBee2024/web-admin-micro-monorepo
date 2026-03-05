module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
    // 'postcss-px-to-viewport-8-plugin': {
    //   viewportWidth: 1920,        // 【核心】设计稿宽度，根据实际设计稿修改 (如 1920, 3840)
    //   viewportHeight: 1080,       // 设计稿高度 (通常用于 vh 转换，若只转 width 可忽略)
    //   unitPrecision: 5,           // 转换后的精度，保留几位小数
    //   propList: ['*', 'font-size'],            // 需要转换的属性列表，'*' 表示所有属性
    //   selectorBlackList: [],      // 不需要转换的选择器黑名单，例如 ['.no-convert']
    //   minPixelValue: 1,           // 小于等于 1px 的不转换 (防止 border: 1px 变成 0.00xxx)
    //   mediaQuery: true,          // 是否在媒体查询 (@media) 中也转换 px
    //   exclude: [/node_modules/i], // 排除 node_modules 中的文件
    //   // include: [/src/],        // 如果 exclude 太宽泛，可以用 include 指定只转换 src
    //   viewportUnit: 'vw',         // 转换成的单位，通常是 'vw'
    //   fontViewportUnit: 'vw',     // 字体专用的单位，通常也是 'vw'
      
    //   // 【进阶】针对大屏优化的特殊配置
    //   // 如果你希望某些特定文件不转换，可以在这里添加逻辑，或者使用 selectorBlackList
    // },

    'postcss-pxtorem': {
      rootValue: 19.2, // 关键！假设设计稿 1920，想要 100px = 1rem，则 1920/100 = 19.2
      // 或者配合 js 动态设置 html font-size
      propList: ['*'], // 需要转换的规则
      // blackList: /^global-.+/ // 忽略的选择器，支持正则表达式，例如 /^global-.+/ 表示以 global- 开头的类名不转换
      // exclude: /node_modules/i // 排除的文件
    },
  }
};
