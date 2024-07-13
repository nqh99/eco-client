import React from "react";
import Image, { StaticImageData } from "next/image";
//import image
import menuIcon from "@/public/icons/icon-menu.svg";
import chevronDownIcon from "@/public/icons/chevron-down-white.svg";
import coffeeIcon from "@/public/icons/coffee.svg";
import accessoryIcon from "@/public/icons/accessory.svg";
import alcoholIcon from "@/public/icons/alcohol.svg";
import cookingOilIcon from "@/public/icons/cooking-oil.svg";
import dishWashingLiquidIcon from "@/public/icons/dishwashing-liquid.svg";
import fishSauceIcon from "@/public/icons/fish-sauce.svg";
import foodIcon from "@/public/icons/food.svg";
import fruitJuiceIcon from "@/public/icons/fruit-juice.svg";
import fruitIcon from "@/public/icons/fruit.svg";
import honeyIcon from "@/public/icons/honey.svg";
import maskIcon from "@/public/icons/mask.svg";
import oatsIcon from "@/public/icons/oats.svg";
import saltIcon from "@/public/icons/salt.svg";
import soyIcon from "@/public/icons/soy.svg";
import vinegarIcon from "@/public/icons/vinegar.svg";
import DropDownItem from "../elements/DropDownItem";

interface props {
  children?: React.ReactNode[];
}
interface Category {
  title: string;
  icon: string | StaticImageData | any;
}
const dataListCategory: Array<Category> = [
  {
    title: "Coffee",
    icon: coffeeIcon,
  },
  {
    title: "Phụ Kiện",
    icon: accessoryIcon,
  },
  {
    title: "Nước Mắm",
    icon: fishSauceIcon,
  },
  {
    title: "Dầu",
    icon: cookingOilIcon,
  },
  {
    title: "Giấm",
    icon: vinegarIcon,
  },
  {
    title: "Mật Hạt",
    icon: honeyIcon,
  },
  {
    title: "Mặt Nạ",
    icon: maskIcon,
  },
  {
    title: "Muối & Đường & Bột",
    icon: saltIcon,
  },
  {
    title: "Nước Rửa Chén",
    icon: dishWashingLiquidIcon,
  },
  {
    title: "Nước Trái Cây",
    icon: fruitJuiceIcon,
  },
  {
    title: "Nước Tương",
    icon: soyIcon,
  },
  {
    title: "Rượu",
    icon: alcoholIcon,
  },
  {
    title: "Thực Phẩm",
    icon: foodIcon,
  },
  {
    title: "Trái Cây",
    icon: fruitIcon,
  },
  {
    title: "Yến",
    icon: oatsIcon,
  },
];

const SideBar = ({ children }: props) => {
  return (
    <div className="relative flex flex-col w-full h-[calc(100vh-9rem)] gap-2">
      <div className="w-full h-12 flex flex-row justify-around items-center bg-[#1E6B0A] rounded-md">
        <Image src={menuIcon} alt="icon menu" />
        <p className="text-white font-medium ">Danh mục sản phẩm</p>
        <Image src={chevronDownIcon} alt="icon chevron down" />
      </div>
      <div className="relative w-full h-full flex flex-col gap-2 rounded-md items-center p-2 bg-[#FFFFFF] overflow-x-hidden overflow-y-auto no-scrollbar">
        {children
          ? children.map((element, index) => {
              return (
                <div key={index} className="relative w-full h-full">
                  {element}
                </div>
              );
            })
          : dataListCategory.map((element, index) => (
              <DropDownItem
                key={index}
                imageIcon={element.icon}
                alt="icon category"
                titleItem={`${element.title}`}
                classNameButton="relative hover:bg-[#F1FFF3] w-full min-h-[3rem] cursor-pointer flex flex-row items-center justify-start gap-4 p-2 rounded-md"
                classNameImage="left-4 opacity-60"
              />
            ))}
      </div>
    </div>
  );
};

export default SideBar;
