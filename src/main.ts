import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import { lazyPlugin } from "./directives/index.ts";
import { componentPlugin } from "@/components/index.ts";
// 引入初始化的样式文件 / 引入全局样式文件
import "@/styles/common.scss";
// import "@/styles/var.scss";
// import { persistPlugin } from "./stores/user(way_2).ts";

const pinia = createPinia();

const app = createApp(App);

// import { getCategory } from "@/apis/testAPI.tys";

// getCategory().then((res) => {
//   console.log(res);
// });
app.use(pinia);
app.use(router);
app.use(lazyPlugin);
app.use(componentPlugin);

app.mount("#app");
