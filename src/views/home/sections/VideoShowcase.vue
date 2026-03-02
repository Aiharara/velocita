<!-- views/home/sections/VideoShowcase.vue -->
<template>
  <section id="cases" class="relative py-5 md:py-5 overflow-hidden">
    <!-- 背景装饰 -->
    <div class="absolute inset-0">
      <div class="absolute inset-0 bg-grid-pattern opacity-[0.01]"></div>
      <div class="absolute inset-0 noise-texture opacity-[0.02]"></div>
    </div>

    <div class="relative max-w-7xl mx-auto px-4 md:px-8">
      <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/60 text-xs mb-4">
            <i class="pi pi-video text-yellow-400/80 text-[10px]"></i>
            <span>Case Studies</span>
          </div>
          <h2 class="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Video Gallery
          </h2>
          <p class="mt-3 text-white/60 text-lg max-w-2xl">
            Real exhaust notes, fitment results, and driving experiences. Covering Porsche, Audi, BMW, Mercedes-AMG, and more.
          </p>
        </div>

        <button
            @click="goToGallery"
            class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/15 text-white hover:bg-white/10 hover:border-white/25 transition-all duration-300 hover:scale-105"
        >
          <span>View All Videos</span>
          <i class="pi pi-arrow-right"></i>
        </button>
      </div>

      <Carousel
          :value="videos"
          :numVisible="carouselNumVisible"
          :numScroll="1"
          circular
          :autoplayInterval="0"
          class="vel-carousel"
      >
        <template #item="{ data, index }">
          <article
              class="video-card group relative mx-3 rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-sm transition-all duration-500 hover:border-white/25 hover:shadow-2xl hover:shadow-yellow-500/10"
          >
            <!-- 顶部高光 -->
            <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>

            <div class="relative aspect-video overflow-hidden bg-black/20 cursor-pointer" @click="openVideoDialog(data)">
              <!-- 视频元素作为缩略图 -->
              <video
                  v-if="!failedVideos.has(index)"
                  :ref="el => setVideoRef(el, index)"
                  :id="`video-${index}`"
                  class="w-full h-full object-cover"
                  muted
                  preload="none"
                  :poster="data.poster"
                  @error="handleVideoError(index, $event)"
              >
                <source :src="data.url" type="video/mp4" />
              </video>
              <MediaErrorFallback
                  v-else
                  title="Video Unavailable"
                  message="Unable to load video"
                  height="auto"
              />

              <!-- 渐变遮罩 -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none"></div>

              <!-- 播放按钮 -->
              <div class="absolute inset-0 flex items-center justify-center transition-all duration-500 z-10">
                <div class="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border-2 border-white/30 flex items-center justify-center text-white transition-all duration-300 group-hover:scale-110 group-hover:bg-white/30 group-hover:border-yellow-400/50">
                  <i class="pi pi-play ml-1 text-2xl"></i>
                </div>
              </div>

              <!-- 信息叠层 -->
              <div class="absolute left-5 bottom-5 right-5 z-10 pointer-events-none">
                <div class="flex items-center justify-between gap-3 mb-2">
                  <h3 class="text-white font-bold text-lg truncate group-hover:text-yellow-300 transition-colors">
                    {{ data.title }}
                  </h3>
                  <span class="shrink-0 text-xs text-white/90 border border-white/30 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-md font-medium">
                    {{ data.tag }}
                  </span>
                </div>
                <p class="text-sm text-white/70 truncate">
                  {{ data.subtitle }}
                </p>
              </div>

              <!-- 品牌标签 -->
              <div class="absolute top-4 right-4 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/20 text-white/90 text-xs font-medium pointer-events-none">
                <i class="pi pi-star-fill text-yellow-400 text-[10px] mr-1"></i>
                {{ data.brand }}
              </div>
            </div>

            <!-- 微光效果 -->
            <div class="shimmer-effect"></div>
          </article>
        </template>
      </Carousel>

      <!-- More Vehicle Models Notice -->
      <div class="mt-12 flex justify-center">
        <div class="relative group max-w-2xl w-full">
          <div class="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-yellow-500/20 to-yellow-400/20 blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
          <div class="relative flex items-center gap-4 px-6 py-4 rounded-xl bg-gradient-to-br from-white/[0.08] to-white/[0.03] border border-white/10 backdrop-blur-sm group-hover:border-yellow-400/30 transition-all duration-300">
            <div class="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400/20 to-yellow-500/20 flex items-center justify-center border border-yellow-400/30">
              <i class="pi pi-info-circle text-yellow-400 text-xl"></i>
            </div>
            <div class="flex-1">
              <p class="text-white/90 text-base leading-relaxed">
                <span class="font-semibold text-yellow-400">More Vehicle Models Available</span>
                <span class="text-white/70 ml-2">— We service beyond these brands. <span class="text-yellow-400 cursor-pointer hover:underline" @click="triggerContact">Contact us</span> for more models.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部分隔线 -->
    <div class="mt-14 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

    <!-- 视频播放弹窗 -->
    <Dialog
        v-model:visible="showVideoDialog"
        modal
        :dismissableMask="true"
        :closable="true"
        class="video-dialog"
        :pt="{
          root: { class: 'w-[95vw] max-w-6xl' },
          header: { class: 'bg-black/95 border-b border-white/10 backdrop-blur-xl' },
          content: { class: 'bg-black/95 p-0' },
          mask: { class: 'backdrop-blur-sm' }
        }"
    >
      <template #header>
        <div v-if="currentVideo" class="flex items-center gap-3">
          <div class="w-2 h-8 bg-yellow-400 rounded-full"></div>
          <div>
            <h3 class="text-white font-bold text-lg">{{ currentVideo.title }}</h3>
            <p class="text-white/60 text-sm">{{ currentVideo.subtitle }}</p>
          </div>
        </div>
      </template>

      <div v-if="currentVideo" class="relative w-full bg-black" style="max-height: 75vh;">
        <video
            class="w-full h-full"
            style="max-height: 75vh; object-fit: contain;"
            controls
            autoplay
            loop
            :src="currentVideo.url"
            @loadedmetadata="handleDialogVideoLoaded"
        >
        </video>
      </div>
    </Dialog>
  </section>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import Carousel from 'primevue/carousel'
