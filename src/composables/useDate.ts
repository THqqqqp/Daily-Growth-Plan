// useDate.ts: 提供当前日期和日索引的计算
import { computed } from 'vue'
import { formatDate } from '../utils/dateUtils'

export function useDate() {
  const currentDate = computed(() => formatDate(new Date()))
  const dayIndex = computed(() => new Date().getDate())
  return { currentDate, dayIndex }
}
