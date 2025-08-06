<!-- Dashboard.vue: 顶层布局，包含 Header、Footer 及所有子组件 -->
<template>
  <div class="p-4 space-y-6">
    <header class="text-center">
      <h1 class="text-2xl font-bold">成长仪表盘</h1>
      <p class="text-sm text-gray-500">{{ currentDate }}</p>
    </header>

    <ProgressTracker />
    <TodayTasks />
    <DailyInspiration />
    <PracticeRecord />
    <LabelingDrill />
    <EmotionReflection />
    <ExpressionTemplate />

    <footer class="text-center text-xs text-gray-400">© 2024</footer>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import ProgressTracker from './ProgressTracker.vue'
import TodayTasks from './TodayTasks.vue'
import DailyInspiration from './DailyInspiration.vue'
import PracticeRecord from './PracticeRecord.vue'
import LabelingDrill from './LabelingDrill.vue'
import EmotionReflection from './EmotionReflection.vue'
import ExpressionTemplate from './ExpressionTemplate.vue'

import { useDate } from '../composables/useDate'
import { useTasks } from '../composables/useTasks'
import { useStreak } from '../composables/useStreak'
import { useStorage } from '../composables/useStorage'

const { currentDate } = useDate()
const { todayTasks, completionRate, computeCompletionRate } = useTasks()
const { streakDays, totalSessions } = useStreak()
const { loadData } = useStorage()

onMounted(() => {
  const data = loadData()
  if (data.todayTasks) todayTasks.splice(0, todayTasks.length, ...data.todayTasks)
  if (typeof data.completionRate === 'number') completionRate.value = data.completionRate
  if (typeof data.streakDays === 'number') streakDays.value = data.streakDays
  if (typeof data.totalSessions === 'number') totalSessions.value = data.totalSessions
  computeCompletionRate()
})
</script>

<style scoped>
/* 样式全部使用 UnoCSS 工具类 */
</style>
