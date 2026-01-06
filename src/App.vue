<template>
  <div class="main-entry">
    <RouterView v-slot="{ Component }">
      <Transition name="page" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </div>
</template>

<script setup lang="ts">
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
  height: 100%;
  width: 100%;
}
</style>
