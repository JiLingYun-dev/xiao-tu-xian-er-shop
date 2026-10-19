<script setup lang="ts">
// 通过 useRoute 获取路由参数
import { useRoute } from "vue-router";

import { onMounted, ref } from "vue";
import { getCategoryAPI } from "@/apis/category";
import { getBannerAPI } from "@/apis/home";

const route = useRoute();

interface Result {
  id: string;
  name: string;
  picture: string;
  children: Children[];
}

interface Children {
  id: string;
  name: string;
  picture: string;
  parentId: null;
  parentName: null;
  categories: null;
  brands: null;
  saleProperties: null;
  goods: Goods[];
}

interface Goods {
  id: string;
  name: string;
  desc: string;
  price: string;
  orderNum: number;
}

interface Res {
  code: string;
  msg: string;
  result: Result;
}

const categoryData = ref<Result>({} as Result);
const getCategoryData = async () => {
  // 注意区分 query 传参和 params 传参
  const res = (await getCategoryAPI(route.params.id)) as unknown as Res;
  // console.log(res);
  categoryData.value = res.result;
};

interface Picture {
  id: number;
  imgUrl: string;
  hrefUrl: string;
}
interface BannerList {
  code: number;
  msg: string;
  result: Picture[];
}

const bannerList = ref<Picture[]>([]);

const getBanner = async () => {
  const res = (await getBannerAPI({ distributionSite: "2" })) as unknown as BannerList;

  bannerList.value = res.result;
};

onMounted(() => {
  // console.log(route.params.id);
  getCategoryData();
  getBanner();
});
</script>

<template>
  <div class="top-category">
    <div class="container m-top-20">
      <!-- 面包屑 -->
      <div class="bread-container">
        <!-- 提供面包屑导航分隔符 -->
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ categoryData.name }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 轮播图 -->
      <div class="home-banner">
        <el-carousel height="500px">
          <el-carousel-item v-for="item in bannerList" :key="item.id">
            <img :src="item.imgUrl" alt="testing" />
          </el-carousel-item>
        </el-carousel>
      </div>
      <!-- <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="i in 6" :key="i">
            <RouterLink to="/">
              <img src="i" />
              <p>name</p>
            </RouterLink>
          </li>
        </ul>
      </div> -->
      <!-- <div class="ref-goods" v-for="item in 7" :key="item">
        <div class="head">
          <h3>- name-</h3>
        </div>
        <div class="body">
          <GoodsItem v-for="good in item" :goods="good" :key="good" />
        </div>
      </div> -->
    </div>
  </div>
</template>

<style scoped lang="scss">
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }

  .sub-list {
    margin-top: 20px;
    background-color: #fff;

    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;

      li {
        width: 168px;
        height: 160px;

        a {
          text-align: center;
          display: block;
          font-size: 16px;

          img {
            width: 100px;
            height: 100px;
          }

          p {
            line-height: 40px;
          }

          &:hover {
            color: $xtxColor;
          }
        }
      }
    }
  }

  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;

    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }

      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }

    .body {
      display: flex;
      justify-content: space-around;
      padding: 0 40px 30px;
    }
  }

  .bread-container {
    padding: 25px 0;
  }
}

.home-banner {
  width: 1240px;
  height: 500px;
  margin: 0 auto;

  img {
    width: 100%;
    height: 500px;
  }
}
</style>
