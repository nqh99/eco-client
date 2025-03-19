'use client';

import React, { useEffect, useState } from 'react';

import { motion as m } from 'framer-motion';
import { Button } from '@headlessui/react';
import Image from 'next/image';
import { CiDeliveryTruck } from 'react-icons/ci';
import { GoPackageDependents } from 'react-icons/go';
import { PiInfoLight } from 'react-icons/pi';
import NumberInput from '../../../../components/elements/NumberInput';
import { formatCurrency } from '@/utils/core';
import { useAppDispatch } from '@/hooks/redux';
import { addCartItem } from '@/lib/features/checkout/cartSlice';
import CartItemMdl from '@/models/products/card-item';
import { useRouter } from 'next/navigation';
import OrderCalculator from '@/utils/calculator';

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

    route.push('/checkout');
  };

  return (
    <div className="flex min-w-80 flex-col gap-2 rounded-xl bg-white px-4 py-2 shadow-inner">
      <div className="border-b-[0.5px] border-slate-300 py-2.5">
        <div className="inline-flex w-fit cursor-pointer items-center justify-start gap-5">
          <div className="relative h-10 w-10 overflow-hidden rounded-full border-[0.5px]">
            <Image src={brandLogo} alt="Brand Logo Icon" fill={true}></Image>
          </div>
          <span className="block select-none font-serif text-xl font-semibold">
            {brandName}
          </span>
        </div>
      </div>
      <div className="mb-2">
        <h6 className="mb-3 select-none text-lg">Số lượng</h6>
        <NumberInput size="big" onValChange={handleOrderQuantityChange} />
      </div>
      <div>
        <span className="block select-none text-lg">Tạm tính</span>
        <span className="block font-sans text-2xl font-bold">
          {formatCurrency(calculator.getPromotionPrice())} đ
        </span>
      </div>
      <div className="mt-2 flex flex-row items-center justify-between gap-3">
        <Button
          as={m.button}
          whileTap={{
            scale: 0.95,
            transition: { duration: 0.1, ease: 'easeInOut' },
          }}
          className="h-10 w-full rounded-lg bg-discount py-2 text-center text-base font-medium text-white"
          onClick={handleClickBuyNowBtn}
        >
          Mua ngay
        </Button>
        <Button
          as={m.button}
          whileTap={{
            scale: 0.95,
            transition: { duration: 0.1, ease: 'easeInOut' },
          }}
          className="inline-flex h-10 w-full flex-col items-center justify-center gap-2.5 rounded-lg border border-lime-800 py-2 text-lime-800"
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
          <div className="flex items-center gap-2">
            <CiDeliveryTruck className="size-6 min-w-6 fill-lime-800" />
            <p className="text-xs text-lime-800">Đổi trả MIỄN PHÍ trong ngày</p>
          </div>
          <PiInfoLight className="size-5" />
        </div>
        <div className="mt-1 flex flex-row items-center justify-between gap-2">
          <GoPackageDependents className="size-6 min-w-6 fill-lime-800" />
          <p className="text-wrap text-xs text-lime-800">
            Miễn phí giao hàng các quận trung tâm TPHCM
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderCheckout;
