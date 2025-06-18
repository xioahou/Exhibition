import { createI18n } from 'vue-i18n'
import en from './lang/en.json'
import zh from './lang/ch.json'

const i18n = createI18n({
    legacy: false, // 设置为 false，启用 composition API 模式
    locale:'zh',
    fallbackLocale: 'zh',
    globalInjection: true,
    messages: {
      en,
      zh
    }
  })
export default i18n

