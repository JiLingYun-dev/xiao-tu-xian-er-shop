import { getCategoryAPI } from "@/apis/category";
import { onMounted, ref } from "vue";
import { useRoute, onBeforeRouteUpdate } from "vue-router";

interface Result {
  id: string;
  name: string;
  picture: string;
  children: Children[];
}

interface Children {
  id: string;
  name: string;
  picture: string;
  parentId: null;
  parentName: null;
  categories: null;
  brands: null;
  saleProperties: null;
  goods: Goods[];
}

interface Goods {
  id: string;
  name: string;
  desc: string;
  price: string;
  orderNum: number;
}

interface Res {
  code: string;
  msg: string;
  result: Result;
}

function useCategory() {
  const route = useRoute();

  const categoryData = ref<Result>({} as Result);
  const getCategoryData = async (id: string | string[] | undefined = route.params.id) => {
    // 注意区分 query 传参和 params 传参
    // 这里的 route.params.id 具有滞后性
    const res = (await getCategoryAPI(id)) as unknown as Res;
    // console.log(res);
    categoryData.value = res.result;
  };

  // 路由前置守卫解决组件复用（缓存问题）
  // 这里的 to 实参用来解决 route.params.id 的滞后性
  onBeforeRouteUpdate((to) => {
    getCategoryData(to.params.id);
  });

  onMounted(() => {
    // console.log(route.params.id);
    getCategoryData();
  });

  return {
    categoryData,
  };
}

export default useCategory;
