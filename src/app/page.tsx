import React from "react";
import CartItem from "@/components/elements/CartItem";
import StackedList from "@/components/list/StackedList";

export default function Home() {
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
    <main className="px-8">
      <StackedList title="Hot Deal">{renderedCartItems.map((e) => e)}</StackedList>
    </main>
  );
}
