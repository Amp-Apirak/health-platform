<script setup lang="ts">
import { sub } from "date-fns"; // นำเข้าฟังก์ชัน sub จากไลบรารี date-fns สำหรับการคำนวณวันที่
import type { Period, Range } from "~/types"; // นำเข้าประเภทข้อมูล Period และ Range จากไฟล์ประเภท

// ใช้ฟังก์ชัน useDashboard เพื่อดึงตัวแปร isNotificationsSlideoverOpen
// สำหรับตรวจสอบสถานะการเปิด/ปิดของแถบการแจ้งเตือน
const { isNotificationsSlideoverOpen } = useDashboard();

// กำหนดช่วงเวลา (Range) ของวันที่ เริ่มจากวันที่ปัจจุบันย้อนหลัง 14 วันถึงวันนี้
const range = ref<Range>({
  start: sub(new Date(), { days: 14 }),
  end: new Date(),
});

// กำหนดค่าช่วงเวลาที่เลือกไว้ล่วงหน้า (Period) เป็น 'daily'
const period = ref<Period>("daily");
</script>

<template>
  <!-- สร้างหน้าแดชบอร์ด -->
  <UDashboardPage>
    <UDashboardPanel grow>


      <UDashboardToolbar>
        <template #left>
          <!-- ~/components/home/HomeDateRangePicker.vue -->
          <HomeDateRangePicker v-model="range" class="-ml-2.5" />

          <!-- ~/components/home/HomePeriodSelect.vue -->
          <HomePeriodSelect v-model="period" :range="range" />
        </template>
      </UDashboardToolbar>

      <UDashboardPanelContent>
        <!-- ~/components/home/HomeChart.vue -->
        <HomeChart :period="period" :range="range" />

        <div class="grid lg:grid-cols-2 lg:items-start gap-8 mt-8">
          <!-- ~/components/home/HomeSales.vue -->
          <HomeSales />
          <!-- ~/components/home/HomeCountries.vue -->
          <HomeCountries />
        </div>
      </UDashboardPanelContent>
    </UDashboardPanel>
  </UDashboardPage>
</template>
