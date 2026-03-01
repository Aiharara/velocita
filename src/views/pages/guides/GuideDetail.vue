<!-- views/pages/guides/GuideDetail.vue -->
<template>
  <div class="min-h-screen bg-black">
    <!-- Header -->
    <header class="sticky top-0 z-50 bg-black/95 backdrop-blur-xl border-b border-white/10">
      <div class="max-w-4xl mx-auto px-4 md:px-8 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3 min-w-0 flex-1">
            <button
                @click="goBack"
                class="flex items-center gap-2 text-white/70 hover:text-yellow-400 transition-colors flex-shrink-0"
            >
              <i class="pi pi-arrow-left"></i>
              <span>Back</span>
            </button>
            <div class="w-px h-6 bg-white/10 flex-shrink-0"></div>
            <div class="min-w-0 flex-1">
              <h1 class="text-base md:text-lg font-bold text-white truncate">{{ currentGuide?.label }}</h1>
            </div>
          </div>
          <div v-if="currentGuide" class="flex items-center gap-3 text-white/60 text-sm flex-shrink-0 ml-4">
            <span class="hidden sm:inline">
              <i class="pi pi-video text-yellow-400 mr-1"></i>
              {{ currentGuide.videos.length }}
            </span>
            <span class="hidden sm:inline">
              <i class="pi pi-images text-yellow-400 mr-1"></i>
              {{ currentGuide.images.length }}
            </span>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main v-if="currentGuide" class="max-w-4xl mx-auto px-4 md:px-8 py-8">
      <!-- 视频部分 -->
      <section v-if="currentGuide.videos.length > 0" class="mb-12">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-1 h-8 bg-yellow-400 rounded-full"></div>
          <div>
            <h2 class="text-white font-bold text-xl flex items-center gap-2">
              <i class="pi pi-video text-yellow-400"></i>
              Videos
            </h2>
            <p class="text-white/50 text-sm mt-0.5">{{ currentGuide.videos.length }} video{{ currentGuide.videos.length > 1 ? 's' : '' }}</p>
          </div>
        </div>
        <div class="space-y-6">
          <div
              v-for="(video, index) in currentGuide.videos"
              :key="index"
              class="relative rounded-xl overflow-hidden border border-white/10 bg-black shadow-2xl"
          >
            <video
                :src="`${MEDIA_BASE_URL}${video}`"
                controls
                class="w-full"
                style="max-height: 70vh;"
            />
          </div>
        </div>
      </section>

      <!-- 图片部分 -->
      <section>
        <div class="flex items-center gap-3 mb-6">
          <div class="w-1 h-8 bg-yellow-400 rounded-full"></div>
          <div>
            <h2 class="text-white font-bold text-xl flex items-center gap-2">
              <i class="pi pi-images text-yellow-400"></i>
              Photos
            </h2>
            <p class="text-white/50 text-sm mt-0.5">{{ currentGuide.images.length }} photo{{ currentGuide.images.length > 1 ? 's' : '' }}</p>
          </div>
        </div>
        <div class="space-y-6">
          <div
              v-for="(image, index) in currentGuide.images"
              :key="index"
              class="relative rounded-xl overflow-hidden border border-white/10 bg-black/50 group cursor-pointer shadow-2xl"
              @click="openImageViewer(index)"
          >
            <img
                :src="`${MEDIA_BASE_URL}${image}`"
                :alt="`Photo ${index + 1}`"
                class="w-full transition-transform duration-500 group-hover:scale-105"
            />
            <!-- 放大提示 -->
            <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div class="p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white">
                <i class="pi pi-search-plus text-2xl"></i>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- 404 状态 -->
    <main v-else class="max-w-4xl mx-auto px-4 md:px-8 py-20 text-center">
      <i class="pi pi-exclamation-triangle text-yellow-400 text-5xl mb-4"></i>
      <h2 class="text-white text-2xl font-bold mb-2">Guide Not Found</h2>
      <p class="text-white/60 mb-6">The installation guide you're looking for doesn't exist.</p>
      <router-link
          to="/"
          class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/15 text-white hover:bg-white/10 hover:border-white/25 transition-all"
      >
        <i class="pi pi-home"></i>
        <span>Back to Home</span>
      </router-link>
    </main>

    <!-- 图片查看器 -->
    <Teleport to="body">
      <Transition name="fade">
        <div
            v-if="showImageViewer"
            class="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm"
            @click="closeImageViewer"
        >
          <div class="absolute inset-0 flex flex-col">
            <!-- Header -->
            <div class="flex items-center justify-between p-4 border-b border-white/10">
              <div class="flex items-center gap-3">
                <span class="text-white font-semibold">{{ currentGuide?.label }}</span>
              </div>
              <div class="flex items-center gap-4">
                <span class="text-white/60 text-sm">{{ currentImageIndex + 1 }} / {{ currentGuide?.images.length }}</span>
                <button
                    @click="closeImageViewer"
                    class="w-10 h-10 rounded-lg bg-white/5 border border-white/15 text-white hover:bg-white/10 hover:text-yellow-400 transition-all flex items-center justify-center"
                >
                  <i class="pi pi-times"></i>
                </button>
              </div>
            </div>

            <!-- Main Image -->
            <div class="flex-1 relative flex items-center justify-center p-4" @click.stop>
              <img
                  v-if="currentGuide"
                  :src="`${MEDIA_BASE_URL}${currentGuide.images[currentImageIndex]}`"
                  :alt="`Photo ${currentImageIndex + 1}`"
                  class="max-w-full max-h-full object-contain"
              />

              <!-- Navigation Buttons -->
              <button
                  v-if="currentGuide && currentGuide.images.length > 1"
                  @click.stop="previousImage"
                  class="absolute left-4 w-12 h-12 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white hover:bg-black/80 hover:border-yellow-400/50 transition-all flex items-center justify-center"
              >
                <i class="pi pi-chevron-left"></i>
              </button>
              <button
                  v-if="currentGuide && currentGuide.images.length > 1"
                  @click.stop="nextImage"
                  class="absolute right-4 w-12 h-12 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white hover:bg-black/80 hover:border-yellow-400/50 transition-all flex items-center justify-center"
              >
                <i class="pi pi-chevron-right"></i>
              </button>
            </div>

            <!-- Thumbnails -->
            <div v-if="currentGuide && currentGuide.images.length > 1" class="p-4 border-t border-white/10" @click.stop>
              <div class="flex gap-2 overflow-x-auto pb-2 justify-center">
                <button
                    v-for="(image, index) in currentGuide.images"
                    :key="index"
                    @click.stop="currentImageIndex = index"
                    class="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all"
                    :class="currentImageIndex === index
                      ? 'border-yellow-400 ring-2 ring-yellow-400/50'
                      : 'border-white/20 hover:border-white/40 opacity-60 hover:opacity-100'"
                >
                  <img
                      :src="`${MEDIA_BASE_URL}${image}`"
                      :alt="`Thumbnail ${index + 1}`"
                      class="w-full h-full object-cover"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import installationGuidesData from '@/assets/data/installation-guides.json'
