"use client";

import { getTopDealProducts } from "@/apis/product";
import ShoppingCart from "@/components/checkout/ShoppingCart";
import AdsBanner from "@/components/elements/AdsBanner";
import Button from "@/components/elements/Button";
import CartItem from "@/components/elements/CartItem";
import ProductTitle from "@/components/elements/ProductTitle";
import CompanyPolicies from "@/components/footer/CompanyPolicies";
import StackedList from "@/components/list/StackedList";
import { useAppSelector } from "@/hooks/redux";
import CartItemMdl from "@/models/products/card-item";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ShoppingCartPage = () => {
  const cartState = useAppSelector((state) => state.cart);

  const router = useRouter();

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
          <h2 className="text-base">Giỏ hàng của bạn</h2>
          <div className="flex flex-row gap-4 mt-4 overflow-visible">
            {/* Shopping products cart */}
            <div className="w-3/4 min-w-[850px] flex flex-col gap-3 text-sm">
              <ShoppingCart />
            </div>
            <div className="w-1/4 min-w-80 inline-flex flex-col gap-4 sticky h-fit top-0">
              <div className="px-4 py-2 bg-white rounded-lg">
                <div className="flex justify-between">
                  <span className="inline-block w-2/5">Tạm tính</span>
                  <span className="inline-block">0 đ</span>
                </div>
                <div className="flex justify-between">
                  <span className="inline-block w-2/5">Tổng giảm giá</span>
                  <span className="inline-block">0 đ</span>
                </div>
                <div className="flex justify-between">
                  <span className="inline-block w-2/5">Tổng tiền</span>
                  <div className="flex flex-col justify-items-end">
                    <span className="text-right block text-sm text-[#ffaa00]">
                      Vui lòng chọn sản phẩm
                    </span>
                    <span className="text-right block text-xs text-informal">
                      (Đã bao gồm VAT nếu có)
                    </span>
                  </div>
                </div>
                <Button className="bg-discount text-white text-center rounded-md px-3 py-1 w-full">
                  Mua hàng
                </Button>
              </div>
              <AdsBanner
                imgURL="/images/tea-ads.png"
                position="full"
                className="w-full h-40 select-none pointer-events-none"
              />
            </div>
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
            <Button onClick={() => {router.push("/")}} className="bg-primary text-white px-3 py-1 rounded-md mt-4">
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
      <CompanyPolicies />
      <div></div>
    </main>
  );
};

export default ShoppingCartPage;
