<!-- PracticeRecord.vue: 练习记录双 textarea + 保存按钮 -->
<template>
  <section>
    <h2 class="text-lg font-bold mb-2">练习记录</h2>
    <textarea
      v-model="practiceRecord.importantSentence"
      placeholder="今日最重要的一句话"
      class="w-full p-2 border rounded mb-2"
    ></textarea>
    <textarea
      v-model="practiceRecord.dailySummary"
      placeholder="今日总结"
      class="w-full p-2 border rounded mb-2"
    ></textarea>
    <button class="px-4 py-2 bg-blue-500 text-white rounded" @click="savePracticeRecord">
      保存
    </button>
  </section>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { useStorage } from '../composables/useStorage'
import { useStreak } from '../composables/useStreak'
import { useTasks } from '../composables/useTasks'

const practiceRecord = reactive({
  importantSentence: '',
  dailySummary: ''
})

const { loadData, saveData } = useStorage()
const { updateProgress, streakDays, totalSessions } = useStreak()
const { todayTasks, completionRate } = useTasks()

onMounted(() => {
  const data = loadData()
  if (data.practiceRecord) {
    practiceRecord.importantSentence = data.practiceRecord.importantSentence || ''
    practiceRecord.dailySummary = data.practiceRecord.dailySummary || ''
  }
})

function savePracticeRecord(event: Event) {
  if (practiceRecord.importantSentence || practiceRecord.dailySummary) {
    showSuccessMessage(event, '练习记录已保存')
    updateProgress()
    const data = loadData()
    data.practiceRecord = { ...practiceRecord }
    data.todayTasks = JSON.parse(JSON.stringify(todayTasks))
    data.completionRate = completionRate.value
    data.streakDays = streakDays.value
    data.totalSessions = totalSessions.value
    saveData(data)
  }
}

function showSuccessMessage(event: Event, message: string) {
  const target = event.target as HTMLElement
  if (!target) return
  const original = target.textContent || ''
  target.textContent = '✓ ' + message
  target.style.background = '#34c759'
  setTimeout(() => {
    target.textContent = original
    target.style.background = '#007aff'
  }, 1500)
}
</script>

<style scoped>
/* 使用 UnoCSS 工具类 */
</style>
