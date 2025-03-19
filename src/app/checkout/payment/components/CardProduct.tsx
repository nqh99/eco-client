import React, { useState } from 'react';
import Image from 'next/legacy/image';
import { AiOutlineRight } from 'react-icons/ai';
import Input from '../../components/CustomizableInput';
import Logo from '@/public/icons/logo.svg';
import Logo_project from '@/public/icons/logo_project.svg';
import Voucher from '@/public/icons/voucher.svg';

const CardProduct = () => {
  const [shopInfo] = useState({ shopName: 'Gia dụng Phan Lê', logo: Logo });
  const [products] = useState([
    {
      id: 1,
      productName: 'Nước mắm Vịnh Vân Phong (Chai du lịch mini)',
      volume: '200ml',
      weight: '200g',
      type: 'Loại 1',
      quantity: 2,
      price: '1.736.000 đ',
      productLogo: Logo_project,
    },
    {
      id: 2,
      productName: 'Nước mắm Vịnh Vân Phong (Chai du lịch mini)',
      volume: '200ml',
      weight: '200g',
      type: 'Loại 1',
      quantity: 2,
      price: '1.736.000 đ',
      productLogo: Logo_project,
    },
  ]);
  const [voucher] = useState({ title: 'Mã ưu đãi của Shop', icon: Voucher });

  return (
    <div className="mt-2 rounded-xl border border-gray-200 bg-white p-4 shadow-lg">
      <h1 className="mb-2 font-bold text-gray-800">Sản phẩm</h1>

      <div className="mx-auto mt-2 rounded-xl border border-gray-100 bg-white">
        {/* Header */}
        <div className="flex items-center border-b border-gray-100 px-6 py-2">
          <Image
            src={shopInfo.logo}
            alt="Logo shop"
            className="mr-4 rounded-full"
            width={30}
            height={30}
          />
          <p className="font-medium text-gray-900">{shopInfo.shopName}</p>
          <AiOutlineRight className="ml-2" />
        </div>

        {/* Body */}
        <div className="px-6 py-4">
          {/* List of Products */}
          {products.map(
            ({
              id,
              productName,
              volume,
              weight,
              type,
              quantity,
              price,
              productLogo,
            }) => (
              <div className="mb-6 flex items-center justify-between" key={id}>
                <div className="flex items-center">
                  <Image
                    src={productLogo}
                    alt={productName}
                    className="mr-4 rounded-md"
                    width={70}
                    height={70}
                  />
                  <div className="ml-3">
                    <span className="block text-base text-gray-800">
                      {productName}
                    </span>
                    <div className="flex text-xs text-gray-600">
                      <p className="mr-2">Thể tích: {volume}</p>
                      <p className="mr-2">Khối lượng: {weight}</p>
                      <p className="mr-2">Loại hàng: {type}</p>
                      <p>Số lượng: {quantity}</p>
                    </div>
                  </div>
                </div>
                <p className="text-right font-medium">{price}</p>
              </div>
            )
          )}

          {/* Voucher Section */}
          <div className="mt-4 flex items-center">
            <Image
              src={voucher.icon}
              alt="Voucher"
              className="mr-2 rounded-full"
            />
            <p className="ml-2 font-medium text-gray-900">{voucher.title}</p>
            <AiOutlineRight className="ml-2" />

            {/* Voucher Ticker */}
            <div className="relative ml-5 inline-flex items-center rounded-[5px] border-2 border-yellow-500 bg-yellow-50 px-3 py-0 text-base text-yellow-500">
              <div className="absolute -left-[0.13rem] h-3 w-2 rounded-r-full border-2 border-l-0 border-yellow-500 bg-yellow-50"></div>
              <p>Đã giảm 50.000đ</p>
              <div className="absolute -right-[0.13rem] h-3 w-2 rounded-l-full border-2 border-r-0 border-yellow-500 bg-yellow-50"></div>
            </div>
          </div>

          {/* Note Input */}
          <div className="mt-3">
            <label htmlFor="note" className="mb-2 block text-sm">
              Ghi chú cho người bán
            </label>
            <Input as="textarea" placeholder="Ghi chú..." />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProduct;
