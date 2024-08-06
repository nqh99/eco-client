import React from "react";
import LoadingImage from "@/components/skeleton/LoadingImage";
import LoadingText from "@/components/skeleton/LoadingText";

interface LoadingCartItemProps {
  imageClassName?: string;
  textClassName?: string;
  containerClassName?: string;
}

const LoadingCartItem = ({
  imageClassName = "w-full h-48",
  textClassName = "mb-2",
  containerClassName = "",
}: LoadingCartItemProps) => (
  <div
    className={`w-56 h-80 min-w-60 max-h-80 rounded-lg box-border border-2 border-slate-50 cursor-pointer shadow-sm overflow-hidden ${containerClassName}`}
  >
    <div className="flex justify-center">
      <LoadingImage className={`rounded-full bg-blue-400 ${imageClassName}`} />
    </div>
    <div className="p-2">
      <LoadingText className={`mb-2 ${textClassName}`} />
      <LoadingText className={`mb-2 ${textClassName}`} />
      <LoadingText className={`mb-2 ${textClassName}`} />
      <LoadingText />
    </div>
  </div>
);

export default LoadingCartItem;
