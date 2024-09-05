<script setup lang="ts">
import { ref, computed } from "vue";

const details = [
  {
    label: "ความเข้มของแสง:",
    value: " 9.3 W/m2",
  },
  {
    label: "อุณหภูมิดินะ:",
    value: "N/A°C",
  },
  {
    label: "ความชื้นในดิน:",
    value: "N/A%",
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