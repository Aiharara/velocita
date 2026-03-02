<template>
  <div class="relative bg-black text-white min-h-screen">
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
    <div class="relative max-w-4xl mx-auto px-4 md:px-8 py-20">
      <!-- 页面标题 -->
      <div class="mb-12">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/60 text-xs mb-4">
          <i class="pi pi-shield text-yellow-400/80 text-[10px]"></i>
          <span>Legal</span>
        </div>
        <h1 class="text-5xl md:text-6xl font-bold text-white tracking-tight mb-4">
          Privacy Policy
        </h1>
        <p class="text-white/60 text-sm">
          Last updated: January 27, 2026
        </p>
      </div>

      <!-- 内容区域 -->
      <div class="prose prose-invert max-w-none">
        <section class="mb-10">
          <h2 class="text-2xl font-bold text-white mb-4">1. Introduction</h2>
          <p class="text-white/70 leading-relaxed mb-4">
            Welcome to the Velocita website ("we," "our," or "us"). This Privacy Policy explains how we handle information when you visit our website at www.velocita-exhaust-au.com. Our website is a static informational site used to showcase our performance exhaust products and services. We do not operate user accounts, online stores, or payment systems on this website.
          </p>
        </section>

        <section class="mb-10">
          <h2 class="text-2xl font-bold text-white mb-4">2. Information We Collect</h2>
          <p class="text-white/70 leading-relaxed mb-4">
            Our website does not collect, store, or process any personal information from visitors. There are no registration forms, login systems, shopping carts, or payment processing on this website. We do not require you to provide any personal data to browse our content.
          </p>
        </section>

        <section class="mb-10">
          <h2 class="text-2xl font-bold text-white mb-4">3. Cookies and Local Storage</h2>
          <p class="text-white/70 leading-relaxed mb-4">
            Our website may use essential cookies or local storage for basic functionality such as remembering your preferences (e.g., theme settings). These are strictly necessary for the website to function properly and do not track your activity across other websites. We do not use advertising cookies or third-party tracking cookies.
          </p>
        </section>

        <section class="mb-10">
          <h2 class="text-2xl font-bold text-white mb-4">4. Third-Party Services</h2>
          <p class="text-white/70 leading-relaxed mb-4">
            Our website may embed or link to third-party content such as YouTube videos and social media profiles (Instagram, Xiaohongshu). When you interact with this embedded content, those third-party services may collect information in accordance with their own privacy policies. We encourage you to review the privacy policies of any third-party services you interact with.
          </p>
        </section>

        <section class="mb-10">
          <h2 class="text-2xl font-bold text-white mb-4">5. External Links</h2>
          <p class="text-white/70 leading-relaxed mb-4">
            Our website contains links to external websites and social media platforms. We are not responsible for the privacy practices or content of these external sites. Clicking on these links will take you away from our website, and we recommend reviewing the privacy policies of any site you visit.
          </p>
        </section>

        <section class="mb-10">
          <h2 class="text-2xl font-bold text-white mb-4">6. Email Communication</h2>
          <p class="text-white/70 leading-relaxed mb-4">
            If you choose to contact us via the email address provided on our website, any information you include in that email is sent directly to our email inbox. We will only use your email address and message content to respond to your enquiry. We do not add your email to any mailing lists or share it with third parties.
          </p>
        </section>

        <section class="mb-10">
          <h2 class="text-2xl font-bold text-white mb-4">7. Children's Privacy</h2>
          <p class="text-white/70 leading-relaxed mb-4">
            Our website is a general informational site about automotive exhaust products. It is not directed to individuals under the age of 18 and does not knowingly collect any information from minors.
          </p>
        </section>

        <section class="mb-10">
          <h2 class="text-2xl font-bold text-white mb-4">8. Changes to This Privacy Policy</h2>
          <p class="text-white/70 leading-relaxed mb-4">
            We may update this Privacy Policy from time to time. Any changes will be reflected by an updated "Last updated" date at the top of this page. The updated version will be effective as soon as it is published on the website.
          </p>
        </section>

        <section class="mb-10">
          <h2 class="text-2xl font-bold text-white mb-4">9. Contact Us</h2>
          <p class="text-white/70 leading-relaxed mb-4">
            If you have questions about this Privacy Policy, please contact us at:
          </p>
          <div class="bg-white/5 border border-white/10 rounded-lg p-5">
            <p class="text-white/90 mb-2"><strong>Velocita Performance Exhaust</strong></p>
            <p class="text-white/70 mb-1">Email: velocita.exhaust.au@gmail.com</p>
            <p class="text-white/70">Address: 57-59 Parramatta Rd, Concord NSW 2137, Australia</p>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useScroll, useBackButtonOpacity } from '@/composables/useScroll'

const router = useRouter()
const scrollY = useScroll()
const backButtonOpacity = useBackButtonOpacity(scrollY)

function goBack() {
  router.push('/')
}
</script>

<style scoped>
.prose h2 {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 0.5rem;
}
</style>
