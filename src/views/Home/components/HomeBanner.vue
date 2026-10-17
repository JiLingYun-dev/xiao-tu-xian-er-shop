<script setup lang="ts">
import { ref, onMounted } from "vue";

import { getBannerAPI } from "@/apis/home";

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
  const res = (await getBannerAPI()) as unknown as BannerList;

  bannerList.value = res.result;
  // console.log(res);
};

onMounted(() => {
  getBanner();
});
</script>

<template>
  <div class="home-banner">
    <el-carousel height="500px">
      <el-carousel-item v-for="item in bannerList" :key="item.id">
        <img :src="item.imgUrl" alt="testing" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<style scoped lang="scss">
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;

  img {
    width: 100%;
    height: 500px;
  }
}
</style>
