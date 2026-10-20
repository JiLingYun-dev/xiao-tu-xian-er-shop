<script setup lang="ts">
import { getCategoryFilterAPI, getSubCategoryAPI } from "@/apis/category.ts";
import GoodsItem from "../Home/components/GoodsItem.vue";

import { ref, onMounted } from "vue";

import { useRoute } from "vue-router";

interface Array {
  length: number;
}

interface categoriesGoods {
  id: string;
  layer: number;
  name: string;
  parent: null;
}

interface goodsGoods {
  id: string;
  name: string;
  desc: string;
  orderNum: number;
  picture: string;
  price: string;
}

interface Result {
  brands: Array[];
  categories: categoriesGoods[];
  goods: goodsGoods[];
  id: string;
  name: string;
  parentId: string;
  parentName: string;
  picture: null;
  saleProperties: Array[];
}

interface Res {
  code: string;
  msg: string;
  result: Result;
}

const route = useRoute();
const categoryData = ref<Result>({} as Result);

const getCategoryData = async () => {
  const res = (await getCategoryFilterAPI(route.params.id)) as unknown as Res;
  // console.log(res);
  categoryData.value = res.result;
};

onMounted(() => {
  getCategoryData();
});

// 获得基础列表数据渲染
const goodsList = ref<goodsGoods[]>([]);

const reqData = ref({
  categoryId: route.params.id,
  page: 1,
  pageSize: 20,
  sortField: "publishTime",
});
const getGoodsList = async () => {
  const res = (await getSubCategoryAPI(reqData.value)) as any;

  goodsList.value = res.result.items;
  // console.log(res);
};
onMounted(() => {
  getGoodsList();
});

// tab 切换回调
const tabChange = () => {
  // console.log("tab切换", reqData.value.sortField);
  reqData.value.page = 1;
  getGoodsList();
};

interface Items {
  desc: string;
  id: string;
  name: string;
  orderNum: number;
  picture: string;
  price: string;
}

interface Resul {
  counts: string;
  items: Items[];
  page: number;
  pageSize: number;
  pages: number;
}

interface Obj {
  msg: string;
  code: string;
  result: Resul;
}

const load = async () => {
  console.log("loading");
  reqData.value.page++;
  const res = (await getSubCategoryAPI(reqData.value)) as unknown as Obj;
  console.log(res);
  // 展开运算符实现数据拼接
  goodsList.value = [...goodsList.value, ...res.result.items];
  if (res.result.items.length === 0) {
    disabled.value = true;
  }
};

const disabled = ref(false);
</script>

<template>
  <div class="container">
    <!-- 面包屑 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/category/${categoryData.parentId}` }">{{
          categoryData.parentName
        }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ categoryData.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <el-tabs v-model="reqData.sortField" @tab-change="tabChange">
        <!-- 这里的 el-tab-pane 标签切换后会自动将 name 里的值传到 reqData,value.sortField 里面 -->
        <el-tab-pane label="最新商品" name="publishTime">最新商品</el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum">最高人气</el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum">评论最多</el-tab-pane>
      </el-tabs>
      <div class="body" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
        <!-- 商品列表-->
        <GoodsItem v-for="goods in goodsList" :goods="goods" :key="goods.id" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }

  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

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

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
}
</style>
