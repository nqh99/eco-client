"use client";

import { getTopDealProducts } from "@/apis/product";
import Button from "@/components/elements/Button";
import CartItem from "@/components/elements/CartItem";
import ProductTitle from "@/components/elements/ProductTitle";
import StackedList from "@/components/list/StackedList";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import CartItemMdl from "@/models/products/card-item";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const ShoppingCartPage = () => {
  const [isCheckAllBox, setAllBox] = useState(false);
  const cartState = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const [topDealProducts, setTopDealProducts] = useState<CartItemMdl[]>();

  useEffect(() => {
    getTopDealProducts(false).then((data) => {
      setTopDealProducts(data);
    });
  }, []);

  return (
    <main className="px-default gap-3 flex flex-col">
      {cartState.totalQuantity > 0 ? (
        <>
          {/* Shopping Cart section with user orders */}
          <div className="flex flex-row gap-3 mt-4 overflow-visible">
            <div className="w-3/4 flex flex-col gap-3"></div>
            <div className="w-1/4 inline-flex flex-col gap-4 sticky h-fit top-0 right-0"></div>
          </div>
        </>
      ) : (
        <>
          {/* Shopping Cart section without user orders */}
          <div className="flex flex-col items-center justify-center px-14 py-10 bg-white rounded-md mt-4 shadow-inner">
            <Image
              src="/images/shopping-buyer.png"
              alt="Shopping buyer image"
              width={110}
              height={110}
            />
            <h5 className="text-primary text-base font-normal text-center">
              Giỏ hàng của bạn đang trống
            </h5>
            <span className="block text-center text-xs font-light">
              Hãy thêm sản phẩm để tiếp tục mua sắm nhé!
            </span>
            <Button className="bg-primary text-white px-3 py-1 rounded-md mt-4">
              Tiếp tục mua sắm
            </Button>
          </div>
          {/* Top Selling Products section */}
          <div className="bg-white rounded-lg p-4 shadow-inner">
            <ProductTitle title="Sản phẩm bán chạy" style="normal" href="" />
            <StackedList>
              {topDealProducts &&
                topDealProducts.map((item: CartItemMdl) => (
                  <CartItem
                    key={item.id}
                    itemMdl={item}
                    href={`/product/${item.name}?productID=${item.id}`}
                  />
                ))}
            </StackedList>
          </div>
          {/* Relative Products section */}
          <div className="bg-white rounded-lg p-4 shadow-inner">
            <ProductTitle title="Sản phẩm liên quan" style="normal" href="" />
            <StackedList>
              {topDealProducts &&
                topDealProducts.map((item: CartItemMdl) => (
                  <CartItem
                    key={item.id}
                    itemMdl={item}
                    href={`/product/${item.name}?productID=${item.id}`}
                  />
                ))}
            </StackedList>
          </div>
        </>
      )}
      {/* Eco-HHB Policies section */}
      <div className="inline-flex gap-28 my-4 m-auto text-xs font-light font-serif justify-around">
        <div className="flex flex-col gap-3 items-center text-center min-w-36 w-40 rounded-lg border-[0.5px] py-2 px-3 shadow-sm">
          <Image
            src={"/icons/product-return.svg"}
            unoptimized={true}
            alt="Policies Icons"
            width={40}
            height={40}
          ></Image>
          <span>Đổi trả MIỄN PHÍ trong ngày</span>
        </div>
        <div className="flex flex-col gap-3 items-center text-center min-w-36 w-40 rounded-lg border-[0.5px] py-2 px-3 shadow-sm">
          <Image
            src={"/icons/credit-card.svg"}
            unoptimized={true}
            alt="Policies Icons"
            width={40}
            height={40}
          ></Image>
          <span>Bảo mật thanh toán</span>
        </div>
        <div className="flex flex-col gap-3 items-center text-center min-w-36 w-40 rounded-lg border-[0.5px] py-2 px-3 shadow-sm">
          <Image
            src={"/icons/free-delivery.svg"}
            unoptimized={true}
            alt="Policies Icons"
            width={40}
            height={40}
          ></Image>
          <span>Miễn phí giao hàng các quận trung tâm TPHCM</span>
        </div>
        <div className="flex flex-col gap-3 items-center text-center min-w-36 w-40 rounded-lg border-[0.5px] py-2 px-3 shadow-sm">
          <Image
            src={"/icons/assistant.svg"}
            unoptimized={true}
            alt="Policies Icons"
            width={40}
            height={40}
          ></Image>
          <span>Hỗ trợ khách hàng</span>
        </div>
      </div>
      <div></div>
    </main>
  );
};

export default ShoppingCartPage;
