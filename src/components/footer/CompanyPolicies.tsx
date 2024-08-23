"use client";

import React from "react";

import Image from "next/image";
import { motion as m } from "framer-motion";

const CompanyPolicies: React.FC = () => {
  return (
    <div className="inline-flex gap-28 my-4 m-auto text-xs font-light font-serif justify-around select-none">
      <m.div whileHover={{scale: 0.95}} className="flex flex-col gap-3 items-center text-center min-w-36 w-44 rounded-lg border-[0.5px] py-2 px-3 shadow-sm hover:cursor-pointer hover:shadow-inner">
        <Image
          src={"/icons/product-return.svg"}
          unoptimized={true}
          alt="Policies Icons"
          width={40}
          height={40}
        ></Image>
        <span className="text-sm">Đổi trả MIỄN PHÍ trong ngày</span>
      </m.div>
      <m.div whileHover={{scale: 0.95}} className="flex flex-col gap-3 items-center text-center min-w-36 w-44 rounded-lg border-[0.5px] py-2 px-3 shadow-sm hover:cursor-pointer hover:shadow-inner">
        <Image
          src={"/icons/credit-card.svg"}
          unoptimized={true}
          alt="Policies Icons"
          width={40}
          height={40}
        ></Image>
        <span className="text-sm">Bảo mật thanh toán</span>
      </m.div>
      <m.div whileHover={{scale: 0.95}} className="flex flex-col gap-3 items-center text-center min-w-36 w-44 rounded-lg border-[0.5px] py-2 px-3 shadow-sm hover:cursor-pointer hover:shadow-inner">
        <Image
          src={"/icons/free-delivery.svg"}
          unoptimized={true}
          alt="Policies Icons"
          width={40}
          height={40}
        ></Image>
        <span className="text-sm">Miễn phí giao hàng các quận trung tâm TPHCM</span>
      </m.div>
      <m.div whileHover={{scale: 0.95}} className="flex flex-col gap-3 items-center text-center min-w-36 w-44 rounded-lg border-[0.5px] py-2 px-3 shadow-sm hover:cursor-pointer hover:shadow-inner">
        <Image
          src={"/icons/assistant.svg"}
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
