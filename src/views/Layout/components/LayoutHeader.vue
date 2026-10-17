<script setup lang="ts">
import { storeToRefs } from "pinia";

import useCategoryStore from "@/stores/category";

const categoryStore = useCategoryStore();

const { categoryList } = storeToRefs(categoryStore);
console.log(categoryList);
</script>

<template>
  <header class="app-header">
    <div class="container">
      <h1 class="logo">
        <RouterLink to="/">小兔鲜</RouterLink>
      </h1>
      <ul class="app-header-nav">
        <li>
          <RouterLink to="/">首页</RouterLink>
        </li>
        <li class="home" v-for="item in categoryList" :key="item.id">
          <RouterLink to="/">{{ item.name }}</RouterLink>
        </li>
      </ul>
      <div class="search">
        <i class="iconfont icon-search"></i>
        <input type="text" placeholder="搜一搜" />
      </div>
      <!-- 头部购物车 -->
    </div>
  </header>
</template>

<style scoped lang="scss">
.app-header {
  background: #fff;

  .container {
    display: flex;
    align-items: center;
  }

  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;

    li {
      a {
        padding: 0 20px;
        // color: #cdcdcd;
        line-height: 1;
        font-size: 16px;
        // 父容器的display: flex会覆盖子容器的display: inline-block;
        // display: inline-block;

        i {
          font-size: 14px;
          margin-right: 2px;
        }

        &:hover {
          color: $xtxColor;
          border-bottom: 2px solid #6cdb7b;
          box-shadow: 0 0 10px;
        }
      }

      &:li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }

  .logo {
    width: 200px;

    a {
      display: block;
      height: 132px;
      width: 100%;
      text-indent: -9999px;
      background: url("@/assets/images/logo.png") no-repeat center 18px / contain;
    }
  }

  .search {
    width: 170px;
    height: 32px;
    position: relative;
    border-bottom: 1px solid #e7e7e7;
    line-height: 32px;
    // margin-left: auto;会自动吃掉该组件父容器左侧所有的剩余空间,该组件推向右侧,从而实现右对齐
    // 默认情况下: justify-content: flex-start 会让所有子元素靠左，剩余空间全部留在最右边。
    margin-left: auto;

    .icon-search {
      font-size: 18px;
      margin-left: 5px;
    }

    input {
      width: 140px;
      padding-left: 5px;
      color: #666;
    }
  }

  .cart {
    width: 50px;

    .curr {
      height: 32px;
      line-height: 32px;
      text-align: center;
      position: relative;
      display: block;

      .icon-cart {
        font-size: 22px;
      }

      em {
        font-style: normal;
        position: absolute;
        right: 0;
        top: 0;
        padding: 1px 6px;
        line-height: 1;
        background: $helpColor;
        color: #fff;
        font-size: 12px;
        border-radius: 10px;
        font-family: Arial;
      }
    }
  }
}
</style>
