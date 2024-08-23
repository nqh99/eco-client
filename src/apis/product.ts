import { SERVER_ALIAS } from "@/constants/app";

import CartItemMdl from "@/models/products/card-item";
import ProductDetailMdl from "@/models/products/product-detail";
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

const getProductsByTradeMark = (data: any) => {
  const url = `${SERVER_ALIAS}/cart/items`;
  // TODO: enhance the data object later [EW-46]
  const ret = safePostRequest<
    {
      id: string;
      name: string;
      avatarUrl: string;
      cartItems: { productId: string }[];
    }[]
  >(url, data);

  return ret;
};

const postUserOrder = (data: {
  orderInfoList: {
    productId: string;
    quantity: number;
    productInventoryId: string;
  }[];
  shippingAddress: string;
  discountCode: string;
  phoneNumber: string;
  email: string;
  customerName: string;
  subTotalPrice: number;
  shippingPrice: number;
  discountPrice: number;
  totalPrice: number;
}) => {
  const url = `${SERVER_ALIAS}/cart/items`;

  const ret = safePostRequest<string>(url, data);

  return ret;
};

export {
  getTopDealProducts,
  getRelativeProductsByCategory,
  getProductDetailsByID,
  getProductsByTradeMark,
  postUserOrder
};
