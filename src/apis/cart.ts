// 封装购物车相关接口
import request from "@/utils/http";

interface Data {
  skuId: string;
  selected?: boolean;
  count: number;
}

// 加入购物车
export const insertCartAPI = ({ skuId, count }: Data) => {
  return request({
    url: "/member/cart",
    method: "POST",
    data: {
      skuId,
      count,
    },
  });
};

// 获取最新的购物车列表
export const findNewCartListAPI = () => {
  return request({
    url: "/member/cart",
  });
};

export const delCartAPI = (ids: string[]) => {
  return request({
    url: "/member/cart",
    method: "DELETE",
    data: {
      ids,
    },
  });
};

export const mergeCartAPI = ([skuId, selected, count]: Data[]) => {
  return request({
    url: "/member/cart/merge",
    method: "POST",
    data: {
      skuId,
      selected,
      count,
    },
  });
};
