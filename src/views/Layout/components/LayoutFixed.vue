<script setup>
import { useScroll } from "@vueuse/core";

const { y } = useScroll(window);
</script>

<template>
  <!-- :class="{ show: y>= 78}"这里是动态绑定类,根据 y>= 78 的真假,容器绑定show这个类 -->
  <div class="app-header-sticky" :class="{ show: y >= 78 }">
    <div class="container">
      <RouterLink class="logo" to="/" />
      <!-- 导航区域 -->
      <!-- {{ y }} -->
      <ul class="app-header-nav">
        <li class="home">
          <RouterLink to="/">首页</RouterLink>
        </li>
        <li>
          <RouterLink to="/">居家</RouterLink>
        </li>
        <li>
          <RouterLink to="/">美食</RouterLink>
        </li>
        <li>
          <RouterLink to="/">服饰</RouterLink>
        </li>
        <li>
          <RouterLink to="/">母婴</RouterLink>
        </li>
        <li>
          <RouterLink to="/">个护</RouterLink>
        </li>
        <li>
          <RouterLink to="/">严选</RouterLink>
        </li>
        <li>
          <RouterLink to="/">数码</RouterLink>
        </li>
        <li>
          <RouterLink to="/">运动</RouterLink>
        </li>
        <li>
          <RouterLink to="/">杂项</RouterLink>
        </li>
      </ul>

      <div class="right">
        <RouterLink to="/">品牌</RouterLink>
        <RouterLink to="/">专题</RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.app-header-sticky {
  width: 100%;
  height: 80px;
  position: fixed;
  // fixed：始终相对于浏览器视口固定，完全脱离文档流，元素从布局中“抽走”。
  // sticky：先按正常流排列，滚动到设定的阈值后“粘”住，不脱离文档流，且只在其父容器范围内生效。
  left: 0;
  top: 0;
  z-index: 999;
  background-color: #fff;
  border-bottom: 1px solid #e4e4e4;
  // 此处为关键样式!!!
  // 状态一：往上平移自身高度 + 完全透明
  transform: translateY(-100%);
  opacity: 0;

  .app-header-nav {
    width: 820px;
    display: flex; // 这里的 display: flex; 默认 flex-direction: row; 主轴是水平方向, 子元素不再单独占一行,而是沿主轴依次排列
    padding-left: 40px;
    position: relative;
    z-index: 998; // 这里的 z-index 用于设置元素的堆叠顺序(层级),值越大,在Z轴越靠上,越容易盖住其他元素

    li {
      margin-right: 40px;
      width: 38px;
      text-align: center;
      // display: inline-block; // 这里和父元素里添加 display: flex;效果相同

      a {
        font-size: 16px;
        line-height: 32px;
        height: 32px;

        &:hover {
          color: $xtxColor;
          border-bottom: 1px solid $xtxColor;
        }
      }
    }
  }
  // 状态二：移除平移 + 完全不透明
  &.show {
    transition: all 0.3s linear;
    transform: none;
    opacity: 1;
  }

  .container {
    display: flex;
    align-items: center;
  }

  .logo {
    width: 200px;
    height: 80px;
    // 设置背景图片: 图片路径 不重复平铺 水平靠右 垂直距离顶部 2px
    background: url("@/assets/images/logo.png") no-repeat 2px;
    background-size: 160px auto;
  }

  .right {
    width: 220px;
    display: row;
    text-align: center;
    padding-left: 40px;
    border-left: 2px solid $xtxColor;

    a {
      width: 38px;
      margin-right: 40px;
      font-size: 16px;
      line-height: 1;

      &:hover {
        color: $xtxColor;
      }

      .active {
        color: $xtxColor;
        border-bottom: 1px solid $xtxColor;
      }
    }
  }
}
</style>
