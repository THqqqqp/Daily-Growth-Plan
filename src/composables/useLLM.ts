// useLLM.ts: 对接 LLM 的通用函数预留
import { llmService } from '../services/llmService'

export function useLLM() {
  const analyzeEmotion = (text: string) => llmService.chatCompletion(`Analyze emotion: ${text}`)
  const evaluateExpression = (text: string) => llmService.chatCompletion(`Evaluate expression: ${text}`)
  const generateScenarios = (prompt: string) => llmService.chatCompletion(`Generate scenarios: ${prompt}`)
  return { analyzeEmotion, evaluateExpression, generateScenarios }
}
