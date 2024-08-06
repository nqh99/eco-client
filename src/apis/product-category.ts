import { SERVER_ALIAS } from "@/constants/app";

import { ProductCategoryMdl } from "@/models/products/category";
import { safeDataFetching } from "@/utils/http";

const getProductCategories = async () => {
  const url = `${SERVER_ALIAS}/categories`;
  const ret = await safeDataFetching<ProductCategoryMdl[]>(url, false);

  return ret;
};

const getTopSellingProductCategories = async () => {
  const url = `${SERVER_ALIAS}/categories`;
  const ret = await safeDataFetching<ProductCategoryMdl[]>(url, true);

  return ret;
};

export { getProductCategories, getTopSellingProductCategories };
