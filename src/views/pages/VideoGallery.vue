<template>
  <div class="relative bg-black text-white min-h-screen">
    <!-- 返回按钮 -->
    <BackButton :opacity="backButtonOpacity" :scroll-y="scrollY" :on-click="goBack" />

    <!-- 主内容 -->
    <div class="relative max-w-7xl mx-auto px-4 md:px-8 py-20">
      <!-- 页面标题 -->
      <div class="mb-12 flex-col-center">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/60 text-xs mb-4">
          <i class="pi pi-video text-yellow-400/80 text-[10px]"></i>
          <span>Complete Collection</span>
        </div>
        <h1 class="text-5xl md:text-6xl font-bold text-white tracking-tight mb-4">
          Video Gallery
        </h1>
        <p class="text-white/60 text-lg max-w-3xl">
          Explore our complete collection of exhaust sound demos, installation guides, and customer showcases. Organized by brand for easy browsing.
        </p>
      </div>

      <!-- 品牌过滤按钮 -->
      <div class="flex flex-wrap gap-3 mb-10">
        <button
            @click="selectedBrand = null"
            class="px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-300"
            :class="selectedBrand === null
              ? 'bg-white/10 text-yellow-400 border-yellow-400/50'
              : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10 hover:text-white'"
        >
          All Brands
        </button>
        <button
            v-for="(brand, key) in videoGallery"
            :key="key"
            @click="selectedBrand = key"
            class="px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-300"
            :class="selectedBrand === key
              ? 'bg-white/10 text-yellow-400 border-yellow-400/50'
              : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10 hover:text-white'"
        >
          {{ brand.name }}
        </button>
      </div>

      <!-- More Vehicle Models Notice -->
      <ServiceBanner />

      <!-- 视频网格 - 按品牌分组 -->
      <div v-for="(brand, brandKey) in filteredBrands" :key="brandKey" class="mb-16">
        <!-- 品牌标题 -->
        <div class="flex items-center gap-4 mb-6">
          <h2 class="text-3xl font-bold text-white">{{ brand.name }}</h2>
          <div class="flex-1 h-px bg-gradient-to-r from-white/20 to-transparent"></div>
          <span class="text-white/40 text-sm">{{ brand.videos.length }} videos</span>
        </div>

        <!-- 视频网格 -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <article
              v-for="(video, videoIndex) in brand.videos"
              :key="videoIndex"
              class="video-card group relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-sm transition-all duration-500 hover:border-white/25 hover:-translate-y-2 hover:shadow-2xl hover:shadow-yellow-500/10"
          >
            <!-- 顶部高光 -->
            <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>

            <div class="relative aspect-video overflow-hidden bg-black/20 cursor-pointer" @click="openVideoDialog(video.url, video.label, brand.name)">
              <!-- 视频元素作为缩略图 -->
              <video
                  :id="`video-${brandKey}-${videoIndex}`"
                  class="w-full h-full object-cover"
                  muted
                  preload="none"
                  :poster="`${VIDEO_BASE_URL}${video.poster}`"
              >
                <source :src="`${VIDEO_BASE_URL}${video.url}`" type="video/mp4" />
              </video>

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
                <h3 class="text-white font-bold text-lg mb-1 group-hover:text-yellow-300 transition-colors">
                  {{ video.label }}
                </h3>
                <p class="text-sm text-white/70">
                  {{ brand.name }}
                </p>
              </div>

              <!-- 品牌标签 -->
              <div class="absolute top-4 right-4 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/20 text-white/90 text-xs font-medium pointer-events-none">
                {{ brand.name }}
              </div>
            </div>

            <!-- 微光效果 -->
            <div class="shimmer-effect"></div>
          </article>
        </div>
      </div>
    </div>

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
            <h3 class="text-white font-bold text-lg">{{ currentVideo.label }}</h3>
            <p class="text-white/60 text-sm">{{ currentVideo.brandName }}</p>
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
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import Dialog from 'primevue/dialog'
import BackButton from '@/components/BackButton.vue'
import ServiceBanner from '@/components/ServiceBanner.vue'
import videoGallery from '@/assets/data/video-gallery.json'
import { MEDIA_CONFIG, getMediaUrl } from '@/config'
import { useScroll, useBackButtonOpacity } from '@/composables/useScroll'

const VIDEO_BASE_URL = computed(() => `${getMediaUrl(MEDIA_CONFIG.PATHS.VIDEOS)}`)
const router = useRouter()

const selectedBrand = ref<string | null>(null)
const { scrollY } = useScroll()
const backButtonOpacity = useBackButtonOpacity(scrollY)
const showVideoDialog = ref(false)
const currentVideo = ref<{ url: string; label: string; brandName: string } | null>(null)

// 根据选择的品牌过滤
const filteredBrands = computed(() => {
  if (selectedBrand.value === null) {
    return videoGallery
  }
  return {
    [selectedBrand.value]: videoGallery[selectedBrand.value as keyof typeof videoGallery]
  }
})

function goBack() {
  router.push('/#cases')
}

function handleDialogVideoLoaded(event: Event) {
  const video = event.target as HTMLVideoElement
  // 弹窗播放时从第0秒开始，确保用户不错过任何内容
  video.currentTime = 0
}

function openVideoDialog(videoUrl: string, videoLabel: string, brandName: string) {
  currentVideo.value = {
    url: `${VIDEO_BASE_URL}${videoUrl}`,
    label: videoLabel,
    brandName: brandName
  }
  showVideoDialog.value = true
}
</script>

<style scoped>
/* 视频卡片 */
.video-card {
  position: relative;
  overflow: hidden;
}
</style>
