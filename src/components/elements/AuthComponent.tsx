import React from "react";
import Image from "next/image";
import logo from "@/public/images/logo.png";
import Button from "@/components/elements/Button";

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode; 
}

export default function Modal({ isVisible, onClose, children }: ModalProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-lg relative max-w-[902px] w-full flex">
        {/* Left Image Section */}
        <div className="w-5/12 rounded-l-xl overflow-hidden">
          <Image
            src={logo}
            alt="logo vouchers"
            width={400}
            height={600}
            className="rounded-l-xl"
          />
        </div>

        {/* Right Form Section */}
        <div className="w-7/12 p-8 flex flex-col justify-center" style={{ height: "600px" }}>
          {children}
        </div>

        {/* Close Button */}
        <Button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        >
          X
        </Button>
      </div>
    </div>
  );
}
