<template>
  <Layout>
    <template #header>
      <Header title="产业追溯一张图" />
    </template>
    <template #other>
      <!-- 时间 -->
      <DatePicker @pickerChange="pickerChange" v-model="yearVal" />
      <!-- 返回按钮 -->
      <BackButton />
    </template>
    <template #default>
      <!-- 地图 -->
      <APictureMap ref="aPictureMapRef" :mapTop="150" :isColorlegend="false"></APictureMap>
    </template>
    <!-- 左侧 -->
    <template #left>
      <Left />
    </template>
    <!-- 右侧 -->
    <template #right>
      <Right />
    </template>
  </Layout>
</template>

<script lang="ts" setup>
import { nextTick, onMounted, reactive, ref } from 'vue';
import { mapTestData } from './data';

import Layout from './components/Layout.vue';
import Header from './components/Header.vue';
import BackButton from './components/BackButton.vue';
import Left from './left.vue';
import Right from './right.vue';


//年份
const yearVal = ref('2025');
const pickerChange = (date) => {
  yearVal.value = date;
  // handleMapData();
};

//地图
const aPictureMapRef = ref();
//获取地图数据
const getMapData = async () => {
  const dot = mapTestData;
  aPictureMapRef.value.loadGeoData(null, dot, '亩');
};


onMounted(() => {
  nextTick(() => {
    aPictureMapRef.value.initMap();
    getMapData();
  });
});
</script>