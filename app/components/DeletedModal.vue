<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean
  assetName: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()

const open = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const loading = ref(false)

function onDelete() {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    open.value = false
    emit('confirm')
  }, 1000)
}

function onCancel() {
  open.value = false
  emit('cancel')
}
</script>

<template>
  <UDashboardModal
    v-model="open"
    :title="'ลบอุปกรณ์'"
    :description="`คุณแน่ใจหรือไม่ว่าต้องการลบ ${assetName}?`"
    icon="i-heroicons-exclamation-circle"
    :ui="{
      icon: { base: 'text-red-500 dark:text-red-400' } as any,
      footer: { base: 'ml-16' } as any
    }"
  >
    <template #footer>
      <UButton color="red" label="ลบ" :loading="loading" @click="onDelete" />
      <UButton color="white" label="ยกเลิก" @click="onCancel" />
    </template>
  </UDashboardModal>
</template>