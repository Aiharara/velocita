<!-- views/home/sections/WhyChooseVelocita.vue -->
<template>
  <section id="features" class="relative py-5 md:py-5 bg-black overflow-hidden">
    <!-- 背景装饰 -->
    <div class="absolute inset-0">
      <div class="absolute inset-0 bg-grid-pattern opacity-[0.01]"></div>
      <div class="absolute inset-0 noise-texture opacity-[0.02]"></div>
    </div>

    <div class="relative max-w-7xl mx-auto px-4 md:px-8">
      <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/60 text-xs mb-4">
            <i class="pi pi-check-circle text-yellow-400/80 text-[10px]"></i>
            <span>Core Features</span>
          </div>
          <h2 class="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Why Choose Velocita
          </h2>
          <p class="mt-3 text-white/60 text-lg max-w-2xl">
            vehicle-specific, bolt-on exhaust—no cutting or welding; valves integrate with OEM infotainment.          </p>
        </div>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
        <div
          v-for="(feature, index) in features"
          :key="index"
          @click="toggleCard(index)"
          class="feature-card group relative p-2 md:p-5 rounded-xl bg-gradient-to-br from-white/[0.08] to-white/[0.03] border border-white/10 backdrop-blur-sm hover:border-yellow-400/30 transition-all duration-500 hover:shadow-lg hover:shadow-yellow-500/5"
          :class="{ 'md:cursor-default': !isMobile, 'cursor-pointer': isMobile }"
        >
          <div class="absolute inset-0 bg-gradient-to-br from-yellow-400/0 to-yellow-400/0 group-hover:from-yellow-400/5 group-hover:to-transparent rounded-xl transition-all duration-500"></div>
          <div class="relative">
            <div class="flex gap-2 md:gap-3 md:mb-3">
              <!-- 桌面端：图标在左边 -->
              <div class="hidden md:flex w-11 h-11 rounded-lg bg-gradient-to-br from-yellow-400/20 to-yellow-500/10 items-center justify-center group-hover:scale-110 transition-transform duration-500 flex-shrink-0">
                <i :class="`pi ${feature.icon} text-yellow-400 text-lg`"></i>
              </div>
              <!-- 文字区域 -->
              <div class="flex-1 min-w-0 flex items-center">
                <h4 class="text-white group-hover:text-yellow-300 font-semibold text-xs md:text-base transition-colors duration-300 leading-tight md:leading-normal">
                  {{ feature.title }}
                </h4>
              </div>
              <!-- 移动端：图标和按钮垂直排列在右边 -->
              <div class="md:hidden flex flex-col items-center justify-center gap-1 flex-shrink-0">
                <div class="w-7 h-7 rounded-lg bg-gradient-to-br from-yellow-400/20 to-yellow-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <i :class="`pi ${feature.icon} text-yellow-400 text-xs`"></i>
                </div>
                <i
                  class="pi pi-chevron-down text-white/60 text-xs transition-transform duration-300"
                  :class="{ 'rotate-180': expandedCards.has(index) }"
                ></i>
              </div>
            </div>
            <p
              class="text-white/60 text-xs md:text-sm leading-relaxed md:block transition-all duration-300 overflow-hidden md:mt-0"
              :class="expandedCards.has(index) ? 'block mt-2' : 'hidden md:block'"
            >
              {{ feature.description }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部分隔线 -->
    <div class="mt-14 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { BREAKPOINTS } from '@/config'

interface Feature {
  icon: string
  title: string
  description: string
}

const features: Feature[] = [
  {
    icon: 'pi-car',
    title: 'Vehicle-Specific Design',
    description: 'Custom-engineered for each model, ensuring perfect fitment and optimal performance'
  },
  {
    icon: 'pi-shield',
    title: 'No Cutting Required',
    description: 'Preserves your original exhaust system with zero modifications to the vehicle'
  },
  {
    icon: 'pi-check-circle',
    title: 'Non-Destructive Install',
    description: 'Bolt-on installation maintains vehicle integrity and resale value'
  },
  {
    icon: 'pi-wrench',
    title: 'Weld-Free Solution',
    description: 'Professional-grade clamp system eliminates welding and permanent alterations'
  },
  {
    icon: 'pi-sliders-h',
    title: 'Smart Valve Control',
    description: 'Remote-controlled valves paired with precision actuators for instant sound adjustment'
  },
  {
    icon: 'pi-mobile',
    title: 'Vehicle Integration',
    description: 'Seamlessly syncs with your vehicle\'s infotainment and drive modes'
  }
]

const expandedCards = ref<Set<number>>(new Set())
const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1024)

const isMobile = computed(() => windowWidth.value < BREAKPOINTS.MOBILE)

function handleResize() {
  windowWidth.value = window.innerWidth
  if (!isMobile.value) {
    expandedCards.value.clear()
  }
}

function toggleCard(index: number) {
  if (!isMobile.value) return

  if (expandedCards.value.has(index)) {
    expandedCards.value.delete(index)
  } else {
    expandedCards.value.add(index)
  }
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
/* 网格背景 */
.bg-grid-pattern {
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 40px 40px;
}
</style>
