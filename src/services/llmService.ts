// llmService.ts: 调用 DeepSeek V3 ChatCompletion API
const API_URL = 'https://api.deepseek.com/v1/chat/completions'

export const llmService = {
  async chatCompletion(prompt: string): Promise<string> {
    const apiKey = import.meta.env.VITE_DEEPSEEK_API_KEY
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [{ role: 'user', content: prompt }]
        })
      })
      const data = await response.json()
      return data?.choices?.[0]?.message?.content?.trim() || ''
    } catch (error) {
      console.error('DeepSeek API error:', error)
      return ''
    }
  }
}