"use client";

import React, { useEffect, useState } from "react";
import { motion as m } from "framer-motion";

import { FaCartShopping } from "react-icons/fa6";
import {
  CloseButton,
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { formatCurrency } from "@/utils/core";
import { addCartItem, removeCartItem } from "@/lib/features/checkout/cartSlice";
import { GoTrash } from "react-icons/go";
import CartItemMdl from "@/models/products/card-item";
import { ICartPayload } from "@/lib/types";
import { useRouter } from "next/navigation";
import CustomButton from "./Button";
import NumberInput from "./NumberInput";
import DeletePopup from "../popup/DeletePopup";

export default function ShoppingCartIcon() {
  const cartState = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const [itemToRemove, setItemToRemove] = useState<CartItemMdl | null>(null);
  const route = useRouter();

  const handleRemoveBtnClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    itemMdl: CartItemMdl
  ) => {
    setItemToRemove(itemMdl);
    setShowPopup(true);
  };

  const handleCartItemDeletion = () => {
    if (itemToRemove) {
      dispatch(removeCartItem({ itemMdl: itemToRemove, quantity: -1 }));
      setShowPopup(false);
      setItemToRemove(null);
    }
  };

  const handleInputVal = (val: number, cartPayload: ICartPayload) => {
    if (!val) {
      return;
    }

    const changedNum = val - cartPayload.quantity;

    if (changedNum > 0) {
      dispatch(addCartItem({ ...cartPayload, quantity: changedNum }));
    } else if (changedNum < 0) {
      dispatch(
        removeCartItem({ ...cartPayload, quantity: Math.abs(changedNum) })
      );
    }
  };

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
                  className={`flex gap-3 overflow-hidden mx-4 py-2 ${
                    index < cartState.items.length - 1 ? "border-b" : ""
                  }`}
                >
                  <div className="w-1/5 relative">
                    <Image
                      // TODO: Discuss with BE to enhance this logic - cart item
                      src={cartPayload.itemMdl.imageUrl}
                      alt={cartPayload.itemMdl.name}
                      fill={true}
                      className="rounded-md"
                    />
                  </div>
                  <div className="w-4/5 flex flex-col">
                    <h3 className="font-medium text-sm">
                      {cartPayload.itemMdl.name}
                    </h3>
                    {cartPayload.itemMdl.discount ? (
                      <div className="flex text-sm gap-2 items-center">
                        <span className="text-discount">
                          {formatCurrency(
                            cartPayload.itemMdl.discount.discountPrice
                          )}{" "}
                          đ
                        </span>
                        <span className="line-through text-xs text-informal">
                          {formatCurrency(cartPayload.itemMdl.price)} đ
                        </span>
                      </div>
                    ) : (
                      <div>
                        <span className="text-default">
                          {formatCurrency(cartPayload.itemMdl.price)} đ
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <div className="flex flex-row gap-2 items-center justify-start w-full h-full">
                        <NumberInput
                          size="small"
                          value={cartPayload.quantity}
                          onValChange={(val) => {
                            handleInputVal(val, cartPayload);
                          }}
                        />
                      </div>
                      <CustomButton
                        onClick={(event) =>
                          handleRemoveBtnClick(event, cartPayload.itemMdl)
                        }
                        className="bg-slate-100 rounded w-8 h-7 min-w-7 min-h-5 flex items-center justify-center data-[hover]:bg-slate-200 data-[hover]:text-green-900 shadow-inner"
                      >
                        <GoTrash />
                      </CustomButton>
                      <DeletePopup
                        show={showPopup}
                        onClose={() => setShowPopup(false)}
                        onConfirm={handleCartItemDeletion}
                      />
                    </div>
                  </div>
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
}
