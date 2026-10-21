import request from "@/utils/http";

const getDetailAPI = (id: string | string[] | undefined) => {
  return request({
    url: "/goods",
    params: {
      id,
    },
  });
};

export default getDetailAPI;
