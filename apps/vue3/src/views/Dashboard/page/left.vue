<template>
  <div ref="leftRef" :style="wrapperStyle" class="overfow-hidden h-full">
    <div class="aPicture-card section-1 pb-[12px]">
      <div class="w-[100px]">nihao</div>
      <TabTitle title="农业园区建设情况" />
      <div class="aPicture-box px-[20px] py-[20px] flex flex-wrap">
        <div class="flex items-center w-[50%] h-[50%]" v-for="item in C1_OBJ" :key="item.name">
          <img class="h-full max-h-[110px]" :src="item.image" alt="" srcset="">
          <div>
            <div class="text-[#cdfffe] text-[14px] mb-[1px]">{{ item.name }}</div>
            <div class="">
              <span class="text-[#fff] text-[16px] leading-5 mr-[4px]">{{ item.value }}</span>
              <span class="text-[#cdfffe] text-[12px]">{{ item.units }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="aPicture-card section-2 pb-[12px]">
      <TabTitle title="受检主体" />
      <div class="aPicture-box px-[20px]">
        <!-- 折线图 -->
         <div class="w-full h-full" ref="graphRef"></div>
      </div>
    </div>

    <div class="aPicture-card section-3">
      <TabTitle title="追溯记录" />
      <div class="aPicture-box px-[20px]">
        <!-- 柱状图 -->
         <div class="w-full h-full" ref="barRef"></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import * as echarts from 'echarts';

import { C1_OBJ, C2_OBJ, C3_OBJ } from './data';

const graphRef = ref();
const barRef = ref();

const wrapperStyle = computed(() => {
  return {
    '--ap-1-height': `${331 / 975 * 100}%`,
    '--ap-2-height': `${331 / 975 * 100}%`,
    '--ap-3-height': `${313 / 975 * 100}%`,
    '--ap-title-height': '30px',
  } as any;
});

onMounted(() => {
  // 折线图
  const graphChart = echarts.init(graphRef.value);
  let graphOption = {
    grid: {
      top: '20%',
      left: '4%',
      right: '4%',
      bottom: '8%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: C2_OBJ.map(item => item.name),
      axisLabel: {
        color: '#cdfffe', // 红色
      }
    },
    yAxis: {
      name: '单位：个',
      nameTextStyle: {
        color: '#cdfffe'
      },
      type: 'value',
      axisLabel: {
        color: '#cdfffe', // 红色
      },
      splitLine: {
        show: true, // 确保显示
        lineStyle: {
          color: '#00f8ff', // 1. 设置颜色 (支持 hex, rgb, rgba)
          opacity: 0.2,    // 2. 设置透明度
          width: 1,         // 2. 设置线宽
          type: 'solid'     // 3. 设置线型: 'solid' (实线), 'dashed' (虚线), 'dotted' (点线)
        }
      },
    },
    series: [
      {
        data: C2_OBJ.map(item => item.value),
        type: 'line',
        // 开启区域填充
        areaStyle: {
          // color: 'rgba(24, 144, 255, 0.4)' // 蓝色，透明度 0.4
          // 从上往下的渐变色
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(3, 99, 108, 1)' }, // 顶部颜色，透明度 0.4
            { offset: 1, color: 'rgba(3, 99, 108, 0)' }    // 底部颜色，完全透明
          ])
        },
        lineStyle: {
          color: '#00ffc3', // 线条颜色
          width: 1,         // 线条宽度
          type: 'solid'     // 线条类型：'solid'（实线）、'dashed'（虚线）、'dotted'（点线）
        },
      }
    ]
  };
  graphChart.setOption(graphOption);

  // 柱状图
  const barChart = echarts.init(barRef.value);
  let barOption = {
    grid: {
      top: '20%',
      left: '4%',
      right: '4%',
      bottom: '8%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        axisLabel: {
          color: '#cdfffe', // 红色
        },
        data: C3_OBJ.map(item => item.name)
      }
    ],
    radus: ['50%', '70%'],
    yAxis: {
      name: '单位：次',
      nameTextStyle: {
        color: '#cdfffe'
      },
      type: 'value',
      axisLabel: {
        color: '#cdfffe', // 红色
      },
      splitLine: {
        show: true, // 确保显示
        lineStyle: {
          color: '#00f8ff', // 1. 设置颜色 (支持 hex, rgb, rgba)
          opacity: 0.2,    // 2. 设置透明度
          width: 1,         // 2. 设置线宽
          type: 'solid'     // 3. 设置线型: 'solid' (实线), 'dashed' (虚线), 'dotted' (点线)
        }
      },
    },
    series: [
      {
        // name: '',
        type: 'bar',
        data: C3_OBJ.map(item => item.value),
        barWidth: 12, // 设置柱子宽度
        itemStyle: {
          borderRadius: [6, 6, 0, 0], // 设置柱子圆角
        }
      },
    ],
  }
  barChart.setOption(barOption);

  window.addEventListener('resize', () => {
    graphChart.resize();
    barChart.resize();
  });
})
</script>
<style lang="less" scoped>
.aPicture-card {
  width: 100%;

  .aPicture-box {
    width: 100%;
    height: calc(100% - 35px);
    margin-top: 5px;
    background: url(@/assets/images/situation_bg.png) no-repeat center center;
    background-size: 100% 100%;
  }
}
.section-1 {
  height: var(--ap-1-height);
}
.section-2 {
  height: var(--ap-2-height);
}
.section-3 {
  height: var(--ap-3-height);
}
</style>
