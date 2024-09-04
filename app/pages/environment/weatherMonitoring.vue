<script setup lang="ts">
import { ref } from "vue";
import DatePicker from "~/components/DatePicker.vue";
import WeatherTemp from "~/components/environment/graphMonitoring/weatherTemp.vue";
import WeatherStatusA from "~/components/environment/graphMonitoring/weatherStatusA.vue";

const { isNotificationsSlideoverOpen } = useDashboard();

const items = [
  [
    {
      label: "New mail",
      icon: "i-heroicons-paper-airplane",
      to: "/inbox",
    },
    {
      label: "New user",
      icon: "i-heroicons-user-plus",
      to: "/users",
    },
  ],
];

// ใช้วันที่เดียวแทน Range
const selectedDate = ref(new Date());

// เพิ่มตัวแปรเหล่านี้
const selectedOrganization = ref(null);
const organizationOptions = ref([
  { label: "สำนักงานตำรวจแห่งชาติ", value: "A" },
  { label: "กอบบังคับการภูมธร ภาค 5", value: "B" },
  // เพิ่มตัวเลือกอื่นๆ ตามต้องการ
]);
// เพิ่มตัวแปรเหล่านี้
const selectedDevice = ref(null);
const deviceOptions = ref([
  { label: "เครื่องวัดอุณภูมิ-001-ORG01", value: "A" },
  { label: "เครื่องวัดอุณภูมิ-001-ORG02", value: "B" },
  // เพิ่มตัวเลือกอื่นๆ ตามต้องการ
]);
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardToolbar
        class="flex flex-col sm:flex-row items-start sm:items-center gap-4"
      >
        <div
          class="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto"
        >
          <DatePicker v-model="selectedDate" class="w-full sm:w-auto" />
          <USelect
            v-model="selectedOrganization"
            :options="organizationOptions"
            placeholder="เลือกองค์กร"
            class="w-full sm:w-60"
          />
          <USelect
            v-model="selectedDevice"
            :options="deviceOptions"
            placeholder="เลือกอุปกรณ์"
            class="w-full sm:w-60"
          />
        </div>
        <div class="flex items-center gap-2 mt-4 sm:mt-0 w-full sm:w-auto">
          <UIcon
            name="devicon:android"
            class="w-5 h-5 text-gray-900 dark:text-white flex-shrink-0"
          />
          <h2
            class="font-semibold text-sm text-gray-900 dark:text-white leading-tight"
          >
            <span class="font-semibold">Device Name:</span>
            <span class="font-normal break-all">
              เครื่องวัดอุณภูมิ-001-ORG01</span
            >
          </h2>
        </div>
      </UDashboardToolbar>

      <UDashboardPanelContent>
        <!-- ~/components/environment/graphMonitoring/weatherTemp.vue -->
        <div class="grid lg:grid-cols-1 lg:items-start gap-8 mt-5">
          <WeatherTemp />
        </div>
        <div class="grid lg:grid-cols-3 lg:items-start gap-8 mt-8 mb-8">
          <!-- ~/components/home/HomeSales.vue -->
          <WeatherStatusA />
          <!-- ~/components/home/HomeCountries.vue -->
          <HomeCountries />
          <!-- ~/components/home/HomeCountries.vue -->
          <HomeCountries />
        </div>

        <!-- ~/components/home/HomeChart.vue -->
        <HomeChart :period="period" :range="selectedDate" />
      </UDashboardPanelContent>
    </UDashboardPanel>
  </UDashboardPage>
</template>
