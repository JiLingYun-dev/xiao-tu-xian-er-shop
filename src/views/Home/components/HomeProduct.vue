<script setup lang="ts">
import HomePanel from "./HomePanel.vue";
import { getGoodsAPI } from "@/apis/home.ts";
import GoodsItem from "./GoodsItem.vue";

import { ref, onMounted } from "vue";

interface Goods {
  id: string;
  name: string;
  desc: string;
  price: string;
  picture: string;
  oederNum: number;
}

interface Info {
  id: string;
  name: string;
  layer: number;
  parent: null;
}
interface ProductsList {
  id: string;
  name: string;
  picture: string;
  saleInfo: string;
  children: Info[];
  goods: Goods[];
}

interface Res {
  code: string;
  msg: string;
  result: ProductsList[];
}
const productList = ref<ProductsList[]>([]);

const getProducts = async () => {
  const res = (await getGoodsAPI()) as unknown as Res;
  productList.value = res.result;

  // console.log("Product=============", res);
};

onMounted(() => {
  getProducts();
});
</script>

<template>
  <div class="home-product">
    <HomePanel :title="cate.name" v-for="cate in productList" :key="cate.id">
      <div class="box">
        <RouterLink class="cover" to="/">
          <img v-img-lazy="cate.picture" />
          <strong class="label">
            <span>{{ cate.name }}馆</span>
            <span>{{ cate.saleInfo }}</span>
          </strong>
        </RouterLink>
        <ul class="goods-list">
          <li v-for="goods in cate.goods" :key="goods.id">
            <GoodsItem :goods="goods" />
            <!-- <RouterLink to="/" class="goods-item">
              <img v-img-lazy="goods.picture" alt="图片加载失败" />
              <p class="name ellipsis">{{ goods.name }}</p>
              <p class="desc ellipsis">{{ goods.desc }}</p>
              <p class="price">&yen;{{ goods.price }}</p>
            </RouterLink> -->
          </li>
        </ul>
      </div>
    </HomePanel>
  </div>
</template>

<style scoped lang="scss">
.home-product {
  background: #fff;
  margin-top: 20px;

  .sub {
    margin-bottom: 2px;

    a {
      padding: 2px 12px;
      font-size: 16px;
      border-radius: 4px;

      &:hover {
        background: $xtxColor;
        color: #fff;
      }

      &:last-child {
        margin-right: 80px;
      }
    }
  }

  .box {
    display: flex;

    .cover {
      width: 240px;
      height: 610px;
      margin-right: 10px;
      position: relative;

      img {
        width: 100%;
        height: 100%;
      }

      .label {
        width: 188px;
        height: 66px;
        display: flex;
        font-size: 18px;
        color: #fff;
        line-height: 66px;
        font-weight: normal;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate3d(0, -50%, 0);

        span {
          text-align: center;

          &:first-child {
            width: 76px;
            background: rgba(0, 0, 0, 0.9);
          }

          &:last-child {
            flex: 1;
            background: rgba(0, 0, 0, 0.7);
          }
        }
      }
    }

    .goods-list {
      width: 990px;
      display: flex;
      flex-wrap: wrap;

      // .goods-item {
      //   transition:
      //     transform 0.3s,
      //     box-shadow 0.3s;
      // }
      // .goods-item:hover {
      //   display: block;
      //   transform: translate3d(0, -3px, 0);
      //   box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
      // }
      li {
        width: 240px;
        height: 300px;
        margin-right: 10px;
        margin-bottom: 10px;
        // 这里的 nth-last-child 和 nth-child 是CSS伪类

        // nth-last-child(-n + 4) 的作用是“按倒数第n个”来匹配统计兄弟元素
        &:nth-last-child(-n + 4) {
          margin-bottom: 0;
        }
        // 这里的 nth-child(n) 是按照正数第n个来匹配兄弟级元素
        &:nth-child(4n) {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
