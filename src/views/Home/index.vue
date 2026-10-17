<template>
  <div class="container">
    <HomeCategory></HomeCategory>
    <HomeBanner></HomeBanner>
  </div>
  <HomeNew></HomeNew>
  <HomeHot></HomeHot>
  <HomeProduct></HomeProduct>
</template>

<script lang="ts" setup>
import HomeNew from "./components/HomeNew.vue";
import HomeBanner from "./components/HomeBanner.vue";
import HomeCategory from "./components/HomeCategory.vue";
import HomeHot from "./components/HomeHot.vue";
import HomeProduct from "./components/HomeProduct.vue";
</script>

<style scoped></style>
