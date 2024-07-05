"use client";

import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import React from "react";
import Link from "next/link";
import AdsBanner from "@/components/adsbanner/AdsBanner";
// import Footer from "@/components/Footer";

//test render ADSBanner
import image from "@/public/images/image-1.svg";

export default function Home() {
  return (
    <main className="max-w-[2560px] flex min-h-screen flex-col items-center gap-12 xl:gap-6 mx-auto w-full pb-36 pt-40">
      {/* // Here is a test call for rendering - ADSBanner will be called in other places such as the sidebar as the Homepage layout */}
      <div className="w-full flex flex-row gap-8">
        <AdsBanner
          image={image}
          title="Chia sẻ niềm vui, kết nối cảm xúc."
          alt="mini image"
          stylesBanner="relative flex flex-col min-w-[350px] max-w-[25vw] h-[30vh] min-h-[200px] aspect-[16/9] bg-[#FFF7DD] rounded-xl py-2 px-4 gap-4"
          stylesButton="bg-[#1E6B0A] w-28 h-10 rounded-xl flex flex-row justify-center items-center gap-2"
          stylesChillImage="w-[40%] absolute bottom-0 right-8"
          stylesTitle="text-[2rem] w-[80%] text-[#1E6B0A] font-['Roboto'] font-[600] leading-tight"
        />
      </div>
    </main>
  );
}
