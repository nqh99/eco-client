"use client";

import { useState } from "react";
import React from "react";
import SideBar from "@/components/sidebar/SideBar";
import DropDownItem from "@/components/elements/DropDownItem";
import coffeeIcon from "@/public/icons/coffee.svg";

export default function Home() {
  const list: React.ReactNode[] = [];
  // create list node -> render list

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
      {/* //main */}
      <div className="flex w-[77%] h-[calc(100vh-10rem)] bg-green-400">
        MAIN BODY
      </div>
    </main>
  );
}
