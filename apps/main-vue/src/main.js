// import "whatwg-fetch"; // fetch polyfill
// import "custom-event-polyfill";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import WujieVue from "wujie-vue3";

import Antd from "ant-design-vue";
import "ant-design-vue/dist/reset.css";
import lifecycles from "../wujie-config/lifecycle";
import hostMap from "../wujie-config/hostMap";
import credentialsFetch from "../wujie-config/fetch";
// import plugins from "../wujie-config/plugin";

const isProduction = process.env.NODE_ENV === "production";
const { setupApp, preloadApp, bus } = WujieVue;

bus.$on("click", (msg) => window.alert(msg));

// 在 xxx-sub 路由下子应用将激活路由同步给主应用，主应用跳转对应路由高亮菜单栏
bus.$on("sub-route-change", (name, path) => {
  const mainName = `${name}-sub`;
  const mainPath = `/${name}-sub${path}`;
  const currentName = router.currentRoute.value.name;
  const currentPath = router.currentRoute.value.path;
  console.log("sub-route-change", mainName, mainPath, currentName, currentPath);
  if (mainName === currentName && mainPath !== currentPath) {
    router.push({ path: mainPath });
  }
});

const degrade =
  window.localStorage.getItem("degrade") === "true" ||
  !window.Proxy ||
  !window.CustomElementRegistry;
const props = {
  jump: (name) => {
    router.push({ name });
  },
};
/**
 * 大部分业务无需设置 attrs
 * 此处修正 iframe 的 src，是防止github pages csp报错
 * 因为默认是只有 host+port，没有携带路径
 */
const attrs = isProduction ? { src: hostMap("//localhost:8000/") } : {};
/**
 * 配置应用，主要是设置默认配置
 * preloadApp、startApp的配置会基于这个配置做覆盖
 */

// setupApp({
//   name: "vue3",
//   url: hostMap("//localhost:8002/"),
//   attrs,
//   exec: true,
//   alive: true,
//   plugins: [
//     // {
//     //   cssExcludes: [
//     //     "https://stackpath.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css",
//     //   ],
//     // },
//   ],
//   props,
//   // 引入了的第三方样式不需要添加credentials
//   // fetch: (url, options) => {
//   //   console.log(url, options);
//   //   return url.includes(hostMap("//localhost:8002/"))
//   //     ? credentialsFetch(url, options)
//   //     : window.fetch(url, options)
//   // },
//   degrade,
//   ...lifecycles,
// });
setupApp({
  name: "next-react",
  url: hostMap("//localhost:3000/"),
  // attrs,
  exec: true,
  // props,
  // fetch: credentialsFetch,
  // fetch(url, options) {
  //   // 把子应用请求通过主应用代理出去（同源）
  //   // const proxyUrl = url.replace("http://localhost:3000", "");
  //   // console.log("👉 代理请求:", proxyUrl);
  //   // return window.fetch(proxyUrl, options).then((res) => {
  //   //   console.log("✅ 代理响应:", res.status, res.url);
  //   //   return res;
  //   // });
  //   return window.fetch(url, options);
  // },
  // degrade,
  ...lifecycles,
});

if (window.localStorage.getItem("preload") !== "false") {
  if (window.Proxy) {
    // preloadApp({
    //   name: "vue3",
    // });
    // preloadApp({
    //   name: "next-react",
    // });
  }
}

// 创建 Vue 3 应用实例
const app = createApp(App);
app.use(router);
app.use(Antd);
app.use(WujieVue);
app.mount("#app");
