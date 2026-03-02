<template>
  <div
      class="flex items-center justify-center w-full h-full bg-gradient-to-br from-white/[0.02] to-white/[0.01] border border-white/10 rounded-xl"
      :style="{ minHeight: height }"
  >
    <div class="flex flex-col items-center justify-center gap-3 px-4 py-8">
      <div class="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20">
        <i class="pi pi-exclamation-triangle text-red-400 text-lg"></i>
      </div>
      <div class="text-center">
        <p class="text-white/70 text-sm font-medium mb-1">{{ title }}</p>
        <p class="text-white/40 text-xs">{{ message }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string
  message?: string
  height?: string
}

withDefaults(defineProps<Props>(), {
  title: 'Media Failed to Load',
  message: 'Please refresh the page or contact support',
  height: '200px'
})
</script>
