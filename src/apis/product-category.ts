import { ProductCategoryMdl } from "@/models/products/category";
import { safeDataFetching } from "@/utils/http";

const getProductCategories = async () => {
  const url = "http://localhost:9991/ehb-api/api/v1/categories";
  const ret = await safeDataFetching<ProductCategoryMdl>(url, false);
  return ret;
};

const getTopSellingProductCategories = async () => {
  const url = "http://localhost:9991/ehb-api/api/v1/categoriess";
  const ret = await safeDataFetching<ProductCategoryMdl>(url, true);
  return ret;
};

export { getProductCategories, getTopSellingProductCategories };
