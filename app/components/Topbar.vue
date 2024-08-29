<script setup lang="ts">

// ColorMode ---------------------------------------------------------------
import { useColorMode } from "@vueuse/core";

defineProps({
  title: {
    type: String,
    default: "Dashboard",
  },
  isSidebarOpen: {
    type: Boolean,
    required: true,
  },
  isSmallScreen: {
    type: Boolean,
    required: true,
  },
});

const colorMode = useColorMode();

const toggleColorMode = () => {
  colorMode.value = colorMode.value === "dark" ? "light" : "dark";
};
// ColorMode --------------------------------------------------------------

// toggle -----------------------------------------------------------------
const emit = defineEmits(["toggle-sidebar"]);

const toggleSidebar = () => {
  emit("toggle-sidebar");
};
// toggle -----------------------------------------------------------------


// ใช้ฟังก์ชัน useDashboard เพื่อดึงสถานะของแถบการแจ้งเตือน ------------------------
const { isNotificationsSlideoverOpen } = useDashboard();

</script>

<template>
  <UDashboardNavbar>
    <!----------- ปุ่มแฮมเบอร์เกอร์ และ ชื่อเมนู ----------->
    <template #left>
      <div class="flex items-center">
        <!-- แสดงปุ่มเฉพาะในหน้าจอขนาดเล็ก-->
        <UButton
          v-if="isSmallScreen"
          icon="i-heroicons-bars-3"
          color="gray"
          variant="ghost"
          class="mr-2"
          @click="toggleSidebar"
        />
        <h1 class="text-lg font-semibold">{{ title }}</h1>
      </div>
    </template>
  <!----------- ปุ่มแฮมเบอร์เกอร์ และ ชื่อเมนู -----------> 

  <!----------- แสดงปุ่มแจ้งเตือนและสลับโหมดสี ----------->
    <template #right>
      <UButton
        color="gray"
        variant="ghost"
        square
        @click="isNotificationsSlideoverOpen = true"
      >
        <UChip color="red" inset>
          <UIcon name="i-heroicons-bell" class="w-5 h-5" />
        </UChip>
      </UButton>
      <UButton @click="toggleColorMode" color="gray" variant="ghost">
        <UIcon
          :name="
            colorMode === 'light'
              ? 'i-heroicons-moon-20-solid'
              : 'i-heroicons-sun-20-solid'
          "
        />
      </UButton>
    </template>
  <!----------- แสดงปุ่มแจ้งเตือนและสลับโหมดสี ----------->
  </UDashboardNavbar>
</template>
