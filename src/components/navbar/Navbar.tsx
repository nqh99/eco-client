import React from "react";
import SearchBar from "@/components/elements/SearchBar";
import MiniNavbar from "@/components/navbar/MiniNavbar";
import Login from "@/components/auth/Login";
import ShoppingCartPopup from "./ShoppingCartPopup";

import Language from "@/components/elements/Language";
import Notification from "@/components/elements/Notification";
import Logo from "@/components/elements/Logo";
import { ProductCategoryMdl } from "@/models/products/category";
import Link from "next/link";
import LinkItem from "../elements/LinkItem";

const Navbar = async () => {
  // TODO: will be handle in next sprint
  // const suggestionCategories = await getTopSellingProductCategories();
  const suggestionCategories: ProductCategoryMdl[] = [
    { id: "1", name: "Coffee", iconUrl: "" },
    { id: "2", name: "Yến", iconUrl: "" },
    { id: "3", name: "Thực phẩm", iconUrl: "" },
    { id: "4", name: "Trái cây", iconUrl: "" },
    { id: "5", name: "Mặt nạ", iconUrl: "" },
    { id: "6", name: "Rượu", iconUrl: "" },
    { id: "7", name: "Dầu", iconUrl: "" },
  ];

  return (
    <header
      className={`block stick w-full z-50 shadow-md bg-[rgba(255,255,255,0.9)] `}
    >
      <MiniNavbar />
      <nav
        className={`flex flex-row gap-5 h-28 px-8 z-50 max-w-[2560px] mx-auto w-full ]`}
      >
        <div className="w-[20%]">
          <Logo />
        </div>
        <div className="w-[80%] flex flex-col">
          <div className="flex flex-row w-full h-[65%] justify-between items-center">
            <SearchBar />
            <div className="flex flex-row w-[35%] h-full gap-8 justify-end items-center">
              <Notification>
                <Link href={""}>Mua coffee thành công</Link>
                <Link href={""}>Chuyển khoản thành công</Link>
                <Link href={""}>Đặt hàng thành công</Link>
              </Notification>
              <ShoppingCartPopup />
              <Login />
              <Language />
            </div>
          </div>
          <ul className="flex justify-start gap-2 h-[35%] items-center">
            {suggestionCategories.map((category: ProductCategoryMdl) => (
              <li key={category.id} className="flex items-center h-full">
                <LinkItem href={category.id}>
                  <p className="font-medium">{category.name}</p>
                </LinkItem>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
