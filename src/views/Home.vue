<template>
  <div>
    <!-- Hero section -->
    <Hero />

    <!-- 主内容区域 -->
    <main
        class="relative z-20"
        :style="{
          marginTop: `${contentMarginTop}px`,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 100%)'
        }"
    >
      <VideoShowcase />
      <ExhaustSystems />
      <WhyChooseVelocita />
      <Guide />
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import Hero from '@/views/home/Hero.vue'
import VideoShowcase from '@/views/home/VideoShowcase.vue'
import ExhaustSystems from '@/views/home/ExhaustSystems.vue'
import WhyChooseVelocita from '@/views/home/WhyChooseVelocita.vue'
import Guide from '@/views/home/Guide.vue'

const scrollY = ref(0)
const windowHeight = ref(typeof globalThis.window !== 'undefined' ? globalThis.window.innerHeight : 1000)

// 主内容区域的上边距：固定值，避免滚动跳跃
const contentMarginTop = computed(() => {
  const HOLD_DURATION = 0.5
  // 固定在Hero完全消失的位置
  return windowHeight.value * (1.65 + HOLD_DURATION)
})

function handleScroll() {
  scrollY.value = globalThis.window.scrollY
}

function handleResize() {
  windowHeight.value = globalThis.window.innerHeight
}

onMounted(() => {
  windowHeight.value = globalThis.window.innerHeight
  globalThis.window.addEventListener('scroll', handleScroll, { passive: true })
  globalThis.window.addEventListener('resize', handleResize, { passive: true })
})

onBeforeUnmount(() => {
  globalThis.window.removeEventListener('scroll', handleScroll)
  globalThis.window.removeEventListener('resize', handleResize)
})
</script>
