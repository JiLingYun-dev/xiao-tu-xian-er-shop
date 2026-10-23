// 封装所有和用户有关的接口函数

import request from "@/utils/http";

export const loginAPI = ({ account, password }: { account: string; password: string }) => {
  return request({
    url: "/login",
    method: "POST",
    data: {
      account,
      password,
    },
  });
};
