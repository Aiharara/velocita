<!-- views/home/sections/Guide.vue -->
<template>
  <section id="guide" class="relative py-5 md:py-5 bg-black overflow-hidden">
    <!-- 背景装饰 -->
    <div class="absolute inset-0">
      <div class="absolute inset-0 bg-grid-pattern opacity-[0.01]"></div>
      <div class="absolute inset-0 noise-texture opacity-[0.02]"></div>
    </div>

    <div class="relative max-w-7xl mx-auto px-4 md:px-8">
      <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/60 text-xs mb-4">
            <i class="pi pi-book text-yellow-400/80 text-[10px]"></i>
            <span>Installation Guides</span>
          </div>
          <h2 class="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Installation Showcase
          </h2>
          <p class="mt-3 text-white/60 text-lg max-w-2xl">
            Real installation cases with detailed photos and videos from our workshop.
          </p>
        </div>

        <router-link
            to="/guides"
            class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/15 text-white hover:bg-white/10 hover:border-white/25 transition-all duration-300 hover:scale-105"
        >
          <span>Browse All Guides</span>
          <i class="pi pi-arrow-right"></i>
        </router-link>
      </div>

      <!-- 展示前4个帖子入口 -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <article
            v-for="(guide, index) in previewGuides"
            :key="index"
            @click="openGuideDetail(guide)"
            class="guide-card group relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-sm transition-all duration-500 hover:border-white/25 hover:-translate-y-2 hover:shadow-2xl hover:shadow-yellow-500/10 cursor-pointer flex flex-col h-[280px]"
        >
          <!-- 顶部高光 -->
          <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <!-- 封面图片 -->
          <div class="relative h-48 w-full bg-gradient-to-b from-white/5 to-transparent overflow-hidden">
            <img
                v-if="!failedImages.has(guide.label)"
                :src="`${MEDIA_BASE_URL}${guide.images[0]}`"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                :alt="guide.label"
                @error="handleImageError($event, guide.label)"
            />
            <MediaErrorFallback
                v-else
                title="Guide Image Unavailable"
                message="Unable to load"
                height="192px"
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
          <div class="p-4 flex-1 flex flex-col">
            <h3 class="text-white font-semibold text-sm group-hover:text-yellow-300 transition-colors line-clamp-2">
              {{ guide.label }}
            </h3>
            <div class="pt-3 mt-auto flex items-center justify-between text-xs text-white/50">
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

    <!-- 底部分隔线 -->
    <div class="mt-14 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import installationGuidesData from '@/assets/data/installation-guides.json'
import MediaErrorFallback from '@/components/MediaErrorFallback.vue'
import { MEDIA_CONFIG, getMediaUrl } from '@/config'
import type { Guide } from '@/types/guide'

gsap.registerPlugin(ScrollTrigger)

const router = useRouter()

// 媒体基础路径 - 使用 computed 响应式获取
const MEDIA_BASE_URL = computed(() => `${getMediaUrl(MEDIA_CONFIG.PATHS.INSTALLATION_GUIDES)}/`)

const guides = ref<Guide[]>(installationGuidesData as Guide[])
const failedImages = ref<Set<string>>(new Set())

// 前4个作为预览
const previewGuides = computed(() => guides.value.slice(0, 4))

function handleImageError(event: Event, guideName: string) {
  const img = event.target as HTMLImageElement
  console.error(`安装指南图片加载失败 (${guideName}):`, img.src)
  failedImages.value.add(guideName)
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
  // 设置初始可见状态，避免因ScrollTrigger未触发导致不可见
  gsap.set('#guide', { opacity: 1 })
  gsap.set('.guide-card', { opacity: 1 })

  // 滚动触发的入场动画
  gsap.from('#guide', {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '#guide',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    }
  })

  // 卡片交错入场
  gsap.from('.guide-card', {
    opacity: 0,
    y: 30,
    stagger: 0.15,
    duration: 0.8,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.guide-card',
      start: 'top 85%',
      toggleActions: 'play none none reverse'
    }
  })
})
</script>

<style scoped>
/* 指南卡片 */
.guide-card {
  position: relative;
  overflow: hidden;
}
</style>
