'use client';

import React, { useEffect, useState } from 'react';
import { motion as m } from 'framer-motion';
import { FaCartShopping } from 'react-icons/fa6';
import {
  CloseButton,
  Popover,
  PopoverButton,
  PopoverPanel,
} from '@headlessui/react';
import Image from 'next/image';
import { useAppSelector } from '@/hooks/redux';
import { formatCurrency } from '@/utils/core';
import { useRouter } from 'next/navigation';
import ShoppingCartItem from '../elements/ShoppingCartItem';
import OrderCalculator from '@/utils/calculator';

const ShoppingCartPopup = () => {
  const cartState = useAppSelector((state) => state.cart);

  const [cal, setCal] = useState<OrderCalculator>(new OrderCalculator());

  const route = useRouter();

  useEffect(() => {
    setCal(new OrderCalculator(cartState.items));
  }, [cartState.items]);

  return (
    <Popover>
      <PopoverButton
        aria-label="Shopping cart icon"
        className="relative flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 p-2 focus:outline-none"
      >
        <FaCartShopping className="size-5 text-primary" />
        {cartState && (
          <m.span
            aria-label="total items in the cart"
            className={`absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 font-sansita text-[0.6rem] font-bold text-white`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            {cal.getTotalQty()}
          </m.span>
        )}
      </PopoverButton>

      <PopoverPanel
        transition
        anchor={{
          to: 'bottom',
          gap: '20px',
          padding: '100px',
        }}
        className="z-50 max-h-96 min-h-48 w-[440px] min-w-96 origin-top-right rounded-xl border border-white/5 bg-white shadow-2xl transition duration-100 ease-out focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
      >
        {cartState.items.length !== 0 ? (
          <>
            <div className="flex h-10 items-center justify-between border-b-[0.5px] px-4">
              <h5 className="text-base font-medium">
                ({cal.getTotalQty()}) Sản phẩm
              </h5>
              <span className="block text-base font-bold text-discount">
                {formatCurrency(cal.getPromotionPrice())} đ
              </span>
            </div>
            <div className="scrollbar-primary max-h-52 overflow-y-auto">
              {cartState.items.map((cartPayload, index) => (
                <div
                  key={index}
                  className={`${
                    index < cartState.items.length - 1 ? 'border-b' : ''
                  }`}
                >
                  <ShoppingCartItem cartPayload={cartPayload} item="icon" />
                </div>
              ))}
            </div>
            <div className="mt-2 border-t px-4 py-2">
              <CloseButton
                onClick={() => route.push('/checkout')}
                className="w-full rounded-lg bg-primary py-2 text-center text-base font-medium text-white"
              >
                Xem giỏ hàng và thanh toán
              </CloseButton>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center px-14 py-10">
            <Image
              src="/images/shopping-buyer.png"
              alt="Shopping buyer image"
              width={110}
              height={110}
            />
            <h5 className="text-center text-base font-normal text-primary">
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

export default ShoppingCartPopup;
