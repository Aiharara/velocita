<template>
  <div class="main-entry">
    <!-- 全局导航栏 - 首页固定+淡出效果，其他页面sticky+返回按钮 -->
    <div
        :class="isHomePage ? 'fixed' : 'sticky'"
        class="top-0 left-0 right-0 z-40 transition-opacity duration-500"
        :style="{ opacity: isHomePage ? navOpacity : 1 }"
    >
      <NavBar :show-back-button="!isHomePage" />
    </div>

    <RouterView v-slot="{ Component }">
      <Transition name="page" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import Footer from '@/components/Footer.vue'
import NavBar from '@/components/NavBar.vue'
import { useScroll, useNavBarOpacity } from '@/composables/useScroll'

const router = useRouter()
const scrollY = useScroll()

// 判断是否在首页
const isHomePage = computed(() => router.currentRoute.value.name === 'home')

// 首页NavBar根据滚动透明度变化
const navOpacity = useNavBarOpacity(scrollY, typeof window !== 'undefined' ? window.innerHeight : 1000)
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 320ms ease, transform 320ms ease, filter 320ms ease;
}

.page-enter-from {
  opacity: 0;
  transform: scale(1.01);
  filter: blur(2px);
}

.page-leave-to {
  opacity: 0;
  transform: scale(0.99);
  filter: blur(2px);
}

.main-entry {
  min-height: 100vh;
  width: 100%;
}
</style>
