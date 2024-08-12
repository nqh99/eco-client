import { SERVER_ALIAS } from "@/constants/app";

import CartItemMdl from "@/models/products/card-item";
import ProductDetailMdl from "@/models/products/product-detail";
import { TradeMarkMld } from "@/models/users/trademark";
import { safeDataFetching, safePostRequest } from "@/utils/http";

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

const getProductsByTradeMark = (body: FormData) => {
  const url = `http://localhost:9991/ehb-api/api/v1/cart/items`;
  const ret = safePostRequest<{
    tradeMark: TradeMarkMld;
    products: CartItemMdl[];
  }>(url, body);

  return ret;
};

export {
  getTopDealProducts,
  getRelativeProductsByCategory,
  getProductDetailsByID,
  getProductsByTradeMark,
};
