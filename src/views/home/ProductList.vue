<!-- views/home/ProductList.vue -->
<template>
  <section id="products" class="py-14 md:py-20 bg-black">
    <div class="max-w-6xl mx-auto px-4 md:px-8">
      <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8 flex-col-center">
        <div>
          <h2 class="text-3xl md:text-4xl font-semibold text-white tracking-tight">
            Exhaust Products
          </h2>
          <p class="mt-2 text-white/60 max-w-2xl">
            Modular configurations, premium materials, and precise fitment. Built for sound, flow, and reliability.
          </p>
        </div>

        <div class="flex items-center gap-2">
          <span class="text-xs px-3 py-1 rounded-full bg-white/5 text-white/70 border border-white/10">
            Titanium / SS304
          </span>
          <span class="text-xs px-3 py-1 rounded-full bg-white/5 text-white/70 border border-white/10">
            Valved Options
          </span>
        </div>
      </div>

      <Carousel :value="products" :numVisible="3" :numScroll="1" circular class="vel-carousel">
        <template #item="{ data }">
          <article
              class="mx-2 rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] hover:bg-white/[0.05] transition"
          >
            <div class="relative h-52 w-full bg-gradient-to-b from-white/5 to-transparent overflow-hidden h-1/2">
              <img :src="data.image" class="block w-full h-full object-fill"  alt="product img"/>
              <div class="absolute top-4 left-4 flex gap-2">
                <span class="text-[11px] px-2 py-1 rounded-md bg-black/40 border border-white/10 text-white/70">
                  {{ data.material }}
                </span>
                <span
                    v-if="data.valved"
                    class="text-[11px] px-2 py-1 rounded-md bg-yellow-400/15 border border-yellow-400/25 text-yellow-200"
                >
                  Valved
                </span>
              </div>
            </div>

            <div class="p-5">
              <div class="flex items-start justify-between gap-3">
                <div class="min-w-0">
                  <h3 class="text-white font-semibold truncate">{{ data.name }}</h3>
                  <p class="text-white/60 text-sm mt-1 truncate">{{ data.fitment }}</p>
                </div>
                <div class="text-right">
                  <div class="text-white/80 text-xs">From</div>
                  <div class="text-yellow-300 font-semibold tracking-wide">{{ data.price }}</div>
                </div>
              </div>

              <div class="mt-4 grid grid-cols-3 gap-2">
                <div class="rounded-lg border border-white/10 bg-black/20 p-2">
                  <div class="text-[11px] text-white/50">Sound</div>
                  <div class="text-sm text-white/80">{{ data.sound }}</div>
                </div>
                <div class="rounded-lg border border-white/10 bg-black/20 p-2">
                  <div class="text-[11px] text-white/50">Weight</div>
                  <div class="text-sm text-white/80">{{ data.weight }}</div>
                </div>
                <div class="rounded-lg border border-white/10 bg-black/20 p-2">
                  <div class="text-[11px] text-white/50">Install</div>
                  <div class="text-sm text-white/80">{{ data.install }}</div>
                </div>
              </div>

              <div class="mt-5 flex gap-2">
                <Button
                    label="View Details"
                    icon="pi pi-search"
                    size="small"
                    class="w-full !rounded-md !bg-white/5 !text-white !border !border-white/10 hover:!bg-white/10 !p-1"
                />
                <Button
                    label="Add to Quote"
                    icon="pi pi-plus"
                    size="small"
                    class="w-full !rounded-md !bg-yellow-400/90 !text-black !border-0 hover:!bg-yellow-300"
                />
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
import Button from 'primevue/button'

type Product = {
  image: string
  name: string
  fitment: string
  material: string
  valved: boolean
  price: string
  sound: string
  weight: string
  install: string
}

const products = ref<Product[]>([
  {
    image: '/products/exhaust-audi-a7.jpg',
    name: 'Valved Cat-Back System',
    fitment: 'Audi A7 / S7 3.0T (C8)',
    material: 'SS304',
    valved: true,
    price: '$2,980',
    sound: 'Deep',
    weight: '-18%',
    install: '2.5h',
  },
  {
    image: '/products/exhaust-benz-c.jpg',
    name: 'Sport Mid-Pipe',
    fitment: 'Mercedes-Benz C-Class 2.0T (W205)',
    material: 'SS304',
    valved: false,
    price: '$1,190',
    sound: 'Crisp',
    weight: '-9%',
    install: '1.2h',
  },
  {
    image: '/products/exhaust-benz-c_coupe.jpg',
    name: 'Titanium Rear Section',
    fitment: 'BMW M3 / M4 (G8X)',
    material: 'Titanium',
    valved: true,
    price: '$3,680',
    sound: 'Aggressive',
    weight: '-32%',
    install: '2.0h',
  },
  {
    image: '/products/exhaust-benz-c.jpg',
    name: 'Downpipe (High-Flow)',
    fitment: 'Porsche Macan S 2.9T',
    material: 'SS304',
    valved: false,
    price: '$980',
    sound: 'Sharper',
    weight: '-6%',
    install: '2.8h',
  },
])
</script>
