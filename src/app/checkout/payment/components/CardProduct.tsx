"use client";

import React, { useEffect, useState } from "react";
import Image from "next/legacy/image";
import { AiOutlineRight } from "react-icons/ai";
import Input from "../../components/CustomizableInput";
import Voucher from "@/public/icons/voucher.svg";
import { ICartPayload } from "@/lib/types";
import OrderCalculator from "@/utils/calculator";
import BrandMdl from "@/models/users/brand";
import { formatCurrency } from "@/utils/core";

type CardProductProps = {
  calculator: OrderCalculator;
  onNoted?: (val: Map<string, string>) => void;
};

const CardProduct = ({ calculator, onNoted }: CardProductProps) => {
  const [productsByBrand, setProductsByBrand] = useState<
    Map<
      string,
      {
        brand: BrandMdl;
        products: ICartPayload[];
      }
    >
  >();

  const [noteOnBrand, setNoteOnBrand] = useState<Map<string, string>>(
    new Map()
  );

  useEffect(() => {
    setProductsByBrand(calculator.sortItemsByBrand());
  }, [calculator]);

  const [voucher] = useState({ title: "Mã ưu đãi của Shop", icon: Voucher });

  const handleOnUserNotes = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    brand: BrandMdl
  ) => {
    const newNote: Map<string, string> = new Map(noteOnBrand);
    newNote.set(brand.id, event.currentTarget.value);
    setNoteOnBrand(newNote);

    if (onNoted) {
      onNoted(newNote);
    }
  };

  return (
    <div className="p-4 mt-2 bg-white rounded-xl shadow-lg border border-gray-200">
      <h1 className="font-bold text-gray-800 mb-2">Sản phẩm</h1>

      {[...(productsByBrand?.values() ?? [])].map((data) => (
        <div
          key={data.brand.id}
          className="mx-auto mt-2 bg-white rounded-xl border border-gray-100"
        >
          {/* Header */}
          <div className="px-6 py-2 border-b border-gray-100 flex items-center">
            <Image
              src={data.brand.avatarUrl}
              alt="Logo shop"
              className="rounded-full mr-4"
              width={30}
              height={30}
            />
            <p className="font-medium text-gray-900">{data.brand.name}</p>
            <AiOutlineRight className="ml-2" />
          </div>

          {/* Body */}
          <div className="px-6 py-4">
            {/* List of Products */}
            {data.products.map((cartItem) => (
              <div
                className="flex items-center justify-between mb-6"
                key={cartItem.itemMdl.id}
              >
                <div className="flex items-center">
                  <Image
                    src={cartItem.itemMdl.imageUrl}
                    alt={cartItem.itemMdl.name}
                    className="rounded-md mr-4"
                    width={70}
                    height={70}
                  />
                  <div className="ml-3">
                    <span className="text-base text-gray-800 block">
                      {cartItem.itemMdl.name}
                    </span>
                    <div className="text-xs text-gray-600 flex">
                      <p className="mr-2">
                        {cartItem.itemMdl.inventories.at(0)?.variantName}:{" "}
                        {cartItem.itemMdl.inventories.at(0)?.variantValue}
                      </p>
                      <p>Số lượng: {cartItem.quantity}</p>
                    </div>
                  </div>
                </div>
                <p className="font-medium text-right">
                  {formatCurrency(
                    cartItem.itemMdl.inventories.at(0)?.price ?? 0
                  )}
                </p>
              </div>
            ))}

            {/* Voucher Section */}
            <div className="flex items-center mt-4">
              <Image
                src={voucher.icon}
                alt="Voucher"
                className="rounded-full mr-2"
              />
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
              <label htmlFor="note" className="text-sm block mb-2">
                Ghi chú cho người bán
              </label>
              <Input
                as="textarea"
                placeholder="Ghi chú..."
                onChange={(event) => {
                  handleOnUserNotes(event, data.brand);
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardProduct;
