// useInspiration.ts: 通过 LLM 获取每日灵感
import { ref, onMounted } from 'vue'
import { useLLM } from './useLLM'

export function useInspiration() {
  const dailyInspiration = ref({ text: '', source: '' })
  const { generateInspiration } = useLLM()

  async function loadInspiration() {
    const result = await generateInspiration()
    try {
      const parsed = typeof result === 'string' ? JSON.parse(result) : result
      dailyInspiration.value = {
        text: parsed.text || '',
        source: parsed.source || ''
      }
    } catch (e) {
      dailyInspiration.value = { text: result?.text || result || '', source: result?.source || '' }
    }
  }

  onMounted(loadInspiration)

  return { dailyInspiration, loadInspiration }
}
