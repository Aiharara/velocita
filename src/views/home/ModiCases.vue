<!-- views/home/ModiCases.vue -->
<template>
  <section id="cases" class="py-14 md:py-20 bg-black">
    <div class="max-w-6xl mx-auto px-4 md:px-8">
      <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8 flex-col-center">
        <div>
          <h2 class="text-3xl md:text-4xl font-semibold text-white tracking-tight">
            Case Videos
          </h2>
          <p class="mt-2 text-white/60 max-w-2xl">
            Real-world sound, fitment, and driving impressions. Explore builds across Porsche, Audi,
            BMW, Mercedes-AMG, and more.
          </p>
        </div>

        <div class="flex gap-2">
          <span class="text-xs px-3 py-1 rounded-full bg-white/5 text-white/70 border border-white/10">
            4K Footage
          </span>
          <span class="text-xs px-3 py-1 rounded-full bg-white/5 text-white/70 border border-white/10">
            Valve Control
          </span>
          <span class="text-xs px-3 py-1 rounded-full bg-white/5 text-white/70 border border-white/10">
            Dyno Notes
          </span>
        </div>
      </div>

      <Carousel
          :value="videos"
          :numVisible="3"
          :numScroll="1"
          circular
          :autoplayInterval="0"
          class="vel-carousel"
      >
        <template #item="{ data }">
          <article
              class="group mx-2 rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] hover:bg-white/[0.05] transition"
          >
            <div class="relative aspect-video">
              <img :src="data.thumbnail" class="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition"  alt="case video cover"/>
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>


              <div class="absolute left-4 bottom-4 right-4">
                <div class="flex items-center justify-between gap-3">
                  <div class="text-white font-semibold truncate">{{ data.title }}</div>
                  <span class="text-xs text-white/70 border border-white/15 bg-black/30 px-2 py-1 rounded-md">
                    {{ data.tag }}
                  </span>
                </div>
                <div class="mt-1 text-sm text-white/60 truncate">
                  {{ data.subtitle }}
                </div>
              </div>
            </div>
          </article>
        </template>
      </Carousel>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Carousel from 'primevue/carousel'

type VideoItem = {
  thumbnail: string
  url: string
  title: string
  subtitle: string
  tag: string
}

const videos = ref<VideoItem[]>([
  {
    thumbnail: '/videos/v1.jpg',
    url: '#',
    title: 'Porsche 911 Carrera S',
    subtitle: 'Valved cat-back • cold start + drive-by',
    tag: 'Sport+',
  },
  {
    thumbnail: '/videos/v2.jpg',
    url: '#',
    title: 'Audi RS7 Performance',
    subtitle: 'Downpipe + valved system • cabin resonance check',
    tag: 'Daily',
  },
  {
    thumbnail: '/videos/v3.jpg',
    url: '#',
    title: 'BMW M4 Competition',
    subtitle: 'Mid-pipe + rear section • pops & burbles tuned',
    tag: 'Track',
  },
  {
    thumbnail: '/videos/v1.jpg',
    url: '#',
    title: 'Mercedes-AMG C63',
    subtitle: 'Valve mapping demo • comfort vs race',
    tag: 'AMG',
  },
])
</script>

<style scoped>
/* 让 PrimeVue Carousel 的按钮更“暗黑高级”一点（可选） */
:deep(.p-carousel .p-carousel-indicators .p-carousel-indicator button) {
  background: rgba(255, 255, 255, 0.15);
}
:deep(.p-carousel .p-carousel-indicators .p-carousel-indicator.p-highlight button) {
  background: rgba(250, 204, 21, 0.8);
}
:deep(.p-carousel .p-carousel-prev),
:deep(.p-carousel .p-carousel-next) {
  color: rgba(255, 255, 255, 0.75);
}
</style>
