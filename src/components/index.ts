// 把components 中的所有组件进行全局化注册
// 通过插件的方式

import ImageView from "./ImageView/index.vue";
import XtxSKU from "./XtxSKU/index.vue";
import type { App } from "vue";

export const componentPlugin = {
  install(app: App) {
    (app.component("XtxImageView", ImageView), app.component("XtxSKU", XtxSKU));
  },
};
