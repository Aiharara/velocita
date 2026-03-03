/**
 * useScroll composable
 * 提取滚动处理的共用逻辑，避免代码重复
 */

import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { ANIMATION_CONFIG } from '@/config'

/**
 * 通用滚动处理 hook
 * @returns 滚动距离 ref（默认）或 { scrollY, windowHeight } 对象
 */
export function useScroll() {
  const scrollY = ref(0)
  const windowHeight = ref(typeof window !== 'undefined' ? window.innerHeight : 1000)

  const handleScroll = () => {
    scrollY.value = window.scrollY
  }

  const handleResize = () => {
    windowHeight.value = window.innerHeight
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize, { passive: true })
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll)
    window.removeEventListener('resize', handleResize)
  })

  // 返回对象形式，支持解构
  return { scrollY, windowHeight }
}

/**
 * 计算返回按钮的透明度
 * 在scrollY进入特定范围时淡出
 */
export function useBackButtonOpacity(scrollY: import('vue').Ref<number>) {
  return computed(() => {
    const fadeStart = ANIMATION_CONFIG.SCROLL.BACK_BUTTON_FADE_START
    const fadeEnd = ANIMATION_CONFIG.SCROLL.BACK_BUTTON_FADE_END

    if (scrollY.value <= fadeStart) return 1
    if (scrollY.value >= fadeEnd) return 0
    return 1 - (scrollY.value - fadeStart) / (fadeEnd - fadeStart)
  })
}

/**
 * 计算 NavBar 的透明度
 * 在滚动到特定位置时逐渐显示
 */
export function useNavBarOpacity(scrollY: import('vue').Ref<number>, windowHeight: number) {
  return computed(() => {
    const fadeStart = windowHeight * ANIMATION_CONFIG.SCROLL.NAV_FADE_START_RATIO
    const fadeEnd = windowHeight * ANIMATION_CONFIG.SCROLL.NAV_FADE_END_RATIO

    if (scrollY.value <= fadeStart) return 0
    if (scrollY.value >= fadeEnd) return 1
    return (scrollY.value - fadeStart) / (fadeEnd - fadeStart)
  })
}

/**
 * 计算特定阈值下的透明度（通用）
 * @param scrollY 滚动距离
 * @param fadeStart 开始淡出的距离
 * @param fadeEnd 完全淡出的距离
 */
export function useFadeOpacity(
  scrollY: import('vue').Ref<number>,
  fadeStart: number,
  fadeEnd: number
) {
  return computed(() => {
    if (scrollY.value <= fadeStart) return 1
    if (scrollY.value >= fadeEnd) return 0
    return 1 - (scrollY.value - fadeStart) / (fadeEnd - fadeStart)
  })
}
