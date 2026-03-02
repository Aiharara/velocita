<template>
  <button
      @click="onClick"
      class="hidden md:flex fixed top-28 left-8 z-50 items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300 hover:scale-105 shadow-lg shadow-yellow-500/25"
      :style="{ opacity, pointerEvents: scrollY > 200 ? 'none' : 'auto' }"
  >
    <i class="pi pi-arrow-left text-sm"></i>
    <span>Back</span>
  </button>
</template>

<script setup lang="ts">
interface Props {
  opacity: number
  scrollY: number
  onClick: () => void
}

defineProps<Props>()
</script>
