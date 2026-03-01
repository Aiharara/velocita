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
          ref="videoRef"
          class="absolute inset-0 w-full h-full object-cover"
          autoplay
          :muted="isVideoMuted"
          playsinline
          loop
          preload="auto"
      >
        <source :src="heroVideoUrl" type="video/mp4" />
      </video>

      <!-- 暗化叠层 -->
      <div class="absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-black/60 z-0 pointer-events-none"></div>
    </div>

    <!-- 视频音频控制按钮 - 右上角，独立于视频容器 -->
    <button
        v-show="shouldShowAudioButton"
        @click="toggleVideoSound"
        class="fixed top-20 right-6 z-50 w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black/60 hover:border-white/40 transition-all duration-300 hover:scale-110 transition-opacity duration-700"
        :class="{ 'bg-white/10! border-white/30!': !isVideoMuted }"
        :style="{ opacity: videoOpacity }"
    >
      <i class="pi text-lg" :class="isVideoMuted ? 'pi-volume-off' : 'pi-volume-up'"></i>
    </button>

    <!-- NavBar - 固定在顶部，逐渐变实体 -->
    <div class="fixed top-0 left-0 right-0 z-40 transition-opacity duration-500" :style="{ opacity: navOpacity }">
      <NavBar />
    </div>

    <!-- Hero Content - 随滚动向下移动并变实体 -->
    <div
        ref="heroContentRef"
        class="fixed inset-0 z-10 flex flex-col items-center justify-center px-4 transition-all duration-500"
        :style="{
          transform: `translateY(${heroTranslateY}px)`,
          opacity: heroOpacity,
          pointerEvents: scrollY > window.innerHeight * 1.8 ? 'none' : 'auto'
        }"
    >
      <!-- 顶部标签 -->
      <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-linear-to-r from-white/5 to-white/2 text-white/70 text-sm backdrop-blur-sm mb-8">
        <span class="relative flex h-2 w-2">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-yellow-300"></span>
        </span>
        Precision-built · Valved control · Premium materials
      </div>

      <!-- Main Title -->
      <h1 class="text-5xl md:text-7xl lg:text-8xl font-bold text-white text-center tracking-tight leading-tight mb-6">
        <span class="block text-white">
          Elevate the Sound.
        </span>
        <span class="block mt-2 bg-linear-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent">
          Control the Character.
        </span>
      </h1>

      <!-- Subtitle -->
      <p class="text-white/70 text-lg md:text-xl text-center max-w-2xl mb-10">
        VELOCITA performance exhaust systems combine industrial-grade materials<br class="hidden md:block" />
        with precision engineering—engineered for daily driving and track performance.
      </p>

      <!-- CTA Buttons -->
      <div class="flex flex-col sm:flex-row gap-4">
        <button
            @click="scrollToContent"
            class="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-yellow-400 font-semibold text-lg hover:bg-yellow-300 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/25"
        >
          <i class="pi pi-shopping-bag"></i>
          <span>Explore Products</span>
          <i class="pi pi-arrow-right text-sm group-hover:translate-x-1 transition-transform"></i>
        </button>
        <button
            @click="playExhaustSound"
            class="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-white/30 bg-white/10 backdrop-blur-md text-white font-medium text-lg hover:bg-white/20 transition-all duration-300 w-60"
            :class="{ 'bg-yellow-400/20! border-yellow-400/40!': isPlaying }"
        >
          <i class="pi mr-2" :class="isPlaying ? 'pi-pause' : 'pi-volume-up'"></i>
          {{ isPlaying ? 'Playing...' : 'Listen to Exhaust' }}
        </button>
      </div>
    </div>

    <!-- Scroll Hint - 独立元素，不受heroContent透明度影响 -->
    <div
        v-show="scrollY < 100"
        class="fixed bottom-12 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 animate-bounce"
    >
      <span class="text-white text-sm">Scroll down to enter</span>
      <i class="pi pi-chevron-down text-white text-xl"></i>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import exhaustAudio from '@/assets/audio/Porsche-panamera-turbo 4.0T_audio.mp3'
