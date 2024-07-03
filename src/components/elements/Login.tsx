import React, { MouseEventHandler, useEffect, useRef, useState } from "react";
// import { useSession } from "next-auth/react";
import Image, { StaticImageData } from "next/image";
import DropDownBox from "./DropDownBox";
// import image
import avatarUser from "@/public/icons/icon-avatar.svg";
import gearIcon from "@/public/icons/config.png";
import loginIcon from "@/public/icons/sign.png";

//import module
import DropDownItem from "./DropDownItem";

interface props {
  imageIcon?: string | StaticImageData | any;
  alt?: string;
  classNameButton?: string;
  classNameImage?: string;
  titleItem?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function Login() {
  const dropdownRef = useRef<HTMLElement>(null);
  //open and close dropdown menu
  const [menu, setMenu] = useState<boolean>();
  const [userName, setUserName] = useState<string>("Vy Nguyen");

  // handle event click: button dropdown
  const handleClick = () => {
    setMenu(!menu);
  };
  // handle event close dropdown:
  const handleClose = () => {
    setMenu(false);
  };
  // innit props -> render dropdown
  const dataItemDrop: Array<props> = [
    {
      imageIcon: loginIcon,
      alt: "icon login",
      titleItem: "Sign in",
    },
    {
      imageIcon: gearIcon,
      alt: "icon my account",
      titleItem: "My account",
    },
  ];
  const listItemDropdown: React.ReactNode[] = [];
  dataItemDrop.map((element, index) => {
    listItemDropdown.push(
      <DropDownItem
        key={index}
        imageIcon={element.imageIcon}
        alt={`${element.alt}`}
        titleItem={`${element.titleItem}`}
        classNameImage={"absolute left-4 opacity-60"}
        classNameButton={
          "py-1.5 hover:bg-slate-100 w-full cursor-pointer flex items-center pl-16 relative border-b border-slate-100"
        }
      />
    );
  });

  // check target button dropdown
  useEffect(() => {
    let handler = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) {
        handleClose();
      }
    };
    // handle check target :dropdown
    let pressESC = (e: KeyboardEvent) => {
      if (menu && e.code === "Escape") {
        setMenu(false);
      }
    };

    document.addEventListener("mousedown", handler);
    document.addEventListener("keydown", pressESC);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("keydown", pressESC);
    };
  });
  return (
    <>
      <nav ref={dropdownRef} className="relative h-full">
        <button
          id="basic-button"
          aria-label="open login menu"
          aria-haspopup="true"
          onClick={handleClick}
          className={`text-gray-800 font-semibold flex gap-3 items-center w-full group h-full text-sm justify-center hover-bg-effect z-40 overflow-hidden`}
        >
          <div className="flex justify-center w-full h-10 items-center gap-2">
            <div className="relative w-10 h-10 rounded-full bg-[rgb(241,255,243)] z-10 p-[10px] justify-center items-center">
              <Image
                src={avatarUser}
                alt="user profile picture"
                className="h-full min-w-5"
              />
            </div>
            <p className="leading-4 font-semibold text-green-5 text-[.75rem] antialiased">
              {`${userName}`}
            </p>
          </div>
        </button>
        {menu && (
          <DropDownBox
            session={false}
            setMenu={setMenu}
            listDropdownItem={listItemDropdown}
          />
        )}
      </nav>
      {}
    </>
  );
}
