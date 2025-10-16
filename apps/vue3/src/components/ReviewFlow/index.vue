<template>
  <div id="lf" />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import LogicFlow from "@logicflow/core"
import "@logicflow/core/dist/index.css"
import { dagreLayout } from './utils'
import { getReviewFlow } from '@/apis'
import { Start, End, Other } from './registerNode/index'
import { Polyline } from './registerLine/index'

const props = withDefaults(defineProps<{
  agentIds: string
}>(), {
  agentIds: ''
})

const lf = ref<any>(null)
const timer = ref<any>(null)

const getData = async () => {
  try {
    const res: any = await getReviewFlow({ agentIds: props.agentIds })
    if (res.status === 0) {
      const layoutNodes = await dagreLayout(res.data)
      lf.value.render(layoutNodes as any);
    }
  } catch (error) {
    console.error(error)
  }
}

const startTimer = () => {
  timer.value = setInterval(async () => {
    await getData()
  }, 20000)
}

const stopTimer = () => {
  if (timer.value) {
    clearInterval(timer.value)
    timer.value = null
  }
}

onMounted(async () => {
  lf.value = new LogicFlow({
    container: document.querySelector("#lf") as HTMLElement,
    grid: false,
    background: {
      color: '#ffffff'
    },
    isSilentMode: true, // 静默模式，禁止所有交互
    stopScrollGraph: true, // 禁止滚动
    stopZoomGraph: true, // 禁止缩放
    stopMoveGraph: true, // 禁止拖动画布
    adjustNodePosition: false, // 禁止调整节点位置
    hideAnchors: true, // 隐藏锚点
    nodeSelectedOutline: false, // 隐藏节点选中轮廓
    multipleSelectKey: '', // 清空多选按键
    textEdit: false, // 禁止文本编辑
  })

  const graphData = {
    nodes: [
      {
        id: "1",
        type: "start", // 矩形
        text: "开始",
      },
      {
        id: "2",
        type: "other",
        text: "节点111112",
        status: '1'
      },
      {
        id: "3",
        type: "other",
        text: "节点22223",
      },
      {
        id: "4",
        type: "end",
        text: "结束",
        status: "1",
      },
    ],
    edges: [
      {
        sourceNodeId: "1", // 源节点ID
        targetNodeId: "3", // 目标节点ID
        type: "polyline", // 折线
      },
      {
        sourceNodeId: "3", // 源节点ID
        targetNodeId: "4", // 目标节点ID
        type: "polyline", // 折线
      },
      {
        sourceNodeId: "1", // 源节点ID
        targetNodeId: "2", // 目标节点ID
        type: "polyline", // 折线
        properties: {
          status: "1",
        },
      },
      {
        sourceNodeId: "2", // 源节点ID
        targetNodeId: "4", // 目标节点ID
        type: "polyline", // 折线
        properties: {
          status: "1",
        },
      },
    ],
  }
  lf.value.register(Start)
  lf.value.register(End)
  lf.value.register(Other)
  lf.value.register(Polyline)

  const layoutNodes = await dagreLayout(graphData)
  lf.value.render(layoutNodes as any);
})

</script>

<style scoped>
#lf {
  width: 100%;
  height: 100%;
}
</style>
