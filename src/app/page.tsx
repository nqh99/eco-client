"use client";

import { useState } from "react";
import React from "react";
import SideBar from "@/components/sidebar/SideBar";
import DropDownItem from "@/components/elements/DropDownItem";
import coffeeIcon from "@/public/icons/coffee.svg";
import HeroSlider from "@/components/heroslider/HeroSlider";
import StackedList from "@/components/list/StackedList";
import CartItem from "@/components/elements/CartItem";

export default function Home() {
  const list: React.ReactNode[] = [];
  // create list node -> render list

  const cartItems = Array.from({ length: 4 }, (_, i) => {
    <CartItem
      key={i}
      title="Top Deals"
      image="/icons/icon-laguage.png"
      soldNum={55}
      isDiscount={true}
      price={189000}
    />;
  });

  for (let i = 0; i < 15; i++) {
    list.push(
      <DropDownItem
        key={i}
        imageIcon={coffeeIcon}
        alt="coffee"
        titleItem="Coffee"
        classNameButton="relative hover:bg-[#F1FFF3] w-full min-h-[3rem] cursor-pointer flex flex-row items-center justify-start gap-4 p-2 rounded-md"
        classNameImage="left-4 opacity-60"
      />
    );
  }

  return (
    <main className="relative max-w-[2560px] flex min-h-screen flex-row justify-center gap-[3%] mx-auto w-full pb-36 pt-40 px-16">
      {/* //sidebar */}
      <div className="flex w-[20%]">
        <SideBar>{list.map((e) => e)}</SideBar>
      </div>
      <div className="flex flex-col w-[77%] h-[calc(100vh-10rem)] bg-green-400">
        <HeroSlider />
        <StackedList>
          <CartItem
            title="Top Deals"
            image="/icons/icon-laguage.png"
            discountPrice={126000}
            soldNum={55}
            isDiscount={true}
            price={189000}
          />
          <CartItem
            title="Top Deals"
            image="/icons/icon-laguage.png"
            discountPrice={126000}
            soldNum={55}
            isDiscount={true}
            price={189000}
          />
          <CartItem
            title="Top Deals"
            image="/icons/icon-laguage.png"
            discountPrice={126000}
            soldNum={55}
            isDiscount={true}
            price={189000}
          />
          <CartItem
            title="Top Deals"
            image="/icons/icon-laguage.png"
            discountPrice={126000}
            soldNum={55}
            isDiscount={true}
            price={189000}
          />
        </StackedList>
      </div>
    </main>
  );
}
