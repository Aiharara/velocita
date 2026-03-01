<template>
  <div class="mb-10 flex justify-center">
    <div class="relative group max-w-4xl w-full">
      <!-- 背景光晕 -->
      <div class="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-yellow-500/20 to-yellow-400/20 blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>

      <!-- 通知内容 -->
      <div class="relative flex items-center gap-3 px-5 py-3 rounded-lg bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/10 backdrop-blur-sm group-hover:border-yellow-400/30 transition-all duration-300">
        <!-- 图标 -->
        <div class="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400/20 to-yellow-500/20 flex items-center justify-center border border-yellow-400/30">
          <i class="pi pi-car text-yellow-400 text-lg"></i>
        </div>

        <!-- 文字内容 -->
        <div class="flex-1">
          <p class="text-white/90 text-sm leading-relaxed">
            <span class="font-semibold text-yellow-400">More Vehicle Models Available</span>
            <span class="text-white/70 ml-2">— We cover a wide range of performance vehicles beyond those shown here. <span class="text-yellow-400 cursor-pointer hover:underline" @click="triggerContact">Contact us</span> for custom exhaust solutions tailored to your car.</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
function triggerContact() {
  window.dispatchEvent(new CustomEvent('highlight-contact'))
}
</script>
