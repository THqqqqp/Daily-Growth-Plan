<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue'

// 当前日期显示
const currentDate = ref(new Date().toLocaleDateString('zh-CN', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  weekday: 'long'
}))

// 任务列表
const todayTasks = reactive([
  { text: '情绪复盘练习', completed: false },
  { text: '表达结构练习', completed: false },
  { text: '标注练习完成', completed: false }
])

// 练习记录
const practiceRecord = reactive({
  importantSentence: '',
  dailySummary: ''
})

// 情绪复盘内容
const emotionReflection = reactive({
  uncomfortablePerson: '',
  perceivedEmotion: '',
  myReaction: ''
})

// 选中的情绪和说明
const selectedEmotion = ref('')
const emotionExplanation = ref('')

// 模板练习文本
const templatePractice = ref('')

// 连续完成天数、总次数、完成率
const streakDays = ref(0)
const totalSessions = ref(0)
const completionRate = ref(0)

// 情绪列表
const emotions = [
  '焦虑', '愤怒', '悲伤', '开心', '放松', '困惑', '失望', '兴奋', '紧张', '满足'
]

// 场景列表
const scenarios = [
  { text: '同事在会议上被老板当众批评，低头不语，双手紧握' },
  { text: '朋友收到心仪工作的拒绝邮件，沉默了很久，然后苦笑着说"没关系"' },
  { text: '室友考试成绩出来后，一直盯着手机，眉头紧锁，长时间不说话' },
  { text: '孩子看到别的小朋友都有新玩具，自己站在一旁踢小石子' },
  { text: '妈妈看到你收拾房间后，脸上露出了久违的笑容，主动给你做了爱吃的菜' }
]

// 模板句式
const templates = [
  {
    template: '我理解你是想____，但其实你更担心的是____。',
    example: '我理解你是想帮助我，但其实你更担心的是我会犯错误。'
  },
  {
    template: '当你____的时候，我感受到了____，我希望____。',
    example: '当你提高音量的时候，我感受到了压力，我希望我们可以平静地讨论。'
  },
  {
    template: '如果我没理解错的话，你的意思是____，对吗？',
    example: '如果我没理解错的话，你的意思是这件事让你感到不被重视，对吗？'
  },
  {
    template: '我注意到____，这让我想到____，你怎么看？',
    example: '我注意到你最近话变少了，这让我想到你可能有什么心事，你怎么看？'
  }
]

