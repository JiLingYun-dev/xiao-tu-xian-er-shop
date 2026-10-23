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

  store.$subscribe(
    (_m, state) => {
      localStorage.setItem(key, JSON.stringify(state));
    },
    { detached: true },
  );
};
