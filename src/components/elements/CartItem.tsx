import React from "react";
import Image from "next/image";

interface CartItemProps {
  image: string;
  title: string;
  qualityStar?: number;
  soldNum?: number;
  isDiscount?: boolean;
  discountPrice?: number;
  discountPercent?: number;
}

const CartItem: React.FC<CartItemProps> = ({
  image,
  title,
  qualityStar,
  soldNum,
  isDiscount = false,
  discountPrice,
  discountPercent,
}) => {
  return (
    <div className="w-56 h-80 max-h-80 rounded-sm box-border">
      <div className="relative w-56 h-48">
        <Image src={image} alt={title} width={224} height={192}></Image>

        {isDiscount ? (
          <span className="block absolute top-2 left-2 bg-red-600 rounded text-white text-sm">
            Giảm {discountPercent}%
          </span>
        ) : null}
      </div>
      <div className="p-2">
        <h3 className="text-sm h-12">{title}</h3>
        <div className="flex justify-between items-end pb-2 border-b border-emerald-600">
          {qualityStar && qualityStar <= 5 && (
            <div className="flex items-center">
              {Array.from({ length: qualityStar }).map((_, index) => (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-4 text-orange-500"
                  key={index}
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                  />
                </svg>
              ))}
            </div>
          )}
          <span className="block text-gray-500 font-light text-xs">
            Đã bán {soldNum}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
