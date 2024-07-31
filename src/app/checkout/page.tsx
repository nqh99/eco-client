"use client";

import { useAppDispatch, useAppSelector, useAppStore } from "@/hooks/redux";
import {
  addCartItem,
  clearCart,
  removeCartItem,
} from "@/lib/features/checkout/cartSlice";
import React from "react";
import { useDispatch } from "react-redux";

const CheckoutPage: React.FC = () => {
  const carts = useAppSelector((state) => state.carts.items);
  const dispatch = useAppDispatch();
  console.log(carts);

  return (
    <div className="flex flex-col">
      <h1
        onClick={() => {
          dispatch(addCartItem({ productID: "abcd2", quantity: 3 }));
        }}
      >
        Checkout Page
      </h1>

      {/* Add your checkout form and components here */}
      <button
        onClick={() => {
          dispatch(removeCartItem({ productID: "abcd2", quantity: 10 }));
        }}
      >
        remove
      </button>
      <button
        onClick={() => {
          dispatch(clearCart());
        }}
      >
        clear
      </button>
    </div>
  );
};

export default CheckoutPage;
