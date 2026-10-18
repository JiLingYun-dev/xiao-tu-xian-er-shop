import httpInstance from "@/utils/http";

// 封装获取banner

export function getBannerAPI() {
  return httpInstance({
    url: "/home/banner",
  });
}

/**
 * @description: 获取新鲜好物
 * @param {*}
 * @returns {*}
 *
 */
export const findNewAPI = () => {
  return httpInstance({
    url: "/home/new",
  });
};

export const findHotAPI = () => {
  return httpInstance({
    url: "/home/hot",
  });
};

export const getGoodsAPI = () => {
  return httpInstance({
    url: "/home/goods",
  });
};
