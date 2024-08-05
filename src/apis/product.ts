import { SERVER_ALIAS } from "@/constants/app";

import CartItemMdl from "@/models/products/card-item";
import ProductDetailMdl from "@/models/products/product-detail";
import { safeDataFetching } from "@/utils/http";

const getTopDealProducts = (needRevalidate: boolean) => {
  const url = `${SERVER_ALIAS}/products/top-deals?page=0&size=4`;
  const ret = safeDataFetching<CartItemMdl[]>(url, needRevalidate);

  return ret;
};

const getBestSellingProducts = () => {
  const url = `${SERVER_ALIAS}/products/top-deals?page=0&size=4`;
  const ret = safeDataFetching<CartItemMdl[]>(url, true);

  return ret;
};

const getProductDetailsByID = (id: string) => {
  const url = `${SERVER_ALIAS}/products/id=${id}`;
  const ret = safeDataFetching<ProductDetailMdl>(url);

  return ret;
};

const getRelativeProductsByCategory = (categoryID: string) => {
  const url = `${SERVER_ALIAS}/products/categoryId=${categoryID}`;
  const ret = safeDataFetching<CartItemMdl[]>(url, false);

  return ret;
};

export {
  getTopDealProducts,
  getRelativeProductsByCategory,
  getProductDetailsByID,
};
