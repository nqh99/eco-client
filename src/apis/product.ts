import CartItemMdl from "@/models/products/card-item";
import { safeDataFetching } from "@/utils/http";

const getTopDealProducts = async () => {
  const url =
    "http://localhost:9991/ehb-api/api/v1/products/top-deals?page=0&size=4";
  const ret = await safeDataFetching<CartItemMdl>(url);

  return ret.data;
};

const getBestSellingProducts = async () => {
  const url =
    "http://localhost:9991/ehb-api/api/v1/products/top-deals?page=0&size=4";
  const ret = await safeDataFetching<CartItemMdl>(url);
  return ret.data;
};

const getProductDetails = async (id: string) => {
  const url = `http://localhost:9991/ehb-api/api/v1/products/${id}`;

  // const ret = await safeDataFetching<>
}

export { getTopDealProducts };
