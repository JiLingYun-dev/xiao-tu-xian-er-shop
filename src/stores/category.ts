import { defineStore } from "pinia";
import { ref } from "vue";
import { getCategoryAPI } from "@/apis/Layout.ts";

interface CategoryItem {
  id: string;
  name: string;
  picture: string;
  children: CategoryItem[];
  goods: any[] | null;
}

const useCategoryStore = defineStore("categoryStore", () => {
  const categoryList = ref<CategoryItem[]>([]);

  const getCategory = async () => {
    const res = (await getCategoryAPI()) as unknown as {
      code: string;
      msg: string;
      result: CategoryItem[];
    };

    categoryList.value = res.result;
  };

  return {
    categoryList,
    getCategory,
  };
});

export default useCategoryStore;
