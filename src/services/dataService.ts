// dataService.ts: 数据持久层（当前返回 Promise.resolve）
export const dataService = {
  save(data: any) {
    return Promise.resolve(data)
  },
  load() {
    return Promise.resolve(null)
  }
}
