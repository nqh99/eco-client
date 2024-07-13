import { MouseEventHandler, useEffect, useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";
import DropDownBox from "./DropDownBox";
//import module
// ======== import icon / image ======= //
import iconChevronDown from "@/public/icons/chevron-down.svg";
import iconLanguageVN from "@/public/icons/icon-laguage.svg";
import iconLanguageUSA from "@/public/icons/icon-laguage-usa.svg";
import DropDownItem from "./DropDownItem";

//interface
interface props {
  imageIcon?: string | StaticImageData | any;
  alt?: string;
  classNameButton?: string;
  classNameImage?: string;
  titleItem?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
}
export default function Language() {
  const dropdownRef = useRef<HTMLElement>(null);

  //open and close dropdown menu
  const [menu, setMenu] = useState<boolean>();
  //handle event: click item language -> selection language
  function handleClick() {
    setMenu(!menu);
    console.log("event language");
  }
  const handleClose = () => {
    setMenu(false);
  };
  // check target dropdown
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

  //data dropdown language
  const listItemDropdown: React.ReactNode[] = [];

  const dataItemDrop: Array<props> = [
    {
      imageIcon: iconLanguageVN,
      alt: "icon language vn",
      titleItem: "Vietnamese",
    },
    {
      imageIcon: iconLanguageUSA,
      alt: "icon language english",
      titleItem: "English",
    },
  ];

  dataItemDrop.map((element, index) => {
    listItemDropdown.push(
      <DropDownItem
        key={index}
        imageIcon={element.imageIcon}
        alt={`${element.alt}`}
        titleItem={`${element.titleItem}`}
        classNameImage={"absolute left-4 w-4"}
        classNameButton={
          "py-1.5 hover:bg-slate-100 w-full cursor-pointer flex items-center pl-16 relative border-b border-slate-100"
        }
      />
    );
  });

  return (
    <>
      <nav
        ref={dropdownRef}
        className={`relative h-full flex items-center justify-center`}
      >
        <button
          onClick={handleClick}
          aria-label="open cart"
          className="h-full w-full rounded-none xl:mb-2 flex items-center justify-center z-40 xl:z-0 xl:after:bg-transparent"
        >
          <div className="relative flex flex-row w-full gap-1 h-6 justify-center items-center xl:mr-2">
            <Image
              src={iconLanguageVN}
              alt="icon shop"
              className="h-full w-full min-w-10"
            />
            {/* chevron down */}
            <Image className="" src={iconChevronDown} alt="icon chevron down" />
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
    </>
  );
}
