"use client";

import { getTopDealProducts } from "@/apis/product";
import AdsBanner from "@/components/elements/AdsBanner";
import Button from "@/components/elements/Button";
import CartItem from "@/components/elements/CartItem";
import Checkbox from "@/components/elements/Checkbox";
import ProductTitle from "@/components/elements/ProductTitle";
import CompanyPolicies from "@/components/footer/CompanyPolicies";
import StackedList from "@/components/list/StackedList";
import { useAppSelector } from "@/hooks/redux";
import CartItemMdl from "@/models/products/card-item";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { GoTrash } from "react-icons/go";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const ShoppingCartPage = () => {
  const [enabledAllBox, setEnabledAllBox] = useState(false);
  const cartState = useAppSelector((state) => state.cart);
  const [topDealProducts, setTopDealProducts] = useState<CartItemMdl[]>();

  useEffect(() => {
    getTopDealProducts(false).then((data) => {
      setTopDealProducts(data);
    });
  }, [cartState.items]);

  return (
    <main className="px-default gap-3 flex flex-col">
      {cartState.totalQuantity > 0 ? (
        <>
          {/* Shopping Cart section with user orders */}
          <h2 className="text-base">Giỏ hàng của bạn</h2>
          <div className="flex flex-row gap-4 mt-4 overflow-visible">
            <div className="w-3/4 min-w-[750px] flex flex-col gap-3 text-sm">
              {/* Column headers section */}
              <div className="flex gap-3 items-center bg-white rounded-lg p-2 text-sm">
                <div className="w-3/5 min-w-96">
                  <Checkbox id="all_checked_box">
                    <Checkbox.Indicator />
                    <Checkbox.Label>
                      <span className="text-informal">
                        Tất cả ({cartState.totalQuantity} sản phẩm)
                      </span>
                    </Checkbox.Label>
                  </Checkbox>
                </div>
                <div className="flex w-2/5 justify-between items-center gap-3 text-informal text-base text-center">
                  <span className="block">Đơn giá</span>
                  <span className="block flex-grow">Số lượng</span>
                  <span className="block">Thành tiền</span>
                  <Button className="flex-shrink group border rounded-md bg-[#ebf1f5] p-1 hover:border-primary">
                    <GoTrash className="size-4 text-informal group-hover:text-primary" />
                  </Button>
                </div>
              </div>
              {/* Cart Items in each Branch */}
              <div className="bg-white rounded-lg">
                {/* Branch information */}
                <div className="border-b-[0.5px] p-2 flex gap-3 items-center">
                  <Checkbox id="">
                    <Checkbox.Indicator />
                  </Checkbox>
                  <Link href={""} className="flex items-center gap-2">
                    <Image
                      src="/images/logo-hhb.png"
                      alt={"Branch Name"}
                      width={30}
                      height={30}
                      className="rounded-full"
                    />
                    <h5>Gia dụng ABC</h5>
                    <MdOutlineKeyboardArrowRight className="size-5" />
                  </Link>
                </div>
                {/* Cart Items section */}
                <div className="flex gap-3 px-2 py-6">
                  <div className="flex gap-2 max-h-20 w-3/5">
                    <Checkbox id="">
                      <Checkbox.Indicator />
                    </Checkbox>
                    <div className="flex gap-2">
                      <Image
                        src="/images/logo-hhb.png"
                        alt={"Branch Name"}
                        width={70}
                        height={50}
                        className="block rounded-md"
                      />
                      <div className="">
                        <h2>Nước mắm Vịnh Vân Phong (Chai du lịch mini)</h2>
                        <div>{/* Combobox section */}</div>
                      </div>
                    </div>
                  </div>
                  <div className="w-2/5 flex gap-3 justify-between items-center">
                    <span className="block">868.000 d</span>
                    <div className="flex-grow">asdf</div>
                    <span className="block">176000 d</span>
                    <Button className="group border rounded-md bg-[#ebf1f5] p-1 hover:border-primary">
                      <GoTrash className="size-4 text-informal group-hover:text-primary" />
                    </Button>
                  </div>
                </div>
                {/* TODO: Discount voucher section */}
                <div></div>
              </div>
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
      <CompanyPolicies />
      <div></div>
    </main>
  );
};

export default ShoppingCartPage;
