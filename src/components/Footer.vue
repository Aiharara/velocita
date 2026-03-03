<template>
  <footer id="contact-us" class="relative py-16 md:py-20 bg-black overflow-hidden">
    <!-- Background Decoration -->
    <div class="absolute inset-0">
      <div class="absolute inset-0 bg-grid-pattern opacity-[0.01]"></div>
      <div class="absolute inset-0 noise-texture opacity-[0.02]"></div>
      <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
    </div>

    <div class="relative max-w-7xl mx-auto px-4 md:px-8">
      <!-- Top Divider -->
      <div class="mb-12 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        <!-- Brand Info -->
        <div class="md:col-span-1">
          <img src="/logo.png" class="h-10 w-auto mb-4" alt="Velocita" />
          <h3 class="text-2xl font-bold text-white mb-3">VELOCITA</h3>
          <p class="text-white/60 text-sm leading-relaxed">
            Performance exhaust solutions engineered for modern platforms.<br />
            Precision craftsmanship, refined design, ultimate performance.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Products & Services</h4>
          <ul class="space-y-3">
            <li><a href="#products" class="footer-link">Exhaust Products</a></li>
            <li><a href="#guide" class="footer-link">Installation Guide</a></li>
            <li><a href="#cases" class="footer-link">Case Videos</a></li>
            <li><RouterLink to="/about" class="footer-link">About Us</RouterLink></li>
            <li><a href="#" class="footer-link">Warranty Policy</a></li>
          </ul>
        </div>

        <!-- Contact -->
        <div
            ref="contactRef"
            class="contact-box rounded-xl transition-all duration-500 p-4 -m-4"
            :class="{ 'contact-highlight': isHighlighted }"
        >
          <h4 class="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Contact Us</h4>
          <ul class="space-y-3">
            <li class="flex items-start gap-3">
              <i class="pi pi-map-marker text-yellow-400/80 text-sm mt-0.5"></i>
              <span class="text-white/60 text-sm">57-59 Parramatta Rd, Concord NSW 2137, Australia</span>
            </li>
            <li class="flex items-start gap-3">
              <i class="pi pi-envelope text-yellow-400/80 text-sm mt-0.5"></i>
              <a href="mailto:velocita.exhaust.au@gmail.com" class="text-white/60 text-sm hover:text-yellow-300 transition-colors">
                velocita.exhaust.au@gmail.com
              </a>
            </li>
            <li class="flex items-start gap-3">
              <div class="w-4 h-4 flex items-center justify-center mt-0.5">
                <img src="/instagram.ico" alt="Instagram" class="w-3.5 h-3.5 opacity-80" />
              </div>
              <a href="https://www.instagram.com/velocita_exhaust_au/" target="_blank" rel="noopener noreferrer" class="text-white/60 text-sm hover:text-yellow-300 transition-colors">
                @velocita_exhaust_au
              </a>
            </li>
            <li class="flex items-start gap-3">
              <div class="w-4 h-4 flex items-center justify-center mt-0.5">
                <img src="/red-book.svg" alt="小红书" class="w-3.5 h-3.5 opacity-80" />
              </div>
              <a href="https://www.xiaohongshu.com/user/profile/649086cf000000001001ec9a" target="_blank" rel="noopener noreferrer" class="text-white/60 text-sm hover:text-yellow-300 transition-colors">
                Velocita Exhaust AU
              </a>
            </li>
            <li class="flex items-start gap-3">
              <div class="w-4 h-4 flex items-center justify-center mt-0.5">
                <img src="/facebook.svg" alt="Facebook" class="w-3.5 h-3.5 opacity-80" />
              </div>
              <a href="https://www.facebook.com/profile.php?id=61588059698030" target="_blank" rel="noopener noreferrer" class="text-white/60 text-sm hover:text-yellow-300 transition-colors">
                Velocita Exhaust AU
              </a>
            </li>
            <li class="flex items-start gap-3">
              <i class="pi pi-clock text-yellow-400/80 text-sm mt-0.5"></i>
              <span class="text-white/60 text-sm">Mon - Sun 9:00 - 21:00</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Copyright -->
      <div class="pt-8 border-t border-white/10">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-center md:text-left">
          <div class="text-white/50 text-sm">
            © {{ new Date().getFullYear() }} Velocita. All rights reserved.
          </div>
          <div class="flex items-center justify-center gap-6 text-sm">
            <RouterLink to="/privacy" class="footer-link-plain">Privacy Policy</RouterLink>
            <span class="text-white/20">|</span>
            <RouterLink to="/terms" class="footer-link-plain">Terms of Use</RouterLink>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { eventBus } from '@/utils/eventBus.ts'

