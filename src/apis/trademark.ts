import { SERVER_ALIAS } from "@/constants/app";
import ProductDiscountMdl from "@/models/products/discount";
import { safeDataFetching } from "@/utils/http";

// TODO: enhance later with [EW-101]
const getDiscountVoucherByUserID = () => {
  const url = `${SERVER_ALIAS}/discounts`;

  const ret = safeDataFetching<ProductDiscountMdl>(url);

  return ret;
};

export { getDiscountVoucherByUserID };
