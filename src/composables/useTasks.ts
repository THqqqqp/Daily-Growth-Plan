// useTasks.ts: 管理今日任务及完成率逻辑
import { reactive, ref } from 'vue'

interface Task {
  text: string
  completed: boolean
}

const todayTasks = reactive<Task[]>([
  { text: '情绪复盘练习', completed: false },
  { text: '表达结构练习', completed: false },
  { text: '标注练习完成', completed: false }
])

const completionRate = ref(0)

function computeCompletionRate() {
  const completed = todayTasks.filter(t => t.completed).length
  completionRate.value = Math.round((completed / todayTasks.length) * 100)
}

function toggleTask(index: number) {
  todayTasks[index].completed = !todayTasks[index].completed
  computeCompletionRate()
}

export function useTasks() {
  return { todayTasks, completionRate, toggleTask, computeCompletionRate }
}
