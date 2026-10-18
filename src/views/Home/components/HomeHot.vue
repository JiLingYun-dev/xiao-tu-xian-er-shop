<script lang="ts" setup>
import { ref, onMounted } from "vue";

import HomePanel from "./HomePanel.vue";
import { findHotAPI } from "@/apis/home.ts";

interface Item {
  id: string;
  title: string;
  orderNum?: number;
  picture: string;
  alt: string;
}

interface Res {
  code: string;
  msg: string;
  result: Item[];
}

let hotList = ref<Item[]>([]);

const getHot = async () => {
  const res = (await findHotAPI()) as unknown as Res;

  hotList.value = res.result;
};

onMounted(() => {
  getHot();
  console.log(hotList);
});
</script>

<template>
  <HomePanel title="热门推荐" subTitle="人气推荐 畅销佳品">
    <div class="goods-class">
      <div class="goods" v-for="item in hotList" :key="item.id">
        <RouterLink :to="`/detail/${item.id}`">
          <!-- 懒加载通过自定义指令和vueUse -->
          <img v-img-lazy="item.picture" alt="item.name" />
          <p class="name">{{ item.title }}</p>
          <p>{{ item.alt }}</p>
        </RouterLink>
      </div>
    </div>
  </HomePanel>
</template>

<style scoped lang="scss">
.goods-class {
  display: flex;
  justify-content: space-between;
  /* flex-wrap: wrap;实现自动判断子元素挤满父容器时换行 */
  flex-wrap: wrap;

  .goods {
    width: 306px;
    height: 406px;

    background: #f0f9f4;
    transition: all 0.5s;

    &:hover {
      transform: translate3d(0, -3px, 0);
      box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
    }

    img {
      width: 306px;
      height: 306px;
    }

    p {
      font-size: 27px;
      padding-top: 12px;
      text-align: center;

      // text-overflow 和 white-space 和 overflow 必须一起使用才能实现溢出内容省略
      text-overflow: ellipsis;
      /* 注意区分 white-space 和 flex-wrap 之间的关系 */
      white-space: nowrap;
      overflow: hidden;
    }

    .goods {
      color: $priceColor;
    }
  }
}
</style>
