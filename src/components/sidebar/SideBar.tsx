import React from "react";
import Image from "next/image";

import menuIcon from "@/public/icons/icon-menu.svg";
import chevronDownIcon from "@/public/icons/chevron-down-white.svg";

const SideBar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex flex-col w-full h-[calc(100vh-9rem)] gap-2">
      <div className="w-full h-12 flex flex-row justify-around items-center bg-[#1E6B0A] rounded-md">
        <Image src={menuIcon} alt="icon menu" />
        <p className="tx-white font-medium ">Danh mục sản phẩm</p>
        <Image src={chevronDownIcon} alt="icon chevron down" />
      </div>
      <div className="relative w-full h-full flex flex-col gap-2 rounded-md items-center p-2 bg-[#FFFFFF] overflow-x-hidden overflow-y-auto no-scrollbar">
        {children}
      </div>
    </div>
  );
};

export default SideBar;
