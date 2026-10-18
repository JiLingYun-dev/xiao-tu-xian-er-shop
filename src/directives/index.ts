import { useIntersectionObserver } from "@vueuse/core";

import type { App } from "vue";

export const lazyPlugin = {
  install(app: App) {
    app.directive("img-lazy", {
      mounted(el, binding) {
        // el 是指令绑定的那个元素
        // binding: binding.value 指令等于后面绑定的表达式的值 图片URL
        // console.log(el, binding.value);

        // 这里的 [entry] 直接进行了绑定(解构)模式解构,意思是: 第一个参数预期是个数组,把它的第0项绑定到entry这个变量上
        const { stop } = useIntersectionObserver(el, ([entry]) => {
          // 闭包 + 异步回调 + 对象绑定模式
          // console.log(entry?.isIntersecting);
          if (entry?.isIntersecting == true) {
            el.src = binding.value;
            stop();
          }
        });
      },
    });
  },
};
