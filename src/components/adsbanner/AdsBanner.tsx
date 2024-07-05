import Image from "next/image";
import React from "react";

//image test
import chevronRightIcon from "@/public/icons/chevron-right.svg";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
//interface
interface props {
  image?: string | StaticImport | any;
  title?: string;
  alt?: string;
  stylesTitle?: string;
  stylesBanner?: string;
  stylesButton?: string;
  stylesChillImage?: string;
};

const AdsBanner = ({
  image,
  alt,
  title,
  stylesBanner,
  stylesButton,
  stylesChillImage,
  stylesTitle,
}: props) => {
  // When ADSBanner is called, clear testAdsRender and pass parameters from image props,alt,title,stylesBanner,stylesButton,stylesChillImage,stylesTitle,
  return (
    <div
      className={`${
        stylesBanner
          ? stylesBanner
          : "relative flex flex-col min-w-[350px] max-w-[25vw] h-[30vh] min-h-[200px] aspect-[16/9] bg-[#FFF7DD] rounded-xl py-2 px-4 gap-4"
      }`}
    >
      <p
        className={`${
          stylesTitle
            ? stylesTitle
            : "text-[2rem] w-[80%] text-[#1E6B0A] font-['Roboto'] font-[600] leading-tight"
        }`}
      >
        {title}
      </p>
      {stylesButton && (
        <button className={stylesButton}>
          <p className="font-['Roboto'] font-[500]">Xem ngay</p>
          <Image src={chevronRightIcon} alt="chevron right icon" />
        </button>
      )}
      <Image
        src={image}
        alt={`${alt}`}
        className={`${
          stylesChillImage
            ? stylesChillImage
            : "w-[40%] absolute bottom-0 right-8"
        }`}
      />
    </div>
  );
};

export default AdsBanner;
