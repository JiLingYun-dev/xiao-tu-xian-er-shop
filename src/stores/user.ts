// Pinia实现用户相关数据的统一管理
import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { loginAPI } from "@/apis/user";

// 约定写法,为每一个pinia库分配ID,防止ID相同导致的数据共享
const STORAGE_KEY = "userStore:userInfo";

export const useUserStore = defineStore("userStore", () => {
  const raw = localStorage.getItem("STORAGE_KEY ");

  // 这里的空对象不会被当作undefined处理
  let initValue = {};

  if (raw) {
    try {
      initValue = JSON.parse(raw);
    } catch (e) {
      console.warn("[persist] 恢复 userInfo 失败", e);
    }
  }

  // 定义管理用户数据的state
  // 这里不用 reactive 是因为写 ref 可以省下类型判断（我懒）
  const userInfo = ref<any>(initValue);
  // 定义接口数据的action函数

  const getUserInfo = async (account: string, password: string) => {
    const res = (await loginAPI({ account, password })) as any;

    userInfo.value = res.result;
  };

  // 实现登出清除本地存储的功能
  const clearUserInfo = () => {
    userInfo.value = {};
    localStorage.removeItem(STORAGE_KEY);
  };

  // watch 深度监视属性实现localStorage存储
  watch(
    userInfo,
    // 这里的val是变化后的值
    (val) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(val));
    },
    // 开启深度监视
    { deep: true },
  );

  // 以对象的形式把state和action return
  return {
    userInfo,
    getUserInfo,
    clearUserInfo,
  };
});
