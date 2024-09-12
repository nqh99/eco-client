"use client";

import Button from "@/components/elements/Button";
import { ICartPayload } from "@/lib/types";
import { ClientMdl } from "@/models/users/client";
import OrderCalculator from "@/utils/calculator";

import React, { useEffect, useState } from "react";

type OrderSummaryProps = {
  cartPayloads: ICartPayload[];
  clientInfo?: ClientMdl;
  onClickPlaceOrderBtn?: () => void;
};

const OrderSummary = ({
  onClickPlaceOrderBtn,
  cartPayloads,
  clientInfo,
}: OrderSummaryProps) => {
  const calculator = new OrderCalculator(cartPayloads);

  const handleSubmit = () => {
    if (onClickPlaceOrderBtn) {
      onClickPlaceOrderBtn();
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md mt-4">
      <div className="flex justify-between mb-3">
        <span className="text-sm">Tạm tính</span>
        <span className="text-sm">5.208.000 đ</span>
      </div>
      <div className="flex justify-between mb-3">
        <span className="text-sm">Tổng giảm giá</span>
        <span className="text-sm">-100.000 ₫</span>
      </div>
      <div className="flex justify-between mb-3">
        <span className="text-sm">Tổng tiền</span>
        <div className="flex flex-col items-end">
          <span className="text-sm text-[#ffaa00]">5.152.000 ₫</span>
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
