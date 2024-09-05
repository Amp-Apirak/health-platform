<script setup lang="ts">
import { ref, computed } from "vue";

const temperature = ref(32);

const weatherInfo = computed(() => {
  if (temperature.value < 28) {
    return {
      backgroundColor: "bg-blue-600",
      level: "ปกติ",
      icon: 'i-heroicons-fire-20-solid' ,
      advice: "สภาพอากาศเหมาะสำหรับทำกิจจกรรมกลางแจ้ง ควรดื่มน้ำทุกๆ 1 ชั่วโมง",
    };
  } else if (temperature.value < 34) {
    return {
      backgroundColor: "bg-green-600",
      level: "ปกติ",
      icon: 'i-heroicons-fire-20-solid' ,
      advice:
        "สภาพอากาศปลอดโปร่งสามารถทำกิจจกรรมกลางแจ้ง ควรดื่มน้ำทุกๆ 1 ชั่วโมง",
    };
  } else if (temperature.value < 37) {
    return {
      backgroundColor: "bg-orange-500",
      level: "ระดับ 2 : เฝ้าระวัง",
      icon: 'i-heroicons-fire-20-solid' ,
      advice:
        "สภาพอากาศค่อนข้างร้อนสามารถทำกิจจกรรมกลางแจ้ง ควรพักดื่มน้ำทุกๆ 30 นาที",
    };
  } else {
    return {
      backgroundColor: "bg-red-600",
      level: "ระดับ 3 : ความเสี่ยงสูง",
      icon: 'i-heroicons-fire-20-solid' ,
      advice:
        "สภาพอากาศร้อนมากควรไม่ควรทำกิจกรรมกลางแจ้งนานเกิน 30 นาที ควรพักดื่มน้ำทุกๆ 30 นาที จำนวน 1-2 ลิตร",
    };
  }
});

const details = ref([
  { label: "ค่าดัชนีความร้อน", value: "28.0°C" },
  { label: "ดื่มน้ำ", value: "0.5 ลิตร / ชั่วโมง" },
  { label: "พักใต้", value: "50 นาที / ชั่วโมง" },
]);
</script>

<template>
  <UDashboardCard
    :class="['text-white', weatherInfo.backgroundColor, 'p-6 overflow-hidden']"
    style="min-height: 200px"
  >
    <div class="flex flex-col sm:flex-row h-full"> 
      <!-- Column 1: Icon and Temperature -->
      <div class="flex-1 flex items-center sm:w-1/3">
        <UIcon :name="weatherInfo.icon" class="w-16 h-16 mr-2 text-white" />
        <div class="text-8xl font-bold">
          {{ temperature }}<span class="align-top text-4xl">°C</span>
        </div>
      </div>

      <!-- Column 2: Warning and Advice -->
      <div class="flex-1 flex flex-col justify-center sm:w-1/3">
        <div class="text-3xl font-semibold mb-2">
          แจ้งเตือน: {{ weatherInfo.level }}
        </div>
        <div class="text-xl">{{ weatherInfo.advice }}</div>
      </div>

      <!-- Column 3: Details -->
      <div class="flex-1 flex flex-col justify-center items-end sm:w-1/3">
        <div
          v-for="(item, index) in details"
          :key="index"
          class="mb-2 text-right"
        >
          <div class="text-sm opacity-80">{{ item.label }}</div>
          <div class="text-lg font-semibold">{{ item.value }}</div>
        </div>
      </div>
    </div>
  </UDashboardCard>
</template>

<style scoped>
/* ถ้าต้องการปรับแต่งเพิ่มเติม สามารถทำได้ที่นี่ */
</style>
