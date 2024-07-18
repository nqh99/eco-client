"use client";

import React from "react";
import Image from "next/image";
import Button from "./Button";
import DiscountMdl from "@/models/products/discount";

interface CartItemProps {
  image: string;
  title: string;
  qualityStar: number;
  soldNum: number;
  price: number;
  isDiscount: boolean;
  discountPrice?: number;
  discountPercent?: number;
}

const CartItem = ({ ...props }: CartItemProps) => {
  return (
    <div className="w-56 h-80 min-w-56 max-h-80 rounded-lg box-border border-2 border-slate-50 shadow-sm overflow-hidden">
      <div className="relative w-full h-48">
        <Image
          src={props.image}
          alt={props.title}
          fill={true}
          // TODO: need to add sizes prop to optimized
          sizes=""
          className="pointer-events-none"
        ></Image>

        {props.isDiscount ? (
          <span className="block absolute top-2 left-2 bg-red-600 rounded text-white text-sm">
            Giảm {props.discountPercent}%
          </span>
        ) : null}
      </div>
      <div className="p-2">
        <h3 className="text-sm h-12">{props.title}</h3>
        <div className="flex justify-between items-end pb-2 border-b border-emerald-600">
          {props.qualityStar && props.qualityStar <= 5 && (
            <div className="flex items-center">
              {Array.from({ length: props.qualityStar }).map((_, index) => (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5 text-orange-500"
                  key={index}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                  />
                </svg>
              ))}
            </div>
          )}
          <span className="block text-gray-500 font-light text-xs">
            Đã bán {props.soldNum}
          </span>
        </div>
        <div className="flex content-center justify-between gap-3 items-center mt-2">
          {props.isDiscount ? (
            <>
              <p className="text-lg font-medium text-red-500">
                {props.discountPrice}
                <span className="underline underline-offset-2">đ</span>
              </p>
              <p className="text-sm text-gray-400">
                <s>{props.price}</s>
                <span className="underline underline-offset-2">đ</span>
              </p>
            </>
          ) : (
            <>
              <p className="text-lg">{props.price}</p>
            </>
          )}
          {/* <Image src={"/icons/shopping-cart.svg"} alt="shopping cart item" width={}/> */}
          <Button className="border border-current">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-5 text-green-800"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
