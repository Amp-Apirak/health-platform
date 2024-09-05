<script setup lang="ts">
import { ref } from 'vue'
import { format } from 'date-fns'
import { DatePicker } from 'v-calendar' // ต้องแน่ใจว่าอิมพอร์ต DatePicker ถูกต้อง

const date = ref(new Date())
const formattedDate = computed(() => format(date.value, 'd MMM, yyyy')) // ใช้ computed สำหรับจัดการวันที่
</script>

<template>
  <UPopover :popper="{ placement: 'bottom-start' }">
    <UButton 
      icon="i-heroicons-calendar-days-20-solid" 
      :label="formattedDate"
    />

    <template #panel="{ close }">
      <DatePicker v-model="date" is-required @close="close" />
    </template>
  </UPopover>
</template>