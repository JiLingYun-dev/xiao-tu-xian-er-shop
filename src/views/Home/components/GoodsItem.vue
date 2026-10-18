<template>
  <RouterLink to="/" class="goods-item">
    <img v-img-lazy="goods.picture" alt="none" />
    <p class="name ellipsis">{{ goods.name }}</p>
    <p class="desc ellipsis">{{ goods.desc }}</p>
    <p class="price">&yen;{{ goods.price }}</p>
  </RouterLink>
</template>

<script lang="ts" setup>
defineProps({
  goods: {
    type: Object,
    // Vue规定: type 是 Object 或 Array 时, default 必须用工厂函数返回,不能直接写对象字面量
    default: () => ({}),
    // 注意区分 () => {} 和 () => ({}) 的区别
  },
});
</script>

<style scoped lang="scss">
.goods-item {
  display: block;

  // 这里的作用是让 transform 和 box-shadow 在变化时，各用0.3秒平滑过渡
  transition:
    transform 0.3s,
    box-shadow 0.3s;
}
.goods-item:hover {
  // display: block;
  // transform只对块级元素生效
  transform: translate3d(0, -3px, 0);
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
}
</style>
