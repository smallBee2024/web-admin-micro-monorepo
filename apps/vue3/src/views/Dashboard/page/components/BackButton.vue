<template>
  <div class="ap-back-button" @click="handleBack" />
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
const router = useRouter();

const handleBack = () => {
  router.push('/APictureHome');
};
</script>

<style lang="less" scoped>
.ap-back-button {
  position: absolute;
  right: 35px;
  top: 40px;
  z-index: 4;
  width: 126px;
  height: 30px;
  background-image: url('@/assets/images/aPicture/service/back.png');
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
  }
}

</style>