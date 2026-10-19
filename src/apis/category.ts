// 默认倒入名字随便起，默认导出没有名字
import request from "@/utils/http";

export function getCategoryAPI(id: undefined | string | string[]) {
  return request({
    url: "/category",
    // 这里的 params 是查询参数，axios 会把他拼到 URL 的 ？ 后面
    // ？是查询参数的起始标记， ？之前是路径，？ 之后是查询字符串，表示“你要对这个资源附加什么条件”
    // 查询参数（查询字符串）的核心作用是：在不改变路径的前提下，向服务器传递筛选、分页、排序等条件
    // & 用来分隔多个参数，每个参数是 键=值
    // 注意区分 params 和 query 两者的不同
    params: {
      id,
    },
  });
}
