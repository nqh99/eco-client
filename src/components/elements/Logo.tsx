import React from "react";
import Image from "next/image";
//import image
import logoHHB from "@/public/images/logo-hhb.png";
import Link from "next/link";
const Logo = () => {
  return (
    <>
      <Link
        aria-label="logo hhb, click to go to the homepage"
        href="/"
        className={`flex ml-8 w-[20%] items-center xl:h-full `}
      >
        <Image src={logoHHB} alt="logo HHB"></Image>
      </Link>
    </>
  );
};

export default Logo;
