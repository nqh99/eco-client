import ProductDiscountMdl from "./discount";
import { InventoryMdl } from "./inventory";

type CartItemMdl = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  rating?: number;
  quantitySold?: number;
  inventory: InventoryMdl[];
  discount?: ProductDiscountMdl;
};

export default CartItemMdl;
