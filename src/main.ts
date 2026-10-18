import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import { lazyPlugin } from "./directives/index.ts";
// 引入初始化的样式文件 / 引入全局样式文件
import "@/styles/common.scss";
// import "@/styles/var.scss";

const app = createApp(App);

// import { getCategory } from "@/apis/testAPI.tys";

// getCategory().then((res) => {
//   console.log(res);
// });

app.use(createPinia());
app.use(router);
app.use(lazyPlugin);

app.mount("#app");
