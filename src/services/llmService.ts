// llmService.ts: 封装 ChatCompletion API 调用
export const llmService = {
  async chatCompletion(prompt: string): Promise<string> {
    // 此处预留实际的 API 调用
    return Promise.resolve(`LLM response for: ${prompt}`)
  }
}
