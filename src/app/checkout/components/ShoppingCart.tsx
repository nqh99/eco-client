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
import DeletePopup from "../../../components/popup/DeletePopup";
import ShoppingCartItem from "@/components/elements/ShoppingCartItem";
import OrderCalculator from "@/utils/calculator";
import BrandMdl from "@/models/users/brand";
import VoucherPopup from "@/components/popup/VoucherPopup";
import DiscountMdl from "@/models/products/discount";
import { getDiscountByProduct } from "@/apis/product";

type ShoppingCartProp = {
  onChecked?: (products: ICartPayload[]) => void;
};

type ShoppingCartHeaderProps = {
  isCheckedAll: boolean;
  onCheckAll: (val: boolean) => void;
};

const ShoppingCart = ({ onChecked }: ShoppingCartProp) => {
  const cartState = useAppSelector((state) => state.cart);

  const [isCheckedAllBox, setIsCheckedAllBox] = useState(false);

  const [checkedBrand, setCheckedBrand] = useState<Map<string, boolean>>(
    new Map()
  );

  const [checkedProducts, setCheckedProducts] = useState<Map<string, boolean>>(
    new Map()
  );

  const [productsByBrand, setProductsByBrand] = useState<
    Map<
      string,
      {
        brand: BrandMdl;
        products: ICartPayload[];
      }
    >
  >(new Map());

  useEffect(() => {
    const newProductsByBrand = new OrderCalculator(
      cartState.items
    ).sortItemsByBrand();

    setProductsByBrand(newProductsByBrand);

    setCheckedBrand((prev) => {
      const newVal = new Map(prev);

      newProductsByBrand.forEach((_, key) => {
        if (!newVal.has(key)) {
          newVal.set(key, false);
        }
      });

      return newVal;
    });

    setCheckedProducts((prev) => {
      const newVal = new Map(prev);

      cartState.items.forEach((payload) => {
        const itemID = payload.itemMdl.id;
        if (!newVal.has(itemID)) {
          newVal.set(itemID, false);
        }
      });

      return newVal;
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

    setCheckedBrand((prev) => {
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

  const onSelectBrand = (val: boolean, id: string) => {
    setCheckedBrand((prev) => {
      const newVal = new Map(prev);

      newVal.set(id, val);

      return newVal;
    });

    setCheckedProducts((prev) => {
      const newVal = new Map(prev);

      productsByBrand?.get(id)?.products.forEach((item) => {
        newVal.set(item.itemMdl.id, val);
      });

      return newVal;
    });

    if (!val) {
      setIsCheckedAllBox(false);
    }
  };

  const onSelectItem = (val: boolean, itemID: string, brandID: string) => {
    setCheckedProducts((prev) => {
      const newVal = new Map(prev);

      newVal.set(itemID, val);

      return newVal;
    });

    if (!val) {
      setCheckedBrand((prev) => {
        const newVal = new Map(prev);

        newVal.set(brandID, false);

        return newVal;
      });

      setIsCheckedAllBox(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 text-sm">
      {/* Column headers section */}
      <ShoppingCartHeader
        isCheckedAll={isCheckedAllBox}
        onCheckAll={onSelectAllItems}
      />
      {[...productsByBrand.values()].map((data, index) => {
        return (
          <div key={index} className="bg-white rounded-lg px-2 text-sm">
            <div className="border-b-[0.5px] flex gap-3 py-2 items-center">
              <Checkbox
                id={data.brand?.id || ""}
                value={
                  checkedBrand.get(data.brand?.id || "") || isCheckedAllBox
                }
                onCheck={(val) => {
                  onSelectBrand(val, data.brand?.id || "");
                }}
              >
                <Checkbox.Indicator />
              </Checkbox>
              <Link href={""} className="flex items-center gap-2">
                <Image
                  src={data.brand?.avatarUrl || ""}
                  alt={"Brand Name"}
                  width={30}
                  height={30}
                  className="rounded-full"
                />
                <h5 className="text-sm font-semibold">
                  {data.brand?.name || ""}
                </h5>
                <MdOutlineKeyboardArrowRight className="size-4" />
              </Link>
            </div>
            {data.products.map((cartPayload, index) => {
              return (
                <ShoppingCartItem
                  key={index}
                  item="shopping-cart"
                  cartPayload={cartPayload}
                  isSelect={
                    checkedProducts.get(cartPayload.itemMdl.id) || false
                  }
                  onSelect={(val) =>
                    onSelectItem(
                      val,
                      cartPayload.itemMdl.id,
                      data.brand?.id || ""
                    )
                  }
                />
              );
            })}
            {/* TODO: Discount voucher section */}
            <DiscountVoucher />
          </div>
        );
      })}
    </div>
  );
};

const ShoppingCartHeader = ({
  isCheckedAll,
  onCheckAll,
}: ShoppingCartHeaderProps) => {
  const dispatch = useAppDispatch();

  const cartState = useAppSelector((state) => state.cart);

  const [showDeleteAllPop, setShowDeleteAllPop] = useState(false);

  const onConfirmDeleteAll = () => {
    dispatch(clearCart());
    setShowDeleteAllPop(false);
  };

  return (
    <div className="grid grid-cols-12 gap-1 items-center bg-white rounded-lg p-2 text-sm">
      <div className="col-span-6">
        <Checkbox
          id="all_checked_box"
          value={isCheckedAll}
          onCheck={onCheckAll}
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
  );
};

const DiscountVoucher = () => {
  const [vouchers, setVouchers] = useState<DiscountMdl[]>([]);

  const [showVoucher, setShowVoucher] = useState<boolean>(false);

  const [selectedVoucher, setSelectedVoucher] = useState<
    DiscountMdl[] | undefined
  >([]);

  const handleOpenPopup = () => {
    setShowVoucher(true);
  };

  const handleClosePopup = () => {
    setShowVoucher(false);
  };

  const handleApplyVoucher = (voucher: DiscountMdl[]) => {
    setSelectedVoucher(voucher);
    setShowVoucher(false);
  };

  useEffect(() => {
    getDiscountByProduct().then((data) => {
      setVouchers(data || []);
    });
  }, []);

  return (
    <div className="border-t-[0.5px] py-2 flex gap-3 items-center">
      <Button
        onClick={handleOpenPopup}
        className="flex flex-row gap-2 items-center"
      >
        <Image
          src={"/icons/voucher.svg"}
          alt={"Branch Name"}
          width={25}
          height={25}
        />
        <h5 className="text-sm font-semibold">Nhận mã giảm giá</h5>
        <MdOutlineKeyboardArrowRight className="size-4" />
      </Button>
      {showVoucher && (
        <VoucherPopup
          vouchers={vouchers}
          onClose={handleClosePopup}
          onApply={handleApplyVoucher}
        />
      )}
      {selectedVoucher ? (
        <div className="flex items-center space-x-2 text-orange-500">
          <div className="inline-flex items-center rounded-[5px] justify-center px-5 py-[2px] border border-orange-500 text-orange-500 bg-[#fff5e8] relative">
            <span className="font-medium">
              {/* TODO: enhance later */}
              Đã giảm {" "}
            </span>
            <div className="absolute -left-[0.05rem] top-1/2 transform -translate-y-1/2 bg-[#fff5e8] w-2 h-3 rounded-r-full border border-orange-500 border-l-0"></div>
            <div className="absolute -right-[0.08rem] top-1/2 transform -translate-y-1/2 bg-[#fff5e8] w-2 h-3 rounded-l-full border border-orange-500 border-r-0"></div>
          </div>
        </div>
      ) : (
        <span>Vui lòng chọn mã ưu đãi</span>
      )}
    </div>
  );
};

export default ShoppingCart;
