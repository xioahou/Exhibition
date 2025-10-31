import { createApp } from "vue";
import ElementPlus from "element-plus";
import "normalize.css";
import "./assets/base.less";
import "flag-icons/css/flag-icons.min.css"; // 引入国旗css库
import "./assets/fonts/iconfont.css";
import i18n from "./locales/index.js";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import App from "./App.vue";
import { getLang } from "./utils/local.js";
const isMobile =
  /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
const host = import.meta.env.VITE_API_BASE_URL;
console.log(host);

console.log(isMobile);
if (isMobile) {
  window.location.href = `${host}/mobile`;
  // window.location.href = 'http://192.168.1.51:82/mobile'
}
const app = createApp(App);

const title = getLang()?.seo_title || "缔都化工";
document.title = title;
app.use(i18n);
app.use(ElementPlus, {
  locale: zhCn,
});
app.mount("#app");
