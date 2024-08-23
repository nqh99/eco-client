import ProductDiscountMdl from "./discount";
import { InventoryMdl } from "./inventory";
import { ProductCategoryMdl } from "./category";
import TradeMarkMdl from "../users/trademark";

interface ReviewMdl {
  id: string;
  productId: string;
  userId: string;
  rating: number;
}

interface ProductDetailMdl {
  id: string;
  name: string;
  sku: string;
  productCode: string;
  price: number;
  discountPrice: number;
  averageRating: number;
  description: string;
  subDescription: string;
  imageUrl: string;
  imageDetailUrl: string[];
  quantitySold: number;
  quantityAvailable: number;
  origin: string;
  ingredient: string;
  expirationDate: string;
  warranty: string;
  category: ProductCategoryMdl;
  discount: ProductDiscountMdl;
  brand: TradeMarkMdl;
  inventories: InventoryMdl[];
  reviews: ReviewMdl[];
}

export default ProductDetailMdl;
