<!-- EmotionReflection.vue: 情绪复盘输入与保存 -->
<template>
  <section>
    <h2 class="text-lg font-bold mb-2">情绪复盘</h2>
    <input
      v-model="emotionReflection.uncomfortablePerson"
      placeholder="让你不舒服的人"
      class="w-full p-2 border rounded mb-2"
    />
    <input
      v-model="emotionReflection.perceivedEmotion"
      placeholder="Ta 的情绪"
      class="w-full p-2 border rounded mb-2"
    />
    <input
      v-model="emotionReflection.myReaction"
      placeholder="你的反应"
      class="w-full p-2 border rounded mb-2"
    />
    <button class="px-4 py-2 bg-blue-500 text-white rounded" @click="saveEmotionReflection">
      保存
    </button>
  </section>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { useStorage } from '../composables/useStorage'
import { useStreak } from '../composables/useStreak'
import { useTasks } from '../composables/useTasks'

const emotionReflection = reactive({
  uncomfortablePerson: '',
  perceivedEmotion: '',
  myReaction: ''
})

const { loadData, saveData } = useStorage()
const { updateProgress, streakDays, totalSessions } = useStreak()
const { todayTasks, completionRate } = useTasks()

onMounted(() => {
  const data = loadData()
  if (data.emotionReflection) {
    emotionReflection.uncomfortablePerson = data.emotionReflection.uncomfortablePerson || ''
    emotionReflection.perceivedEmotion = data.emotionReflection.perceivedEmotion || ''
    emotionReflection.myReaction = data.emotionReflection.myReaction || ''
  }
})

function saveEmotionReflection(event: Event) {
  if (emotionReflection.uncomfortablePerson || emotionReflection.perceivedEmotion) {
    showSuccessMessage(event, '情绪复盘已保存')
    updateProgress()
    const data = loadData()
    data.emotionReflection = { ...emotionReflection }
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