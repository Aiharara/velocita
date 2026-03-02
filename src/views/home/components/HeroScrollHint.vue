<!-- views/home/components/HeroScrollHint.vue -->
<template>
  <!-- Scroll Hint - 独立元素，不受heroContent透明度影响 -->
  <div
      v-show="visible"
      class="fixed bottom-12 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 animate-bounce"
  >
    <span class="text-white text-sm">Scroll down to enter</span>
    <i class="pi pi-chevron-down text-white text-xl"></i>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  scrollY: number
  threshold?: number
}

const props = withDefaults(defineProps<Props>(), {
  threshold: 100
})

const visible = computed(() => props.scrollY < props.threshold)
</script>

<style scoped>
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-bounce {
  animation: bounce 2s infinite;
}
</style>
