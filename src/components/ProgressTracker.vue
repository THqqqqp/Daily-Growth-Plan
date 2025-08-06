<!-- ProgressTracker.vue: 显示连续天数、总次数、完成率及进度条 -->
<template>
  <section>
    <h2 class="text-lg font-bold mb-2">进度</h2>
    <p>连续天数：{{ streakDays }}</p>
    <p>总次数：{{ totalSessions }}</p>
    <p>完成率：{{ completionRate }}%</p>
    <div class="w-full bg-gray-200 rounded h-2 mt-2">
      <div class="bg-green-500 h-2 rounded" :style="{ width: completionRate + '%' }"></div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useTasks } from '../composables/useTasks'
import { useStreak } from '../composables/useStreak'

const { completionRate } = useTasks()
const { streakDays, totalSessions } = useStreak()
</script>

<style scoped>
/* 使用 UnoCSS 工具类 */
</style>
