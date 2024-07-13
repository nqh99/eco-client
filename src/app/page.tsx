"use client";

import React from "react";
import SideBar from "@/components/sidebar/SideBar";

export default function Home() {
  return (
    <main className="relative max-w-[2560px] flex min-h-screen flex-row justify-center gap-[3%] mx-auto w-full pb-36 pt-40 px-16">
      {/* //sidebar */}
      <div className="flex w-[20%]">
        <SideBar />
      </div>
      {/* //main */}
      <div className="flex w-[77%] h-[calc(100vh-10rem)] bg-green-400">
        MAIN BODY
      </div>
    </main>
  );
}
