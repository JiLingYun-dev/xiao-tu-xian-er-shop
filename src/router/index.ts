import { createRouter, createWebHistory } from "vue-router";
import Layout from "../views/Layout/index.vue";
import Login from "@/views/Login/index.vue";
import Home from "@/views/Home/index.vue";
import Category from "@/views/Category/index.vue";
import Details from "@/views/Home/components/HomeDetail.vue";
// import home from "@/App.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: Layout,
      children: [
        {
          path: "", // 这里将路由置空，当浏览器访问"/"的时候，默认显示这个组件（默认二级路由）
          component: Home,
          children: [
            {
              // 这里的动态段必须和 RouterLink 绑定的动态参数保持一致
              path: "detail/:id",
              component: Details,
            },
          ],
        },
        {
          path: "category/:id",
          component: Category,
        },
      ],
    },
    {
      path: "/login", // RouterLink通过
      component: Login,
    },
  ],
});

export default router;
