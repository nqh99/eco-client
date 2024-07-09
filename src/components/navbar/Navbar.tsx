"use client";
import React, { useEffect, useState } from "react";
import SearchBar from "@/components/elements/SearchBar";
import MiniNavbar from "@/components/navbar/MiniNavbar";
import Login from "@/components/elements/Login";
import Cart from "@/components/elements/Cart";
import Language from "@/components/elements/Language";
import Notification from "@/components/elements/Notification";
import Logo from "@/components/elements/Logo";

//======= import image ======== //
// import logoHHB from "../../../public/images/others/logo-hhb.png";
import NavLink from "./NavLink";

const Navbar = () => {
  return (
    <header
      className={`navbar-header block w-full min-w-[320px] fixed top-0 z-50 shadow-md bg-[rgba(255,255,255,0.9)] `}
    >
      <MiniNavbar />
      <nav
        className={`flex flex-row h-28 px-8 z-50 max-w-[2560px] mx-auto w-full ]`}
      >
        <Logo />
        <div className="frame-nav w-[80%] flex flex-col">
          <div className="relative flex w-full gap-[5%] h-[65%] justify-between items-center">
            <SearchBar />
            <div className="relative flex flex-row w-[35%] h-full gap-5 justify-center items-center">
              <Notification />
              <Cart />
              <Login />
              <Language />
            </div>
          </div>
          {/* <MobileSearchBar /> */}
          <div className="flex justify-start h-[35%] items-center">
            <NavLink />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
