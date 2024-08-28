<script setup lang="ts">
import type { NavItem } from '@nuxt/content'

const navigation = inject<Ref<NavItem[]>>('navigation', ref([]))
</script>

<template>
  <UContainer>
    <UPage>
      <template #left>
        <UAside>
          <UNavigationTree :links="mapContentNavigation(navigation)" />
        </UAside>
      </template>

      <!-- Change this to `<slot />` when in a layout. -->
      <NuxtPage />
    </UPage>
  </UContainer>
</template>
