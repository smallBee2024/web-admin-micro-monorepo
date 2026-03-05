<template>
  <div class="dashboard">
    <LargeScreen />
  </div>
</template>

<script setup>
import LargeScreen from './page/index.vue';

</script>


<style scoped>
.dashboard {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  /* background-color: #f0f235; */
}
</style>