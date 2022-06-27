import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
/*element start */
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
/*element end */
import Mock from "mockjs";
require("../mock");
import { setupStore } from "@/store";
import Particles from "particles.vue3";
// import common css
import "@/assets/css/common.scss";
import { Tabbar, TabbarItem, Search } from "vant";
const app = createApp(App);
setupStore(app);
app.use(Mock);
app.use(Particles);
app.use(Tabbar);
app.use(TabbarItem);
app.use(Search);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(router).use(ElementPlus).mount("#app");
