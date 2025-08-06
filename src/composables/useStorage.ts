// useStorage.ts: 对 localStorage 的读写封装
const STORAGE_KEY = 'growthTrackerData'

export function useStorage() {
  const loadData = () => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) return {}
    const data = JSON.parse(saved)
    const today = new Date().toDateString()
    if (data.lastSaveDate !== today) return {}
    return data
  }

  const saveData = (partial: Record<string, any>) => {
    const existing = loadData()
    const today = new Date().toDateString()
    const data = { ...existing, ...partial, lastSaveDate: today }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    return data
  }

  return { loadData, saveData }
}
