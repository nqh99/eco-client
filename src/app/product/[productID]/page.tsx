import React from "react";

import AdsBanner from "@/components/elements/AdsBanner";
import Article from "@/components/elements/Article";
import NumberInput from "@/components/elements/NumberInput";
import ProductTitle from "@/components/elements/ProductTitle";
import StackedList from "@/components/list/StackedList";
import Image from "next/image";

import { Button } from "@headlessui/react";
import { CiDeliveryTruck } from "react-icons/ci";
import { GoPackageDependents } from "react-icons/go";
import { PiInfoLight } from "react-icons/pi";
import {
  getProductDetailsByID,
  getRelativeProductsByCategory,
} from "@/apis/product";
import Error from "@/app/error";
import Link from "next/link";
import CartItem from "@/components/elements/CartItem";
import CartItemMdl from "@/models/products/card-item";
import Rating from "@/components/elements/Rating";
import { formatCurrency } from "@/utils/core";

const ProductDetailPage = async ({
  params,
  searchParams,
}: {
  params: string;
  searchParams: { productID: string; categoryID: string };
}) => {
  const productData = await getProductDetailsByID(searchParams.productID);

  const relativeProducts = await getRelativeProductsByCategory(
    productData?.category.id || ""
  );

  if (productData === undefined) return <Error />;

  return (
    <main className="px-default gap-3 flex flex-col">
      {/* Sub Navigation section */}
      <div className="flex items-center gap-2 mt-5 text-start text-[#5f5f5f] text-sm font-light">
        <Link href={"/"} className="hover:text-green-900 hover:cursor-pointer">
          Trang chủ
        </Link>
        <span className="font-extralight">/</span>
        <Link href={"/"} className="hover:text-green-900 hover:cursor-pointer">
          {productData.category.name}
        </Link>
        <span className="font-extralight">/</span>
        <span className="text-[#B95A30]">{productData.name}</span>
      </div>
      <div className="flex flex-row gap-3 mt-4 overflow-visible">
        {/* Product Information section */}
        <div className="w-3/4 flex flex-col gap-3">
          <div className="flex justify-start items-start gap-4 bg-white shadow-inner p-5 rounded-xl">
            <div className="flex flex-col w-2/5">
              <div className="relative w-full h-72">
                <Image src={productData.imageUrl} alt="" fill={true} />
              </div>
              <StackedList>
                {productData.imageDetailUrl.map((img, index) => {
                  return (
                    <Image
                      key={index}
                      src={img}
                      alt={`Detail image of ${productData.name}`}
                      width={70}
                      height={70}
                      className="rounded-lg border border-lime-800"
                    />
                  );
                })}
              </StackedList>
            </div>
            <div className="w-3/5 flex flex-col justify-start items-start gap-3">
              <div className="w-full flex flex-col gap-1">
                <div className="self-stretch flex flex-row justify-between items-center">
                  <h2 className="text-2xl text-stone-950 font-medium">
                    {productData.name}
                  </h2>
                  {productData.discount && (
                    <span className="block px-1 py-1 bg-discount rounded text-white text-xs font-normal">
                      Giảm {productData.discount.discountPercent}%
                    </span>
                  )}
                </div>
                {productData.discount ? (
                  <div className="flex flex-row gap-4 items-center">
                    <span className="text-discount text-xl font-bold">
                      {formatCurrency(productData.discount.discountPrice)}{" "}
                      <u>đ</u>
                    </span>
                    <span className="text-informal text-base line-through">
                      {formatCurrency(productData.price)} đ
                    </span>
                  </div>
                ) : (
                  <span className="block text-xl font-bold">
                    {formatCurrency(productData.price)} <u>đ</u>
                  </span>
                )}
                <div className="inline-flex flex-row mt-2 gap-3 items-center">
                  <Rating
                    avgRating={productData.averageRating}
                    className="text-yellow-400 size-5"
                  />
                  <div className="relative flex gap-6">
                    <span className="text-lime-800 text-sm font-normal font-[Inter] leading-normal">
                      (Đánh giá {productData.quantityAvailable})
                    </span>
                    <span className="relative top-[2px] w-[0.5px] block border-l-[0.5px] border-gray-500 h-4"></span>
                    <span className="text-informal text-sm font-normal font-[Inter] leading-normal">
                      Đã bán {productData.quantitySold}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col mt-2 w-full">
                <h6 className="text-xl font-medium">Thông tin chi tiết</h6>
                <div className="items-center gap-2 inline-flex">
                  <span className="block w-2/6 text-informal">Thương hiệu</span>
                  <span>{productData.origin}</span>
                </div>
                <div className="items-center gap-2 inline-flex">
                  <span className="block w-2/6 text-informal">Xuất sứ</span>
                  <span>{productData.origin}</span>
                </div>
                <div className="items-center gap-2 inline-flex ">
                  <span className="block w-2/6 text-informal">Thành phần</span>
                  <span>{productData.ingredient}</span>
                </div>
                <div className="items-center gap-2 inline-flex">
                  <span className="block w-2/6 text-informal">Hạn sử dụng</span>
                  <span>{productData.expirationDate}</span>
                </div>
                <div className="items-center gap-2 inline-flex">
                  <span className="block w-2/6 text-informal">Bảo hành</span>
                  <span>{productData.warranty}</span>
                </div>
              </div>
              <div className="overflow-auto">
                <h2 className="text-xl font-medium">Mô tả sản phẩm</h2>
                <Article slice={1} className="">
                  <span>
                    Đặc trưng của Sparkling là có tiếng nổ và sủi bọt khí sau
                    khi mở khui và rót ra ly. Đây là một trong các loại vang
                    được dùng trong các buổi tiệc tùng sôi nổi, sinh nhật, lễ
                    hội, ăn mừng,… có nguồn gốc từ giống nho đặc biệt của người
                    Pháp, trồng thành công ở khu vực Nam Trung Bộ nước ta, cho
                    ra được những ly rượu ngon nhất, chất lượng nhất mang thương
                    hiệu The Moshav Farm. Đặc trưng của Sparkling là có tiếng nổ
                    và sủi bọt khí sau khi mở khui và rót ra ly. Đây là một
                    trong các loại vang được dùng trong các buổi tiệc tùng sôi
                    nổi, sinh nhật, lễ hội, ăn mừng,… có nguồn gốc từ giống nho
                    đặc biệt của người Pháp, trồng thành công ở khu vực Nam
                    Trung Bộ nước ta, cho ra được những ly rượu ngon nhất, chất
                    lượng nhất mang thương hiệu The Moshav Farm. Có nguồn gốc từ
                    giống nho đặc biệt của người Pháp, trồng thành công ở khu
                    vực Nam Trung Bộ nước ta, cho ra được những ly rượu ngon
                    nhất, chất lượng nhất mang thương hiệu The Moshav Farm. Đặc
                    trưng của Sparkling là có tiếng nổ và sủi bọt khí sau khi mở
                    khui và rót ra ly. Đây là một trong các loại vang được dùng
                    trong các buổi tiệc tùng sôi nổi, sinh nhật, lễ hội, ăn
                    mừng,…
                  </span>
                  <AdsBanner
                    imgURL="/images/product-detail.png"
                    position="full"
                    className="h-56"
                  />
                  <span>
                    Có nguồn gốc từ giống nho đặc biệt của người Pháp, trồng
                    thành công ở khu vực Nam Trung Bộ nước ta, cho ra được những
                    ly rượu ngon nhất, chất lượng nhất mang thương hiệu The
                    Moshav Farm.
                  </span>
                  <span>
                    Đặc trưng của Sparkling là có tiếng nổ và sủi bọt khí sau
                    khi mở khui và rót ra ly. Đây là một trong các loại vang
                    được dùng trong các buổi tiệc tùng sôi nổi, sinh nhật, lễ
                    hội, ăn mừng,…
                  </span>
                </Article>
              </div>
            </div>
          </div>
          {/* Review and Rating section */}
          <div className="bg-white shadow-inner h-96 p-5 rounded-xl justify-center items-center flex">
            <div className="flex-col justify-center items-center gap-6 flex">
              <Image
                src={"/images/rating.png"}
                alt="Rating Image"
                width={100}
                height={100}
              />
              <div className="self-stretch h-[53px] flex-col justify-start items-center gap-2 flex">
                <span className="text-center text-xl font-medium">
                  Chưa có thông tin đánh giá
                </span>
                <span className="text-[#6b6b7c] text-base font-normal leading-snug">
                  Chọn mua sản phẩm để trở thành người đầu tiên đánh giá sản
                  phẩm
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* User Order Information section */}
        <div className="w-1/4 inline-flex flex-col gap-4 sticky h-fit top-0 right-0">
          <div className="bg-white rounded-xl shadow-inner p-4 flex flex-col gap-4">
            <div className="p-2.5 border-b border-slate-300 justify-start items-center gap-3 inline-flex">
              <Image
                src={productData.brand.avatarUrl}
                alt="Brand Logo Icon"
                className="rounded-full"
                width={40}
                height={40}
              ></Image>
              <span className="block text-base">{productData.brand.name}</span>
            </div>
            <div className="mb-2">
              <h6>Số lượng</h6>
              <NumberInput />
            </div>
            <div>
              <span className="block">Tạm tính</span>
              <span className="block font-medium text-2xl mt-2">
                {formatCurrency(productData.price)}đ
              </span>
            </div>
            <div className="flex flex-row gap-3 justify-between items-center">
              <Button className="w-32 h-10 py-2 text-center text-white text-base font-medium rounded-lg  bg-discount">
                Mua ngay
              </Button>
              <Button className="w-32 h-10 py-2 rounded-lg border text-lime-800 border-lime-800 flex-col justify-center items-center gap-2.5 inline-flex">
                Thêm vào giỏ
              </Button>
            </div>
            <div className="h-[0px] border-b border-slate-300"></div>
            <div>
              <div className="flex flex-row items-center justify-between">
                <div className="flex gap-2 items-center">
                  <CiDeliveryTruck className="fill-lime-800 size-6 min-w-6" />
                  <p className="text-lime-800 text-xs">
                    Đổi trả MIỄN PHÍ trong ngày
                  </p>
                </div>
                <PiInfoLight className="size-5" />
              </div>
              <div className="flex flex-row items-center justify-between gap-2 mt-1">
                <GoPackageDependents className="fill-lime-800 size-6 min-w-6" />
                <p className="text-lime-800 text-xs text-wrap">
                  Miễn phí giao hàng các quận trung tâm TPHCM
                </p>
              </div>
            </div>
          </div>
          <AdsBanner
            imgURL="/images/tea-ads.png"
            position="full"
            className="w-full h-40"
          />
        </div>
      </div>
      {/* Relative Products section */}
      <div className="p-2 bg-white rounded-xl shadow-inner">
        <ProductTitle title="Sản phẩm liên quan" style="normal" href="" />
        <StackedList>
          {relativeProducts &&
            relativeProducts.map((item: CartItemMdl) => (
              <CartItem
                key={item.id}
                itemMdl={item}
                href={`/${item.name}?productID=${item.id}`}
              />
            ))}
        </StackedList>
      </div>

      {/* Policies section */}
      <div className="inline-flex gap-28 my-4 m-auto text-xs font-light font-serif justify-around">
        <div className="flex flex-col gap-3 items-center text-center min-w-36 w-40 rounded-lg border-[0.5px] py-2 px-3 shadow-sm">
          <Image
            src={"/icons/product-return.svg"}
            unoptimized={true}
            alt="Policies Icons"
            width={40}
            height={40}
          ></Image>
          <span>Đổi trả MIỄN PHÍ trong ngày</span>
        </div>
        <div className="flex flex-col gap-3 items-center text-center min-w-36 w-40 rounded-lg border-[0.5px] py-2 px-3 shadow-sm">
          <Image
            src={"/icons/credit-card.svg"}
            unoptimized={true}
            alt="Policies Icons"
            width={40}
            height={40}
          ></Image>
          <span>Bảo mật thanh toán</span>
        </div>
        <div className="flex flex-col gap-3 items-center text-center min-w-36 w-40 rounded-lg border-[0.5px] py-2 px-3 shadow-sm">
          <Image
            src={"/icons/free-delivery.svg"}
            unoptimized={true}
            alt="Policies Icons"
            width={40}
            height={40}
          ></Image>
          <span>Miễn phí giao hàng các quận trung tâm TPHCM</span>
        </div>
        <div className="flex flex-col gap-3 items-center text-center min-w-36 w-40 rounded-lg border-[0.5px] py-2 px-3 shadow-sm">
          <Image
            src={"/icons/assistant.svg"}
            unoptimized={true}
            alt="Policies Icons"
            width={40}
            height={40}
          ></Image>
          <span>Hỗ trợ khách hàng</span>
        </div>
      </div>
    </main>
  );
};

export default ProductDetailPage;
