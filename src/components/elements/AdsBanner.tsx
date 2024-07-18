"use client";

import clsx from "clsx";
import Image from "next/image";
import React from "react";

type AdsBannerProps = {
  imgURL: string;
  imgWidth: number;
  imgHeight: number;
  position: "top left" | "top right" | "bottom left" | "bottom right" | "full";
  children?: React.ReactNode;
  className?: string;
};

const AdsBanner = ({ className, ...props }: AdsBannerProps) => {
  return (
    <div
      className={`relative rounded-lg w-full h-full overflow-hidden shadow-inner ${
        className || ""
      }`}
    >
      <Image
        src={props.imgURL}
        alt="Advertisement banner"
        width={props.position != "full" ? props.imgWidth : undefined}
        height={props.position != "full" ? props.imgHeight : undefined}
        className={clsx(
          "absolute",
          {
            "top-2 left-2": props.position == "top left",
            "top-2 right-2": props.position == "top right",
            "bottom-2 left-2": props.position == "bottom left",
            "bottom-2 right-2": props.position == "bottom right",
            "": props.position == "full",
          }
        )}
      />
      {props.children}
    </div>
  );
};

export default AdsBanner;
