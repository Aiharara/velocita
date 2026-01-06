<template>
  <main class="fixed inset-0 bg-black overflow-hidden">
    <video
        class="w-full h-full object-cover video"
        autoplay
        muted
        playsinline
        loop
        preload="auto"
    >
      <source src="/videos/intro.mp4" type="video/mp4" />
    </video>
  </main>
</template>


<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

let locked = false
let unlockTimer: number | undefined

function goHome() {
  if (locked) return
  locked = true
  router.push('/home')

  unlockTimer = window.setTimeout(() => {
    locked = false
  }, 800)
}

function onWheel(e: WheelEvent) {
  // 向下滚轮：deltaY > 0
  if (e.deltaY > 10) {
    goHome()
  }
}

onMounted(() => {
  window.addEventListener('wheel', onWheel, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('wheel', onWheel)
  if (unlockTimer) window.clearTimeout(unlockTimer)
})
</script>

<style scoped>
.video {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>