<template>
  <table class="table">
    <thead class="header">
      <tr>
        <th v-for="(header, index) in headers" :key="index">{{ header }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, rowIndex) in rows" :key="rowIndex">
        <td v-for="(cell, colIndex) in row" :key="colIndex" :title="cell">
          {{ cell }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  headers: {
    type: Array,
    default: () => ['检测样品', '检测时间', '受检主体', '是否合格']
  },
  rows: {
    type: Array,
    default: () => []
  }
})

// 表头
const headers = ref(props.headers)

// 数据行
const rows = ref(props.rows)
// const rows = ref([
//   ['褐壳鸡蛋', '2025-09-21', '同和街道散...', '合格'],
//   ['小麦', '2025-09-21', '同和街道散...', '合格'],
//   ['桃子', '2025-09-21', '同和街道散...', '合格'],
//   ['李子', '2025-09-21', '同和街道散...', '合格'],
//   ['柑橘', '2025-09-21', '同和街道散...', '合格']
// ])
</script>

<style scoped>
.ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  color: #fff;
  /* 关键：固定表格布局，让 width 百分比生效 */
  table-layout: fixed; 
}

.header {
   background-image: url(~@/assets/images/aPicture/trace/t-h.png);
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
  font-size: 14px;
}

th:nth-child(1) {
  width: 25%;
}
th:nth-child(3) {
  width: 30%;
}

td:nth-child(1) {
  width: 25%;
}
td:nth-child(3) {
  width: 30%;
}

.table th,
.table td {
  /* 省略号三件套 */
  white-space: nowrap;      /* 强制不换行 */
  overflow: hidden;         /* 隐藏超出部分 */
  text-overflow: ellipsis;  /* 显示省略号 */
  text-align: left;
}

.table th {
  color: #00ffff;
  padding: 11px;
  text-align: center;
  font-weight: bold;
  position: relative;
}

.table td {
  padding: 11px;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.table tr:hover td {
  background: rgba(255, 255, 255, 0.05);
  transform: scale(1.01);
}

.table tr:last-child td {
  border-bottom: none;
}

/* 可选：添加“合格”绿色高亮 */
.table td:last-child {
  color: #4ade80;
  font-weight: bold;
}

@media (max-height: 960px) {
  .table {
    font-size: 12px;
  }
  .table th {
    padding: 8px;
  }
  .table td {
    padding: 8px;
  }
}

</style>