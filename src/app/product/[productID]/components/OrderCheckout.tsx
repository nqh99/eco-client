"use client";

import React, { useEffect, useState } from "react";

import { motion as m } from "framer-motion";
import { Button } from "@headlessui/react";
import Image from "next/image";
import { CiDeliveryTruck } from "react-icons/ci";
import { GoPackageDependents } from "react-icons/go";
import { PiInfoLight } from "react-icons/pi";
import NumberInput from "../../../../components/elements/NumberInput";
import { formatCurrency } from "@/utils/core";
import { useAppDispatch } from "@/hooks/redux";
import { addCartItem } from "@/lib/features/checkout/cartSlice";
import CartItemMdl from "@/models/products/card-item";
import { useRouter } from "next/navigation";
import OrderCalculator from "@/utils/calculator";

interface OrderCheckoutProps {
  brandLogo: string;
  brandName: string;
  product: CartItemMdl;
}

const OrderCheckout = ({
  brandLogo,
  brandName,
  product,
}: OrderCheckoutProps) => {
  const dispatch = useAppDispatch();

  const [calculator, setCalculator] = useState<OrderCalculator>(
    new OrderCalculator()
  );

  const [orderQuantity, setOrderQuantity] = useState(1);

  const route = useRouter();

  useEffect(() => {
    setCalculator(new OrderCalculator([{ itemMdl: product, quantity: 1 }]));
  }, [product]);

  const handleOrderQuantityChange = (val: number) => {
    setOrderQuantity(val);
  };

  const handleClickBuyNowBtn = () => {
    dispatch(addCartItem({ itemMdl: product, quantity: orderQuantity }));

    route.push("/checkout");
  };

  return (
    <div className="bg-white rounded-xl shadow-inner px-4 py-2 flex flex-col gap-2 min-w-80">
      <div className="py-2.5 border-b-[0.5px] border-slate-300">
        <div className="w-fit cursor-pointer justify-start items-center gap-5 inline-flex">
          <div className="rounded-full overflow-hidden w-10 h-10 relative border-[0.5px]">
            <Image src={brandLogo} alt="Brand Logo Icon" fill={true}></Image>
          </div>
          <span className="block text-xl font-semibold font-serif select-none">
            {brandName}
          </span>
        </div>
      </div>
      <div className="mb-2">
        <h6 className="mb-3 text-lg select-none">Số lượng</h6>
        <NumberInput size="big" onValChange={handleOrderQuantityChange} />
      </div>
      <div>
        <span className="block text-lg select-none">Tạm tính</span>
        <span className="block font-bold text-2xl font-sans">
          {formatCurrency(calculator.getPromotionPrice())} đ
        </span>
      </div>
      <div className="flex flex-row justify-between gap-3 items-center mt-2">
        <Button
          as={m.button}
          whileTap={{
            scale: 0.95,
            transition: { duration: 0.1, ease: "easeInOut" },
          }}
          className="w-full h-10 py-2 text-center text-white text-base font-medium rounded-lg  bg-discount"
          onClick={handleClickBuyNowBtn}
        >
          Mua ngay
        </Button>
        <Button
          as={m.button}
          whileTap={{
            scale: 0.95,
            transition: { duration: 0.1, ease: "easeInOut" },
          }}
          className="w-full h-10 py-2 rounded-lg border text-lime-800 border-lime-800 flex-col justify-center items-center gap-2.5 inline-flex"
          onClick={() => {
            dispatch(
              addCartItem({ itemMdl: product, quantity: orderQuantity })
            );
          }}
        >
          Thêm vào giỏ
        </Button>
      </div>
      <div className="h-[0px] border-b border-slate-300"></div>
      <div>
        <div className="flex flex-row items-center justify-between">
          <div className="flex gap-2 items-center">
            <CiDeliveryTruck className="fill-lime-800 size-6 min-w-6" />
            <p className="text-lime-800 text-xs">Đổi trả MIỄN PHÍ trong ngày</p>
          </div>
          <PiInfoLight className="size-5" />
        </div>
        <div className="flex flex-row items-center justify-between gap-2 mt-1">
          <GoPackageDependents className="fill-lime-800 size-6 min-w-6" />
          <p className="text-lime-800 text-xs text-wrap">
            Miễn phí giao hàng các quận trung tâm TPHCM
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderCheckout;
