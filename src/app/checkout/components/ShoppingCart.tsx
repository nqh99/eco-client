"use client";

import React, { useEffect, useState } from "react";

import Checkbox from "../../../components/elements/Checkbox";
import Link from "next/link";
import Image from "next/image";
import { ICartPayload } from "@/lib/types";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { formatCurrency } from "@/utils/core";
import NumberInput from "../../../components/elements/NumberInput";
import Button from "../../../components/elements/Button";
import { GoTrash } from "react-icons/go";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  addCartItem,
  clearCart,
  removeCartItem,
} from "@/lib/features/checkout/cartSlice";
import { getProductsByTradeMark } from "@/apis/product";
import DeletePopup from "../../../components/popup/DeletePopup";

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

  const [showDeletePops, setShowDeletePops] = useState<Map<string, boolean>>(
    new Map()
  );

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
              data.cartItems.findIndex(
                (val) => item.itemMdl.id === val.productId
              ) !== -1
          ),
        });

        data.cartItems.forEach((item) => {
          newCheckedProducts.set(item.productId, false);
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

    setShowDeletePops((prev) => {
      const newVal = new Map<string, boolean>();

      newVal.set("all", false);

      cartState.items.forEach((val) => {
        newVal.set(val.itemMdl.id, false);
      });

      return newVal;
    });
  }, [cartState.items]);

  useEffect(() => {
    if (onChecked) {
      const checkedItems = Array.from(checkedProducts.entries())
        .filter(([_, val]) => val)
        .map(([key, _]) =>
          cartState.items.find((item) => item?.itemMdl.id === key)
        )
        .filter((item): item is ICartPayload => item !== undefined);

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

      productsByTradeMark?.get(id)?.cartItems.forEach((item, index) => {
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
    isClearAll: boolean,
    cartPayload?: ICartPayload
  ) => {
    if (isClearAll) {
      dispatch(clearCart());
      setShowDeletePops((prev) => {
        const newVal = new Map(prev);

        newVal.set("all", false);

        return newVal;
      });

      return;
    }

    if (cartPayload) {
      dispatch(removeCartItem({ ...cartPayload, quantity: -1 }));
      setShowDeletePops((prev) => {
        const newVal = new Map(prev);

        newVal.set(cartPayload.itemMdl.id, false);

        return newVal;
      });
    }
  };

  const onCloseDeletePop = (popID: string) => {
    setShowDeletePops((prev) => {
      const newVal = new Map(prev);

      newVal.set(popID, false);

      return newVal;
    });
  };

  const onShowDeletePop = (popID: string) => {
    setShowDeletePops((prev) => {
      const newVal = new Map(prev);

      newVal.set(popID, true);

      return newVal;
    });
  };

  return (
    <div className="flex flex-col gap-3 text-sm">
      {/* Column headers section */}
      <div className="flex gap-3 justify-between items-center bg-white rounded-lg p-2 text-sm">
        <div className="min-w-[420px]">
          <Checkbox
            id="all_checked_box"
            value={isCheckedAllBox}
            onCheck={onSelectAllItems}
          >
            <Checkbox.Indicator />
            <Checkbox.Label className="text-informal select-none">
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
              setShowDeletePops((prev) => {
                const newVal = new Map(prev);

                newVal.set("all", true);

                return newVal;
              })
            }
            className="flex-shrink group border rounded-md bg-[#ebf1f5] p-1 hover:border-primary"
          >
            <GoTrash className="size-4 text-informal group-hover:text-primary" />
          </Button>
          <DeletePopup
            show={showDeletePops.get("all") || false}
            title="Bạn có muốn xóa toàn bộ giỏ hàng không?"
            onClose={(e) => onCloseDeletePop("all")}
            onConfirm={(e) => {
              handleRemoveCartItems(e, true);
            }}
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
                <div key={cartPayload.itemMdl.id} className="flex gap-3 py-6">
                  <div className="flex gap-2 max-h-20 w-[420px]">
                    <Checkbox
                      id={cartPayload.itemMdl.id}
                      value={checkedProducts.get(cartPayload.itemMdl.id)}
                      onCheck={(val) => {
                        onSelectItem(val, cartPayload.itemMdl.id, tradeMark.id);
                      }}
                    >
                      <Checkbox.Indicator />
                    </Checkbox>
                    <div className="flex gap-3">
                      <Image
                        src={cartPayload.itemMdl.imageUrl}
                        alt={"Branch Name"}
                        width={70}
                        height={50}
                        className="block rounded-md border-[0.5px] border-informal"
                      />
                      <div className="">
                        <h2 className="text-lg font-normal">
                          {cartPayload.itemMdl.name}
                        </h2>
                        <div>{/* Combobox section */}</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-grow flex gap-3 items-center">
                    <span className="w-28 flex justify-center text-base">
                      {formatCurrency(
                        cartPayload.itemMdl.discount?.discountPrice ||
                          cartPayload.itemMdl.price
                      )}{" "}
                      <u>đ</u>
                    </span>
                    <div className="flex justify-center flex-grow">
                      <NumberInput
                        value={cartPayload.quantity}
                        size="normal"
                        onValChange={(val) => {
                          handleCartItemValChange(val, cartPayload);
                        }}
                      />
                    </div>
                    <span className="w-28 flex justify-center text-base text-discount">
                      {formatCurrency(
                        (cartPayload.itemMdl.discount?.discountPrice ||
                          cartPayload.itemMdl.price) * cartPayload.quantity
                      )}{" "}
                      <u>đ</u>
                    </span>
                    <Button
                      onClick={(event) =>
                        onShowDeletePop(cartPayload.itemMdl.id)
                      }
                      className="group border rounded-md bg-[#ebf1f5] p-1 hover:border-primary"
                    >
                      <GoTrash className="size-4 text-informal group-hover:text-primary" />
                    </Button>
                    <DeletePopup
                      show={showDeletePops.get(cartPayload.itemMdl.id) || false}
                      onClose={(e) => onCloseDeletePop(cartPayload.itemMdl.id)}
                      onConfirm={(e) => {
                        handleRemoveCartItems(e, false, cartPayload);
                      }}
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
  );
};

export default ShoppingCart;
