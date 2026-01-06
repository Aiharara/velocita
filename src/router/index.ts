import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'landing',
    component: () => import('@/views/Landing.vue'),
    meta: { title: 'Welcome' },
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/Home.vue'),
    meta: { title: 'Home' },
  },
  // 可选：兜底 404，避免空白页
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0, left: 0 }
  },
})

router.afterEach((to) => {
  const title = (to.meta?.title as string | undefined) ?? 'Exhaust Platform'
  document.title = title
})

export default router