const route = useRoute()
const contactRef = ref<HTMLElement | null>(null)
const isHighlighted = ref(false)

let removeTimer: ReturnType<typeof setTimeout> | null = null
let unsubscribeHighlightContact: (() => void) | null = null

function triggerHighlight() {
  if (!contactRef.value) return

  // Scroll the contact section into view
  contactRef.value.scrollIntoView({ behavior: 'smooth', block: 'center' })

  // Trigger highlight after a short delay so the scroll is visible first
  setTimeout(() => {
    isHighlighted.value = true
  }, 400)

  // Remove highlight after animation completes
  if (removeTimer) clearTimeout(removeTimer)
  removeTimer = setTimeout(() => {
    isHighlighted.value = false
  }, 3500)
}

function handleHashChange() {
  if (route.hash === '#contact-us' || window.location.hash === '#contact-us') {
    triggerHighlight()
  }
}

function onHighlightContact() {
  triggerHighlight()
}

onMounted(() => {
  // Check on initial load
  if (route.hash === '#contact-us') {
    setTimeout(triggerHighlight, 500)
  }

  // Listen for hashchange events (for same-page navigation)
  window.addEventListener('hashchange', handleHashChange)
  // Listen for highlight-contact event from EventBus
  unsubscribeHighlightContact = eventBus.on('highlight-contact', onHighlightContact)
})

onBeforeUnmount(() => {
  window.removeEventListener('hashchange', handleHashChange)
  if (unsubscribeHighlightContact) {
    unsubscribeHighlightContact()
  }
  if (removeTimer) clearTimeout(removeTimer)
})
</script>

<style scoped>
/* Footer link with bottom border on hover - similar to navbar */
.footer-link {
  position: relative;
  display: inline-block;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.6);
  padding-bottom: 2px;
  transition: color 0.2s;
}

.footer-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 1px;
  background: linear-gradient(90deg, #facc15, #eab308);
  transition: width 0.3s ease;
}

.footer-link:hover {
  color: #fde047;
}

.footer-link:hover::after {
  width: 100%;
}

/* Footer link for bottom copyright - simpler style */
.footer-link-plain {
  position: relative;
  display: inline-block;
  color: rgba(255, 255, 255, 0.5);
  padding-bottom: 2px;
  transition: color 0.2s;
}

.footer-link-plain::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 1px;
  background: linear-gradient(90deg, #facc15, #eab308);
  transition: width 0.3s ease;
}

.footer-link-plain:hover {
  color: white;
}

.footer-link-plain:hover::after {
  width: 100%;
}

/* Contact Us highlight animation */
.contact-box {
  border: 1px solid transparent;
}

.contact-highlight {
  border-color: rgba(250, 204, 21, 0.5);
  background: rgba(250, 204, 21, 0.05);
  box-shadow: 0 0 20px rgba(250, 204, 21, 0.15), 0 0 40px rgba(250, 204, 21, 0.05);
  animation: contact-pulse 0.8s ease-in-out 3;
}

@keyframes contact-pulse {
  0%, 100% {
    border-color: rgba(250, 204, 21, 0.5);
    box-shadow: 0 0 20px rgba(250, 204, 21, 0.15), 0 0 40px rgba(250, 204, 21, 0.05);
  }
  50% {
    border-color: rgba(250, 204, 21, 0.8);
    box-shadow: 0 0 30px rgba(250, 204, 21, 0.3), 0 0 60px rgba(250, 204, 21, 0.1);
  }
}
</style>
