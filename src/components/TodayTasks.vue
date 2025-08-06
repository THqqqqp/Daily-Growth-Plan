<!-- TodayTasks.vue: 今日计划列表及勾选逻辑 -->
<template>
  <section>
    <h2 class="text-lg font-bold mb-2">今日计划</h2>
    <ul>
      <li
        v-for="(task, index) in todayTasks"
        :key="index"
        class="flex items-center space-x-2 mb-1"
      >
        <input type="checkbox" :checked="task.completed" @change="onToggle(index)" />
        <span :class="task.completed ? 'line-through text-gray-400' : ''">{{ task.text }}</span>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { useTasks } from '../composables/useTasks'
import { useStreak } from '../composables/useStreak'
import { useStorage } from '../composables/useStorage'

const { todayTasks, completionRate, toggleTask } = useTasks()
const { updateProgress, streakDays, totalSessions } = useStreak()
const { loadData, saveData } = useStorage()

function onToggle(index: number) {
  toggleTask(index)
  updateProgress()
  const data = loadData()
  data.todayTasks = JSON.parse(JSON.stringify(todayTasks))
  data.completionRate = completionRate.value
  data.streakDays = streakDays.value
  data.totalSessions = totalSessions.value
  saveData(data)
}
</script>

<style scoped>
/* 仅使用 UnoCSS 工具类，无需额外样式 */
</style>
