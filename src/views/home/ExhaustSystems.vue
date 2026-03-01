<!-- views/home/ProductList.vue -->
<template>
  <section id="products" class="relative py-5 md:py-5 bg-black overflow-hidden">
    <div class="relative max-w-7xl mx-auto px-4 md:px-8">
      <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/60 text-xs mb-4">
            <i class="pi pi-box text-yellow-400/80 text-[10px]"></i>
            <span>Product Range</span>
          </div>
          <h2 class="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Exhaust Systems
          </h2>
          <p class="mt-3 text-white/60 text-lg max-w-2xl">
            Modular configurations, premium materials, precision fitment. Built for sound, flow, and reliability.
          </p>
        </div>

        <div class="flex items-center gap-2">
          <span class="text-xs px-3 py-1.5 rounded-full bg-gradient-to-r from-white/5 to-white/[0.02] text-white/70 border border-white/10 backdrop-blur-sm">
            <i class="pi pi-sliders-h text-yellow-400/80 text-[10px] mr-1"></i>
            Valved Options
          </span>
        </div>
      </div>

      <Carousel :value="products" :numVisible="carouselNumVisible" :numScroll="1" circular class="vel-carousel mt-12">
        <template #item="{ data }">
          <article
              class="product-card group mx-3 rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-sm transition-all duration-500 hover:border-white/25 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/10 flex flex-col"
              style="height: 380px;"
          >
            <!-- 顶部高光 -->
            <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <!-- 图片区域 -->
            <div class="relative h-72 w-full bg-gradient-to-b from-white/5 to-transparent overflow-hidden cursor-pointer" @click="openGallery(data)">
              <img
                  :src="`${IMAGE_BASE_URL}${data.images[0]}`"
                  class="block w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  :alt="data.modelLabel"
              />

              <!-- 图片遮罩 -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <!-- 品牌标签 -->
              <div class="absolute top-4 left-4">
                <span class="text-[10px] px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md border border-white/20 text-white/90 font-medium">
                  {{ data.brandLabel }}
                </span>
              </div>

              <!-- 图片数量提示 -->
              <div class="absolute top-4 right-4">
                <span class="text-[10px] px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md border border-white/20 text-white/90 font-medium">
                  <i class="pi pi-images text-[9px] mr-1"></i>
                  {{ data.imageCount }}
                </span>
              </div>

              <!-- hover显示的查看大图提示 -->
              <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div class="p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white">
                  <i class="pi pi-search-plus text-xl"></i>
                </div>
              </div>
            </div>

            <!-- 内容区域 -->
            <div class="relative p-3 flex flex-col flex-1">
              <div class="flex items-start justify-between gap-2 mb-2">
                <div class="min-w-0 flex-1">
                  <h3 class="text-white font-bold text-base group-hover:text-yellow-300 transition-colors line-clamp-2 min-h-[2.5rem]">
                    {{ data.modelLabel }}
                  </h3>
                  <p class="text-white/60 text-xs mt-0.5">{{ data.brandLabel }}</p>
                </div>
              </div>

              <!-- Price -->
              <div class="mt-auto pt-2 border-t border-white/10">
                <div class="flex items-center justify-between">
                  <div>
                    <div class="text-white/50 text-[10px] mb-0.5">Starting from</div>
                    <div class="flex items-baseline gap-1.5">
                      <span class="text-yellow-300 font-bold text-base">${{ formatPrice(data.priceAUD) }}</span>
                      <span class="text-white/40 text-[10px]">AUD</span>
                    </div>
                  </div>
                  <button
                      @click.stop="openGallery(data)"
                      class="w-8 h-8 rounded-lg bg-white/5 border border-white/15 text-white hover:bg-white/10 hover:border-yellow-400/50 hover:text-yellow-400 transition-all duration-300 flex items-center justify-center flex-shrink-0"
                      title="View Images"
                  >
                    <i class="pi pi-images text-[11px]"></i>
                  </button>
                </div>
              </div>
            </div>

            <!-- 微光效果 -->
            <div class="shimmer-effect"></div>
          </article>
        </template>
      </Carousel>
    </div>

    <!-- 底部分隔线 -->
    <div class="mt-14 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

    <!-- 图片画廊弹窗 -->
    <Dialog
        v-model:visible="showGallery"
        modal
        :dismissableMask="true"
        :closable="true"
        class="image-gallery-dialog"
        :pt="{
          root: { class: 'w-[95vw] max-w-6xl' },
          header: { class: 'bg-black/95 border-b border-white/10 backdrop-blur-xl' },
          content: { class: 'bg-black/95 p-0' },
          mask: { class: 'backdrop-blur-sm' }
        }"
    >
      <template #header>
        <div v-if="currentProduct" class="flex items-center gap-3">
          <div class="w-2 h-8 bg-yellow-400 rounded-full"></div>
          <div>
            <h3 class="text-white font-bold text-lg">{{ currentProduct.modelLabel }}</h3>
            <p class="text-white/60 text-sm">{{ currentProduct.brandLabel }} - {{ currentImageIndex + 1 }} / {{ currentProduct.imageCount }}</p>
          </div>
        </div>
      </template>

      <div v-if="currentProduct" class="relative bg-black">
        <!-- 主图片 -->
        <div class="relative w-full" style="max-height: 70vh;">
          <img
              :src="`${IMAGE_BASE_URL}${currentProduct.images[currentImageIndex]}`"
              :alt="`${currentProduct.modelLabel} - Image ${currentImageIndex + 1}`"
              class="w-full h-full object-contain"
              style="max-height: 70vh;"
          />

          <!-- 左右切换按钮 -->
          <button
              v-if="currentProduct.imageCount > 1"
              @click="previousImage"
              class="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white hover:bg-black/80 hover:border-yellow-400/50 transition-all duration-300 flex items-center justify-center"
          >
            <i class="pi pi-chevron-left"></i>
          </button>
          <button
              v-if="currentProduct.imageCount > 1"
              @click="nextImage"
              class="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white hover:bg-black/80 hover:border-yellow-400/50 transition-all duration-300 flex items-center justify-center"
          >
            <i class="pi pi-chevron-right"></i>
          </button>
        </div>

        <!-- 缩略图导航 -->
        <div v-if="currentProduct.imageCount > 1" class="p-4 border-t border-white/10">
          <div class="flex gap-2 overflow-x-auto pb-2">
            <button
                v-for="(image, index) in currentProduct.images"
                :key="index"
                @click="currentImageIndex = index"
                class="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300"
                :class="currentImageIndex === index
                  ? 'border-yellow-400 ring-2 ring-yellow-400/50'
                  : 'border-white/20 hover:border-white/40 opacity-60 hover:opacity-100'"
            >
              <img
                  :src="`${IMAGE_BASE_URL}${image}`"
                  :alt="`Thumbnail ${index + 1}`"
                  class="w-full h-full object-cover"
              />
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  </section>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, computed } from 'vue'
import Carousel from 'primevue/carousel'
import Dialog from 'primevue/dialog'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import exhaustSystemData from '@/assets/data/exhaust-system.json'

