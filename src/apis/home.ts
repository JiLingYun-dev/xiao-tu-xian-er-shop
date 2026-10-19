import httpInstance from "@/utils/http";

// 封装获取banner

// 注意这里的 类型注解和默认参数
export function getBannerAPI(params: { distributionSite?: string } = {}) {
  // 只有当 解构出来的值是 undefined 时，才会采用默认值
  const { distributionSite = "1" } = params;

  return httpInstance({
    url: "/home/banner",
    params: {
      distributionSite,
    },
  });

  // if (params === undefined) {
  //   const distributionSite = "1";
  //   return httpInstance({
  //     url: "/home/banner",
  //     params: {
  //       distributionSite
  //     },
  //   });
  // } else {
  //   return httpInstance({
  //     url: "/home/banner",
  //     params: {
  //       distributionSite,
  //     },
  //   });
  // }
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