import { MEDIA_CONFIG, getMediaUrl } from '@/config'

const route = useRoute()
const MEDIA_BASE_URL = `${getMediaUrl(MEDIA_CONFIG.PATHS.INSTALLATION_GUIDES)}/`

type Guide = {
  label: string
  folder_path: string
  images: string[]
  videos: string[]
}

const guides = ref<Guide[]>(installationGuidesData as Guide[])
const showImageViewer = ref(false)
const currentImageIndex = ref(0)

const currentGuide = computed(() => {
  const folder = route.params.folder as string
  return guides.value.find(g => g.folder_path === folder)
})

function goBack() {
  window.close()
}

function openImageViewer(index: number) {
  currentImageIndex.value = index
  showImageViewer.value = true
}

function closeImageViewer() {
  showImageViewer.value = false
}

function nextImage() {
  if (currentGuide.value) {
    currentImageIndex.value = (currentImageIndex.value + 1) % currentGuide.value.images.length
  }
}

function previousImage() {
  if (currentGuide.value) {
    currentImageIndex.value = currentImageIndex.value === 0
      ? currentGuide.value.images.length - 1
      : currentImageIndex.value - 1
  }
}

// 键盘导航
function handleKeyPress(event: KeyboardEvent) {
  if (!showImageViewer.value) return

  if (event.key === 'ArrowLeft') {
    previousImage()
  } else if (event.key === 'ArrowRight') {
    nextImage()
  } else if (event.key === 'Escape') {
    closeImageViewer()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyPress)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyPress)
})
</script>

<style scoped>
/* 滚动条样式 */
.overflow-x-auto::-webkit-scrollbar {
  height: 6px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 3px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: rgba(250, 204, 21, 0.3);
  border-radius: 3px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: rgba(250, 204, 21, 0.5);
}

/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
