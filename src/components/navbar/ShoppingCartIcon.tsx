"use client";

import React from "react";
import { motion as m } from "framer-motion";
import { FaCartShopping } from "react-icons/fa6";
import {
  CloseButton,
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import Image from "next/image";
import { useAppSelector } from "@/hooks/redux";
import { formatCurrency } from "@/utils/core";
import { useRouter } from "next/navigation";
import ShoppingCartItem from "../elements/ShoppingCartItem";

const ShoppingCartIcon = () => {
  const cartState = useAppSelector((state) => state.cart);

  const route = useRouter();

  return (
    <Popover>
      <PopoverButton
        aria-label="Shopping cart icon"
        className="relative p-2 focus:outline-none bg-emerald-50 w-10 h-10 rounded-full flex justify-center items-center"
      >
        <FaCartShopping className="text-primary size-5" />
        {cartState && (
          <m.span
            aria-label="total items in the cart"
            className={`w-4 h-4 flex justify-center items-center rounded-full bg-red-600 text-[0.6rem] font-sansita font-bold text-white absolute -top-1 -right-1`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            {cartState.totalQuantity}
          </m.span>
        )}
      </PopoverButton>

      <PopoverPanel
        transition
        anchor={{
          to: "bottom",
          gap: "20px",
          padding: "100px",
        }}
        className="z-50 bg-white min-w-96 min-h-48 max-h-96 w-[440px] shadow-2xl origin-top-right rounded-xl border border-white/5 transition duration-100 ease-out focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
      >
        {cartState.items.length !== 0 ? (
          <>
            <div className="flex items-center justify-between px-4 border-b-[0.5px] h-10">
              <h5 className="text-base font-medium">
                ({cartState.totalQuantity}) Sản phẩm
              </h5>
              <span className="block text-base text-discount font-bold">
                {formatCurrency(cartState.totalPrice)} đ
              </span>
            </div>
            <div className="overflow-y-auto max-h-52 scrollbar-primary">
              {cartState.items.map((cartPayload, index) => (
                <div
                  key={index}
                  className={`${
                    index < cartState.items.length - 1 ? "border-b" : ""
                  }`}
                >
                  <ShoppingCartItem cartPayload={cartPayload} item="icon" />
                </div>
              ))}
            </div>
            <div className="px-4 mt-2 py-2 border-t">
              <CloseButton
                onClick={() => route.push("/checkout")}
                className="w-full py-2 rounded-lg bg-primary text-white text-base font-medium text-center"
              >
                Xem giỏ hàng và thanh toán
              </CloseButton>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center px-14 py-10 ">
            <Image
              src="/images/shopping-buyer.png"
              alt="Shopping buyer image"
              width={110}
              height={110}
            />
            <h5 className="text-primary text-base font-normal text-center">
              Giỏ hàng của bạn đang trống
            </h5>
            <span className="block text-center text-xs font-light">
              Hãy thêm sản phẩm để tiếp tục mua sắm nhé!
            </span>
          </div>
        )}
      </PopoverPanel>
    </Popover>
  );
};

export default ShoppingCartIcon;
