<template>
  <div class="ap-layout" :style="wrapperStyle">
    <slot name="header"></slot>        
    <slot name="other"></slot>
    <div
      class="ap-body"
      :class="[{ debug: debugBorder }, showBottom ? 'has-bottom' : 'no-bottom']"
    >
      <div class="ap-layout__left">
        <slot name="left"></slot>
      </div>
      <div class="ap-layout__center">
        <slot></slot>
      </div>
      <div class="ap-layout__right">
        <slot name="right"></slot>
      </div>
      <div v-if="showBottom" class="ap-layout__bottom">
        <slot name="bottom"></slot>
      </div>
    </div>
  </div>
</template>
  
  <script lang="ts" setup>
  import { ref, computed } from 'vue';
  
  interface Props {
    debugBorder?: boolean;
    showBottom?: boolean;
  }
  const props = withDefaults(defineProps<Props>(), {
    debugBorder: false,
    showBottom: false
  });
  
  const wrapperStyle = computed(() => ({
    '--ap-header-height': '110px',
    '--ap-left-width': '25%',
    '--ap-right-width': '25%',
    '--ap-bottom-height': '33%',
    '--ap-gap': '20px',
    '--ap-other-bottom-gap': '20px'
  } as any));
  </script>
  
  <style lang="less" scoped>
  .ap-layout {
    width: 100vw;
    height: 100vh;
    position: relative;
    background: #010509;
  }
  .ap-body {
    height: 100%;
    position: relative;
  }
  .ap-layout__left {
    position: absolute;
    top: calc(var(--ap-header-height) - 2.31%);
    bottom: var(--ap-other-bottom-gap);
    left: var(--ap-gap);
    width: calc(var(--ap-left-width) - 0.125rem);
    overflow: hidden;
    z-index: 100;
  }
  .ap-layout__right {
    position: absolute;
    top: calc(var(--ap-header-height) - 2.31%);
    right: var(--ap-gap);
    bottom: var(--ap-other-bottom-gap);
    width: calc(var(--ap-right-width) - 0.125rem);
    overflow: hidden;
    z-index: 100;
  }
  .ap-layout__center {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
  }
  .ap-layout__bottom {
    position: absolute;
    height: var(--ap-bottom-height);
    bottom: var(--ap-other-bottom-gap);
    left: calc(var(--ap-gap) + var(--ap-left-width) - 0.125rem + var(--ap-gap));
    right: calc(var(--ap-gap) + var(--ap-right-width) - 0.125rem + var(--ap-gap));
    overflow: hidden;
    z-index: 100;
  }
  // .debug .ap-layout__left,
  // .debug .ap-layout__right,
  // .debug .ap-layout__bottom,
  // .debug .ap-layout__center
  // {
  //   border: 1px dashed rgba(255, 77, 79, 0.9);
  //   border-radius: 4px;
  //   background: rgba(255, 77, 79, 0.05);
  // }
  </style>
