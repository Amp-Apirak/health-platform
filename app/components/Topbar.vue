<script setup lang="ts">
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

const emit = defineEmits(['toggle-sidebar']);

const colorMode = useColorMode();
const { isNotificationsSlideoverOpen } = useDashboard();

const toggleColorMode = () => {
  colorMode.value = colorMode.value === "dark" ? "light" : "dark";
};

const toggleSidebar = () => {
  emit('toggle-sidebar');
};
</script>

<template>
  <UDashboardNavbar>
    <template #left>
      <div class="flex items-center">
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
  </UDashboardNavbar>
</template>
