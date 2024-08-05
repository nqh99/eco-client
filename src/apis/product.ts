import CartItemMdl from "@/models/products/card-item";
import ProductDetailMdl from "@/models/products/product-detail";
import { safeDataFetching } from "@/utils/http";

const getTopDealProducts = (needRevalidate: boolean) => {
  const url =
    "http://localhost:9991/ehb-api/api/v1/products/top-deals?page=0&size=4";
  const ret = safeDataFetching<CartItemMdl[]>(url, needRevalidate);

  return ret;
};

const getBestSellingProducts = () => {
  const url =
    "http://localhost:9991/ehb-api/api/v1/products/top-deals?page=0&size=4";
  const ret = safeDataFetching<CartItemMdl[]>(url, true);

  return ret;
};

const getProductDetailsByID = (id: string) => {
  const url = `http://localhost:9991/ehb-api/api/v1/products/id=${id}`;
  const ret = safeDataFetching<ProductDetailMdl>(url);

  return ret;
};

const getRelativeProductsByCategory = (categoryID: string) => {
  const url = `http://localhost:9991/ehb-api/api/v1/products/categoryId=${categoryID}`;
  const ret = safeDataFetching<CartItemMdl[]>(url, false);

  return ret;
};

export {
  getTopDealProducts,
  getRelativeProductsByCategory,
  getProductDetailsByID,
};
