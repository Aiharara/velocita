<template>
  <div class="relative bg-black text-white min-h-screen">
    <!-- NavBar -->
    <div class="sticky top-0 z-40">
      <NavBar :show-back-button="true" />
    </div>

    <!-- 返回按钮 - 左上角固定位置，滚动时消失 -->
    <button
        @click="goBack"
        class="hidden md:flex fixed top-28 left-8 z-50 items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300 hover:scale-105 shadow-lg shadow-yellow-500/25"
        :style="{ opacity: backButtonOpacity, pointerEvents: scrollY > 200 ? 'none' : 'auto' }"
    >
      <i class="pi pi-arrow-left text-sm"></i>
      <span>Back</span>
    </button>

    <!-- 主内容 -->
    <div class="relative max-w-7xl mx-auto px-4 md:px-8 py-20">
      <!-- 页面标题 -->
      <div class="mb-16 flex-col-center">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/60 text-xs mb-4">
          <i class="pi pi-info-circle text-yellow-400/80 text-[10px]"></i>
          <span>Our Story</span>
        </div>
        <h1 class="text-5xl md:text-6xl font-bold text-white tracking-tight mb-4">
          About Velocita
        </h1>
        <p class="text-white/60 text-lg max-w-3xl text-center">
          Crafting high-performance exhaust systems since 2002
        </p>
      </div>

      <!-- 排气技术 Section -->
      <section class="mb-24">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
          Exhaust Technology
        </h2>

        <!-- 三图布局 -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          <!-- 左侧大图 -->
          <div class="relative rounded-2xl overflow-hidden border border-white/10 group">
            <img
                :src="`${MEDIA_BASE_URL}1.jpg`"
                alt="Exhaust System Development"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          </div>

          <!-- 右侧两张小图 -->
          <div class="grid grid-rows-2 gap-6">
            <div class="relative rounded-2xl overflow-hidden border border-white/10 group">
              <img
                  :src="`${MEDIA_BASE_URL}2.jpg`"
                  alt="3D Laser Scanning"
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            </div>
            <div class="relative rounded-2xl overflow-hidden border border-white/10 group">
              <img
                  :src="`${MEDIA_BASE_URL}3.jpg`"
                  alt="Quality Testing"
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            </div>
          </div>
        </div>

        <!-- 技术描述 -->
        <div class="max-w-4xl mx-auto space-y-8">
          <div class="relative p-8 rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.03] border border-white/10 backdrop-blur-sm">
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400/20 to-yellow-500/20 flex items-center justify-center border border-yellow-400/30">
                <i class="pi pi-check-circle text-yellow-400 text-xl"></i>
              </div>
              <div class="flex-1">
                <h3 class="text-xl font-semibold text-white mb-3">Performance Testing & Validation</h3>
                <p class="text-white/70 text-base leading-relaxed">
                  Once the prototype is completed, we rigorously test the exhaust system on actual vehicles to ensure perfect alignment with OEM mounting points. We validate that our exhaust systems not only fit flawlessly but also enhance your vehicle's performance characteristics.
                </p>
              </div>
            </div>
          </div>

          <div class="relative p-8 rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.03] border border-white/10 backdrop-blur-sm">
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400/20 to-yellow-500/20 flex items-center justify-center border border-yellow-400/30">
                <i class="pi pi-cog text-yellow-400 text-xl"></i>
              </div>
              <div class="flex-1">
                <h3 class="text-xl font-semibold text-white mb-3">3D Laser Scanning Technology</h3>
                <p class="text-white/70 text-base leading-relaxed">
                  To guarantee a complete and precise fitment for our exhaust systems, we employ advanced 3D laser scanning technology to capture the entire chassis geometry of each vehicle. The scanned data is uploaded to our computer-aided design system, enabling us to create exhaust systems with millimeter-perfect precision.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 发展历史 Section -->
      <section>
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
          VELOCITA History
        </h2>
        <div class="h-px w-full bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent mb-12"></div>

        <!-- 大图 -->
        <div class="relative rounded-2xl overflow-hidden border border-white/10 mb-12 group">
          <img
              :src="`${MEDIA_BASE_URL}4.jpg`"
              alt="VELOCITA Workshop"
              class="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        </div>

        <!-- 历史时间线 -->
        <div class="max-w-4xl mx-auto space-y-10">
          <!-- 2002 -->
          <div class="timeline-item">
            <div class="flex items-start gap-6">
              <div class="flex-shrink-0">
                <div class="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400/30 to-yellow-500/30 border-2 border-yellow-400/50 flex items-center justify-center">
                  <span class="text-yellow-400 font-bold text-lg">2002</span>
                </div>
              </div>
              <div class="flex-1 pt-3">
                <h3 class="text-xl font-semibold text-white mb-3">The Birth of Velocita Exhaust</h3>
                <p class="text-white/70 leading-relaxed">
                  At the turn of the millennium in 2002, a group of automotive modification enthusiasts founded the VE-Velocita Exhaust brand in Shanghai, known as "China's Industrial Hub." With aspirations to make their mark in the automotive exhaust industry, they aimed to meet domestic high-performance exhaust upgrade demands while expanding into international markets. In the first year, the V team introduced advanced technologies from Germany and the US, and imported original exhaust manufacturing equipment from Turin, Italy, thus beginning their journey of excellence. 2002 became known as "Year V."
                </p>
              </div>
            </div>
          </div>

          <!-- 2003 -->
          <div class="timeline-item">
            <div class="flex items-start gap-6">
              <div class="flex-shrink-0">
                <div class="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400/30 to-yellow-500/30 border-2 border-yellow-400/50 flex items-center justify-center">
                  <span class="text-yellow-400 font-bold text-lg">2003</span>
                </div>
              </div>
              <div class="flex-1 pt-3">
                <h3 class="text-xl font-semibold text-white mb-3">Overcoming Challenges</h3>
                <p class="text-white/70 leading-relaxed">
                  Like any new venture, the V team faced significant challenges. Industry competition and customer skepticism became obstacles to progress. Production-supply-sales imbalances and funding shortages occurred frequently. By late 2003, domestic and international markets shrank dramatically, threatening the company's survival and impacting employee compensation. Despite these difficulties, the V team never wavered, maintaining trust, support, and collaboration among team members.
                </p>
              </div>
            </div>
          </div>

          <!-- 2004 -->
          <div class="timeline-item">
            <div class="flex items-start gap-6">
              <div class="flex-shrink-0">
                <div class="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400/30 to-yellow-500/30 border-2 border-yellow-400/50 flex items-center justify-center">
                  <span class="text-yellow-400 font-bold text-lg">2004</span>
                </div>
              </div>
              <div class="flex-1 pt-3">
                <h3 class="text-xl font-semibold text-white mb-3">Strategic Transformation</h3>
                <p class="text-white/70 leading-relaxed">
                  A new direction emerged: "Research emerging market trends, build new production-supply-sales systems, and perfect high-end product quality." In Q1 2004, 80% of the V team visited competitive cities nationwide to understand market demands and competition dynamics. They identified customer needs intersections and updated service systems. By analyzing competition patterns and consolidating team wisdom, the V team decided to abandon their original model and develop a new strategy led by ten members with cutting-edge market insights.
                </p>
              </div>
            </div>
          </div>

          <!-- 2005 -->
          <div class="timeline-item">
            <div class="flex items-start gap-6">
              <div class="flex-shrink-0">
                <div class="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400/30 to-yellow-500/30 border-2 border-yellow-400/50 flex items-center justify-center">
                  <span class="text-yellow-400 font-bold text-lg">2005</span>
                </div>
              </div>
              <div class="flex-1 pt-3">
                <h3 class="text-xl font-semibold text-white mb-3">Breaking Through</h3>
                <p class="text-white/70 leading-relaxed">
                  The V team successfully overcame development obstacles and entered the industry fast track.
                </p>
              </div>
            </div>
          </div>

          <!-- 2008 -->
          <div class="timeline-item">
            <div class="flex items-start gap-6">
              <div class="flex-shrink-0">
                <div class="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400/30 to-yellow-500/30 border-2 border-yellow-400/50 flex items-center justify-center">
                  <span class="text-yellow-400 font-bold text-lg">2008</span>
                </div>
              </div>
              <div class="flex-1 pt-3">
                <h3 class="text-xl font-semibold text-white mb-3">Entering Luxury Market</h3>
                <p class="text-white/70 leading-relaxed">
                  Expanded into high-end vehicle exhaust system upgrades for Porsche, Ferrari, Mercedes-Benz, BMW, Land Rover, and other premium brands.
                </p>
              </div>
            </div>
          </div>

          <!-- 2012 -->
          <div class="timeline-item">
            <div class="flex items-start gap-6">
              <div class="flex-shrink-0">
                <div class="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400/30 to-yellow-500/30 border-2 border-yellow-400/50 flex items-center justify-center">
                  <span class="text-yellow-400 font-bold text-lg">2012</span>
                </div>
              </div>
              <div class="flex-1 pt-3">
                <h3 class="text-xl font-semibold text-white mb-3">10th Anniversary Milestone</h3>
                <p class="text-white/70 leading-relaxed">
                  Celebrating a decade of excellence, Velocita officially launched its partnership history, continuing to grow and evolve.
                </p>
              </div>
            </div>
          </div>

          <!-- 2016 -->
          <div class="timeline-item">
            <div class="flex items-start gap-6">
              <div class="flex-shrink-0">
                <div class="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400/30 to-yellow-500/30 border-2 border-yellow-400/50 flex items-center justify-center">
                  <span class="text-yellow-400 font-bold text-lg">2016</span>
                </div>
              </div>
              <div class="flex-1 pt-3">
                <h3 class="text-xl font-semibold text-white mb-3">System Integration</h3>
                <p class="text-white/70 leading-relaxed">
                  Upgraded the production-supply-sales system, promoting integrated operations to make V performance exhausts more accessible to enthusiasts worldwide.
                </p>
              </div>
            </div>
          </div>

          <!-- 2018 -->
          <div class="timeline-item">
            <div class="flex items-start gap-6">
              <div class="flex-shrink-0">
                <div class="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400/30 to-yellow-500/30 border-2 border-yellow-400/50 flex items-center justify-center">
                  <span class="text-yellow-400 font-bold text-lg">2018</span>
                </div>
              </div>
              <div class="flex-1 pt-3">
                <h3 class="text-xl font-semibold text-white mb-3">Quality Enhancement</h3>
                <p class="text-white/70 leading-relaxed">
                  VE high-performance exhaust systems underwent comprehensive upgrades, achieving significant improvements in both aesthetics and craftsmanship with "stunning appearance, precision engineering" as the hallmark.
                </p>
              </div>
            </div>
          </div>

          <!-- 2019+ -->
          <div class="timeline-item">
            <div class="flex items-start gap-6">
              <div class="flex-shrink-0">
                <div class="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400/30 to-yellow-500/30 border-2 border-yellow-400/50 flex items-center justify-center">
                  <span class="text-yellow-400 font-bold text-lg">Now</span>
                </div>
              </div>
              <div class="flex-1 pt-3">
                <h3 class="text-xl font-semibold text-white mb-3">Your Story Begins</h3>
                <p class="text-white/70 leading-relaxed">
                  Today, Velocita continues to push the boundaries of high-performance exhaust technology. We're ready to craft the perfect exhaust solution for your vehicle. Your journey with Velocita awaits.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Footer -->
    <footer class="relative py-16 md:py-20 bg-black overflow-hidden border-t border-white/10 mt-20">
      <div class="relative max-w-7xl mx-auto px-4 md:px-8 text-center">
        <p class="text-white/50 text-sm">
          © {{ new Date().getFullYear() }} Velocita. All rights reserved.
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from '@/components/NavBar.vue'

const router = useRouter()
const MEDIA_BASE_URL = 'https://media.velocita-exhaust-au.com/images/about-us/'
const scrollY = ref(0)

// Back按钮透明度：滚动时逐渐消失
const backButtonOpacity = computed(() => {
  const fadeStart = 50
  const fadeEnd = 200
  if (scrollY.value <= fadeStart) return 1
  if (scrollY.value >= fadeEnd) return 0
  return 1 - (scrollY.value - fadeStart) / (fadeEnd - fadeStart)
})

function goBack() {
  router.push('/')
}

function handleScroll() {
  scrollY.value = window.scrollY
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* 工具类 */
.flex-col-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

/* 时间线动画 */
.timeline-item {
  position: relative;
  padding-left: 1.5rem;
}

.timeline-item::before {
  content: '';
  position: absolute;
  left: 2.5rem;
  top: 5rem;
  bottom: -3rem;
  width: 2px;
  background: linear-gradient(180deg, rgba(250, 204, 21, 0.3) 0%, transparent 100%);
}

.timeline-item:last-child::before {
  display: none;
}
</style>
