<template>
  <div class="relative bg-black text-white">
    <!-- 视频背景层 - 固定在顶部，滚动时渐隐 -->
    <div
        ref="videoContainerRef"
        class="fixed inset-0 z-0 transition-opacity duration-700"
        :style="{ opacity: videoOpacity }"
    >
      <!-- 背景视频 -->
      <video
          v-if="!videoError"
          ref="videoRef"
          class="absolute inset-0 w-full h-full object-cover"
          autoplay
          :muted="isVideoMuted"
          playsinline
          loop
          preload="auto"
          @error="handleVideoError"
          @loadstart="videoLoading = true"
          @canplay="videoLoading = false"
      >
        <source :src="heroVideoUrl" type="video/mp4" />
      </video>

      <!-- 视频加载失败提示 -->
      <div v-if="videoError" class="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80 flex items-center justify-center">
        <div class="text-center">
          <i class="pi pi-exclamation-circle text-4xl text-red-400 mb-3"></i>
          <p class="text-white/70 text-lg">Hero video unavailable</p>
          <p class="text-white/40 text-sm mt-1">Please refresh the page</p>
        </div>
      </div>

      <!-- 暗化叠层 -->
      <div class="absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-black/60 z-0 pointer-events-none"></div>
    </div>

    <!-- 音频控制按钮 -->
    <HeroAudioButton
        :is-muted="isVideoMuted"
        :opacity="videoOpacity"
        :show-button="shouldShowAudioButton"
        @toggle-mute="toggleVideoSound"
    />

    <!-- Hero Content -->
    <HeroContent
        :scroll-y="scrollY"
        :window-height="window.innerHeight"
        :is-playing="isPlaying"
        @play-exhaust-sound="playExhaustSound"
    />

    <!-- Scroll Hint -->
    <HeroScrollHint :scroll-y="scrollY" />
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import exhaustAudio from '@/assets/audio/Porsche-panamera-turbo 4.0T_audio.mp3'
import HeroContent from './components/HeroContent.vue'
import HeroAudioButton from './components/HeroAudioButton.vue'
import HeroScrollHint from './components/HeroScrollHint.vue'
import { ANIMATION_CONFIG, MEDIA_CONFIG, getMediaUrl } from '@/config'
import { useScroll } from '@/composables/useScroll'

const videoRef = ref<HTMLVideoElement | null>(null)
const isPlaying = ref(false)
const isVideoMuted = ref(true)
const videoLoading = ref(false)
const videoError = ref(false)
const audioError = ref(false)
const scrollY = useScroll()
const window = ref({
  innerHeight: typeof globalThis.window !== 'undefined' ? globalThis.window.innerHeight : 1000
})

let audioElement: HTMLAudioElement | null = null

// 构建视频URL
const heroVideoUrl = computed(() => {
  return `${getMediaUrl(MEDIA_CONFIG.PATHS.VIDEOS)}/intro/intro.mp4`
})

const HERO_CONFIG = ANIMATION_CONFIG.HERO

// 视频透明度：在hero内容动画期间逐渐淡出
const videoOpacity = computed(() => {
  const fadeStart = 0
  const fadeEnd = window.value.innerHeight * (1.8 + HERO_CONFIG.HOLD_DURATION)
  if (scrollY.value <= fadeStart) return 1
  if (scrollY.value >= fadeEnd) return 0
  return 1 - (scrollY.value - fadeStart) / (fadeEnd - fadeStart)
})

// 控制音频按钮的显示：第三阶段完成后隐藏
const shouldShowAudioButton = computed(() => {
  const vh = window.value.innerHeight
  const phase3End = vh * (1.8 + HERO_CONFIG.HOLD_DURATION)

  return scrollY.value < phase3End
})

function toggleVideoSound() {
  isVideoMuted.value = !isVideoMuted.value
  if (videoRef.value) {
    videoRef.value.muted = isVideoMuted.value
  }
}

function handleVideoError(error: Event) {
  console.error('视频加载失败:', error)
  videoError.value = true
  videoLoading.value = false
}

function playExhaustSound() {
  if (!audioElement) {
    audioElement = new Audio(exhaustAudio)
    audioElement.volume = 0.7

    // 音频错误处理
    audioElement.addEventListener('error', () => {
      console.error('音频加载失败')
      audioError.value = true
      isPlaying.value = false
    })

    // 音频结束时重置状态
    audioElement.addEventListener('ended', () => {
      isPlaying.value = false
    })
  }

  if (audioError.value) {
    console.warn('音频加载出错，无法播放')
    return
  }

  if (isPlaying.value) {
    // 如果正在播放，则暂停
    audioElement.pause()
    audioElement.currentTime = 0
    isPlaying.value = false
  } else {
    // 开始播放
    audioElement.play().catch((err) => {
      console.error('音频播放失败:', err)
      audioError.value = true
      isPlaying.value = false
    })
    isPlaying.value = true
  }
}

function handleResize() {
  window.value.innerHeight = globalThis.window.innerHeight
}

// 监听滚动，第三阶段完成后自动静音
watch(shouldShowAudioButton, (newValue) => {
  if (!newValue && videoRef.value && !isVideoMuted.value) {
    isVideoMuted.value = true
    videoRef.value.muted = true
  }
})

onMounted(() => {
  window.value.innerHeight = globalThis.window.innerHeight
  globalThis.window.addEventListener('resize', handleResize, { passive: true })
})

onBeforeUnmount(() => {
  globalThis.window.removeEventListener('resize', handleResize)

  if (audioElement) {
    audioElement.pause()
    audioElement.src = ''
    audioElement = null
  }
})
</script>

<style scoped>
/* 自定义动画 */
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-bounce {
  animation: bounce 2s infinite;
}

/* Ping动画 */
@keyframes ping {
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
}

.animate-ping {
  animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
}

/* 视频优化 */
video {
  filter: contrast(1.1) brightness(0.9);
}

/* 网格背景 */
.bg-grid-pattern {
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 40px 40px;
}
</style>
