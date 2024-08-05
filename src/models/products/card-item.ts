import ProductDiscountMdl from "./discount";

type CartItemMdl = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  rating: number;
  quantitySold: number;
  quantityAvailable: number;
  discount: ProductDiscountMdl;
};

export default CartItemMdl;
