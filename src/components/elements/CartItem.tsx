"use client";

import React from "react";
import Image from "next/image";
import CartItemMdl from "@/models/products/card-item";
import { useRouter } from "next/navigation";
import Rating from "./Rating";
import { formatCurrency } from "@/utils/core";
import { useAppDispatch } from "@/hooks/redux";
import { addCartItem } from "@/lib/features/checkout/cartSlice";
import CustomButton from "./Button";

interface CartItemProps {
  itemMdl: CartItemMdl;
  href: string;
}

const CartItem = ({ itemMdl, ...props }: CartItemProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  return (
    <div
      onClick={() => {
        router.push(props.href);
      }}
      className="w-56 h-80 min-w-60 max-h-80 rounded-lg box-border border-2 border-slate-50 cursor-pointer shadow-sm overflow-hidden"
    >
      <div className="relative w-full h-48">
        <Image
          src={itemMdl.imageUrl}
          alt={itemMdl.name}
          fill={true}
          // TODO: need to add sizes prop to optimized
          sizes=""
          className="pointer-events-none"
        ></Image>

        {itemMdl.discount ? (
          <span className="block absolute top-2 left-2 bg-discount px-1 py-[2px] rounded text-white text-sm">
            Giảm {itemMdl.discount.discountPercent}%
          </span>
        ) : null}
      </div>
      <div className="p-2">
        <h3 className="text-sm h-12">{itemMdl.name}</h3>
        <div className="flex justify-between items-end pb-2 border-b border-emerald-600">
          {itemMdl.rating <= 5 && (
            <Rating
              avgRating={itemMdl.rating}
              className="text-yellow-400 size-5"
            />
          )}
          <span className="block text-gray-500 font-light text-xs">
            Đã bán {itemMdl.quantitySold}
          </span>
        </div>
        <div className="flex content-center justify-around gap-3 items-center mt-2">
          {itemMdl.discount ? (
            <>
              <p className="text-base font-medium text-discount">
                {formatCurrency(itemMdl.discount.discountPrice)}
                <span className="underline underline-offset-2">đ</span>
              </p>
              <p className="text-xs text-gray-400">
                <s>{formatCurrency(itemMdl.price)}</s>
                <span className="underline underline-offset-2">đ</span>
              </p>
            </>
          ) : (
            <>
              <p className="text-lg">{formatCurrency(itemMdl.price)}</p>
            </>
          )}
          <CustomButton
            className="border border-primary rounded p-[3px]"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // TODO: enhance when business changed
              dispatch(addCartItem({ itemMdl: itemMdl, quantity: 1 }));
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-4 text-primary"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
