import { ProductCategoryMdl } from "@/models/product-category";
import { safeDataFetching } from "@/utils/http";

const getProductCategories = async () => {
  const url = "http://localhost:9991/ehb-api/api/v1/categories";
  const ret = await safeDataFetching<ProductCategoryMdl>(url);
  return ret.data;
};

const getTopSellingProductCategories = async () => {
  const url = "http://localhost:9991/ehb-api/api/v1/categoriess";
  const ret = await safeDataFetching<ProductCategoryMdl>(url);
  return ret.data;
};

export { getProductCategories, getTopSellingProductCategories };
