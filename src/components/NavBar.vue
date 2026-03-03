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
              href="javascript:void(0)"
              @click="(e: MouseEvent) => onNavClick(e, item as unknown as MenuItem)"
          >
            {{ item.label }}
            <!-- hover下划线 -->
            <span class="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
          </a>
        </div>
      </template>

      <template #end>
        <div class="flex items-center">
          <div class="relative">
            <div
                class="warranty-badge group cursor-pointer"
                @mouseenter="onWarrantyEnter"
                @mouseleave="onWarrantyLeave"
                @click.stop="onWarrantyClick"
            >
              <div class="warranty-icon-wrap">
                <i class="pi pi-shield"></i>
              </div>
              <div class="hidden md:flex flex-col ml-2.5 leading-none">
                <span class="text-[10px] uppercase tracking-widest text-yellow-400/80 font-semibold">3-Year</span>
                <span class="text-xs text-white/80 group-hover:text-white font-medium mt-0.5 transition-colors duration-300">Warranty</span>
              </div>
            </div>
            <Transition name="warranty-fade">
              <div v-if="showWarrantyInfo" class="warranty-popup" @click.stop>
                <div class="warranty-popup-arrow"></div>
                <div class="text-center">
                  <div class="flex items-center justify-center gap-2 mb-2">
                    <i class="pi pi-shield text-yellow-400 text-sm"></i>
                    <span class="text-yellow-400 font-bold text-sm">3-Year Warranty</span>
                  </div>
                  <p class="text-white/70 text-xs leading-relaxed">
                    Comprehensive coverage on all
                    Velocita exhaust products against
                    manufacturing defects.
                  </p>
                </div>
              </div>
            </Transition>
          </div>
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
import { ref, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import Menubar from 'primevue/menubar'
import { eventBus } from '@/utils/eventBus.ts'

interface MenuItem { label: string; to: string; [key: string]: unknown }

const router = useRouter()

// Props
defineProps<{
  showBackButton?: boolean
}>()

const items = ref<MenuItem[]>([
  { label: 'Home', to: '/' },
  { label: 'Video Gallery', to: '/video-gallery' },
  { label: 'About Us', to: '/about' },
  { label: 'Products', to: '/#products' },
  { label: 'Guide', to: '/guides' },
  { label: 'Contact Us', to: '/#contact-us' },
])

function onNavClick(_e: MouseEvent, item: MenuItem) {
  // Use router.push to ensure scrollBehavior is invoked correctly
  router.push(item.to).then(() => {
    // After navigation completes, emit highlight-contact if navigating to contact-us
    if (item.to === '/#contact-us') {
      eventBus.emit('highlight-contact')
    }
  })
}

// Warranty popup logic
const showWarrantyInfo = ref(false)
const hasHover = typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches

function onWarrantyEnter() {
  if (hasHover) showWarrantyInfo.value = true
}

function onWarrantyLeave() {
  if (hasHover) showWarrantyInfo.value = false
}

function onWarrantyClick() {
  if (!hasHover) {
    showWarrantyInfo.value = !showWarrantyInfo.value
    if (showWarrantyInfo.value) {
      setTimeout(() => document.addEventListener('click', closeWarrantyPopup, { once: true }), 0)
    }
  }
}

function closeWarrantyPopup() {
  showWarrantyInfo.value = false
}

onBeforeUnmount(() => {
  document.removeEventListener('click', closeWarrantyPopup)
})
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

/* Warranty Badge */
.warranty-badge {
  display: flex;
  align-items: center;
  padding: 0.5rem 0.75rem;
  border-radius: 10px;
  border: 1px solid rgba(250, 204, 21, 0.15);
  background: linear-gradient(135deg, rgba(250, 204, 21, 0.05), transparent);
  transition: all 0.3s ease;
}

.warranty-badge:hover {
  border-color: rgba(250, 204, 21, 0.35);
  background: linear-gradient(135deg, rgba(250, 204, 21, 0.12), rgba(250, 204, 21, 0.03));
  transform: translateY(-1px);
  box-shadow: 0 4px 15px rgba(250, 204, 21, 0.1);
}

.warranty-icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 8px;
  background: linear-gradient(135deg, rgba(250, 204, 21, 0.2), rgba(250, 204, 21, 0.08));
  color: #fbbf24;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.warranty-badge:hover .warranty-icon-wrap {
  background: linear-gradient(135deg, rgba(250, 204, 21, 0.35), rgba(250, 204, 21, 0.15));
  box-shadow: 0 0 10px rgba(250, 204, 21, 0.2);
}

/* Warranty Popup */
.warranty-popup {
  position: absolute;
  top: calc(100% + 12px);
  right: 0;
  min-width: 230px;
  padding: 16px 20px;
  background: rgba(10, 10, 10, 0.98);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(250, 204, 21, 0.2);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5), 0 0 20px rgba(250, 204, 21, 0.05);
  z-index: 100;
}

.warranty-popup-arrow {
  position: absolute;
  top: -6px;
  right: 24px;
  width: 12px;
  height: 12px;
  background: rgba(10, 10, 10, 0.98);
  border-top: 1px solid rgba(250, 204, 21, 0.2);
  border-left: 1px solid rgba(250, 204, 21, 0.2);
  transform: rotate(45deg);
}

.warranty-fade-enter-active,
.warranty-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.warranty-fade-enter-from,
.warranty-fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
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
