<!-- ExpressionTemplate.vue: 模板句展示与练习保存 -->
<template>
  <section>
    <h2 class="text-lg font-bold mb-2">表达结构练习</h2>
    <p class="mb-1">{{ currentTemplate.template }}</p>
    <p class="text-sm text-gray-500 mb-2">示例: {{ currentTemplate.example }}</p>
    <textarea
      v-model="templatePractice"
      placeholder="你的练习"
      class="w-full p-2 border rounded mb-2"
    ></textarea>
    <button class="px-4 py-2 bg-blue-500 text-white rounded" @click="saveTemplatePractice">
      保存
    </button>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { templates } from '../utils/constants'
import { useDate } from '../composables/useDate'
import { useStorage } from '../composables/useStorage'
import { useStreak } from '../composables/useStreak'
import { useTasks } from '../composables/useTasks'

const { dayIndex } = useDate()
const currentTemplate = computed(() => templates[dayIndex.value % templates.length])

const templatePractice = ref('')

const { loadData, saveData } = useStorage()
const { updateProgress, streakDays, totalSessions } = useStreak()
const { todayTasks, completionRate } = useTasks()

onMounted(() => {
  const data = loadData()
  templatePractice.value = data.templatePractice || ''
})

function saveTemplatePractice(event: Event) {
  if (templatePractice.value) {
    showSuccessMessage(event, '表达练习已保存')
    updateProgress()
    const data = loadData()
    data.templatePractice = templatePractice.value
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
