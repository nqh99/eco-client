'use client';

import Button from '@/components/elements/Button';
import { ICartPayload } from '@/lib/types';
import { formatCurrency } from '@/utils/core';
import OrderCalculator from '@/utils/calculator';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useSessionStorage } from 'usehooks-ts';
import { StoredKey } from '@/constants/client-storage/keys';
import { CoreError } from '@/constants/error/core';

type OrderSummaryProps = {
  items: ICartPayload[];
};

const OrderSummary = ({ items }: OrderSummaryProps) => {
  const router = useRouter();

  const [cal, setCalculator] = useState<OrderCalculator>(new OrderCalculator());

  const [payload, setPayload] = useSessionStorage<ICartPayload[] | undefined>(
    StoredKey.UserOrder,
    items
  );

  useEffect(() => {
    if (!items) return;

    setCalculator(new OrderCalculator(items));
    setPayload(items);
  }, [items]);

  const handleClickBuyBtn = () => {
    if (payload === undefined) {
      console.log(CoreError.SystemErr);
      return;
    }
    setPayload(items);
    router.push('/checkout/payment');
  };

  return (
    <div className="flex min-h-52 flex-col gap-1.5 rounded-lg bg-white px-4 pb-4 pt-2">
      <div className="flex h-8 items-center justify-between">
        <span className="inline-block w-2/5 text-sm text-informal">
          Tạm tính
        </span>
        <span className="inline-block text-lg">
          {formatCurrency(cal.getTemPrice())} đ
        </span>
      </div>
      <div className="flex h-8 items-center justify-between">
        <span className="inline-block w-2/5 text-sm text-informal">
          Tổng giảm giá
        </span>
        <span className="inline-block text-lg text-informal">
          - {formatCurrency(cal.getDiscountPrice())} đ
        </span>
      </div>
      <div className="flex h-8 items-center justify-between">
        <span className="inline-block w-2/5 text-sm text-informal">
          Tổng tiền
        </span>

        {items.length === 0 ? (
          <span className="block text-right text-sm font-medium text-[#ffaa00]">
            Vui lòng chọn sản phẩm
          </span>
        ) : (
          <span className="block text-right text-xl font-medium">
            {formatCurrency(cal.getPromotionPrice())} đ
          </span>
        )}
      </div>
      <div className="flex justify-end">
        <span className="block text-right text-xs text-informal">
          (Đã bao gồm VAT nếu có)
        </span>
      </div>
      <Button
        onClick={() => handleClickBuyBtn()}
        className="mt-3 w-full rounded-md bg-discount px-3 py-1 text-center text-white"
      >
        Mua hàng
      </Button>
    </div>
  );
};

export default OrderSummary;
