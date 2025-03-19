import {
  getBestSellingProducts,
  getNewProducts,
  getTopDealProducts,
} from '@/apis/product';
import AdsBanner from '@/components/elements/AdsBanner';
import CartItem from '@/components/elements/CartItem';
import ProductTitle from '@/components/elements/ProductTitle';
import HeroSlider from '@/components/heroslider/HeroSlider';
import StackedList from '@/components/collection/StackedList';
import SideBar from '@/components/sidebar/SideBar';
import CartItemMdl from '@/models/products/card-item';
import React from 'react';

const HomePage = async () => {
  const topDealProducts = await getTopDealProducts(true);

  const bestSellingProducts = await getBestSellingProducts(true);

  const newProducts = await getNewProducts(true);

  return (
    <main className="p-10">
      <div className="flex flex-row gap-5 overflow-visible">
        {/* Sidebar section */}
        <div className="sticky left-0 top-0 h-fit w-[25%]">
          <SideBar></SideBar>
          <AdsBanner
            imgURL="/images/maps-ads.png"
            imgWidth={163}
            imgHeight={116}
            position="bottom right"
            className="mt-3 h-44 bg-[#FFA439]"
          >
            <span className="absolute left-2 top-3 block w-1/3 font-sansita text-base font-bold text-white">
              Giao hàng đúng giờ, không lo chờ đợi
            </span>
          </AdsBanner>
        </div>

        <div className="flex w-[75%] flex-col gap-5">
          {/* Hero Images section */}
          <HeroSlider />
          <div className="rounded-lg bg-white p-4 shadow-inner">
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
          <div className="flex flex-row justify-between gap-4">
            <AdsBanner
              imgURL={'/images/market-ads.png'}
              imgWidth={140}
              imgHeight={70}
              position="bottom right"
              className="h-48 w-full bg-[#FFF7DD]"
            >
              <span className="absolute left-3 top-3 block w-11/12 font-sansita text-2xl font-bold text-green-800">
                Chia sẻ niềm vui, kết nối cảm xúc!
              </span>
            </AdsBanner>
            <AdsBanner
              imgURL="/images/fruits-store-ads.png"
              imgWidth={140}
              imgHeight={200}
              position="bottom right"
              className="h-48 w-full bg-[#DFFFE4]"
            >
              <span className="absolute left-3 top-3 block w-11/12 font-sansita text-2xl font-bold text-green-800">
                Chia sẻ niềm vui, kết nối cảm xúc!
              </span>
            </AdsBanner>
            <AdsBanner
              imgURL="/images/coffee-store-ads.png"
              imgWidth={120}
              imgHeight={50}
              position="bottom right"
              className="h-48 w-full bg-[#DEE5FF]"
            >
              <span className="absolute left-3 top-3 block w-11/12 font-sansita text-2xl font-bold text-green-800">
                Chia sẻ niềm vui, kết nối cảm xúc!
              </span>
            </AdsBanner>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-inner">
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
          <div className="rounded-lg bg-white p-4 shadow-inner">
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
