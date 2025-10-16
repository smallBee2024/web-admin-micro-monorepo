<template>
  <!--保活模式，name相同则复用一个子应用实例，改变url无效，必须采用通信的方式告知路由变化 -->
  <WujieVue width="100%" height="100%" name="vue3" :url="vue3Url"></WujieVue>
</template>

<script>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import hostMap from "../../wujie-config/hostMap";
import wujieVue from "wujie-vue3";

export default {
  setup() {
    const route = useRoute();
    const vue3Url = ref(hostMap("//localhost:8002/") + route.params.path);
    
    watch(
      () => route.params.path,
      (newPath) => {
        console.log('vue3-sub-router-change', route);
        vue3Url.value = hostMap("//localhost:8002/") + newPath;
        wujieVue.bus.$emit("vue3-router-change", `/${newPath}`);
      },
      { immediate: true }
    );
    
    return {
      vue3Url,
    };
  },
};
</script>

<style lang="scss" scoped></style>
