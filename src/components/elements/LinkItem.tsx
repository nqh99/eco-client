import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// type
type customLinkItem = {
  titleLinkItem: string;
  href: string;
};

const LinkItem = ({ titleLinkItem, href }: customLinkItem) => {
  const pathname = usePathname();

  return (
    <li className="min-w-fit">
      <Link
        href={`${href}`}
        className={`group w-full px-2 h-full after:bg-[#B95A30] items-center justify-center group relative flex z-[40] ${
          pathname === `/${href}`
            ? "text-[#B95A30] relative overflow-hidden after:absolute after:w-full after:h-1 after:bottom-0 after:left-100 after:-z-10"
            : ""
        }`}
      >
        <p className="font-semibold">{titleLinkItem}</p>
      </Link>
    </li>
  );
};

export default LinkItem;
