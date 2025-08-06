// useInspiration.ts: 根据日期提供每日灵感
import { computed } from 'vue'
import { inspirations } from '../utils/constants'
import { useDate } from './useDate'

export function useInspiration() {
  const { dayIndex } = useDate()
  const dailyInspiration = computed(() => inspirations[dayIndex.value % inspirations.length])
  return { dailyInspiration }
}
