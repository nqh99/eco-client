import DropDownItem from "@/components/elements/DropDownItem";
import SideBar from "@/components/sidebar/SideBar";
import React from "react";
import CartItem from "@/components/elements/CartItem";
import StackedList from "@/components/list/StackedList";

export default function Home() {
  const list: React.ReactNode[] = [];
  // create list node -> render list

  for (let i = 0; i < 15; i++) {
    list.push(
      <DropDownItem
        key={i}
        imageIcon="/icons/coffee.svg"
        alt="coffee"
        titleItem="Coffee"
        classNameButton="relative hover:bg-[#F1FFF3] w-full min-h-[3rem] cursor-pointer flex flex-row items-center justify-start gap-4 p-2 rounded-md"
        classNameImage="left-4 opacity-60"
      />
    );
  }

  const cartItems = [
    {
      id: 1,
      image: "/icons/custom-icon.svg",
      title: "Nước mắm Vịnh Vân Phong",
      qualityStar: 4,
      soldNum: 100,
      price: 100000,
      isDiscount: true,
      discountPrice: 140000,
      discountPercent: 40,
    },
    {
      id: 2,
      image: "/icons/custom-icon.svg",
      title: "Nước mắm Vịnh Vân Phong",
      qualityStar: 4,
      soldNum: 100,
      price: 100000,
      isDiscount: true,
      discountPrice: 140000,
      discountPercent: 40,
    },
    {
      id: 3,
      image: "/icons/custom-icon.svg",
      title: "Nước mắm Vịnh Vân Phong",
      qualityStar: 4,
      soldNum: 100,
      price: 100000,
      isDiscount: true,
      discountPrice: 140000,
      discountPercent: 40,
    },
    {
      id: 4,
      image: "/icons/custom-icon.svg",
      title: "Nước mắm Vịnh Vân Phong",
      qualityStar: 4,
      soldNum: 100,
      price: 100000,
      isDiscount: true,
      discountPrice: 140000,
      discountPercent: 40,
    },
    {
      id: 5,
      image: "/icons/custom-icon.svg",
      title: "Nước mắm Vịnh Vân Phong",
      qualityStar: 4,
      soldNum: 100,
      price: 100000,
      isDiscount: true,
      discountPrice: 140000,
      discountPercent: 40,
    },
    {
      id: 6,
      image: "/icons/custom-icon.svg",
      title: "Nước mắm Vịnh Vân Phong",
      qualityStar: 4,
      soldNum: 100,
      price: 100000,
      isDiscount: true,
      discountPrice: 140000,
      discountPercent: 40,
    },
  ];

  const renderedCartItems = cartItems.map((item, i) => (
    <CartItem
      key={item.id}
      image={item.image}
      title={item.title}
      qualityStar={item.qualityStar}
      soldNum={item.soldNum}
      price={item.price}
      isDiscount={item.isDiscount}
      discountPrice={item.discountPrice}
      discountPercent={item.discountPercent}
    />
  ));

  return (
    <main className="p-10">
      {/* //sidebar */}
      <div className="flex flex-row gap-5">
        <div className="w-[20%]">
          <SideBar children={list} />
        </div>
        <div className="w-[80%]">
          
          <StackedList title="Top Deals">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                image={item.image}
                title={item.title}
                qualityStar={item.qualityStar}
                soldNum={item.soldNum}
                price={item.price}
                isDiscount={item.isDiscount}
                discountPrice={item.discountPrice}
                discountPercent={item.discountPercent}
              />
            ))}
          </StackedList>
        </div>
      </div>
    </main>
  );
}
