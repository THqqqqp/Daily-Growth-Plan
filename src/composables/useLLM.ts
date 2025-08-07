// useLLM.ts: 对接 LLM 的通用函数预留
import { llmService } from '../services/llmService'

export function useLLM() {
  const analyzeEmotion = (text: string) => llmService.chatCompletion(`Analyze emotion: ${text}`)
  const evaluateExpression = (text: string) => llmService.chatCompletion(`Evaluate expression: ${text}`)
  const generateScenarios = (prompt: string) => llmService.chatCompletion(`Generate scenarios: ${prompt}`)

  // 每日灵感生成函数
  const generateInspiration = () =>
    llmService.chatCompletion(
      '请生成一句中文每日灵感，并附上出处，强制要求不返回任何多余内容，包括md，直接返回JSON格式，如：{"text":"...", "source":"..."}'
    )

  return { analyzeEmotion, evaluateExpression, generateScenarios, generateInspiration }
}
