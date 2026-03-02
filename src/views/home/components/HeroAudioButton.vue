<!-- views/home/components/HeroAudioButton.vue -->
<template>
  <!-- 视频音频控制按钮 - 右上角，独立于视频容器 -->
  <button
      v-show="visible"
      @click="toggleVideoSound"
      class="fixed top-20 right-6 z-50 w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black/60 hover:border-white/40 transition-all duration-300 hover:scale-110 transition-opacity duration-700"
      :class="{ 'bg-white/10! border-white/30!': !isMuted }"
      :style="{ opacity: opacity }"
      :aria-label="`Toggle video ${isMuted ? 'sound off' : 'sound on'}`"
  >
    <i class="pi text-lg" :class="isMuted ? 'pi-volume-off' : 'pi-volume-up'"></i>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  isMuted: boolean
  opacity: number
  showButton: boolean
}

interface Emits {
  (e: 'toggle-mute'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const visible = computed(() => props.showButton)

function toggleVideoSound() {
  emit('toggle-mute')
}
</script>