import Dialog from 'primevue/dialog'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import videoGallery from '@/assets/data/video-gallery.json'
import type { VideoGallery } from '@/types/video-gallery'
import { getVideo, getBrandName } from '@/types/video-gallery'
import MediaErrorFallback from '@/components/MediaErrorFallback.vue'
import { eventBus } from '@/utils/eventBus'
import { MEDIA_CONFIG, getMediaUrl, BREAKPOINTS, DATA_CONFIG } from '@/config'

gsap.registerPlugin(ScrollTrigger)

const router = useRouter()
const VIDEO_BASE_URL = `${getMediaUrl(MEDIA_CONFIG.PATHS.VIDEOS)}`

type VideoItem = {
  url: string
  title: string
  subtitle: string
  tag: string
  brand: string
  poster: string
}

// 配置驱动的视频数据 - 类型安全，易于维护
interface VideoCaseConfig {
  brand: string
  videoIndex: number
  subtitle: string
  tag: string
}

const videoCasesConfig: VideoCaseConfig[] = [
  { brand: 'ferrari', videoIndex: 0, subtitle: 'Velocita titanium exhaust • Pure V8 sound', tag: 'Supercar' },
  { brand: 'lamborghini', videoIndex: 2, subtitle: 'Natural aspirated V10 • Track ready', tag: 'Supercar' },
  { brand: 'mclaren', videoIndex: 1, subtitle: 'Twin-turbo V8 • Carbon titanium system', tag: 'Supercar' },
  { brand: 'aston-martin', videoIndex: 6, subtitle: 'AMG V8 powered • Valved exhaust control', tag: 'GT' },
  { brand: 'audi', videoIndex: 0, subtitle: 'V10 naturally aspirated • Iconic sound', tag: 'Supercar' },
  { brand: 'bmw', videoIndex: 6, subtitle: 'S63 V8 twin-turbo • Competition spec', tag: 'Performance' },
  { brand: 'mercedes-benz', videoIndex: 0, subtitle: 'Inline-6 turbo • Valved system', tag: 'AMG' },
  { brand: 'lotus', videoIndex: 0, subtitle: 'Lightweight performance • Pure driving experience', tag: 'Track' },
]

// 从配置和JSON生成视频数据 - 类型安全
const buildVideos = (): VideoItem[] => {
  const typedGallery = videoGallery as VideoGallery
  return videoCasesConfig
    .map(config => {
      const video = getVideo(typedGallery, config.brand, config.videoIndex)
      const brandName = getBrandName(typedGallery, config.brand)

      if (!video || !brandName) {
        console.warn(`Video not found for brand: ${config.brand}, index: ${config.videoIndex}`)
        return null
      }

      return {
        url: `${VIDEO_BASE_URL}${video.url}`,
        title: `${brandName} ${video.label}`,
        subtitle: config.subtitle,
        tag: config.tag,
        brand: brandName,
        poster: `${VIDEO_BASE_URL}${video.poster}`
      }
    })
    .filter((item): item is VideoItem => item !== null)
}

const videos = ref<VideoItem[]>(buildVideos())

const showVideoDialog = ref(false)
const currentVideo = ref<VideoItem | null>(null)
const videoRefs = new Map<number, HTMLVideoElement>()
const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1024)
const failedVideos = ref<Set<number>>(new Set())

