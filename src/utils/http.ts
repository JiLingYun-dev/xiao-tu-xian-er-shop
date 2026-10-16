import axios from "axios";

// 创建 axios 实例，统一管理接口请求的公共配置
// 在 JS 中，函数是一种特殊的对象，所以可以挂载方法，这里的http本质上是一个函数（特殊的对象）
// axios.create() 方法可以执行多次，每次执行都会生成一个新的实例（用来解决不同业务模块需要的接口基地址不同）
const httpInstance = axios.create({
  baseURL: "/api",
  timeout: 5000,
});

// axios 请求拦截器

// httpInstance.interceptors.request 表示这是对请求进行拦截; .use(onFulfilled, onRejected) 表示注册两个回调函数
httpInstance.interceptors.request.use(
  (config) => {
    return config; // 请求成功发出前执行，接收请求配置 config，必须返回 config（或修改后的 config），否则请求不会执行
  },
  (e) => Promise.reject(e),
);

// axios 响应式拦截器
// httpInstance.interceptor.response 表示拦截的是响应，即服务器返回结果之后、业务代码拿到之前
// .use(onFulfilled, onRejected) 表示注册两个回调函数：
// 1.onFulfilled：请求成功（HTTP 状态码 2xx）时执行，接收对象是 res
// 2.onRejected：请求失败（网络错误、超时、HTTP 状态码非 2xx）时执行，接收错误对象

// 注：res 是 axios 的完整响应式对象，包含：
// res.data：服务器返回的响应体
// res.status：HTTP状态码
// res.headers：响应头
// res.config：请求配置
httpInstance.interceptors.response.use(
  (res) => res.data,
  (e) => {
    return Promise.reject(e);
  },
);
// 导出 axios 实例
export default httpInstance;
