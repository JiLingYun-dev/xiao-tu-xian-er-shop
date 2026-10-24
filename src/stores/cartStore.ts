import { defineStore } from "pinia";
import { ref, watch, computed } from "vue";
import { useUserStore } from "./userStore";
import { insertCartAPI, findNewCartListAPI, delCartAPI } from "@/apis/cart";

interface Res {
  msg: string;
  code: string;
  result: Item[];
}

interface Item {
  id: string;
  name: string;
  picture: string;
  price: number;
  count: number;
  skuId: string;
  attrsText: string;
  selected: boolean;
}

export const useCartStore = defineStore("cartStore", () => {
  const key = "cartStore:cartStore";
  // 这里localStorage通过pinia库的id绑定pinia库,创建单独的localStorage条目,同时如果localStorage里面存过序列化数据的话,会返回序列化数据;如果没有数据的话,会返回null
  const raw = localStorage.getItem(key);

  let initList: Item[] = [];

  if (raw) {
    try {
      // 将存进去的数据进行反序列化
      initList = JSON.parse(raw);
    } catch (e) {
      console.warn(`[persist] 恢复 cartStore 失败`, e);
    }
  }

  // 1.定义state - cartList
  const cartList = ref<Item[]>(initList);
  // 2.定义action - addCart
  const userStore = useUserStore();
  // 判断是否登陆
  const isLogin = computed(() => userStore.userInfo.token);

  const updateCartList = async () => {
    // 获取最新的购物车列表
    const res = (await findNewCartListAPI()) as unknown as Res;
    // 覆盖本地购物车列表
    cartList.value = res.result;
  };
  // 添加购物车
  const addCart = async (goods: Item) => {
    if (isLogin.value) {
      // 登陆之后的购物车逻辑
      const { skuId, count } = goods;
      // 加入购物车接口调用
      await insertCartAPI({ skuId, count });
      // 获取最新购物车列表
      updateCartList();
    } else {
      // 走本地逻辑
      const item: Item | undefined = cartList.value.find(
        (item: Item) => goods.skuId === item.skuId,
      );
      if (item) {
        // 找到了
        (item as Item).count++;
      } else {
        // 没找到
        cartList.value.push(goods);
      }
    }
  };

  // 添加购物车操作
  // 已添加过 - count + 1
  // 没有添加过,直接 push
  // 思路: 通过匹配传递过来的商品对象中的skuId能不能再cartList中找到,找到了就是添加过了

  try {
    watch(
      cartList,
      (val) => {
        localStorage.setItem(key, JSON.stringify(val));
      },
      { deep: true },
    );
  } catch (e) {
    console.warn("[persist] 保存 cartStore 失败", e);
  }

  const delCart = async (skuId: string) => {
    // const item = cartList.value.find((item) => goods.skuId === item.skuId); // find 找不到会返回undefined
    // const item = cartList.value.filter((delItem) => delItem.id === item.skuId); // filter 找不到会返回空数组
    if (isLogin.value) {
      // 调用接口实现删除功能
      await delCartAPI([skuId]);
      // 获取最新购物车列表
      updateCartList();
    } else {
      const index = cartList.value.findIndex((item) => item.skuId === skuId);
      if (index >= 0) {
        cartList.value.splice(index, 1);
      }
    }
  };

  const clearCart = () => {
    cartList.value = [];
  };

  // 计算属性
  // 1.总的数量 所有的count之和
  const allCount = computed(() => {
    return cartList.value.reduce((a, c) => {
      return a + c.count;
    }, 0);
  });
  // 2.总价, 所有项的 count*price 之和
  const allPrice = computed(() => {
    return cartList.value.reduce((a, c) => {
      return a + c.count * c.price;
    }, 0);
  });

  // 实现单选框和选定商品的selected的状态一致
  const singleCheck = (skuId: string, selected: boolean) => {
    // filter返回的是新数组,而find 返回的是元素的引用
    const selectedItem: Item | undefined = cartList.value.find((item: Item) => {
      return item.skuId === skuId;
    });
    if (selectedItem) {
      selectedItem.selected = selected;
    }
  };

  const allCheck = (selected: boolean) => {
    cartList.value.forEach((item) => {
      item.selected = selected;
    });
  };
  const isAll = computed(() => {
    return cartList.value.every((item) => item.selected);
  });

  const selectedCount = computed(() => {
    // filter走的是回调的返回值的判断,如果被判断的本身就是布尔值,则会直接对被判断的本身进行返回
    return cartList.value
      .filter((item: Item) => item.selected)
      .reduce((a, c: Item) => {
        return a + c.count;
      }, 0);
  });

  const selectedPrice = computed(() => {
    return cartList.value
      .filter((item: Item) => {
        return item.selected;
      })
      .reduce((a: number, c: Item) => {
        return a + c.count * c.price;
      }, 0);
  });
  return {
    cartList,
    addCart,
    delCart,
    allCount,
    allPrice,
    singleCheck,
    isAll,
    allCheck,
    selectedCount,
    selectedPrice,
    clearCart,
    updateCartList,
  };
});
