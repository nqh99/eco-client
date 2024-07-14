import HeroSlider from "@/components/heroslider/HeroSlider";
import SideBar from "@/components/sidebar/SideBar";
import React from "react";

export default function HomePage() {
  return (
    <main className="p-10">
      {/* //sidebar */}
      <div className="flex flex-row gap-5">
        <div className="w-[20%]">
          <SideBar></SideBar>
        </div>
        <div className="w-[80%] flex flex-col gap-5">
          <HeroSlider />
        </div>
      </div>
    </main>
  );
}
