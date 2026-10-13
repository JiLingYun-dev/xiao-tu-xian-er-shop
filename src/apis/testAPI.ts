import http from "@/utils/http";

// 返回Promise对象
export function getCategory() {
  return http({
    //这里不要写完整 URL，如果写成 url: "http://xxx.com/home/category/head"，baseURL 会被忽略，代理也不会生效，还可能跨域
    url: "home/category/head", // 这里的 url 负责将 axios 实例的 baseURL 与这里的 url 拼接起来，这样写可以配合代理解决跨域问题
  });
}
