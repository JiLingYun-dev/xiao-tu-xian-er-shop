<script setup lang="ts"></script>

<template>
  <RouterView></RouterView>
</template>

<!-- 这里的lang='scss' 表示 默认引入全局scss组件 -->
<style scoped lang="scss">
.test {
  color: $priceColor;
}
</style>
