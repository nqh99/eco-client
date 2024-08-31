"use client";

import Button from "@/components/elements/Button";
import { ICartPayload } from "@/lib/types";
import { formatCurrency } from "@/utils/core";
import OrderCalculator from "@/utils/calculator";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type OrderSummaryProps = {
  items: ICartPayload[];
};

const OrderSummary = ({ items }: OrderSummaryProps) => {
  const router = useRouter();

  const [cal, setCalculator] = useState<OrderCalculator>(new OrderCalculator());

  useEffect(() => {
    setCalculator(new OrderCalculator(items));
  }, [items]);

  return (
    <div className="flex flex-col gap-1.5 px-4 pt-2 pb-4 bg-white rounded-lg min-h-52">
      <div className="h-8 flex justify-between items-center">
        <span className="inline-block w-2/5 text-informal text-sm">
          Tạm tính
        </span>
        <span className="inline-block text-lg">
          {formatCurrency(cal.computeTemporaryPrice())} đ
        </span>
      </div>
      <div className="h-8 flex justify-between items-center">
        <span className="inline-block w-2/5 text-informal text-sm">
          Tổng giảm giá
        </span>
        <span className="inline-block text-lg text-informal">
          - {formatCurrency(cal.computeDiscountPrice())} đ
        </span>
      </div>
      <div className="h-8 flex justify-between items-center">
        <span className="inline-block w-2/5 text-informal text-sm">
          Tổng tiền
        </span>

        {items.length === 0 ? (
          <span className="text-right block text-sm font-medium text-[#ffaa00]">
            Vui lòng chọn sản phẩm
          </span>
        ) : (
          <span className="block text-right text-xl font-medium">
            {formatCurrency(cal.computePromotionalPrice())} đ
          </span>
        )}
      </div>
      <div className="flex justify-end">
        <span className="text-right block text-xs text-informal">
          (Đã bao gồm VAT nếu có)
        </span>
      </div>
      <Button
        onClick={() => router.push("/checkout/payment")}
        className="bg-discount text-white text-center rounded-md px-3 py-1 mt-3 w-full"
      >
        Mua hàng
      </Button>
    </div>
  );
};

export default OrderSummary;
