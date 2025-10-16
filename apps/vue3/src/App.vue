<template>
  <div id="nav">
    <router-link to="/home">首页</router-link>
    |
    <router-link to="/dialog">弹窗</router-link>
    |
    <router-link to="/location">路由</router-link>
    |
    <router-link to="/contact">通信</router-link>
    |
    <router-link to="/state">状态</router-link>
  </div>
  <router-view />
</template>

<script setup>
import { watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
// import request from '@/utils/request';

const $route = useRoute();
const $router = useRouter();


// 在 vue3-sub 路由下主动告知主应用路由跳转，主应用也跳到相应路由高亮菜单栏
watch(() => $route, () => {
  window.$wujie?.bus.$emit("sub-route-change", "vue3", $route.path);
  console.log($route);
});

// 请求接口
onMounted(async () => {
  // try {
  //   const res = await request.get('/api/health')

  //   console.log(res);
  // } catch (error) {
  //   console.log(error);
  // }
  
});

onMounted(() => {
  window.$wujie?.bus.$on("vue3-router-change", (path) => {
    console.log('vue3-router-change', path);
    $router.push(path)
  });
  console.log($router);
  console.log($route);
});
</script>
