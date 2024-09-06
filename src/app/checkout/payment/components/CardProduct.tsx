import React, { useState } from "react";
import Image from "next/legacy/image";
import { AiOutlineRight } from "react-icons/ai";
import Input from "../../components/CustomizableInput";
import Logo from "@/public/icons/logo.svg";
import Logo_project from "@/public/icons/logo_project.svg";
import Voucher from "@/public/icons/voucher.svg";

const CardProduct = () => {
  const [shopInfo] = useState({ shopName: "Gia dụng Phan Lê", logo: Logo });
  const [products] = useState([
    {
      id: 1,
      productName: "Nước mắm Vịnh Vân Phong (Chai du lịch mini)",
      volume: "200ml",
      weight: "200g",
      type: "Loại 1",
      quantity: 2,
      price: "1.736.000 đ",
      productLogo: Logo_project,
    },
    {
      id: 2,
      productName: "Nước mắm Vịnh Vân Phong (Chai du lịch mini)",
      volume: "200ml",
      weight: "200g",
      type: "Loại 1",
      quantity: 2,
      price: "1.736.000 đ",
      productLogo: Logo_project,
    },
  ]);
  const [voucher] = useState({ title: "Mã ưu đãi của Shop", icon: Voucher });

  return (
    <div className="p-4 mt-2 bg-white rounded-xl shadow-lg border border-gray-200">
      <h1 className="font-bold text-gray-800 mb-2">Sản phẩm</h1>

      <div className="mx-auto mt-2 bg-white rounded-xl border border-gray-100">
        {/* Header */}
        <div className="px-6 py-2 border-b border-gray-100 flex items-center">
          <Image src={shopInfo.logo} alt="Logo shop" className="rounded-full mr-4" width={30} height={30} />
          <p className="font-medium text-gray-900">{shopInfo.shopName}</p>
          <AiOutlineRight className="ml-2" />
        </div>

        {/* Body */}
        <div className="px-6 py-4">
          {/* List of Products */}
          {products.map(({ id, productName, volume, weight, type, quantity, price, productLogo }) => (
            <div className="flex items-center justify-between mb-6" key={id}>
              <div className="flex items-center">
                <Image src={productLogo} alt={productName} className="rounded-md mr-4" width={70} height={70} />
                <div className="ml-3">
                  <span className="text-base text-gray-800 block">{productName}</span>
                  <div className="text-xs text-gray-600 flex">
                    <p className="mr-2">Thể tích: {volume}</p>
                    <p className="mr-2">Khối lượng: {weight}</p>
                    <p className="mr-2">Loại hàng: {type}</p>
                    <p>Số lượng: {quantity}</p>
                  </div>
                </div>
              </div>
              <p className="font-medium text-right">{price}</p>
            </div>
          ))}

          {/* Voucher Section */}
          <div className="flex items-center mt-4">
            <Image src={voucher.icon} alt="Voucher" className="rounded-full mr-2" />
            <p className="font-medium text-gray-900 ml-2">{voucher.title}</p>
            <AiOutlineRight className="ml-2" />

            {/* Voucher Ticker */}
            <div className="inline-flex items-center px-3 py-0 ml-5 border-2 border-yellow-500 text-yellow-500 text-base rounded-[5px] bg-yellow-50 relative">
              <div className="absolute -left-[0.13rem] w-2 h-3 border-l-0 border-2 border-yellow-500 bg-yellow-50 rounded-r-full"></div>
              <p>Đã giảm 50.000đ</p>
              <div className="absolute -right-[0.13rem] w-2 h-3 border-r-0 border-2 border-yellow-500 bg-yellow-50 rounded-l-full"></div>
            </div>
          </div>

          {/* Note Input */}
          <div className="mt-3">
            <label htmlFor="note" className="text-sm block mb-2">Ghi chú cho người bán</label>
            <Input as="textarea" placeholder="Ghi chú..." />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProduct;
