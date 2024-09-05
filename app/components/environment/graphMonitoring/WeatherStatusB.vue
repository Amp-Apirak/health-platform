<script setup lang="ts">
import { ref, computed } from "vue";

const details = [
  {
    label: "จุดน้ำค้าง:",
    value: "25.0°C",
  },
  {
    label: "ความรู้สึกเสมือน:",
    value: "40.0°C",
  },
  {
    label: "ความเร็วลมกระโชก:",
    value: "1.0 km/h",
  },
  {
    label: "ทัศนวิสัย:",
    value: "N/A km",
  },
  {
    label: "รังสี UV: N/A",
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