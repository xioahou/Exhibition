import { createApp } from 'vue'
import ElementPlus from 'element-plus'
 import 'normalize.css';
 import './assets/base.less'
 import i18n from './locales/index.js';
 import zhCn from 'element-plus/es/locale/lang/zh-cn'
import App from './App.vue'
const app=createApp(App)
app.use(i18n)
app.use(ElementPlus, {
  locale: zhCn,
})
app.mount('#app')
console.log(i18n.global.locale.value);
