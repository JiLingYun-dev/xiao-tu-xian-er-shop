import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";

// 配置 ElementPlus按需导入
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver({ importStyle: "sass" })],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @use "@/styles/element/index.scss" as *;
        `,
      },
    },
  },
  // 配置开发环境下的反向代理，用来解决跨域（CORS）
  //设置 vite Proxy，只在 npm run dev 时生效，不影响打包后的生产环境
  server: {
    proxy: {
      "/api": {
        target: "http://pcapi-xiaotuxian-front-devtest.itheima.net",
        changeOrigin: true, // 把请求头里的 Host 改成目标服务器的域名
        rewrite: (path) => path.replace(/^\/api/, ""), // 重写请求路径
      },
    },
  },
});
