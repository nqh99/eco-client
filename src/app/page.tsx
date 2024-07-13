import DropDownItem from "@/components/elements/DropDownItem";
import SideBar from "@/components/sidebar/SideBar";
import React from "react";

export default function Home() {
  const list: React.ReactNode[] = [];
  // create list node -> render list

  for (let i = 0; i < 15; i++) {
    list.push(
      <DropDownItem
        key={i}
        imageIcon="/public/icons/coffee.svg"
        alt="coffee"
        titleItem="Coffee"
        classNameButton="relative hover:bg-[#F1FFF3] w-full min-h-[3rem] cursor-pointer flex flex-row items-center justify-start gap-4 p-2 rounded-md"
        classNameImage="left-4 opacity-60"
      />
    );
  }

  return (
    <main className="p-10">
      {/* //sidebar */}
      <div className="flex flex-row">
        <div className="w-[20%]">
        <SideBar children={list} />
        </div>
        <div>
          Hero
        </div>
      </div>
    </main>
  );
}
