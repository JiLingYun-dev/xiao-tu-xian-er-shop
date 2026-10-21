import request from "@/utils/http";

export const getDetailAPI = (id: string | string[] | undefined) => {
  return request({
    url: "/goods",
    params: {
      id,
    },
  });
};

interface Params {
  id: string | string[] | undefined;
  type: number | undefined;
  limit?: number | undefined;
}

export const getHotGoodsAPI = ({ id, type, limit = 3 }: Params) => {
  return request({
    url: "/goods/hot",
    params: {
      id,
      type,
      limit,
    },
  });
};
