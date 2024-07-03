import React, { MouseEventHandler } from "react";
import Image, { StaticImageData } from "next/image";
//interface
interface props {
  imageIcon?: string | StaticImageData | any;
  alt?: string;
  classNameButton?: string;
  classNameImage?: string;
  titleItem?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
}

const DropDownItem = ({
  imageIcon,
  alt,
  classNameButton,
  classNameImage,
  titleItem,
  handleClick,
}: props) => {
  return (
    <button
      aria-label={`${alt}`}
      onClick={handleClick}
      className={`${classNameButton}`}
    >
      <Image
        src={imageIcon}
        alt="login icon"
        width={16}
        height={16}
        className={`${classNameImage}`}
      />
      <p>{titleItem}</p>
    </button>
  );
};

export default DropDownItem;
