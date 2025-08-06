// useStreak.ts: 管理连续天数、总次数及进度更新
import { ref } from 'vue'
import { useTasks } from './useTasks'

const streakDays = ref(0)
const totalSessions = ref(0)

export function useStreak() {
  const { completionRate, computeCompletionRate } = useTasks()

  function updateProgress() {
    computeCompletionRate()
    if (completionRate.value === 100) {
      streakDays.value++
      totalSessions.value++
    }
  }

  return { streakDays, totalSessions, updateProgress }
}
