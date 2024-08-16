"use client";

import { getProductsByTradeMark, getTopDealProducts } from "@/apis/product";
import AdsBanner from "@/components/elements/AdsBanner";
import Button from "@/components/elements/Button";
import CartItem from "@/components/elements/CartItem";
import Checkbox from "@/components/elements/Checkbox";
import NumberInput from "@/components/elements/NumberInput";
import ProductTitle from "@/components/elements/ProductTitle";
import CompanyPolicies from "@/components/footer/CompanyPolicies";
import StackedList from "@/components/list/StackedList";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  addCartItem,
  clearCart,
  removeCartItem,
} from "@/lib/features/checkout/cartSlice";
import { ICartPayload } from "@/lib/types";
import CartItemMdl from "@/models/products/card-item";
import { formatCurrency } from "@/utils/core";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { GoTrash } from "react-icons/go";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import DeletePopup from "@/components/popup/DeletePopup";

const ShoppingCartPage = () => {
  const cartState = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const [isCheckedAllBox, setIsCheckedAllBox] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [itemToRemove, setItemToRemove] = useState<CartItemMdl | null>(null);
  
  // TODO: enhance later with BE - [EW-46]
  const [productsInCart, setProductsInCart] = useState<
    {
      id: string;
      name: string;
      avatarUrl: string;
      cartItems: ICartPayload[];
    }[]
  >();
  const [topDealProducts, setTopDealProducts] = useState<CartItemMdl[]>();

  useEffect(() => {
    // TODO: need enhance object - discuss with BE
    const productsData = {
      cartInfoList: cartState.items.map((item) => ({
        productId: item.itemMdl.id,
        productInventoryId: item.itemMdl.inventory[0].id,
      })),
    };

    // TODO: need enhance object - discuss with BE
    getProductsByTradeMark(productsData).then((res) => {
      setProductsInCart(
        res?.map((branch) => ({
          id: branch.id,
          name: branch.name,
          avatarUrl: branch.avatarUrl,
          cartItems: cartState.items.filter((item) =>
            branch.cartItems.some((e) => e.productId === item.itemMdl.id)
          ),
        }))
      );
    });
  }, [cartState.items]);

  useEffect(() => {
    getTopDealProducts(false).then((data) => {
      setTopDealProducts(data);
    });
  }, []);

  const handleCartItemValChange = (val: number, cartPayload: ICartPayload) => {
    if (!val) {
      return;
    }

    const changedNum = val - cartPayload.quantity;

    if (changedNum > 0) {
      dispatch(addCartItem({ ...cartPayload, quantity: changedNum }));
    } else if (changedNum < 0) {
      dispatch(
        removeCartItem({ ...cartPayload, quantity: Math.abs(changedNum) })
      );
    }
  };

  const handleRemoveCartItems = (
    event: React.MouseEvent,
    cartPayload: ICartPayload,
    isClearAll: boolean
  ) => {
    if (isClearAll) {
      dispatch(clearCart());
      return;
    }
    setItemToRemove(cartPayload.itemMdl);
    setShowPopup(true);
  };

  const handleCartItemDeletion = () => {
    if (itemToRemove) {
      dispatch(removeCartItem({ itemMdl: itemToRemove, quantity: -1 }));
      setShowPopup(false);
      setItemToRemove(null);
    }
  };

  return (
    <main className="px-default gap-3 flex flex-col">
      {cartState.totalQuantity > 0 ? (
        <>
          {/* Shopping Cart section with user orders */}
          <h2 className="text-base">Giỏ hàng của bạn</h2>
          <div className="flex flex-row gap-4 mt-4 overflow-visible">
            <div className="w-3/4 min-w-[850px] flex flex-col gap-3 text-sm">
              {/* Column headers section */}
              <div className="flex gap-3 justify-between items-center bg-white rounded-lg p-2 text-sm">
                <div className="w-[420px]">
                  <Checkbox
                    onChecked={(val) => setIsCheckedAllBox(val)}
                    id="all_checked_box"
                  >
                    <Checkbox.Indicator />
                    <Checkbox.Label className="text-informal">
                      Tất cả ({cartState.totalQuantity} sản phẩm)
                    </Checkbox.Label>
                  </Checkbox>
                </div>
                <div className="flex flex-grow justify-between items-center gap-3 text-informal text-base text-center">
                  <span className="block w-28">Đơn giá</span>
                  <span className="block flex-grow">Số lượng</span>
                  <span className="block w-28">Thành tiền</span>
                  <Button
                    onClick={(event) =>
                      handleRemoveCartItems(event, {} as ICartPayload, true)
                    }
                    className="flex-shrink group border rounded-md bg-[#ebf1f5] p-1 hover:border-primary"
                  >
                    <GoTrash className="size-4 text-informal group-hover:text-primary" />
                  </Button>
                </div>
              </div>
              {/* Cart Items in each Branch */}
              {productsInCart?.map((branchItem, index) => {
                return (
                  <div key={branchItem.id} className="bg-white rounded-lg">
                    {/* Branch information */}
                    <div className="border-b-[0.5px] p-2 flex gap-3 items-center">
                      <Checkbox id="">
                        <Checkbox.Indicator />
                      </Checkbox>
                      <Link href={""} className="flex items-center gap-2">
                        <Image
                          src={branchItem.avatarUrl}
                          alt={"Branch Name"}
                          width={30}
                          height={30}
                          className="rounded-full"
                        />
                        <h5 className="text-sm font-semibold">
                          {branchItem.name}
                        </h5>
                        <MdOutlineKeyboardArrowRight className="size-4" />
                      </Link>
                    </div>
                    {/* Cart Items section */}
                    {branchItem.cartItems.map((cartItem, index) => {
                      return (
                        <div
                          key={cartItem.itemMdl.id}
                          className="flex gap-3 px-2 py-6"
                        >
                          <div className="flex gap-2 max-h-20 w-[420px]">
                            <Checkbox id={branchItem.id}>
                              <Checkbox.Indicator />
                            </Checkbox>
                            <div className="flex gap-3">
                              <Image
                                src={cartItem.itemMdl.imageUrl}
                                alt={"Branch Name"}
                                width={70}
                                height={50}
                                className="block rounded-md border-[0.5px] border-informal"
                              />
                              <div className="">
                                <h2 className="text-lg font-normal">
                                  {cartItem.itemMdl.name}
                                </h2>
                                <div>{/* Combobox section */}</div>
                              </div>
                            </div>
                          </div>
                          <div className="flex-grow flex gap-3 items-center">
                            <span className="w-28 flex justify-center text-base">
                              {formatCurrency(
                                cartItem.itemMdl.discount?.discountPrice ||
                                  cartItem.itemMdl.price
                              )}{" "}
                              <u>đ</u>
                            </span>
                            <div className="flex justify-center flex-grow">
                              <NumberInput
                                value={cartItem.quantity}
                                size="normal"
                                onValChange={(val) =>
                                  handleCartItemValChange(val, cartItem)
                                }
                              />
                            </div>
                            <span className="w-28 flex justify-center text-base text-discount">
                              {formatCurrency(
                                cartItem.itemMdl.discount?.discountPrice ||
                                  cartItem.itemMdl.price
                              )}{" "}
                              <u>đ</u>
                            </span>
                            <Button
                              onClick={(event) => {
                                handleRemoveCartItems(event, cartItem, false);
                              }}
                              className="group border rounded-md bg-[#ebf1f5] p-1 hover:border-primary"
                            >
                              <GoTrash className="size-4 text-informal group-hover:text-primary" />
                            </Button>
                            <DeletePopup
                              show={showPopup}
                              onClose={() => setShowPopup(false)}
                              onConfirm={handleCartItemDeletion}
                            />
                          </div>
                        </div>
                      );
                    })}
                    {/* TODO: Discount voucher section */}
                    <div></div>
                  </div>
                );
              })}
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
