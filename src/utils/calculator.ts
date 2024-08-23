import { ICartPayload } from "@/lib/types";

class OrderCalculator {
  private readonly cartItems: ICartPayload[];

  constructor(cartItems: ICartPayload[] = []) {
    this.cartItems = cartItems;
  }

  computeTemporaryPrice(): number {
    let ret = 0;

    this.cartItems.forEach((val, index) => {
      ret += val.itemMdl.price * val.quantity;
    });

    return ret;
  }

  computeDiscountPrice(): number {
    let ret = 0;

    this.cartItems.forEach((val, index) => {
      ret +=
        val.itemMdl.price *
        ((val.itemMdl.discount?.discountPercent || 100) / 100) *
        val.quantity;
    });

    return ret;
  }

  computePromotionalPrice(): number {
    let ret = 0;

    this.cartItems.forEach((val, index) => {
      ret +=
        (val.itemMdl.discount?.discountPrice || val.itemMdl.price) *
        val.quantity;
    });

    return ret;
  }
}

export default OrderCalculator;