// 根据屏幕宽度计算轮播图显示数量
const carouselNumVisible = computed(() => {
  if (windowWidth.value < BREAKPOINTS.MOBILE) {
    return DATA_CONFIG.CAROUSEL.ITEMS_MOBILE
  } else if (windowWidth.value < BREAKPOINTS.TABLET) {
    return DATA_CONFIG.CAROUSEL.ITEMS_TABLET
  } else {
    return DATA_CONFIG.CAROUSEL.ITEMS_DESKTOP
  }
})

function handleResize() {
  windowWidth.value = window.innerWidth
}

function setVideoRef(el: any, index: number) {
  if (el) {
    videoRefs.set(index, el as HTMLVideoElement)
  }
}

function handleDialogVideoLoaded(event: Event) {
  const video = event.target as HTMLVideoElement
  // 弹窗播放时从第0秒开始，确保用户不错过任何内容
  video.currentTime = 0
}

function handleVideoError(index: number, event: Event) {
  console.error(`视频加载失败 (index: ${index}):`, event)
  failedVideos.value.add(index)
}

function openVideoDialog(video: VideoItem) {
  currentVideo.value = video
  showVideoDialog.value = true
}

function goToGallery() {
  router.push('/video-gallery')
}

function triggerContact() {
  eventBus.emit('highlight-contact')
}

onMounted(() => {
  // 滚动触发的入场动画
  gsap.from('#cases', {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '#cases',
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  })

  // 监听窗口大小变化
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

/* 视频卡片 */
.video-card {
  position: relative;
  overflow: hidden;
}

/* 视频放大效果 */
.video-card video {
  transition: transform 0.5s ease;
}

.video-card:hover video {
  transform: scale(1.08);
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

.video-card:hover .shimmer-effect {
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

/* PrimeVue Carousel样式优化 */
:deep(.p-carousel .p-carousel-indicators .p-carousel-indicator button) {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  transition: all 0.3s;
}

:deep(.p-carousel .p-carousel-indicators .p-carousel-indicator button:hover) {
  background: rgba(250, 204, 21, 0.5);
}

:deep(.p-carousel .p-carousel-indicators .p-carousel-indicator.p-highlight button) {
  background: rgba(250, 204, 21, 0.9);
}

/* 轮播图按钮样式 - 仅在平板及以上设备显示（手机端包括横屏都隐藏） */
@media (min-width: 768px) {
  /* 轮播图按钮 - 基础样式 */
  :deep(.p-carousel .p-carousel-prev-button) {
    padding: 80px 10px 80px 30px !important;
  }

  :deep(.p-carousel .p-carousel-next-button) {
    padding: 80px 30px 80px 10px !important;
  }

  :deep(.p-carousel .p-carousel-prev-button),
  :deep(.p-carousel .p-carousel-next-button) {
    border-radius: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
  }

  /* 按钮内图标大小 */
  :deep(.p-carousel .p-carousel-prev-button .p-icon),
  :deep(.p-carousel .p-carousel-next-button .p-icon) {
    font-size: 1.5rem;
  }

  /* 左按钮位置 */
  :deep(.p-carousel .p-carousel-prev) {
    left: 20px !important;
  }

  /* 右按钮位置 */
  :deep(.p-carousel .p-carousel-next) {
    right: 20px !important;
  }

  /* 左按钮悬停 - 光源从中心向左扩散 */
  :deep(.p-carousel .p-carousel-prev-button:hover) {
    background-image:
      /* 主光斑：不贴边，中心亮，向外柔和消失 */
        radial-gradient(
            120% 70% at 70% 50%,
            rgba(250, 204, 21, 0.55) 0%,
            rgba(250, 204, 21, 0.22) 28%,
            rgba(250, 204, 21, 0.10) 45%,
            rgba(250, 204, 21, 0.00) 68%
        )!important;
  }

  /* 右按钮悬停 - 光源从中心向右扩散 */
  :deep(.p-carousel .p-carousel-next-button:hover) {
    background: radial-gradient(
        120% 70% at 30% 50%,
        rgba(250, 204, 21, 0.55) 0%,
        rgba(250, 204, 21, 0.22) 28%,
        rgba(250, 204, 21, 0.10) 45%,
        rgba(250, 204, 21, 0.00) 68%
    )!important;
  }
}

/* 视频弹窗样式 */
:deep(.video-dialog .p-dialog-header) {
  padding: 1.5rem !important;
}

:deep(.video-dialog .p-dialog-content) {
  padding: 0 !important;
}

:deep(.video-dialog .p-dialog-header-close) {
  color: rgba(255, 255, 255, 0.7) !important;
  width: 2.5rem !important;
  height: 2.5rem !important;
  border-radius: 0.5rem !important;
  transition: all 0.3s !important;
}

:deep(.video-dialog .p-dialog-header-close:hover) {
  background: rgba(250, 204, 21, 0.2) !important;
  color: rgba(250, 204, 21, 0.9) !important;
}
</style>