gsap.registerPlugin(ScrollTrigger)

const IMAGE_BASE_URL = 'https://media.velocita-exhaust-au.com/images/exhaust-system'

type Product = {
  brand: string
  brandLabel: string
  model: string
  modelLabel: string
  imageCount: number
  images: string[]
  priceRMB: string
  priceAUD: string
}

const products = ref<Product[]>((exhaustSystemData as Product[]).reverse())
const showGallery = ref(false)
const currentProduct = ref<Product | null>(null)
const currentImageIndex = ref(0)
const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1024)

// 根据屏幕宽度计算轮播图显示数量
const carouselNumVisible = computed(() => {
  if (windowWidth.value < 768) {
    return 1 // 手机屏幕显示1个
  } else if (windowWidth.value < 1024) {
    return 2 // 平板屏幕显示2个
  } else {
    return 3 // 桌面屏幕显示3个
  }
})

function handleResize() {
  windowWidth.value = window.innerWidth
}

// 格式化价格，添加千分号
function formatPrice(price: string): string {
  const numPrice = parseFloat(price.replace(/,/g, ''))
  return numPrice.toLocaleString('en-US')
}

function openGallery(product: Product) {
  currentProduct.value = product
  currentImageIndex.value = 0
  showGallery.value = true
}

function nextImage() {
  if (currentProduct.value) {
    currentImageIndex.value = (currentImageIndex.value + 1) % currentProduct.value.imageCount
  }
}

function previousImage() {
  if (currentProduct.value) {
    currentImageIndex.value = currentImageIndex.value === 0
      ? currentProduct.value.imageCount - 1
      : currentImageIndex.value - 1
  }
}

// 键盘导航
function handleKeyPress(event: KeyboardEvent) {
  if (!showGallery.value) return

  if (event.key === 'ArrowLeft') {
    previousImage()
  } else if (event.key === 'ArrowRight') {
    nextImage()
  } else if (event.key === 'Escape') {
    showGallery.value = false
  }
}

onMounted(() => {
  // 滚动触发的入场动画
  gsap.from('#products', {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '#products',
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  })

  // 监听窗口大小变化
  window.addEventListener('resize', handleResize)

  // 监听键盘事件
  window.addEventListener('keydown', handleKeyPress)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('keydown', handleKeyPress)
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

/* 噪点纹理 */
.noise-texture {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 200px 200px;
}

/* 产品卡片 */
.product-card {
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

.product-card:hover .shimmer-effect {
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

/* 图片画廊弹窗样式 */
:deep(.image-gallery-dialog .p-dialog-header) {
  padding: 1.5rem !important;
}

:deep(.image-gallery-dialog .p-dialog-content) {
  padding: 0 !important;
}

:deep(.image-gallery-dialog .p-dialog-header-close) {
  color: rgba(255, 255, 255, 0.7) !important;
  width: 2.5rem !important;
  height: 2.5rem !important;
  border-radius: 0.5rem !important;
  transition: all 0.3s !important;
}

:deep(.image-gallery-dialog .p-dialog-header-close:hover) {
  background: rgba(250, 204, 21, 0.2) !important;
  color: rgba(250, 204, 21, 0.9) !important;
}

/* 缩略图滚动条样式 */
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
</style>
