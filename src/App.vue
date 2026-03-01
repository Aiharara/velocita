<template>
  <div class="main-entry">
    <RouterView v-slot="{ Component }">
      <Transition name="page" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Footer from '@/views/home/Footer.vue'
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
