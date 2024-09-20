"use client";

import React from "react";
import Button from "@/components/elements/Button";
import { ICartPayload } from "@/lib/types";
import { ClientMdl } from "@/models/users/client";
import OrderCalculator from "@/utils/calculator";

type OrderSummaryProps = {
  cartPayloads: ICartPayload[];
  clientInfo?: ClientMdl; // TODO: need to enhance later
  onPlaceOrder?: () => void;
};

const OrderSummary = ({ onPlaceOrder, cartPayloads }: OrderSummaryProps) => {
  const calculator = new OrderCalculator(cartPayloads);

  const handleSubmit = () => {
    if (onPlaceOrder) {
      onPlaceOrder();
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md mt-4">
      <div className="flex justify-between mb-3">
        <span className="text-sm">Tạm tính</span>
        <span className="text-sm">{calculator.getTemPrice()} đ</span>
      </div>
      <div className="flex justify-between mb-3">
        <span className="text-sm">Tổng giảm giá</span>
        <span className="text-sm">-{calculator.getDiscountPrice()} ₫</span>
      </div>
      <div className="flex justify-between mb-3">
        <span className="text-sm">Tổng tiền</span>
        <div className="flex flex-col items-end">
          <span className="text-sm text-[#ffaa00]">
            {calculator.getPromotionPrice()} ₫
          </span>
          <span className="text-xs text-informal mb-3">
            (Đã bao gồm VAT nếu có)
          </span>
        </div>
      </div>
      <Button
        onClick={handleSubmit}
        className="bg-red-600 text-white text-center rounded-md px-3 py-2 w-full"
      >
        Đặt hàng
      </Button>
    </div>
  );
};

export default OrderSummary;
