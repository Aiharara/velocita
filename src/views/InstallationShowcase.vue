<!-- views/InstallationShowcase.vue -->
<template>
  <div class="relative bg-black text-white min-h-screen">
    <!-- NavBar -->
    <div class="sticky top-0 z-40">
      <NavBar :show-back-button="true" />
    </div>

    <!-- 返回按钮 - 左上角固定位置，滚动时消失 -->
    <button
        @click="goBack"
        class="hidden md:flex fixed top-28 left-8 z-50 items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300 hover:scale-105 shadow-lg shadow-yellow-500/25"
        :style="{ opacity: backButtonOpacity, pointerEvents: scrollY > 200 ? 'none' : 'auto' }"
    >
      <i class="pi pi-arrow-left text-sm"></i>
      <span>Back</span>
    </button>

    <!-- 主内容 -->
    <div class="relative max-w-7xl mx-auto px-4 md:px-8 py-20">
      <!-- 页面标题 -->
      <div class="mb-12 flex-col-center">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/60 text-xs mb-4">
          <i class="pi pi-book text-yellow-400/80 text-[10px]"></i>
          <span>Complete Collection</span>
        </div>
        <h1 class="text-5xl md:text-6xl font-bold text-white tracking-tight mb-4">
          Installation Showcase
        </h1>
        <p class="text-white/60 text-lg max-w-3xl text-center">
          Explore our complete collection of installation guides with detailed photos and videos. Real cases from our workshop showing the complete installation process.
        </p>
      </div>

      <!-- Notice -->
      <ServiceBanner />

      <!-- Main Content -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <article
            v-for="(guide, index) in guides"
            :key="index"
            @click="openGuideDetail(guide)"
            class="guide-card group relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-sm transition-all duration-500 hover:border-white/25 hover:-translate-y-2 hover:shadow-2xl hover:shadow-yellow-500/10 cursor-pointer"
        >
          <!-- 顶部高光 -->
          <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <!-- 封面图片 -->
          <div class="relative h-48 w-full bg-gradient-to-b from-white/5 to-transparent overflow-hidden">
            <img
                :src="`${MEDIA_BASE_URL}${guide.images[0]}`"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                :alt="guide.label"
            />
            <!-- 图片遮罩 -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

            <!-- 媒体计数 -->
            <div class="absolute top-3 right-3 flex gap-2">
              <span v-if="guide.videos.length > 0" class="text-[10px] px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md border border-white/20 text-white/90 font-medium">
                <i class="pi pi-video text-[9px] mr-1"></i>
                {{ guide.videos.length }}
              </span>
              <span class="text-[10px] px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md border border-white/20 text-white/90 font-medium">
                <i class="pi pi-images text-[9px] mr-1"></i>
                {{ guide.images.length }}
              </span>
            </div>

            <!-- hover显示的查看提示 -->
            <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div class="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white">
                <i class="pi pi-eye text-lg"></i>
              </div>
            </div>
          </div>

          <!-- 内容区域 -->
          <div class="p-4">
            <h3 class="text-white font-semibold text-sm group-hover:text-yellow-300 transition-colors line-clamp-2 min-h-[2.5rem]">
              {{ guide.label }}
            </h3>
            <div class="mt-3 flex items-center justify-between text-xs text-white/50">
              <span>
                <i class="pi pi-folder-open text-[9px] mr-1"></i>
                {{ guide.images.length + guide.videos.length }} items
              </span>
              <span class="text-yellow-400/70">
                View Gallery
                <i class="pi pi-arrow-right text-[9px] ml-1 group-hover:translate-x-1 transition-transform"></i>
              </span>
            </div>
          </div>

          <!-- 微光效果 -->
          <div class="shimmer-effect"></div>
        </article>
      </div>
    </div>

    <!-- Footer -->
    <footer class="relative py-16 md:py-20 bg-black overflow-hidden border-t border-white/10">
      <div class="relative max-w-7xl mx-auto px-4 md:px-8 text-center">
        <p class="text-white/50 text-sm">
          © {{ new Date().getFullYear() }} Velocita. All rights reserved.
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from '@/views/home/NavBar.vue'
import ServiceBanner from '@/components/ServiceBanner.vue'
import installationGuidesData from '@/assets/data/installation-guides.json'

const router = useRouter()
const MEDIA_BASE_URL = 'https://media.velocita-exhaust-au.com/installation-guides/'
const scrollY = ref(0)

type Guide = {
  label: string
  folder_path: string
  images: string[]
  videos: string[]
}

const guides = ref<Guide[]>(installationGuidesData as Guide[])

// Back按钮透明度：滚动时逐渐消失
const backButtonOpacity = computed(() => {
  const fadeStart = 50
  const fadeEnd = 200
  if (scrollY.value <= fadeStart) return 1
  if (scrollY.value >= fadeEnd) return 0
  return 1 - (scrollY.value - fadeStart) / (fadeEnd - fadeStart)
})

function goBack() {
  router.push('/#guide')
}

function handleScroll() {
  scrollY.value = window.scrollY
}

function openGuideDetail(guide: Guide) {
  // 在新标签页打开详情页
  const routeData = router.resolve({
    name: 'guide-detail',
    params: { folder: guide.folder_path }
  })
  window.open(routeData.href, '_blank')
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* 工具类 */
.flex-col-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

/* 指南卡片 */
.guide-card {
  position: relative;
  overflow: hidden;
}

/* 微光效果 */
.shimmer-effect {
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.05),
    transparent
  );
  pointer-events: none;
}

.guide-card:hover .shimmer-effect {
  animation: shimmer 1.5s ease-in-out;
}

@keyframes shimmer {
  0% {
    left: -100%;
  }
  100% {
    left: 200%;
  }
}
</style>
