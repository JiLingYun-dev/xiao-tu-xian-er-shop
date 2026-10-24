import type { PiniaPluginContext } from "pinia";

export const persistPlugin = ({ store }: PiniaPluginContext) => {
  const key = `pinia:${store.$id}`;

  const raw = localStorage.getItem(key);

  // 清理脏数据
  if (raw) {
    try {
      store.$patch(JSON.parse(raw));
    } catch (e) {
      console.warn(`[persist] 恢复 ${store.$id} 失败`, e);
    }
  }

  const unsubscribe = store.$subscribe(
    // _m 的 _ 前缀是"我故意不用这个参数"的通用标记，避免 ESLint 报"未使用变量"。
    (_m, state) => {
      localStorage.setItem(key, JSON.stringify(state));
    },
    // 这里的持久化会脱离生命周期
    { detached: true },
  );
};
