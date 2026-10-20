import { getBannerAPI } from "@/apis/home";

import { onMounted, ref } from "vue";

// 封装 banner 轮播图相关业务
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

function useBanner() {
  const bannerList = ref<Picture[]>([]);

  const getBanner = async () => {
    const res = (await getBannerAPI({ distributionSite: "2" })) as unknown as BannerList;

    bannerList.value = res.result;
  };
  onMounted(() => {
    getBanner();
  });

  return {
    bannerList,
  };
}
export default useBanner;
