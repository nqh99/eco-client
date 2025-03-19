'use client';

import React from 'react';

import Image from 'next/image';
import { motion as m } from 'framer-motion';

const CompanyPolicies: React.FC = () => {
  return (
    <div className="m-auto my-4 inline-flex select-none justify-around gap-28 font-serif text-xs font-light">
      <m.div
        whileHover={{ scale: 0.95 }}
        className="flex w-44 min-w-36 flex-col items-center gap-3 rounded-lg border-[0.5px] px-3 py-2 text-center shadow-sm hover:cursor-pointer hover:shadow-inner"
      >
        <Image
          src={'/icons/product-return.svg'}
          unoptimized={true}
          alt="Policies Icons"
          width={40}
          height={40}
        ></Image>
        <span className="text-sm">Đổi trả MIỄN PHÍ trong ngày</span>
      </m.div>
      <m.div
        whileHover={{ scale: 0.95 }}
        className="flex w-44 min-w-36 flex-col items-center gap-3 rounded-lg border-[0.5px] px-3 py-2 text-center shadow-sm hover:cursor-pointer hover:shadow-inner"
      >
        <Image
          src={'/icons/credit-card.svg'}
          unoptimized={true}
          alt="Policies Icons"
          width={40}
          height={40}
        ></Image>
        <span className="text-sm">Bảo mật thanh toán</span>
      </m.div>
      <m.div
        whileHover={{ scale: 0.95 }}
        className="flex w-44 min-w-36 flex-col items-center gap-3 rounded-lg border-[0.5px] px-3 py-2 text-center shadow-sm hover:cursor-pointer hover:shadow-inner"
      >
        <Image
          src={'/icons/free-delivery.svg'}
          unoptimized={true}
          alt="Policies Icons"
          width={40}
          height={40}
        ></Image>
        <span className="text-sm">
          Miễn phí giao hàng các quận trung tâm TPHCM
        </span>
      </m.div>
      <m.div
        whileHover={{ scale: 0.95 }}
        className="flex w-44 min-w-36 flex-col items-center gap-3 rounded-lg border-[0.5px] px-3 py-2 text-center shadow-sm hover:cursor-pointer hover:shadow-inner"
      >
        <Image
          src={'/icons/assistant.svg'}
          unoptimized={true}
          alt="Policies Icons"
          width={40}
          height={40}
        ></Image>
        <span className="text-sm">Hỗ trợ khách hàng</span>
      </m.div>
    </div>
  );
};

export default CompanyPolicies;
