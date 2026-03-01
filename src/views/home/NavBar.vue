<!-- views/home/NavBar.vue -->
<template>
  <header class="sticky top-0 z-50">
    <!-- 顶部光晕 -->
    <div class="h-px w-full bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent"></div>

    <Menubar
        :model="items"
        class="navbar !border-0 !rounded-none bg-black/80 backdrop-blur-2xl px-4 md:px-10 py-7 shadow-lg shadow-black/20"
        :pt="{ rootList: { class: 'gap-6' } }"
    >
      <template #start>
        <div class="flex items-center gap-3 md:gap-4 mr-4">
          <!-- Back按钮 - 仅在手机版显示 -->
          <button
              v-if="showBackButton"
              @click="router.push('/')"
              class="md:hidden w-10 h-10 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-500 text-black flex items-center justify-center hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300 shadow-md shadow-yellow-500/25"
          >
            <i class="pi pi-arrow-left text-sm font-bold"></i>
          </button>
          <img src="/logo.png" class="h-12 md:h-16 w-auto cursor-pointer" alt="Velocita" @click="router.push('/')" />
          <div class="hidden md:block h-10 w-px bg-white/10"></div>
          <span class="hidden md:inline-block text-white/60 text-sm uppercase tracking-widest">Performance Exhaust</span>
        </div>
      </template>

      <template #item="{ item, props }">
        <div class="mx-2">
          <a
              v-ripple
              v-bind="props.action"
              class="nav-link relative px-6 py-3 rounded-lg text-base font-medium tracking-wide text-white/70 hover:text-white transition-all duration-300 group"
              :href="item.to"
              @click="(e: MouseEvent) => onNavClick(e, item as unknown as MenuItem)"
          >
            {{ item.label }}
            <!-- hover下划线 -->
            <span class="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
          </a>
        </div>
      </template>

      <template #end>
        <div class="flex items-center gap-4">
<!--          <Button-->
<!--              label="Get Quote"-->
<!--              icon="pi pi-bolt"-->
<!--              class="!bg-gradient-to-r !from-yellow-400 !to-yellow-500 !text-black !border-0 hover:!from-yellow-300 hover:!to-yellow-400 !font-semibold !transition-all !duration-300 hover:!scale-105 !rounded-lg !shadow-lg !shadow-yellow-500/25 !px-5 !py-2.5"-->
<!--          />-->
<!--          <Button-->
<!--              label="Warranty"-->
<!--              icon="pi pi-shield"-->
<!--              severity="secondary"-->
<!--              outlined-->
<!--              class="!border-white/20 !text-white/80 hover:!text-white hover:!border-white/40 hover:!bg-white/5 !rounded-lg !transition-all !duration-300 !px-5 !py-2.5"-->
<!--          />-->
        </div>
      </template>
    </Menubar>

    <!-- 底部细线 + 噪点 -->
    <div class="relative h-px w-full bg-white/5">
      <div class="absolute inset-0 noise-texture opacity-20"></div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Menubar from 'primevue/menubar'

interface MenuItem { label: string; to: string; [key: string]: unknown }

const router = useRouter()

// Props
defineProps<{
  showBackButton?: boolean
}>()

const items = ref<MenuItem[]>([
  { label: 'Home', to: '/' },
  { label: 'Video Gallery', to: '/video-gallery' },
  { label: 'Products', to: '/#products' },
  { label: 'Guide', to: '/guides' },
  { label: 'Contact Us', to: '/#about' },
])

function onNavClick(e: MouseEvent, item: MenuItem) {
  if (item.to === '/#about') {
    e.preventDefault()
    window.dispatchEvent(new CustomEvent('highlight-contact'))
  }
}
</script>

<style scoped>
/* 噪点纹理 */
.noise-texture {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 100px 100px;
}

/* 导航链接hover效果 */
.nav-link {
  position: relative;
}

.nav-link::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, #fbbf24, transparent);
  transition: width 0.3s ease;
}

.nav-link:hover::before {
  width: 100%;
}

/* 增强navbar的层次感 */
.navbar {
  position: relative;
}

.navbar::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 100%);
  pointer-events: none;
}

/* 手机版样式优化 - 包括竖屏和横屏 */
@media (max-width: 768px), (max-height: 600px) and (orientation: landscape) {
  :deep(.p-menubar) {
    padding: 1rem 1rem !important;
    display: flex !important;
  }

  /* 将汉堡菜单按钮移到logo左边 */
  :deep(.p-menubar-start) {
    order: 2 !important;
  }

  :deep(.p-menubar-button) {
    order: 1 !important;
    margin-right: 0.75rem !important;
    color: rgba(255, 255, 255, 0.9) !important;
    width: 40px !important;
    height: 40px !important;
    border-radius: 8px !important;
    background: rgba(255, 255, 255, 0.05) !important;
    border: 1px solid rgba(255, 255, 255, 0.1) !important;
  }

  :deep(.p-menubar-button:hover) {
    background: rgba(250, 204, 21, 0.2) !important;
    border-color: rgba(250, 204, 21, 0.3) !important;
  }

  :deep(.p-menubar-end) {
    order: 3 !important;
  }

  :deep(.p-menubar-root-list) {
    background: rgba(0, 0, 0, 0.95) !important;
    backdrop-filter: blur(20px) !important;
    border: 1px solid rgba(255, 255, 255, 0.1) !important;
    border-radius: 12px !important;
    margin-top: 0.5rem !important;
    padding: 0.5rem !important;
  }

  :deep(.p-menubar-item) {
    width: 100% !important;
  }

  :deep(.p-menubar-item-link) {
    border-radius: 8px !important;
    padding: 0.75rem 1rem !important;
  }

  :deep(.p-menubar-item-link:hover) {
    background: rgba(250, 204, 21, 0.1) !important;
  }
}

/* 横屏模式下的特殊调整 - 降低高度 */
@media (max-height: 600px) and (orientation: landscape) {
  header {
    padding: 0 !important;
  }

  header img {
    height: 2.5rem !important;
  }

  header button {
    width: 2rem !important;
    height: 2rem !important;
  }

  :deep(.p-menubar) {
    padding: 0.5rem 1rem !important;
    min-height: auto !important;
  }

  :deep(.p-menubar-button) {
    width: 36px !important;
    height: 36px !important;
  }

  :deep(.p-menubar-root-list) {
    max-height: 70vh !important;
    overflow-y: auto !important;
  }

  :deep(.p-menubar-item-link) {
    padding: 0.5rem 1rem !important;
    font-size: 0.875rem !important;
  }
}
</style>
