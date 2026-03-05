<template>
  <div ref="leftRef" :style="wrapperStyle" class="overfow-hidden h-full">
    <div class="aPicture-card section-1 pb-[12px]">
      <TabTitle title="快速检测" />
      <div class="aPicture-box px-[20px] py-[10px] flex flex-col justify-between">
        <div class="s1-top h-[66px] flex items-center justify-between">
          <!-- 左侧 -->
          <div class="flex items-center w-[33%] h-full">
            <img class="w-[61px] h-[auto]" :src="img4_1" alt="" />
            <div class="flex flex-col">
              <div class="text-[#cdfffe] text-[16px]">机械化率</div>
              <div class="text-[#ffd500] text-[16px]">
                92
                <span class="text-[#cdfffe] text-[12px]">%</span>
              </div>
            </div>
          </div>
          <!-- 中间分割线 -->
          <img class="w-[1px] h-[80%]" :src="img1_9" alt="" />
          <!-- 右侧 -->
          <div class="w-[66%] flex items-center justify-center text-[#cdfffe]">
            <img class="w-[17px] h-[6px]" :src="img4_2" alt="" />
            <div class="text-[14px] ml-[2px]">合格</div>
            <div class="text-[#fff] text-[20px] mx-[5px]">70903</div>
            <div class="text-[12px] relative top-[3px]">条</div>

            <img class="w-[17px] h-[6px] ml-[18px]" :src="img4_3" alt="" />
            <div class="text-[14px] ml-[2px]">不合格</div>
            <div class="text-[#fff] text-[20px] mx-[5px]">3</div>
            <div class="text-[12px] relative top-[3px]">条</div>
          </div>
        </div>
        <div class="flex-1 mt-[10px]">
          <!-- 折线图 -->
          <div class="w-full h-full" ref="graphRef"></div>
        </div>
      </div>
    </div>
    
    <!-- 农产品检测详情 -->
    <div class="aPicture-card section-2 pb-[12px]">
      <TabTitle title="农产品检测详情" />
      <div class="aPicture-box px-[20px] py-[10px]">
        <Table
          :headers="['产品名称', '检测日期', '产地', '检测结果']"
          :rows="[
            ['褐壳鸡蛋', '2025-09-21', '同和街道散...', '合格'],
            ['小麦时代发生的发生地方', '2025-09-21', '同和街道散asdfasdfasdfasdfa', '合格'],
            ['桃子', '2025-09-21', '同和街道散...', '合格'],
            ['李子', '2025-09-21', '同和街道散...', '合格'],
            ['柑橘', '2025-09-21', '同和街道散...', '合格']
          ]"
        />
      </div>
    </div>

    <!-- 采购渠道分布 -->
    <div class="aPicture-card section-3">
      <TabTitle title="采购渠道分布" />
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
import Table from './components/Tabel.vue';

import { C2_OBJ, C3_OBJ } from './data';

import img4_1 from '@/assets/images/trace/4-1.png';
import img4_2 from '@/assets/images/trace/4-2.png';
import img4_3 from '@/assets/images/trace/4-3.png';
import img1_9 from '@/assets/images/trace/1-9.png';

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
      top: '22%',
      left: '4%',
      right: '4%',
      bottom: '0%',
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
        color: '#cdfffe',
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
        name: '合格',
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
      },
      {
        name: '不合格',
        data: C2_OBJ.map(item => item.value2),
        type: 'line',
        // 开启区域填充
        areaStyle: {
          // 从上往下的渐变色
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(251, 115, 146, 1)' }, // 顶部颜色，透明度 0.4
            { offset: 1, color: 'rgba(251, 115, 146, 0)' }    // 底部颜色，完全透明
          ])
        },
        lineStyle: {
          color: '#FB7392', // 线条颜色
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
});
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

  .s1-top {
    background-image:  url(~@/assets/images/aPicture/machinery/bg-1.png);
  }
}
.section-2 {
  height: var(--ap-2-height);
}
.section-3 {
  height: var(--ap-3-height);
}
.section-4 {
  height: var(--ap-4-height);
}

</style>
