import DiscountMdl from "./product/discount-item";

type CartItemMdl = {
  id: string;
  name: string;
  sku: string;
  productCode: string;
  price: number;
  description: string;
  imageUrl: string;
  rating: number;
  quantitySold: number;
  quantityAvailable: number;
  discount: DiscountMdl;
};

export default CartItemMdl;
