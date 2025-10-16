<template>
  <div id="app">
    <div id="nav">
      <!-- Ant Design Menu 组件 -->
      <a-menu
        :selected-keys="[currentRoute]"
        :open-keys="openKeys"
        mode="inline"
        :inline-collapsed="false"
        class="nav-menu"
        @click="handleMenuClick"
      >
        <!-- 首页菜单项 -->
        <a-menu-item key="/home">
          <template #icon>
            <HomeOutlined />
          </template>
          <span>首页</span>
        </a-menu-item>
        
        <!-- Vue3 子菜单 -->
        <a-sub-menu v-if="degrade" key="vue3">
          <template #icon>
            <DesktopOutlined />
          </template>
          <template #title>Vue3</template>
          <a-menu-item key="/vue3-sub/home">Home</a-menu-item>
          <a-menu-item key="/vue3-sub/dialog">Dialog</a-menu-item>
          <a-menu-item key="/vue3-sub/location">Location</a-menu-item>
          <a-menu-item key="/vue3-sub/contact">Contact</a-menu-item>
          <a-menu-item key="/vue3-sub/state">State</a-menu-item>
        </a-sub-menu>
        
        <!-- Vite 子菜单 -->
        <!-- <a-sub-menu v-if="degrade" key="vite">
          <template #icon>
            <ThunderboltOutlined />
          </template>
          <template #title>Vite</template>
          <a-menu-item key="/vite-sub/home">Home</a-menu-item>
          <a-menu-item key="/vite-sub/dialog">Dialog</a-menu-item>
          <a-menu-item key="/vite-sub/location">Location</a-menu-item>
          <a-menu-item key="/vite-sub/contact">Contact</a-menu-item>
        </a-sub-menu> -->
        
        <!-- 全部页面菜单项 -->
        <!-- <a-menu-item key="/all">
          <template #icon>
            <AppstoreOutlined />
          </template>
          <span>All</span>
        </a-menu-item> -->
      </a-menu>
    </div>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { 
  HomeOutlined, 
  DesktopOutlined, 
  ThunderboltOutlined, 
  AppstoreOutlined 
} from '@ant-design/icons-vue';

// 路由相关
const route = useRoute();
const router = useRouter();

// 响应式数据
const degrade = window.Proxy;

// 计算属性
const currentRoute = computed(() => route.path);

// 获取展开的菜单键
const getOpenKeys = () => {
  const path = route.path;
  const openKeys = [];
  
  if (path.startsWith('/vue3')) {
    openKeys.push('vue3');
  }
  if (path.startsWith('/vite')) {
    openKeys.push('vite');
  }
  
  return openKeys;
};

const openKeys = ref(getOpenKeys());

// 监听路由变化
watch(route, () => {
  openKeys.value = getOpenKeys();
});

// 处理菜单点击事件
const handleMenuClick = ({ key }) => {
  console.log('handleMenuClick', key);
  router.push(key);
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  font-size: 20px;
  height: 100vh;
  --theme: rgb(241, 107, 95);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  width: 100vw;
}

#nav {
  background-color: white;
  flex-shrink: 0;
  font-size: 20px;
  display: flex;
  position: relative;
  z-index: 1;
  flex-direction: column;
  padding: 30px 0;
  width: 250px;
  height: 100vh;
  box-sizing: border-box;
  box-shadow: 3px 0px 9px 2px #e6e6e6;
  transition: transform 0.1s linear;
  transform: translate(0, 0);
  overflow: auto;
}

/* Ant Design Menu 样式定制 */
.nav-menu {
  border: none !important;
  background: transparent !important;
}

.nav-menu .ant-menu-item {
  margin: 0 !important;
  height: 50px !important;
  line-height: 50px !important;
  padding: 0 24px !important;
  font-size: 16px !important;
  color: #2c3e50 !important;
  transition: all 0.2s linear !important;
}

.nav-menu .ant-menu-item:hover {
  color: var(--theme) !important;
  background-color: rgba(241, 107, 95, 0.1) !important;
}

.nav-menu .ant-menu-item-selected {
  color: var(--theme) !important;
  background-color: rgba(241, 107, 95, 0.1) !important;
  border-right: 3px solid var(--theme) !important;
}

.nav-menu .ant-menu-submenu {
  margin: 0 !important;
}

.nav-menu .ant-menu-submenu-title {
  height: 50px !important;
  line-height: 50px !important;
  padding: 0 24px !important;
  font-size: 16px !important;
  color: #2c3e50 !important;
  transition: all 0.2s linear !important;
}

.nav-menu .ant-menu-submenu-title:hover {
  color: var(--theme) !important;
  background-color: rgba(241, 107, 95, 0.1) !important;
}

.nav-menu .ant-menu-submenu-open > .ant-menu-submenu-title {
  color: var(--theme) !important;
}

.nav-menu .ant-menu-submenu .ant-menu-item {
  padding-left: 48px !important;
  font-size: 14px !important;
}

.nav-menu .ant-menu-submenu .ant-menu-item:hover {
  color: var(--theme) !important;
  background-color: rgba(241, 107, 95, 0.1) !important;
}

.nav-menu .ant-menu-submenu .ant-menu-item-selected {
  color: var(--theme) !important;
  background-color: rgba(241, 107, 95, 0.1) !important;
  border-right: 3px solid var(--theme) !important;
}

.wujie_iframe {
  width: 100%;
  height: 100%;
}

iframe {
  border: none;
}

h3 {
  padding-bottom: 0.3rem;
  border-bottom: 1px solid #eaecef;
}

.content {
  flex: 1;
  height: 100vh;
  overflow: hidden scroll;
  width: 1px;
}
</style>
