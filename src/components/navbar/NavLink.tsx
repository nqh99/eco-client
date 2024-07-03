import React from "react";
import LinkItem from "../elements/LinkItem";

//type linkNav
type linkNav = {
  links: string;
  href: string;
};
// data linkNav
const itemNavLink: Array<linkNav> = [
  { links: "Coffee", href: "Coffee" },
  { links: "Yến", href: "yen" },
  { links: "Thực phẩm", href: "thucpham" },
  { links: "Trái cây", href: "traicay" },
  { links: "Mặt nạ", href: "matna" },
  { links: "Rượu", href: "ruou" },
  { links: "Dầu", href: "dau" },
];

const NavLink = () => {
  return (
    <ul className={`relative flex gap-6 w-[60%] text-sm text-green-5 h-full`}>
      {itemNavLink.map((item,index) => (
        <LinkItem key={index} titleLinkItem={`${item.links}`} href={item.href} />
      ))}
    </ul>
  );
};

export default NavLink;
