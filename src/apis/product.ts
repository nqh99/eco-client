import { SERVER_ALIAS } from "@/constants/app";

import CartItemMdl from "@/models/products/card-item";
import ProductDetailMdl from "@/models/products/product-detail";
import { safeDataFetching, safePostRequest } from "@/utils/http";

const getTopDealProducts = (needRevalidate: boolean) => {
  const url = `${SERVER_ALIAS}/products/top-deals?page=0&size=4`;

  const ret = safeDataFetching<CartItemMdl[]>(url, needRevalidate);

  return ret;
};

const getBestSellingProducts = (needRevalidate: boolean) => {
  const url = `${SERVER_ALIAS}/products/featured-products?page=0&size=4`;

  const ret = safeDataFetching<CartItemMdl[]>(url, needRevalidate);

  return ret;
};

const getNewProducts = (needRevalidate: boolean) => {
  const url = `${SERVER_ALIAS}/products/new-products?page=0&size=4`;

  const ret = safeDataFetching<CartItemMdl[]>(url, needRevalidate);

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

const getProductsByTradeMark = (data: {
  cartInfoList: {
    productId: string;
    productInventoryId: string;
  }[];
}) => {
  const url = `${SERVER_ALIAS}/cart/items/non-registered/list`;
  // TODO: enhance the data object later [EW-46]
  const ret = safePostRequest<
    {
      id: string;
      name: string;
      avatarUrl: string;
      cartItems: CartItemMdl[];
    }[],
    {
      cartInfoList: {
        productId: string;
        productInventoryId: string;
      }[];
    }
  >(url, data);

  return ret;
};

// TODO: enhance later
// const postUserOrder = (data: {
//   orderInfoList: {
//     productId: string;
//     quantity: number;
//     productInventoryId: string;
//   }[];
//   shippingAddress: string;
//   discountCode: string;
//   phoneNumber: string;
//   email: string;
//   customerName: string;
//   subTotalPrice: number;
//   shippingPrice: number;
//   discountPrice: number;
//   totalPrice: number;
// }) => {
//   const url = `${SERVER_ALIAS}/orders`;

//   const ret = safePostRequest<string>(url, data);

//   return ret;
// };

export {
  getTopDealProducts,
  getBestSellingProducts,
  getNewProducts,
  getRelativeProductsByCategory,
  getProductDetailsByID,
  getProductsByTradeMark,
};
