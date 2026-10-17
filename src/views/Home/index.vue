<template>
  <div class="container">
    <HomeCategory></HomeCategory>
    <HomeBanner></HomeBanner>
  </div>
  <HomeNew></HomeNew>
  <HomeHot></HomeHot>
  <HomeProduct></HomeProduct>
  <!-- 测试面板组件 -->
  <HomePanel title="新鲜好物" subTitle="新鲜好物 好多商品">
    <div>我是新鲜好物的插槽</div>
  </HomePanel>

  <HomePanel title="人气推荐" subTitle="人气推荐 好多商品">
    <div>我是人气推荐的插槽</div>
  </HomePanel>
</template>

<script lang="ts" setup>
import HomeNew from "./components/HomeNew.vue";
import HomeBanner from "./components/HomeBanner.vue";
import HomeCategory from "./components/HomeCategory.vue";
import HomeHot from "./components/HomeHot.vue";
import HomeProduct from "./components/HomeProduct.vue";
import HomePanel from "./components/HomePanel.vue";
</script>

<style scoped></style>
