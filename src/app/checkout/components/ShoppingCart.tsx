"use client";

import React, { useEffect, useState } from "react";

import Checkbox from "../../../components/elements/Checkbox";
import Link from "next/link";
import Image from "next/image";
import { ICartPayload } from "@/lib/types";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Button from "../../../components/elements/Button";
import { GoTrash } from "react-icons/go";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { clearCart } from "@/lib/features/checkout/cartSlice";
import { getProductsByTradeMark } from "@/apis/product";
import DeletePopup from "../../../components/popup/DeletePopup";
import ShoppingCartItem from "@/components/elements/ShoppingCartItem";

type ShoppingCartProp = {
  onChecked?: (products: ICartPayload[]) => void;
};

const ShoppingCart = ({ onChecked }: ShoppingCartProp) => {
  const cartState = useAppSelector((state) => state.cart);

  const dispatch = useAppDispatch();

  const [isCheckedAllBox, setIsCheckedAllBox] = useState(false);

  const [checkedTradeMark, setCheckedTradeMark] = useState<
    Map<string, boolean>
  >(new Map());

  const [checkedProducts, setCheckedProducts] = useState<Map<string, boolean>>(
    new Map()
  );

  const [showDeleteAllPop, setShowDeleteAllPop] = useState(false);

  const [productsByTradeMark, setProductsByTradeMark] = useState<
    Map<
      string,
      {
        id: string;
        name: string;
        avatarUrl: string;
        cartItems: ICartPayload[];
      }
    >
  >(new Map());

  useEffect(() => {
    const productsData = {
      cartInfoList: cartState.items.map((item) => ({
        productId: item.itemMdl.id,
        productInventoryId: item.itemMdl.inventory[0].id,
      })),
    };

    getProductsByTradeMark(productsData).then((res) => {
      const newProductsByTradeMark = new Map();
      const newCheckedProducts = new Map();

      res?.forEach((data) => {
        newProductsByTradeMark.set(data.id, {
          id: data.id,
          name: data.name,
          avatarUrl: data.avatarUrl,
          cartItems: cartState.items.filter(
            (item) =>
              data.cartItems.findIndex((val) => item.itemMdl.id === val.id) !==
              -1
          ),
        });

        data.cartItems.forEach((item) => {
          newCheckedProducts.set(item.id, false);
        });
      });

      setProductsByTradeMark(newProductsByTradeMark);

      setCheckedTradeMark((prev) => {
        const newVal = new Map(prev);

        newProductsByTradeMark.forEach((_, key) => {
          if (!newVal.has(key)) {
            newVal.set(key, false);
          }
        });

        return newVal;
      });

      setCheckedProducts((prev) => {
        const newVal = new Map(prev);

        newCheckedProducts.forEach((_, key) => {
          if (!newVal.has(key)) {
            newVal.set(key, false);
          }
        });

        return newVal;
      });
    });
  }, [cartState.items]);

  useEffect(() => {
    if (onChecked) {
      const checkedItems: ICartPayload[] = [];

      checkedProducts.forEach((value, key) => {
        if (value) {
          const cartPayload = cartState.items.find(
            (item) => item?.itemMdl.id === key
          );

          if (cartPayload) {
            checkedItems.push(cartPayload);
          }
        }
      });

      onChecked(checkedItems);
    }
  }, [checkedProducts]);

  const onSelectAllItems = (val: boolean) => {
    setIsCheckedAllBox(val);

    setCheckedTradeMark((prev) => {
      const newVal = new Map(prev);

      newVal.forEach((_, key) => newVal.set(key, val));

      return newVal;
    });

    setCheckedProducts((prev) => {
      const newVal = new Map(prev);

      newVal.forEach((_, key) => newVal.set(key, val));

      return newVal;
    });
  };

  const onSelectTradeMark = (val: boolean, id: string) => {
    setCheckedTradeMark((prev) => {
      const newVal = new Map(prev);

      newVal.set(id, val);

      return newVal;
    });

    setCheckedProducts((prev) => {
      const newVal = new Map(prev);

      productsByTradeMark?.get(id)?.cartItems.forEach((item) => {
        newVal.set(item.itemMdl.id, val);
      });

      return newVal;
    });

    if (!val) {
      setIsCheckedAllBox(false);
    }
  };

  const onSelectItem = (val: boolean, itemID: string, tradeMarkID: string) => {
    setCheckedProducts((prev) => {
      const newVal = new Map(prev);

      newVal.set(itemID, val);

      return newVal;
    });

    if (!val) {
      setCheckedTradeMark((prev) => {
        const newVal = new Map(prev);

        newVal.set(tradeMarkID, false);

        return newVal;
      });

      setIsCheckedAllBox(false);
    }
  };

  const onConfirmDeleteAll = () => {
    dispatch(clearCart());
    setShowDeleteAllPop(false);
  };

  return (
    <div className="flex flex-col gap-3 text-sm">
      {/* Column headers section */}
      <div className="grid grid-cols-12 gap-1 items-center bg-white rounded-lg p-2 text-sm">
        <div className="col-span-6">
          <Checkbox
            id="all_checked_box"
            value={isCheckedAllBox}
            onCheck={onSelectAllItems}
          >
            <Checkbox.Indicator />
            <Checkbox.Label className="text-informal select-none ml-2">
              Tất cả ({cartState.totalQuantity} sản phẩm)
            </Checkbox.Label>
          </Checkbox>
        </div>
        <div className="col-span-6 grid grid-cols-12 items-center justify-items-center gap-1 text-informal text-center">
          <span className="block col-span-3">Đơn giá</span>
          <span className="block col-span-5">Số lượng</span>
          <span className="block col-span-3">Thành tiền</span>
          <div className="col-span-1 justify-self-end">
            <Button
              onClick={() => setShowDeleteAllPop(true)}
              className="flex-shrink group border rounded-md bg-[#ebf1f5] p-1 hover:border-primary"
            >
              <GoTrash className="size-4 text-informal group-hover:text-primary" />
            </Button>
          </div>
          <DeletePopup
            show={showDeleteAllPop}
            title="Bạn có muốn xóa toàn bộ giỏ hàng không?"
            onClose={() => setShowDeleteAllPop(false)}
            onConfirm={onConfirmDeleteAll}
          />
        </div>
      </div>
      {[...productsByTradeMark.values()].map((tradeMark, index) => {
        return (
          <div key={index} className="bg-white rounded-lg px-2 text-sm">
            <div className="border-b-[0.5px] flex gap-3 py-2 items-center">
              <Checkbox
                id={tradeMark.id}
                value={checkedTradeMark.get(tradeMark.id) || isCheckedAllBox}
                onCheck={(val) => {
                  onSelectTradeMark(val, tradeMark.id);
                }}
              >
                <Checkbox.Indicator />
              </Checkbox>
              <Link href={""} className="flex items-center gap-2">
                <Image
                  src={tradeMark.avatarUrl}
                  alt={"Branch Name"}
                  width={30}
                  height={30}
                  className="rounded-full"
                />
                <h5 className="text-sm font-semibold">{tradeMark.name}</h5>
                <MdOutlineKeyboardArrowRight className="size-4" />
              </Link>
            </div>
            {tradeMark.cartItems.map((cartPayload, index) => {
              return (
                <ShoppingCartItem
                  key={index}
                  item="shopping-cart"
                  cartPayload={cartPayload}
                  isSelect={
                    checkedProducts.get(cartPayload.itemMdl.id) || false
                  }
                  onSelect={(val) =>
                    onSelectItem(val, cartPayload.itemMdl.id, tradeMark.id)
                  }
                />
              );
            })}
            {/* TODO: Discount voucher section */}
            <div></div>
          </div>
        );
      })}
    </div>
  );
};

export default ShoppingCart;
