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
          <i class="pi pi-file-edit text-yellow-400/80 text-[10px]"></i>
          <span>Legal</span>
        </div>
        <h1 class="text-5xl md:text-6xl font-bold text-white tracking-tight mb-4">
          Terms of Use
        </h1>
        <p class="text-white/60 text-sm">
          Last updated: January 27, 2026
        </p>
      </div>

      <!-- 内容区域 -->
      <div class="prose prose-invert max-w-none">
        <section class="mb-10">
          <h2 class="text-2xl font-bold text-white mb-4">1. Agreement to Terms</h2>
          <p class="text-white/70 leading-relaxed mb-4">
            By accessing and using the Velocita website (www.velocita-exhaust-au.com), you accept and agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use our website.
          </p>
        </section>

        <section class="mb-10">
          <h2 class="text-2xl font-bold text-white mb-4">2. Website Purpose</h2>
          <p class="text-white/70 leading-relaxed mb-4">
            This website is an informational platform used to showcase Velocita's performance exhaust products, installation guides, and related media content. It does not provide online purchasing, user account registration, or any form of online transaction processing. For product enquiries and purchases, please <span class="text-yellow-400 cursor-pointer hover:underline" @click="triggerContact">contact us</span> directly via the contact information provided.
          </p>
        </section>

        <section class="mb-10">
          <h2 class="text-2xl font-bold text-white mb-4">3. Use of This Website</h2>
          <p class="text-white/70 leading-relaxed mb-4">
            You may use this website only for lawful purposes. You agree not to:
          </p>
          <ul class="list-disc list-inside text-white/70 space-y-2 mb-4">
            <li>Use the website for any illegal or unauthorised purpose</li>
            <li>Attempt to gain unauthorised access to our website or its servers</li>
            <li>Reproduce, duplicate, copy, or redistribute any content from this website for commercial purposes without our prior written consent</li>
            <li>Interfere with or disrupt the website or its hosting infrastructure</li>
            <li>Use automated tools (bots, scrapers) to access or extract content from the website</li>
          </ul>
        </section>

        <section class="mb-10">
          <h2 class="text-2xl font-bold text-white mb-4">4. Product Information</h2>
          <p class="text-white/70 leading-relaxed mb-4">
            The product information, images, videos, and descriptions displayed on this website are for general informational and reference purposes only. While we strive for accuracy:
          </p>
          <ul class="list-disc list-inside text-white/70 space-y-2 mb-4">
            <li>Product specifications, appearance, and availability may change without notice</li>
            <li>Images and videos are for illustrative purposes and may differ from actual products</li>
            <li>Information on this website does not constitute a binding offer or contract</li>
            <li>Please <span class="text-yellow-400 cursor-pointer hover:underline" @click="triggerContact">contact us</span> directly for the most up-to-date product details and pricing</li>
          </ul>
        </section>

        <section class="mb-10">
          <h2 class="text-2xl font-bold text-white mb-4">5. Intellectual Property</h2>
          <p class="text-white/70 leading-relaxed mb-4">
            All content on this website, including but not limited to text, graphics, logos, images, videos, and audio clips, is the property of Velocita or its content suppliers and is protected by Australian and international copyright and intellectual property laws. You may not reproduce, distribute, or create derivative works from any content without our prior written permission.
          </p>
        </section>

        <section class="mb-10">
          <h2 class="text-2xl font-bold text-white mb-4">6. Third-Party Links and Content</h2>
          <p class="text-white/70 leading-relaxed mb-4">
            This website may contain links to third-party websites and embed content from external platforms (such as YouTube, Instagram, and Xiaohongshu). These third-party services are not under our control, and we are not responsible for their content, privacy practices, or availability. Accessing these links is at your own discretion and risk.
          </p>
        </section>

        <section class="mb-10">
          <h2 class="text-2xl font-bold text-white mb-4">7. Disclaimer of Warranties</h2>
          <p class="text-white/70 leading-relaxed mb-4">
            This website is provided on an "as is" and "as available" basis. To the fullest extent permitted by Australian law, we disclaim all warranties, express or implied, including but not limited to:
          </p>
          <ul class="list-disc list-inside text-white/70 space-y-2 mb-4">
            <li>The website will be uninterrupted, secure, or error-free</li>
            <li>The accuracy, reliability, or completeness of any information on the website</li>
            <li>The website will be free of viruses or other harmful components</li>
          </ul>
        </section>

        <section class="mb-10">
          <h2 class="text-2xl font-bold text-white mb-4">8. Limitation of Liability</h2>
          <p class="text-white/70 leading-relaxed mb-4">
            To the fullest extent permitted by Australian law, Velocita and its owners, employees, and affiliates shall not be liable for any direct, indirect, incidental, special, or consequential damages arising from your use of or inability to use this website, or from any information displayed on it. This includes, but is not limited to, any decisions made based on the product information presented on the website.
          </p>
        </section>

        <section class="mb-10">
          <h2 class="text-2xl font-bold text-white mb-4">9. Governing Law</h2>
          <p class="text-white/70 leading-relaxed mb-4">
            These Terms of Use shall be governed by and construed in accordance with the laws of New South Wales, Australia. Any disputes arising from these terms or your use of this website shall be subject to the exclusive jurisdiction of the courts of New South Wales, Australia.
          </p>
        </section>

        <section class="mb-10">
          <h2 class="text-2xl font-bold text-white mb-4">10. Changes to Terms</h2>
          <p class="text-white/70 leading-relaxed mb-4">
            We reserve the right to update or modify these Terms of Use at any time. Any changes will be reflected by an updated "Last updated" date at the top of this page. Your continued use of the website after any changes constitutes acceptance of the revised terms.
          </p>
        </section>

        <section class="mb-10">
          <h2 class="text-2xl font-bold text-white mb-4">11. Contact Information</h2>
          <p class="text-white/70 leading-relaxed mb-4">
            If you have any questions about these Terms of Use, please contact us:
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
import { eventBus } from '@/utils/eventBus'
import { useScroll, useBackButtonOpacity } from '@/composables/useScroll'

const router = useRouter()
const scrollY = useScroll()
const backButtonOpacity = useBackButtonOpacity(scrollY)

function goBack() {
  router.push('/')
}

function triggerContact() {
  router.push('/').then(() => {
    setTimeout(() => {
      eventBus.emit('highlight-contact')
    }, 300)
  })
}
</script>

<style scoped>
.prose h2 {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 0.5rem;
}
</style>
