<!-- views/home/components/HeroContent.vue -->
<template>
  <!-- Hero Content - 随滚动向下移动并变实体 -->
  <div
      ref="heroContentRef"
      class="fixed inset-0 z-10 flex flex-col items-center justify-center px-4 transition-all duration-500"
      :style="{
        transform: `translateY(${heroTranslateY}px)`,
        opacity: heroOpacity,
        pointerEvents: pointerEvents ? 'auto' : 'none'
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
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ANIMATION_CONFIG } from '@/config'

interface Props {
  scrollY: number
  windowHeight: number
  isPlaying: boolean
}

interface Emits {
  (e: 'scroll-to-content'): void
  (e: 'play-exhaust-sound'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const HERO_CONFIG = ANIMATION_CONFIG.HERO

// Hero内容移动：先向下到底部，保持不动，再向上直到消失
const heroTranslateY = computed(() => {
  const vh = props.windowHeight
  const initialOffset = -vh * HERO_CONFIG.INITIAL_OFFSET_RATIO
  const bottomPosition = vh * 0.01
  const finalOffset = -vh * HERO_CONFIG.FINAL_OFFSET_RATIO

  const phase1End = vh * HERO_CONFIG.PHASE1_RATIO
  if (props.scrollY <= phase1End) {
    if (props.scrollY <= 0) return initialOffset
    const progress = props.scrollY / phase1End
    return initialOffset + progress * (bottomPosition - initialOffset)
  }

  const phase2End = phase1End + vh * HERO_CONFIG.HOLD_DURATION
  if (props.scrollY <= phase2End) {
    return bottomPosition
  }

  const phase3Start = phase2End
  const phase3End = phase2End + vh * HERO_CONFIG.PHASE3_RATIO
  if (props.scrollY >= phase3End) return finalOffset

  const progress = (props.scrollY - phase3Start) / (phase3End - phase3Start)
  return bottomPosition + progress * (finalOffset - bottomPosition)
})

// Hero内容透明度：先变实体，再淡出
const heroOpacity = computed(() => {
  const vh = props.windowHeight

  const phase1End = vh * 0.4
  if (props.scrollY <= phase1End) {
    if (props.scrollY <= 0) return 0.5
    return 0.5 + (props.scrollY / phase1End) * 0.5
  }

  const phase2End = vh * HERO_CONFIG.PHASE1_RATIO + vh * HERO_CONFIG.HOLD_DURATION
  if (props.scrollY < phase2End) return 1

  const phase3Start = phase2End
  const phase3End = phase2End + vh * HERO_CONFIG.PHASE3_RATIO
  if (props.scrollY >= phase3End) return 0

  return 1 - (props.scrollY - phase3Start) / (phase3End - phase3Start)
})

// 控制指针事件
const pointerEvents = computed(() => {
  return props.scrollY < props.windowHeight * 1.8
})

function scrollToContent() {
  globalThis.window.scrollTo({
    top: props.windowHeight * (1.8 + HERO_CONFIG.HOLD_DURATION + 0.5),
    behavior: 'smooth'
  })
}

function playExhaustSound() {
  emit('play-exhaust-sound')
}
</script>
