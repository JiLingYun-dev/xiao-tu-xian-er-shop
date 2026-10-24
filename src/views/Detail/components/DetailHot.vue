<script setup lang="ts">
import { getHotGoodsAPI } from "@/apis/detail";

import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";

// 这里的 defineProps 通过泛型限制传参类型
const props = defineProps<{ hotType: 1 | 2 }>(); // 这里的 defineProps 的返回值是一个 Proxy 对象

// String 和 string
// class type interface | &

interface Item {
  id: string;
  desc: string;
  name: string;
  oderNum: number;
  picture: string;
  price: string;
}

interface Res {
  code: string;
  msg: string;
  result: Item[];
}

const TYPEMAP = {
  1: "24小时热榜",
  2: "周热榜",
};

const hotTitle = computed(() => {
  // 这里的 [] 是按键取值
  return TYPEMAP[props.hotType];
});
const hotList = ref<Item[]>([]);

const route = useRoute();
const getHotList = async () => {
  const res = (await getHotGoodsAPI({
    id: route.params.id,
    type: props.hotType,
  })) as unknown as Res;

  hotList.value = res.result;

  // console.log(res);
};

onMounted(() => {
  getHotList();
});
</script>
<template>
  <div class="goods-hot">
    <h3>{{ hotTitle }}</h3>
    <!-- 商品区块 -->
    <RouterLink to="/" class="goods-item" v-for="item in hotList" :key="item.id">
      <img :src="item.picture" alt="" />
      <p class="name ellipsis">{{ item.name }}</p>
      <p class="desc ellipsis">{{ item.desc }}</p>
      <p class="price">&yen;{{ item.price }}</p>
    </RouterLink>
  </div>
</template>

<style scoped lang="scss">
.goods-hot {
  h3 {
    height: 70px;
    background: $helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }

  .goods-item {
    display: block;
    padding: 20px 30px;
    text-align: center;
    background: #fff;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }
}
</style>