import NavBar from '@/components/NavBar.vue'
import { ANIMATION_CONFIG, MEDIA_CONFIG, getMediaUrl } from '@/config'
import { useScroll, useNavBarOpacity } from '@/composables/useScroll'

const videoRef = ref<HTMLVideoElement | null>(null)
const isPlaying = ref(false)
const isVideoMuted = ref(true)
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

// Hero内容移动：先向下到底部，保持不动，再向上直到消失
const heroTranslateY = computed(() => {
  const vh = window.value.innerHeight
  const initialOffset = -vh * HERO_CONFIG.INITIAL_OFFSET_RATIO
  const bottomPosition = vh * 0.01
  const finalOffset = -vh * HERO_CONFIG.FINAL_OFFSET_RATIO

  const phase1End = vh * HERO_CONFIG.PHASE1_RATIO
  if (scrollY.value <= phase1End) {
    if (scrollY.value <= 0) return initialOffset
    const progress = scrollY.value / phase1End
    return initialOffset + progress * (bottomPosition - initialOffset)
  }

  const phase2End = phase1End + vh * HERO_CONFIG.HOLD_DURATION
  if (scrollY.value <= phase2End) {
    return bottomPosition
  }

  const phase3Start = phase2End
  const phase3End = phase2End + vh * HERO_CONFIG.PHASE3_RATIO
  if (scrollY.value >= phase3End) return finalOffset

  const progress = (scrollY.value - phase3Start) / (phase3End - phase3Start)
  return bottomPosition + progress * (finalOffset - bottomPosition)
})

// Hero内容透明度：先变实体，再淡出
const heroOpacity = computed(() => {
  const vh = window.value.innerHeight

  const phase1End = vh * 0.4
  if (scrollY.value <= phase1End) {
    if (scrollY.value <= 0) return 0.5
    return 0.5 + (scrollY.value / phase1End) * 0.5
  }

  const phase2End = vh * HERO_CONFIG.PHASE1_RATIO + vh * HERO_CONFIG.HOLD_DURATION
  if (scrollY.value < phase2End) return 1

  const phase3Start = phase2End
  const phase3End = phase2End + vh * HERO_CONFIG.PHASE3_RATIO
  if (scrollY.value >= phase3End) return 0

  return 1 - (scrollY.value - phase3Start) / (phase3End - phase3Start)
})

// NavBar透明度：从透明逐渐变实体
const navOpacity = useNavBarOpacity(scrollY, window.value.innerHeight)

// 控制音频按钮的显示：第三阶段完成后隐藏
const shouldShowAudioButton = computed(() => {
  const vh = window.value.innerHeight
  const phase3End = vh * (1.8 + HERO_CONFIG.HOLD_DURATION)

  return scrollY.value < phase3End
})

function scrollToContent() {
  globalThis.window.scrollTo({
    top: window.value.innerHeight * (1.8 + HERO_CONFIG.HOLD_DURATION + 0.5),
    behavior: 'smooth'
  })
}

function toggleVideoSound() {
  isVideoMuted.value = !isVideoMuted.value
  if (videoRef.value) {
    videoRef.value.muted = isVideoMuted.value
  }
}

function playExhaustSound() {
  if (!audioElement) {
    audioElement = new Audio(exhaustAudio)
    audioElement.volume = 0.7

    // 音频结束时重置状态
    audioElement.addEventListener('ended', () => {
      isPlaying.value = false
    })
  }

  if (isPlaying.value) {
    // 如果正在播放，则暂停
    audioElement.pause()
    audioElement.currentTime = 0
    isPlaying.value = false
  } else {
    // 开始播放
    audioElement.play()
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

/* 噪点纹理 */
.noise-texture {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 200px 200px;
}
</style>
