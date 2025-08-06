<!-- DailyInspiration.vue: 每日灵感展示 -->
<template>
  <section>
    <h2 class="text-lg font-bold mb-2">每日灵感</h2>
    <p class="italic">"{{ dailyInspiration.text }}"</p>
    <p class="text-right text-sm mt-1">- {{ dailyInspiration.source }}</p>
  </section>
</template>

<script setup lang="ts">
import { useInspiration } from '../composables/useInspiration'

const { dailyInspiration } = useInspiration()
</script>

<style scoped>
/* 无需额外样式 */
</style>
