import { SERVER_ALIAS } from "@/constants/app";
import { safePostRequest } from "@/utils/http";

const getShippingPriceByAddress = (data: { shippingAddress: string }) => {
  return safePostRequest<number, Record<string, string>>(
    `${SERVER_ALIAS}/orders/calculate-discount`,
    data
  );
};

export { getShippingPriceByAddress };
