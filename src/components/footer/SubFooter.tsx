import React from 'react';

import Image from 'next/image';
import Button from '../elements/Button';

const SubFooter: React.FC = () => {
  return (
    <div className="flex select-none items-center justify-between bg-amber-500 px-8">
      <div className="flex items-center">
        <Image
          src="/images/supermarket.png"
          alt="hhb-logo"
          width={120}
          height={100}
        ></Image>
        <div className="ms-10">
          <p className="font-semibold text-white">
            Đăng ký ngay để nhận ưu đãi thành <br /> viên từ ECO - HHB
          </p>
        </div>
      </div>
      <div className="">
        <Button
          type="button"
          className="rounded bg-white px-4 py-2 font-semibold text-green-700 shadow hover:bg-gray-100"
        >
          Đăng ký ngay
        </Button>
      </div>
    </div>
  );
};

export default SubFooter;
