import React from "react";
import Image from "next/image";

interface PopupProps {
  show: boolean;
  title: string;
  imageUrl?: string;
  children?: React.ReactNode[];
}

const Popup = ({ show, title, imageUrl, children }: PopupProps) => {
  if (!show) return;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-slate-900 bg-opacity-40 z-50">
      <div className="w-96 h-64 bg-white p-6 rounded-md text-center shadow-2xl">
        <p className="mb-4 text-lg text-primary font-semibold">{title}</p>
        {imageUrl && (
          <Image
            src={imageUrl}
            alt="popup image"
            width={70}
            height={70}
            className="mx-auto mb-4"
          />
        )}
        <div className="flex flex-row justify-center items-center gap-4 mt-4 font-medium">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Popup;
