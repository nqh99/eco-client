export type CartItemMdl = {
    id: string;
    name: string;
    sku: string;
    productCode: string;
    price: number;
    discountPrice: number;
    description: string;
    imageUrl: string;
    rating: number;
    quantitySold: number;
    quantityAvailable: number;
    discount: Discount;
};
