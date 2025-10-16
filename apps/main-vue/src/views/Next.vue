<template>
  <!--单例模式，name相同则复用一个无界实例，改变url则子应用重新渲染实例到对应路由 -->
  <WujieVue width="100%" height="100%" name="next-react" :url="nextReactUrl"></WujieVue>
</template>

<script>
import { ref } from 'vue';
import hostMap from "../../wujie-config/hostMap";

export default {
  setup() {
    const nextReactUrl = ref(hostMap("//localhost:3000/"));

    return {
      nextReactUrl
    };
  }
};
</script>
