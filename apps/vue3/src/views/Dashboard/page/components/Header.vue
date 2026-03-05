<template>
  <div class="head-bg"></div>
  <div class="head-box">{{ title }}</div>
</template>
<script lang="ts" setup>
defineProps({
  //标题
  title: {
    type: String,
    default: '领导驾驶舱'
  }
});
</script>
<style lang="less" scoped>
.head-bg {
  position: fixed;
  z-index: 3;
  width: 100%;
  height: 110px;
  background: linear-gradient(180deg, rgba(6, 9, 8, 0.67) 60%, rgba(6, 9, 8, 0) 100%);
  filter: blur(2px);
  /* 防止重复覆盖导致颜色过深 */
  background-blend-mode: multiply;
  pointer-events: none;
}
.head-box {
  width: 100%;
  height: 110px;
  line-height: 90px;
  position: fixed;
  z-index: 3;
  background: url(@/assets/images/trace/head_bg.png);
  background-size: 136% 113%;
  background-position: center -15px;
  font-family: YouSheBiaoTiHei;
  font-size: 45px;
  text-align: center;
  color: #ffffff;
}
</style>
