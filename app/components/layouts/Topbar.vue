<script setup lang="ts">
const { isNotificationsSlideoverOpen } = useDashboard();
</script>

<template>
  <UDashboardPanel>
    <UDashboardNavbar title="Health Platform">
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
        <UColorModeButton />
      </template>
    </UDashboardNavbar>
  </UDashboardPanel>
</template>
