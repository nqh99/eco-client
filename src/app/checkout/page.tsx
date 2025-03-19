'use client';

import { getTopDealProducts } from '@/apis/product';
import ShoppingCart from './components/ShoppingCart';
import AdsBanner from '@/components/elements/AdsBanner';
import CartItem from '@/components/elements/CartItem';
import ProductTitle from '@/components/elements/ProductTitle';
import CompanyPolicies from '@/components/footer/CompanyPolicies';
import StackedList from '@/components/collection/StackedList';
import { useAppSelector } from '@/hooks/redux';
import { ICartPayload } from '@/lib/types';
import CartItemMdl from '@/models/products/card-item';
import React, { useEffect, useState } from 'react';
import OrderSummary from './components/OrderSummary';
import EmptyCart from './components/EmptyCart';
import OrderCalculator from '@/utils/calculator';

const ShoppingCartPage = () => {
  const cartState = useAppSelector((state) => state.cart);

  const [cal, setCal] = useState<OrderCalculator>(new OrderCalculator());

  const [topDealProducts, setTopDealProducts] = useState<CartItemMdl[]>();

  const [checkedItems, setCheckedItems] = useState<ICartPayload[]>();

  useEffect(() => {
    getTopDealProducts(false).then((data) => {
      setTopDealProducts(data);
    });
  }, []);

  useEffect(() => {
    setCal(new OrderCalculator(cartState.items));
  }, [cartState.items]);

  return (
    <main className="flex h-fit flex-col gap-3 px-default">
      {cal.getTotalQty() > 0 ? (
        <>
          {/* Shopping Cart section with user orders */}
          <h2 className="mt-6 h-fit w-fit select-none text-xl font-semibold hover:text-primary">
            Giỏ hàng của bạn
          </h2>
          <div className="mt-3 flex flex-row gap-4 overflow-visible">
            {/* Shopping products cart */}
            <div className="flex w-3/4 min-w-[800px] flex-col gap-3 text-sm">
              <ShoppingCart
                onCheckedItems={(val) => {
                  setCheckedItems(val);
                }}
              />
            </div>
            {/* Order Summary */}
            <div className="sticky top-0 flex h-fit min-h-72 w-1/4 min-w-80 flex-col gap-4">
              <OrderSummary items={checkedItems || []} />
              <AdsBanner
                imgURL="/images/tea-ads.png"
                position="full"
                className="pointer-events-none h-40 w-full select-none"
              />
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Shopping Cart section without user orders */}
          <EmptyCart />
          {/* Top Selling Products section */}
          <div className="rounded-lg bg-white p-4 shadow-inner">
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
          <div className="rounded-lg bg-white p-4 shadow-inner">
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
