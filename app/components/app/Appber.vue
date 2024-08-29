
<script setup lang="ts">
</script>

<template>
    <UDashboardNavbar title="Organization Management">
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
        </template>
      </UDashboardNavbar>
</template>
