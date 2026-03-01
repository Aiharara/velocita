import {createRouter, createWebHistory, type RouteRecordRaw} from 'vue-router'

const SITE_URL = 'https://www.velocita-exhaust-au.com'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Landing.vue'),
    meta: {
      title: 'Velocita | Performance Exhaust Systems - Bolt-On Valved Exhaust for BMW, Mercedes, Audi & More',
      description: 'Velocita performance exhaust systems engineered for clean fitment, refined tone, and reliable valve control. Vehicle-specific bolt-on exhaust solutions for BMW, Mercedes-Benz, Audi, Porsche, Lamborghini, Ferrari and more. Based in Sydney, Australia.',
    },
  },
  {
    path: '/video-gallery',
    name: 'video-gallery',
    component: () => import('@/views/VideoGallery.vue'),
    meta: {
      title: 'Video Gallery | Velocita Exhaust Sound Demos & Installation Videos',
      description: 'Watch exhaust sound demos and installation videos for BMW, Mercedes-Benz, Audi, Porsche, Lamborghini, Ferrari, Aston Martin and more. Hear the Velocita difference.',
    },
  },
  {
    path: '/guides',
    name: 'all-guides',
    component: () => import('@/views/InstallationShowcase.vue'),
    meta: {
      title: 'Installation Guides | Velocita Performance Exhaust',
      description: 'Step-by-step installation guides for Velocita performance exhaust systems. Bolt-on fitment instructions for BMW, Mercedes-Benz, Audi and more vehicles.',
    },
  },
  {
    path: '/guides/:folder',
    name: 'guide-detail',
    component: () => import('@/views/GuideDetail.vue'),
    meta: {
      title: 'Installation Guide | Velocita Performance Exhaust',
      description: 'Detailed installation guide for Velocita performance exhaust system. Step-by-step instructions with photos for bolt-on fitment.',
    },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/About.vue'),
    meta: {
      title: 'About Us | Velocita Performance Exhaust - Sydney, Australia',
      description: 'Learn about Velocita Performance Exhaust, premium exhaust system manufacturer based in Sydney, Australia. Precision-engineered exhaust solutions for luxury and performance vehicles.',
    },
  },
  {
    path: '/privacy',
    name: 'privacy',
    component: () => import('@/views/PrivacyPolicy.vue'),
    meta: {
      title: 'Privacy Policy | Velocita Performance Exhaust',
      description: 'Velocita Performance Exhaust privacy policy. Learn how we collect, use, and protect your personal information.',
    },
  },
  {
    path: '/terms',
    name: 'terms',
    component: () => import('@/views/TermsOfUse.vue'),
    meta: {
      title: 'Terms of Use | Velocita Performance Exhaust',
      description: 'Terms of use for the Velocita Performance Exhaust website and services.',
    },
  },
  // 兜底 404，避免空白页
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0, left: 0 }
  },
})

// Dynamic meta tag management for SEO
function updateMetaTag(attr: string, key: string, content: string) {
  let element = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null
  if (element) {
    element.setAttribute('content', content)
  } else {
    element = document.createElement('meta')
    element.setAttribute(attr, key)
    element.setAttribute('content', content)
    document.head.appendChild(element)
  }
}

function updateCanonicalLink(url: string) {
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
  if (link) {
    link.setAttribute('href', url)
  } else {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    link.setAttribute('href', url)
    document.head.appendChild(link)
  }
}

router.afterEach((to) => {
  const title = (to.meta?.title as string | undefined) ?? 'Velocita Performance Exhaust'
  const description = (to.meta?.description as string | undefined) ?? ''
  const canonicalUrl = `${SITE_URL}${to.path === '/' ? '' : to.path}`

  // Update title
  document.title = title

  // Update meta description
  if (description) {
    updateMetaTag('name', 'description', description)
    updateMetaTag('name', 'title', title)
  }

  // Update Open Graph tags
  updateMetaTag('property', 'og:title', title)
  updateMetaTag('property', 'og:url', canonicalUrl)
  if (description) {
    updateMetaTag('property', 'og:description', description)
  }

  // Update Twitter tags
  updateMetaTag('name', 'twitter:title', title)
  updateMetaTag('name', 'twitter:url', canonicalUrl)
  if (description) {
    updateMetaTag('name', 'twitter:description', description)
  }

  // Update canonical link
  updateCanonicalLink(canonicalUrl)
})

export default router
