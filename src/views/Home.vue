<!-- views/home/Home.vue -->
<template>
  <div class="bg-black text-white margin-0">
    <NavBar />
    <Hero />
    <ModiCases />
    <ProductList />
    <ModiGuide />

    <!-- Footer (简单补一个收尾更完整) -->
    <footer id="about" class="py-12 bg-black">
      <div class="max-w-6xl mx-auto px-4 md:px-8">
        <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
          <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div class="text-white font-semibold tracking-wide">VELOCITA</div>
              <div class="text-white/60 text-sm mt-1">
                Performance exhaust solutions for modern platforms. Built with precision and restraint.
              </div>
            </div>
            <div class="text-white/50 text-sm">
              © {{ new Date().getFullYear() }} Velocita. All content is for demo purposes.
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from '@/views/home/NavBar.vue'
import ModiGuide from '@/views/home/ModiGuide.vue'
import ProductList from '@/views/home/ProductList.vue'
import ModiCases from '@/views/home/ModiCases.vue'
import Hero from "@/views/home/Hero.vue";

const router = useRouter()

let locked = false
let unlockTimer: number | undefined

// 记录：是否已经“到顶”过（到顶后才允许触发向上返回）
let reachedTop = false

function isAtTop(threshold = 2) {
  // 兼容不同浏览器的滚动容器
  const y =
      window.scrollY ??
      document.documentElement.scrollTop ??
      document.body.scrollTop ??
      0

  return y <= threshold
}

function goLanding() {
  if (locked) return
  locked = true

  if (window.history.length > 1) router.back()
  else router.replace('/')

  unlockTimer = window.setTimeout(() => {
    locked = false
  }, 800)
}

function onWheel(e: WheelEvent) {
  // 只关心“向上滚”
  if (e.deltaY >= -10) return

  // 还没到顶：不允许触发返回，并重置 reachedTop
  if (!isAtTop()) {
    reachedTop = false
    return
  }

  // 已经在顶部：先标记 reachedTop，下一次再向上滚才触发
  if (!reachedTop) {
    reachedTop = true
    return
  }

  // 到顶后再次向上滚：触发返回
  goLanding()
}

function onScroll() {
  if (!isAtTop()) reachedTop = false
}

onMounted(() => {
  window.addEventListener('wheel', onWheel, { passive: true })
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('wheel', onWheel)
  window.removeEventListener('scroll', onScroll)
  if (unlockTimer) window.clearTimeout(unlockTimer)
})
</script>
