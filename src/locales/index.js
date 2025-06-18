import { createI18n } from 'vue-i18n'
import zh from './zh/zh.json'
import en from './en/en.json'

const i18n = createI18n({
    legacy: false, // 设置为 false，启用 composition API 模式
    locale:localStorage.getItem('lang') || 'zh',
    fallbackLocale: 'zh',
    globalInjection: true,
    messages: {
      en,
      zh
    }
  })
export default i18n

