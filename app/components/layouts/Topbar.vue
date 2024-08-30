<script setup lang="ts">
const { isNotificationsSlideoverOpen } = useDashboard();

// รับ prop title
defineProps({
  title: {
    type: String,
    default: 'Dashboard'
  },
  isSmallScreen: {
    type: Boolean,
    default: false
  }
});
</script>

<template>
  <!-- เริ่มแถบด้านบน -->
  <UDashboardPanel>
    <UDashboardNavbar >
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

      <template #right>
        <!-- ปุ่มการแจ้งเตือน -->
        <UTooltip text="Notifications" :shortcuts="['N']">
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
        </UTooltip>
        <UColorModeButton />
      </template>
    </UDashboardNavbar>
  </UDashboardPanel>
  <!-- จบแถบด้านบน -->
</template>
