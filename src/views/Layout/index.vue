<script setup lang="ts">
import { onMounted } from "vue";

import LayoutNav from "./components/LayoutNav.vue";
import LayoutHeader from "./components/LayoutHeader.vue";
import LayoutFooter from "./components/LayoutFooter.vue";
import LayoutFixed from "./components/LayoutFixed.vue";

import useCategoryStore from "@/stores/categoryStore.ts";

const categoryStore = useCategoryStore();

onMounted(() => {
  categoryStore.getCategory();
});
// 触发获取导航列表的action
</script>

<template>
  <LayoutFixed />
  <LayoutNav />
  <LayoutHeader />
  <!-- 添加key 破坏复用机制 强制销毁重建 -->
  <!-- <RouterView :key="$route.fullPath" /> -->
  <RouterView :key="$route.fullPath" />
  <LayoutFooter />
</template>