// 励志名言
const inspirations = [
  { text: "The cave you fear to enter holds the treasure you seek.", source: "Joseph Campbell" },
  { text: "Your life is your message to the world. Make sure it's inspiring.", source: "Lorrin L. Lee" },
  { text: "The way to get started is to quit talking and begin doing.", source: "Walt Disney" },
  { text: "Progress, not perfection, is the goal.", source: "Unknown" },
  { text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.", source: "Ralph Waldo Emerson" }
]

// 根据当前日期选择对应场景
const currentScenario = computed(() => {
  const today = new Date().getDate()
  return scenarios[today % scenarios.length]
})

// 根据当前日期选择模板
const currentTemplate = computed(() => {
  const today = new Date().getDate()
  return templates[today % templates.length]
})

// 根据当前日期选择励志语录
const dailyInspiration = computed(() => {
  const today = new Date().getDate()
  return inspirations[today % inspirations.length]
})

// 切换任务完成状态
function toggleTask(index) {
  todayTasks[index].completed = !todayTasks[index].completed
  updateProgress()
  saveData()
}

// 选中情绪
function selectEmotion(emotion) {
  selectedEmotion.value = emotion
}

// 保存练习记录
function savePracticeRecord(event) {
  if (practiceRecord.importantSentence || practiceRecord.dailySummary) {
    showSuccessMessage(event, '练习记录已保存')
    updateProgress()
    saveData()
  }
}

// 保存情绪标注
function saveEmotionLabel(event) {
  if (selectedEmotion.value && emotionExplanation.value) {
    showSuccessMessage(event, '标注练习已完成')
    updateProgress()
    saveData()
  } else {
    alert('请选择情绪并填写说明')
  }
}

// 保存情绪复盘
function saveEmotionReflection(event) {
  if (emotionReflection.uncomfortablePerson || emotionReflection.perceivedEmotion) {
    showSuccessMessage(event, '情绪复盘已保存')
    updateProgress()
    saveData()
  }
}

// 保存表达练习
function saveTemplatePractice(event) {
  if (templatePractice.value) {
    showSuccessMessage(event, '表达练习已保存')
    updateProgress()
    saveData()
  }
}

// 更新进度
function updateProgress() {
  const completedTasks = todayTasks.filter(task => task.completed).length
  completionRate.value = Math.round((completedTasks / todayTasks.length) * 100)

  if (completedTasks === todayTasks.length) {
    streakDays.value++
    totalSessions.value++
  }
}

// 显示成功提示
function showSuccessMessage(event, message) {
  if (!event || !event.target) return
  const originalText = event.target.textContent
  event.target.textContent = '✓ ' + message
  event.target.style.background = '#34c759'
  setTimeout(() => {
    event.target.textContent = originalText
    event.target.style.background = '#007aff'
  }, 1500)
}

// 保存数据到 localStorage
function saveData() {
  const data = {
    todayTasks: JSON.parse(JSON.stringify(todayTasks)),
    practiceRecord: JSON.parse(JSON.stringify(practiceRecord)),
    emotionReflection: JSON.parse(JSON.stringify(emotionReflection)),
    selectedEmotion: selectedEmotion.value,
    emotionExplanation: emotionExplanation.value,
    templatePractice: templatePractice.value,
    streakDays: streakDays.value,
    totalSessions: totalSessions.value,
    completionRate: completionRate.value,
    lastSaveDate: new Date().toDateString()
  }
  localStorage.setItem('growthTrackerData', JSON.stringify(data))
}

// 载入 localStorage 数据
function loadData() {
  const saved = localStorage.getItem('growthTrackerData')
  if (saved) {
    const data = JSON.parse(saved)
    const today = new Date().toDateString()

    if (data.lastSaveDate !== today) {
      todayTasks.forEach(task => task.completed = false)
      practiceRecord.importantSentence = ''
      practiceRecord.dailySummary = ''
      emotionReflection.uncomfortablePerson = ''
      emotionReflection.perceivedEmotion = ''
      emotionReflection.myReaction = ''
      selectedEmotion.value = ''
      emotionExplanation.value = ''
      templatePractice.value = ''
      completionRate.value = 0
    } else {
      // 恢复数据
      todayTasks.splice(0, todayTasks.length, ...data.todayTasks)
      practiceRecord.importantSentence = data.practiceRecord.importantSentence
      practiceRecord.dailySummary = data.practiceRecord.dailySummary
      emotionReflection.uncomfortablePerson = data.emotionReflection.uncomfortablePerson
      emotionReflection.perceivedEmotion = data.emotionReflection.perceivedEmotion
      emotionReflection.myReaction = data.emotionReflection.myReaction
      selectedEmotion.value = data.selectedEmotion
      emotionExplanation.value = data.emotionExplanation
      templatePractice.value = data.templatePractice
      completionRate.value = data.completionRate
    }

    streakDays.value = data.streakDays || 0
    totalSessions.value = data.totalSessions || 0
  }
}

onMounted(() => {
  loadData()
  updateProgress()
})
</script>


<template>
  <div class="max-w-107 rounded-2xl mx-auto min-h-screen bg-white/95 backdrop-blur-2xl shadow-xl">
    <header class="text-center pt-15 pb-7 px-5 bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white rounded-b-3xl">
      <h1 class="text-2xl font-bold mb-2">成长追踪</h1>
      <p class="text-base opacity-90">{{ currentDate }}</p>
    </header>

    <div class="p-5 pb-20">

      <!-- 今日计划 -->
      <div class="bg-white rounded-xl p-5 mb-4 shadow-lg border border-black/5">
        <h2 class="text-lg font-semibold mb-4 flex items-center gap-2">📋 今日计划</h2>
        <div v-for="(task, index) in todayTasks" :key="index" class="flex items-center py-3 border-b border-[#f5f5f7] last:border-b-0">
          <div
            class="w-5 h-5 border-2 border-[#007aff] rounded-full mr-3 flex items-center justify-center cursor-pointer transition-all"
            :class="{ 'bg-[#007aff]': task.completed }"
            @click="toggleTask(index)">
            <span v-if="task.completed" class="text-white text-xs font-bold">✓</span>
          </div>
          <span class="flex-1 text-base text-[#1d1d1f]" :class="{ 'line-through text-[#8e8e93]': task.completed }">
            {{ task.text }}
          </span>
        </div>
      </div>

      <!-- 每日灵感 -->
      <div class="bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white rounded-xl p-5 text-center mb-4">
        <div class="text-lg italic leading-snug mb-2">“{{ dailyInspiration.text }}”</div>
        <div class="text-sm opacity-80">{{ dailyInspiration.source }}</div>
      </div>

      <!-- 练习记录 -->
      <div class="bg-white rounded-xl p-5 mb-4 shadow-lg border border-black/5">
        <h2 class="text-lg font-semibold mb-4 flex items-center gap-2">✍️ 练习记录</h2>
        <div class="mb-4">
          <label class="block mb-2 font-medium">今日最重要的一句话：</label>
          <textarea
            v-model="practiceRecord.importantSentence"
            class="w-full border border-[#d1d1d6] rounded-lg p-3 text-base font-sans transition-all min-h-11 resize-vertical focus:outline-none focus:border-[#007aff] focus:shadow-[0_0_0_3px_rgba(0,122,255,0.1)]"
            placeholder="请写下今天最重要的感悟或想法..." rows="3"></textarea>
        </div>
        <div>
          <label class="block mb-2 font-medium">今日总结：</label>
          <textarea
            v-model="practiceRecord.dailySummary"
            class="w-full border border-[#d1d1d6] rounded-lg p-3 text-base font-sans transition-all min-h-14 resize-vertical focus:outline-none focus:border-[#007aff] focus:shadow-[0_0_0_3px_rgba(0,122,255,0.1)]"
            placeholder="今天你有哪些收获、感悟或者反思？" rows="4"></textarea>
        </div>
        <button class="bg-[#007aff] text-white rounded-lg p-3 text-base font-semibold w-full mt-3 transition-all hover:bg-[#0051d5] active:translate-y-0.5" @click="savePracticeRecord">保存记录</button>
      </div>

      <!-- 标注练习 -->
      <div class="bg-white rounded-xl p-5 mb-4 shadow-lg border border-black/5">
        <h2 class="text-lg font-semibold mb-4 flex items-center gap-2">🎯 标注练习</h2>
        <div class="bg-[#f8f9ff] border border-[#e5e7ff] rounded-lg p-4 mb-4">
          <p class="mb-3"><strong>情境：</strong>{{ currentScenario.text }}</p>
          <p class="mb-3 font-medium">你觉得这个人可能的情绪是：</p>
          <div class="flex flex-wrap gap-2 mb-2">
            <span
              v-for="emotion in emotions" :key="emotion"
              class="bg-[#f0f0f0] border border-[#d1d1d6] rounded-full px-4 py-1.5 text-sm cursor-pointer transition-all"
              :class="{ 'bg-[#007aff] text-white border-[#007aff]': selectedEmotion === emotion }"
              @click="selectEmotion(emotion)"
            >{{ emotion }}</span>
          </div>
          <textarea
            v-model="emotionExplanation"
            class="w-full border border-[#d1d1d6] rounded-lg p-3 text-base font-sans transition-all min-h-8 resize-vertical focus:outline-none focus:border-[#007aff] focus:shadow-[0_0_0_3px_rgba(0,122,255,0.1)] mt-3"
            placeholder="请简单写下你判断的理由..." rows="2"></textarea>
        </div>
        <button class="bg-[#007aff] text-white rounded-lg p-3 text-base font-semibold w-full mt-2 transition-all hover:bg-[#0051d5] active:translate-y-0.5" @click="saveEmotionLabel">提交标注</button>
      </div>

      <!-- 情绪复盘 -->
      <div class="bg-white rounded-xl p-5 mb-4 shadow-lg border border-black/5">
        <h2 class="text-lg font-semibold mb-4 flex items-center gap-2">🤔 情绪复盘</h2>
        <div class="mb-4">
          <label class="block mb-2 font-medium">今天谁让你不舒服了？</label>
          <input
            v-model="emotionReflection.uncomfortablePerson"
            class="w-full border border-[#d1d1d6] rounded-lg p-3 text-base font-sans transition-all focus:outline-none focus:border-[#007aff] focus:shadow-[0_0_0_3px_rgba(0,122,255,0.1)]"
            placeholder="请写下具体的人或事..." />
        </div>
        <div class="mb-4">
          <label class="block mb-2 font-medium">你觉察到对方什么情绪了？</label>
          <textarea
            v-model="emotionReflection.perceivedEmotion"
            class="w-full border border-[#d1d1d6] rounded-lg p-3 text-base font-sans transition-all min-h-11 resize-vertical focus:outline-none focus:border-[#007aff] focus:shadow-[0_0_0_3px_rgba(0,122,255,0.1)]"
            placeholder="你观察到的对方情绪..." rows="3"></textarea>
        </div>
        <div>
          <label class="block mb-2 font-medium">你的反应和感受：</label>
          <textarea
            v-model="emotionReflection.myReaction"
            class="w-full border border-[#d1d1d6] rounded-lg p-3 text-base font-sans transition-all min-h-11 resize-vertical focus:outline-none focus:border-[#007aff] focus:shadow-[0_0_0_3px_rgba(0,122,255,0.1)]"
            placeholder="你当时是如何反应的？你有什么感受？" rows="3"></textarea>
        </div>
        <button class="bg-[#007aff] text-white rounded-lg p-3 text-base font-semibold w-full mt-3 transition-all hover:bg-[#0051d5] active:translate-y-0.5" @click="saveEmotionReflection">保存复盘</button>
      </div>

      <!-- 表达模板 -->
      <div class="bg-white rounded-xl p-5 mb-4 shadow-lg border border-black/5">
        <h2 class="text-lg font-semibold mb-4 flex items-center gap-2">💬 表达模板</h2>
        <div class="bg-[#f8f9ff] rounded-lg p-4 text-base leading-6 mb-3 border-l-4 border-[#007aff]">
          {{ currentTemplate.template }}
        </div>
        <div class="mb-4">
          <label class="block mb-2 font-medium">请尝试填写：</label>
          <textarea
            v-model="templatePractice"
            class="w-full border border-[#d1d1d6] rounded-lg p-3 text-base font-sans transition-all min-h-11 resize-vertical focus:outline-none focus:border-[#007aff] focus:shadow-[0_0_0_3px_rgba(0,122,255,0.1)]"
            :placeholder="currentTemplate.example"
            rows="3"></textarea>
        </div>
        <button class="bg-[#007aff] text-white rounded-lg p-3 text-base font-semibold w-full mt-2 transition-all hover:bg-[#0051d5] active:translate-y-0.5" @click="saveTemplatePractice">保存练习</button>
      </div>

      <!-- 成长追踪 -->
      <div class="bg-white rounded-xl p-5 mb-4 shadow-lg border border-black/5">
        <h2 class="text-lg font-semibold mb-4 flex items-center gap-2">📈 成长追踪</h2>
        <div class="flex justify-around text-center mb-2">
          <div class="flex-1">
            <div class="text-2xl font-bold text-[#007aff]">{{ streakDays }}</div>
            <div class="text-sm text-[#8e8e93] mt-1">连续天数</div>
          </div>
          <div class="flex-1">
            <div class="text-2xl font-bold text-[#007aff]">{{ totalSessions }}</div>
            <div class="text-sm text-[#8e8e93] mt-1">总练习次数</div>
          </div>
          <div class="flex-1">
            <div class="text-2xl font-bold text-[#007aff]">{{ completionRate }}%</div>
            <div class="text-sm text-[#8e8e93] mt-1">完成率</div>
          </div>
        </div>
        <div class="bg-[#f0f0f0] rounded-full h-2.5 my-3 overflow-hidden">
          <div class="bg-gradient-to-r from-[#007aff] to-[#5856d6] h-full rounded-full transition-all duration-500" :style="{ width: completionRate + '%' }"></div>
        </div>
      </div>
    </div>

    <footer class="text-center py-5 text-[#8e8e93] text-sm fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-2xl border-t border-black/5 z-50">
      © 2025 成长追踪 | 每日进步一点点
    </footer>
  </div>
</template>

<style scoped>

</style>
