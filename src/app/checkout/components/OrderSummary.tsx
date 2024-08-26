"use client";

import Button from "@/components/elements/Button";
import { ICartPayload } from "@/lib/types";
import { formatCurrency } from "@/utils/core";
import OrderCalculator from "@/utils/calculator";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { postUserOrder } from "@/apis/product";
import { CustomError } from "@/models/errors/custom-err";

type OrderSummaryProps = {
  items: ICartPayload[];
};

const OrderSummary = ({ items }: OrderSummaryProps) => {
  const router = useRouter();

  const [cal, setCalculator] = useState<OrderCalculator>(new OrderCalculator());

  const onSubmit = (event: React.MouseEvent) => {
    if (items) {
      console.log(items);
      
      // TODO: enhance later
      const userOrdersForm = {
        orderInfoList: items.map((item, index) => {
          return {
            productId: item.itemMdl.id,
            quantity: item.quantity,
            productInventoryId: item.itemMdl.inventory[0].id,
          };
        }),
        shippingAddress: "10000",
        discountCode: "",
        phoneNumber: "0113113119",
        email: "eco-hhb@gmail.com",
        customerName: "Nguyễn Quang Huy",
        subTotalPrice: 190,
        shippingPrice: 10000,
        discountPrice: 0,
        totalPrice: cal.computeTemporaryPrice(),
      };

      console.log(userOrdersForm);

      // TODO: enhance later
      postUserOrder(userOrdersForm)
        .then((res) => {
          console.log(res);

          if (res === "success") {
            router.push("/checkout/payment");
          }
        })
        .catch((err: CustomError) => {
          console.log(err.cause);
        });
      // router.push("/checkout/payment");
    }
  };

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
        onClick={onSubmit}
        className="bg-discount text-white text-center rounded-md px-3 py-1 mt-3 w-full"
      >
        Mua hàng
      </Button>
    </div>
  );
};

export default OrderSummary;
