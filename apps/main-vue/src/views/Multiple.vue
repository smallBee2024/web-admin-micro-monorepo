<template>
  <div style="height: 100%; width: 100%">
    <WujieVue class="item" name="vite" :url="vite" :sync="true"></WujieVue>
    <WujieVue class="item" name="vue3" :url="vue3Url" :sync="true"></WujieVue>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import hostMap from "../../wujie-config/hostMap";

export default {
  setup() {
    const router = useRouter();
    const vite = ref(hostMap("//localhost:8001/"));
    const vue3Url = ref(hostMap("//localhost:8002/"));
    
    const jump = (name) => {
      router.push({ name });
    };
    
    return {
      vite,
      vue3Url,
      jump,
    };
  },
};
</script>

<style scoped>
.item {
  display: inline-block;
  border: 1px dashed #ccc;
  border-radius: 8px;
  width: 45%;
  height: 45%;
  margin: 20px;
  overflow: scroll;
}
</style>
