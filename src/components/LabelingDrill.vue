<!-- LabelingDrill.vue: 标注练习场景、情绪选项、说明、提交按钮 -->
<template>
  <section>
    <h2 class="text-lg font-bold mb-2">标注练习</h2>
    <p class="mb-2">{{ currentScenario.text }}</p>
    <div class="flex flex-wrap gap-2 mb-2">
      <button
        v-for="emotion in emotions"
        :key="emotion"
        @click="selectEmotion(emotion)"
        :class="['px-2 py-1 rounded', selectedEmotion === emotion ? 'bg-blue-500 text-white' : 'bg-gray-200']"
      >
        {{ emotion }}
      </button>
    </div>
    <textarea
      v-model="emotionExplanation"
      placeholder="说明"
      class="w-full p-2 border rounded mb-2"
    ></textarea>
    <button class="px-4 py-2 bg-blue-500 text-white rounded" @click="saveEmotionLabel">
      提交
    </button>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { emotions, scenarios } from '../utils/constants'
import { useDate } from '../composables/useDate'
import { useStorage } from '../composables/useStorage'
import { useStreak } from '../composables/useStreak'
import { useTasks } from '../composables/useTasks'

const { dayIndex } = useDate()
const currentScenario = computed(() => scenarios[dayIndex.value % scenarios.length])

const selectedEmotion = ref('')
const emotionExplanation = ref('')

const { loadData, saveData } = useStorage()
const { updateProgress, streakDays, totalSessions } = useStreak()
const { todayTasks, completionRate } = useTasks()

onMounted(() => {
  const data = loadData()
  selectedEmotion.value = data.selectedEmotion || ''
  emotionExplanation.value = data.emotionExplanation || ''
})

function selectEmotion(emotion: string) {
  selectedEmotion.value = emotion
}

function saveEmotionLabel(event: Event) {
  if (selectedEmotion.value && emotionExplanation.value) {
    showSuccessMessage(event, '标注练习已完成')
    updateProgress()
    const data = loadData()
    data.selectedEmotion = selectedEmotion.value
    data.emotionExplanation = emotionExplanation.value
    data.todayTasks = JSON.parse(JSON.stringify(todayTasks))
    data.completionRate = completionRate.value
    data.streakDays = streakDays.value
    data.totalSessions = totalSessions.value
    saveData(data)
  } else {
    alert('请选择情绪并填写说明')
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
