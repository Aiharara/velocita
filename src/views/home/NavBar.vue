<!-- views/home/NavBar.vue -->
<template>
  <header class="sticky top-0 z-50">
    <!-- subtle top glow -->
    <div class="h-px w-full bg-gradient-to-r from-transparent via-yellow-500/40 to-transparent"></div>

    <Menubar
        :model="items"
        class="!border-0 !rounded-none bg-black/70 backdrop-blur-xl px-4 md:px-10 py-3"
        :pt="{ rootList: { class: 'gap-3' } }"
    >
      <template #start>
        <div class="flex items-center gap-3">
          <img src="/logo.png" class="h-8 w-auto" alt="Velocita" />
        </div>
      </template>

      <template #item="{ item, props }">
        <div class="mx-2">
          <a
              v-ripple
              v-bind="props.action"
              class="px-3 py-2 rounded-md text-sm tracking-wide text-white/80 hover:text-white hover:bg-white/5 transition"
              :href="item.to"
          >
            {{ item.label }}
          </a>
        </div>
      </template>

      <template #end>
        <div class="flex items-center gap-2 m-2">
          <Button
              label="Get a Quote"
              icon="pi pi-bolt"
              class="!bg-yellow-400/90 !text-black !border-0 hover:!bg-yellow-300 transition !rounded !p-1"
              size="small"
          />
          <Button
              label="Warranty"
              icon="pi pi-shield"
              severity="secondary"
              outlined
              class="!border-white/15 !text-white/80 hover:!text-white hover:!border-white/30 !rounded !p-1"
              size="small"
          />
        </div>
      </template>
    </Menubar>

    <div class="h-px w-full bg-white/5"></div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Menubar from 'primevue/menubar'
import Button from 'primevue/button'

type MenuItem = { label: string; to: string }

const items = ref<MenuItem[]>([
  { label: 'Home', to: '/' },
  { label: 'Case Videos', to: '#cases' },
  { label: 'Products', to: '#products' },
  { label: 'Upgrade Guide', to: '#guide' },
  { label: 'About', to: '#about' },
])
</script>
