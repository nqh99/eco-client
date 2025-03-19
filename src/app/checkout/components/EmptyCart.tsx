'use client';

import Button from '@/components/elements/Button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

const EmptyCart = () => {
  const router = useRouter();

  return (
    <div className="mt-4 flex flex-col items-center justify-center rounded-md bg-white px-14 py-10 shadow-inner">
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
      <Button
        onClick={() => {
          router.push('/');
        }}
        className="mt-4 rounded-md bg-primary px-3 py-1 text-white"
      >
        Tiếp tục mua sắm
      </Button>
    </div>
  );
};

export default EmptyCart;
