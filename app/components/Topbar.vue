<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: 'Dashboard'
  }
})

// ใช้ฟังก์ชัน useDashboard เพื่อดึงตัวแปร isNotificationsSlideoverOpen 
// สำหรับตรวจสอบสถานะการเปิด/ปิดของแถบการแจ้งเตือน
const { isNotificationsSlideoverOpen } = useDashboard()
</script>

<template>
  <UDashboardNavbar :title="title">
    <template #right>
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
    </template>
  </UDashboardNavbar>
</template>