import { createRouter, createWebHistory } from "vue-router";
import Layout from "../views/Layout/index.vue";
import Login from "@/views/Login/index.vue";
import Home from "@/views/Home/index.vue";
import Category from "@/views/Category/index.vue";
import SubCategory from "@/views/SubCategory/index.vue";
import Detail from "@/views/Detail/index.vue";

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
        },
        {
          path: "category/:id",
          component: Category,
        },
        {
          path: "category/sub/:id",
          component: SubCategory,
        },
        {
          path: "detail/:id",
          component: Detail,
        },
      ],
    },
    {
      path: "/login", // RouterLink通过
      component: Login,
    },
  ],
  // 添加路由滚动行为等配置项
  scrollBehavior() {
    return {
      top: 0,
    };
  },
});

export default router;
