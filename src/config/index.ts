/**
 * 统一项目配置文件
 * 集中管理所有硬编码的常量值，便于维护和修改
 */

// ============= 媒体资源配置 =============
export const MEDIA_CONFIG = {
  BASE_URL: 'https://media.velocita-exhaust-au.com',
  PATHS: {
    VIDEOS: '/videos',
    IMAGES: '/images',
    INSTALLATION_GUIDES: '/installation-guides',
  },
} as const

// 便利函数：构建完整的媒体URL
export const getMediaUrl = (path: string) => `${MEDIA_CONFIG.BASE_URL}${path}`

// ============= 网站配置 =============
export const SITE_CONFIG = {
  URL: 'https://www.velocita-exhaust-au.com',
  TITLE: 'Velocita | Performance Exhaust Systems',
} as const

// ============= 动画配置 =============
export const ANIMATION_CONFIG = {
  // Hero组件的3阶段动画参数
  HERO: {
    PHASE1_RATIO: 0.8, // 第一阶段：向下移动到的视口高度比例
    HOLD_DURATION: 0.5, // 第二阶段：保持不动的时长（视口高度倍数）
    PHASE3_RATIO: 1.0, // 第三阶段：向上消失的视口高度比例
    INITIAL_OFFSET_RATIO: 0.99, // 初始向上偏移比例
    FINAL_OFFSET_RATIO: 1.2, // 最终向上消失的偏移比例
  },

  // 滚动相关动画
  SCROLL: {
    // 返回按钮淡入淡出
    BACK_BUTTON_FADE_START: 50,
    BACK_BUTTON_FADE_END: 200,

    // NavBar淡入淡出
    NAV_FADE_START_RATIO: 0.3, // 视口高度的30%
    NAV_FADE_END_RATIO: 0.8, // 视口高度的80%
  },

  // 动画时长（毫秒）
  DURATIONS: {
    TRANSITION: 500,
    LONG_TRANSITION: 700,
    BUTTON_HOVER: 400,
  },

  // 延迟和间隔（毫秒）
  DELAYS: {
    SOUND_LOOP: 3500,
    BUTTON_INTERACTION: 400,
  },
} as const

// ============= 响应式断点 =============
export const BREAKPOINTS = {
  MOBILE: 768,
  TABLET: 1024,
  DESKTOP: 1280,
} as const

// ============= 数据配置 =============
export const DATA_CONFIG = {
  CAROUSEL: {
    ITEMS_MOBILE: 1,
    ITEMS_TABLET: 2,
    ITEMS_DESKTOP: 3,
  },
  // 视口高度阈值
  SCROLL_THRESHOLDS: {
    SHOW_SCROLL_HINT: 100,
    HIDE_AUDIO_BUTTON: (vh: number) => vh * (1.8 + ANIMATION_CONFIG.HERO.HOLD_DURATION),
  },
} as const

// ============= 颜色配置 =============
export const COLOR_CONFIG = {
  PRIMARY: {
    YELLOW: 'rgba(250, 204, 21, 1)',
    YELLOW_SEMI: 'rgba(250, 204, 21, 0.3)',
    YELLOW_LIGHT: 'rgba(250, 204, 21, 0.5)',
  },
  OVERLAY: {
    DARK_LIGHT: 'rgba(0, 0, 0, 0.1)',
    DARK_SEMI: 'rgba(0, 0, 0, 0.3)',
    DARK_MEDIUM: 'rgba(0, 0, 0, 0.5)',
    DARK_HEAVY: 'rgba(0, 0, 0, 0.6)',
    DARK_DARK: 'rgba(0, 0, 0, 0.7)',
  },
  GLASS: {
    SEMI: 'rgba(0, 0, 0, 0.4)',
    HEAVY: 'rgba(0, 0, 0, 0.6)',
  },
  LIGHT: {
    SUBTLE: 'rgba(255, 255, 255, 0.03)',
    LIGHT: 'rgba(255, 255, 255, 0.05)',
    MEDIUM: 'rgba(255, 255, 255, 0.1)',
    SEMI: 'rgba(255, 255, 255, 0.2)',
    BRIGHT: 'rgba(255, 255, 255, 0.3)',
  },
} as const
