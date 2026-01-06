<!-- views/home/ModiGuide.vue -->
<template>
  <section id="guide" class="py-14 md:py-20 bg-black">
    <div class="max-w-6xl mx-auto px-4 md:px-8">
      <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8 flex-col-center">
        <div>
          <h2 class="text-3xl md:text-4xl font-semibold text-white tracking-tight">
            Upgrade Guide
          </h2>
          <p class="mt-2 text-white/60 max-w-2xl">
            Fitment notes, valve logic, sound targets, and common pitfalls—written for real installs.
          </p>
        </div>

        <Button
            label="Browse All Guides"
            icon="pi pi-arrow-right"
            iconPos="right"
            class="!bg-white/5 !text-white !border !border-white/10 hover:!bg-white/10"
        />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <article
            v-for="item in guides"
            :key="item.title"
            class="group rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] hover:bg-white/[0.05] transition"
        >
          <div class="flex gap-4 p-4">

            <div class="relative w-56 shrink-0">
              <img :src="item.image" class="w-full h-full object-fill" />
              <div class="absolute inset-0 rounded-xl ring-1 ring-white/10"></div>
            </div>

            <div class="min-w-0 flex-1">
              <div class="flex items-start justify-between gap-3">
                <h3 class="font-semibold text-white truncate">
                  {{ item.title }}
                </h3>
                <span class="text-[11px] px-2 py-1 rounded-md bg-black/40 border border-white/10 text-white/70">
                  {{ item.level }}
                </span>
              </div>

              <p class="text-white/60 text-sm mt-2 line-clamp-2">
                {{ item.desc }}
              </p>

              <div class="mt-3 flex flex-wrap gap-2">
                <span
                    v-for="t in item.tags"
                    :key="t"
                    class="text-[11px] px-2 py-1 rounded-full bg-white/5 text-white/70 border border-white/10"
                >
                  {{ t }}
                </span>
              </div>

              <div class="mt-4 flex items-center justify-between">
                <div class="text-xs text-white/50">Updated {{ item.updated }}</div>
                <a class="text-sm text-yellow-300 hover:text-yellow-200 transition" href="#">
                  Read more
                  <i class="pi pi-angle-right text-xs ml-1"></i>
                </a>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Button from 'primevue/button'

type Guide = {
  image: string
  title: string
  desc: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  tags: string[]
  updated: string
}

const guides = ref<Guide[]>([
  {
    image: '/guides/benz1.png',
    title: 'GLC 300 (EU6) Valved System Install Checklist',
    desc: 'A practical walkthrough covering valve calibration, CAN integration notes, and common rattle points.',
    level: 'Intermediate',
    tags: ['Valves', 'Fitment', 'NVH'],
    updated: '2026-01',
  },
  {
    image: '/guides/bmw2.png',
    title: 'How to Choose: Cat-Back vs Downpipe vs Full System',
    desc: 'Sound goals, emissions considerations, and how each configuration impacts spool and drivability.',
    level: 'Beginner',
    tags: ['Buying Guide', 'Sound', 'Flow'],
    updated: '2025-12',
  },
  {
    image: '/guides/g3.png',
    title: 'Resonator Tuning: Eliminating Drone Without Killing Tone',
    desc: 'A quick reference for frequency ranges, cabin resonance, and resonator placement strategies.',
    level: 'Advanced',
    tags: ['Drone', 'Resonator', 'Acoustics'],
    updated: '2025-11',
  },
  {
    image: '/guides/benz1.png',
    title: 'Valve Maps: Comfort / Sport / Track Profiles Explained',
    desc: 'How valve logic changes sound pressure and backpressure across RPM, plus recommended presets.',
    level: 'Intermediate',
    tags: ['Valve Map', 'Profiles', 'Daily'],
    updated: '2025-10',
  },
])
</script>
