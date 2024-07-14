import { ProductCategoryMdl } from "@/models/product-category";
import ResponseMdl from "@/models/response";
import { safeJsonParse } from "@/utils/core";

const getProductCategories = async () => {
  const res = await fetch("http://localhost:9991/ehb-api/api/v1/categories");

  const data = safeJsonParse<ResponseMdl<ProductCategoryMdl>>(
    await res.text()
  ) || { data: [], httpStatus: "404", message: "" };

  return data.data;
};

export { getProductCategories };
