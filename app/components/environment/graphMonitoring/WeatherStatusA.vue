<script setup lang="ts">
import { ref, computed } from "vue";

const details = [
  {
    label: "ความชื้น:",
    value: "67%",
  },
  {
    label: "ความเร็วลม:",
    value: "0.0 km/h",
  },
  {
    label: "ทิศทางลม:",
    value: "ตะวันออก",
  },
  {
    label: "ความกดอากาศ:",
    value: "1012.9 hPa",
  },
  {
    label: "ปริมาณน้ำฝน (วันนี้):",
    value: "0.0 mm",
  },
];
</script>

<template>
  <UDashboardCard
    title="Details"
    description="รายละเอียด"
    icon="emojione:cloud-with-lightning-and-rain"

  >
    <div class="flex flex-col divide-y divide-gray-200 dark:divide-gray-700"> 
      <div v-for="(item, index) in details" :key="index" class="px-4 py-3 flex justify-between">
        <span class="text-gray-900 dark:text-white font-medium">{{ item.label }}</span>
        <span class="text-gray-900 dark:text-white font-medium ">{{ item.value }}</span>
      </div>
    </div>
  </UDashboardCard>
</template>

<style scoped>
/* ปรับแต่งสไตล์เพิ่มเติมได้ตามต้องการ */
</style>