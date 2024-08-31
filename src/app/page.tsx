import {
  getBestSellingProducts,
  getNewProducts,
  getTopDealProducts,
} from "@/apis/product";
import AdsBanner from "@/components/elements/AdsBanner";
import CartItem from "@/components/elements/CartItem";
import ProductTitle from "@/components/elements/ProductTitle";
import HeroSlider from "@/components/heroslider/HeroSlider";
import StackedList from "@/components/list/StackedList";
import SideBar from "@/components/sidebar/SideBar";
import CartItemMdl from "@/models/products/card-item";
import React from "react";

const HomePage = async () => {
  const topDealProducts = await getTopDealProducts(true);

  const bestSellingProducts = await getBestSellingProducts(true);

  const newProducts = await getNewProducts(true);

  return (
    <main className="p-10">
      <div className="flex flex-row gap-5 overflow-visible">
        {/* Sidebar section */}
        <div className="w-[25%] sticky top-0 left-0 h-fit">
          <SideBar></SideBar>
          <AdsBanner
            imgURL="/images/maps-ads.png"
            imgWidth={163}
            imgHeight={116}
            position="bottom right"
            className="bg-[#FFA439] h-44 mt-3"
          >
            <span className="absolute block text-white font-bold text-base font-sansita w-1/3 top-3 left-2">
              Giao hàng đúng giờ, không lo chờ đợi
            </span>
          </AdsBanner>
        </div>

        <div className="w-[75%] flex flex-col gap-5">
          {/* Hero Images section */}
          <HeroSlider />
          <div className="bg-white rounded-lg p-4 shadow-inner">
            <ProductTitle title="Top Deal - Siêu rẻ" style="hot" href="" />
            <StackedList>
              {topDealProducts &&
                topDealProducts.map((item: CartItemMdl) => (
                  <CartItem
                    key={item.id}
                    itemMdl={item}
                    href={`/product/${item.name}?productID=${item.id}`}
                  />
                ))}
            </StackedList>
          </div>
          {/* Advertisement section */}
          <div className="flex flex-row gap-4 justify-between">
            <AdsBanner
              imgURL={"/images/market-ads.png"}
              imgWidth={140}
              imgHeight={70}
              position="bottom right"
              className="bg-[#FFF7DD] h-48 w-full"
            >
              <span className="absolute block text-green-800 font-bold text-2xl font-sansita w-11/12 top-3 left-3">
                Chia sẻ niềm vui, kết nối cảm xúc!
              </span>
            </AdsBanner>
            <AdsBanner
              imgURL="/images/fruits-store-ads.png"
              imgWidth={140}
              imgHeight={200}
              position="bottom right"
              className="bg-[#DFFFE4] h-48 w-full"
            >
              <span className="absolute block text-green-800 font-bold text-2xl font-sansita w-11/12 top-3 left-3">
                Chia sẻ niềm vui, kết nối cảm xúc!
              </span>
            </AdsBanner>
            <AdsBanner
              imgURL="/images/coffee-store-ads.png"
              imgWidth={120}
              imgHeight={50}
              position="bottom right"
              className="bg-[#DEE5FF] h-48 w-full"
            >
              <span className="absolute block text-green-800 font-bold text-2xl font-sansita w-11/12 top-3 left-3">
                Chia sẻ niềm vui, kết nối cảm xúc!
              </span>
            </AdsBanner>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-inner">
            <ProductTitle title="Sản phẩm bán chạy" style="normal" href="" />
            <StackedList>
              {bestSellingProducts &&
                bestSellingProducts.map((item: CartItemMdl) => (
                  <CartItem
                    key={item.id}
                    itemMdl={item}
                    href={`/product/${item.name}?productID=${item.id}`}
                  />
                ))}
            </StackedList>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-inner">
            <ProductTitle title="Sản phẩm mới" style="normal" href="" />
            <StackedList>
              {newProducts &&
                newProducts.map((item: CartItemMdl) => (
                  <CartItem
                    key={item.id}
                    itemMdl={item}
                    href={`/product/${item.name}?productID=${item.id}`}
                  />
                ))}
            </StackedList>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
