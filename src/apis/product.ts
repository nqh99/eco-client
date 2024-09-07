import { SERVER_ALIAS } from "@/constants/app";

import CartItemMdl from "@/models/products/card-item";
import DiscountMdl from "@/models/products/discount";
import ProductDetailMdl from "@/models/products/product-detail";
import { safeDataFetching } from "@/utils/http";

const getTopDealProducts = (needRevalidate: boolean) => {
  return safeDataFetching<CartItemMdl[]>(
    `${SERVER_ALIAS}/products/top-deals?page=0&size=4`,
    needRevalidate
  );
};

const getBestSellingProducts = (needRevalidate: boolean) => {
  return safeDataFetching<CartItemMdl[]>(
    `${SERVER_ALIAS}/products/featured-products?page=0&size=4`,
    needRevalidate
  );
};

const getNewProducts = (needRevalidate: boolean) => {
  return safeDataFetching<CartItemMdl[]>(
    `${SERVER_ALIAS}/products/new-products?page=0&size=4`,
    needRevalidate
  );
};

const getProductDetailsByID = (id: string) => {
  return safeDataFetching<ProductDetailMdl>(
    `${SERVER_ALIAS}/products/id=${id}`
  );
};

const getRelativeProductsByCategory = (categoryID: string) => {
  return safeDataFetching<CartItemMdl[]>(
    `${SERVER_ALIAS}/products/categoryId=${categoryID}`,
    false
  );
};

const getDiscountByProduct = () => {
  return safeDataFetching<DiscountMdl[]>(`${SERVER_ALIAS}/discounts`, false);
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
  getDiscountByProduct,
};
