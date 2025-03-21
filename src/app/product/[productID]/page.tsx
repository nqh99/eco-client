import React from 'react';

import AdsBanner from '@/components/elements/AdsBanner';
import Article from '@/components/elements/Article';
import ProductTitle from '@/components/elements/ProductTitle';
import StackedList from '@/components/collection/StackedList';
import Image from 'next/image';

import {
  getProductDetailsByID,
  getRelativeProductsByCategory,
} from '@/apis/product';
import Link from 'next/link';
import CartItem from '@/components/elements/CartItem';
import CartItemMdl from '@/models/products/card-item';
import Rating from '@/components/elements/Rating';
import { formatCurrency } from '@/utils/core';
import OrderCheckout from './components/OrderCheckout';

const ProductDetailPage = async ({
  searchParams,
}: {
  params: string;
  searchParams: { productID: string; categoryID: string };
}) => {
  // TODO: enhance later by below reason
  let productInfo: CartItemMdl | undefined;

  const productData = await getProductDetailsByID(searchParams.productID).then(
    (data) => {
      // TODO: enhance later because the business is not clear && need discus with API to optimized
      if (data) {
        productInfo = {
          id: data.id,
          name: data.name,
          price: data.price,
          imageUrl: data.imageUrl,
          discount: data.discount,
          inventories: data.inventories,
          brand: data.brand,
        };

        return data;
      }
    }
  );

  const relativeProducts = await getRelativeProductsByCategory(
    productData?.category.id || ''
  );

  // TODO: enhance later by upper reason
  if (productData === undefined || productInfo === undefined) return;

  return (
    <main className="flex flex-col gap-3 px-default">
      {/* Sub Navigation section */}
      <div className="mt-5 flex items-center gap-2 text-start text-sm font-light text-[#5f5f5f]">
        <Link href={'/'} className="hover:cursor-pointer hover:text-green-900">
          Trang chủ
        </Link>
        <span className="font-extralight">/</span>
        <Link href={'/'} className="hover:cursor-pointer hover:text-green-900">
          {productData.category.name}
        </Link>
        <span className="font-extralight">/</span>
        <span className="text-[#B95A30]">{productData.name}</span>
      </div>
      <div className="mt-4 flex flex-row gap-3 overflow-visible">
        {/* Product Information section */}
        <div className="flex w-3/4 flex-col gap-3">
          <div className="flex items-start justify-start gap-4 rounded-xl bg-white p-5 shadow-inner">
            <div className="flex w-2/5 flex-col">
              <div className="relative h-72 w-full">
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
            <div className="flex w-3/5 flex-col items-start justify-start gap-3">
              <div className="flex w-full flex-col gap-1">
                <div className="flex flex-row items-center justify-between self-stretch">
                  <h2 className="text-2xl font-medium text-stone-950">
                    {productData.name}
                  </h2>
                  {productData.discount && (
                    <span className="block rounded bg-discount px-1 py-1 text-xs font-normal text-white">
                      Giảm {productData.discount.discountPercent}%
                    </span>
                  )}
                </div>
                {productData.discount ? (
                  <div className="flex flex-row items-center gap-4">
                    <span className="text-xl font-bold text-discount">
                      {formatCurrency(productData.discount.discountPrice)}{' '}
                      <u>đ</u>
                    </span>
                    <span className="text-base text-informal line-through">
                      {formatCurrency(productData.price)} đ
                    </span>
                  </div>
                ) : (
                  <span className="block text-xl font-bold">
                    {formatCurrency(productData.price)} <u>đ</u>
                  </span>
                )}
                <div className="mt-2 inline-flex flex-row items-center gap-3">
                  <Rating
                    avgRating={productData.averageRating}
                    className="size-5 text-yellow-400"
                  />
                  <div className="relative flex gap-6">
                    <span className="font-[Inter] text-sm font-normal leading-normal text-lime-800">
                      (Đánh giá {productData.quantityAvailable})
                    </span>
                    <span className="relative top-[2px] block h-4 w-[0.5px] border-l-[0.5px] border-gray-500"></span>
                    <span className="font-[Inter] text-sm font-normal leading-normal text-informal">
                      Đã bán {productData.quantitySold}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-2 flex w-full flex-col">
                <h6 className="text-xl font-medium">Thông tin chi tiết</h6>
                <div className="inline-flex items-center gap-2">
                  <span className="block w-2/6 text-informal">Thương hiệu</span>
                  <span>{productData.origin}</span>
                </div>
                <div className="inline-flex items-center gap-2">
                  <span className="block w-2/6 text-informal">Xuất sứ</span>
                  <span>{productData.origin}</span>
                </div>
                <div className="inline-flex items-center gap-2">
                  <span className="block w-2/6 text-informal">Thành phần</span>
                  <span>{productData.ingredient}</span>
                </div>
                <div className="inline-flex items-center gap-2">
                  <span className="block w-2/6 text-informal">Hạn sử dụng</span>
                  <span>{productData.expirationDate}</span>
                </div>
                <div className="inline-flex items-center gap-2">
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
          <div className="flex h-96 items-center justify-center rounded-xl bg-white p-5 shadow-inner">
            <div className="flex flex-col items-center justify-center gap-6">
              <Image
                src={'/images/rating.png'}
                alt="Rating Image"
                width={100}
                height={100}
              />
              <div className="flex h-[53px] flex-col items-center justify-start gap-2 self-stretch">
                <span className="text-center text-xl font-medium">
                  Chưa có thông tin đánh giá
                </span>
                <span className="text-base font-normal leading-snug text-[#6b6b7c]">
                  Chọn mua sản phẩm để trở thành người đầu tiên đánh giá sản
                  phẩm
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* User Order Information section */}
        <div className="sticky right-0 top-0 inline-flex h-fit w-1/4 flex-col gap-4">
          <OrderCheckout
            brandLogo={productData.brand.avatarUrl}
            brandName={productData.brand.name}
            // TODO: need enhance - read the upper reason
            product={productInfo}
          />
          <AdsBanner
            imgURL="/images/tea-ads.png"
            position="full"
            className="h-40 w-full"
          />
        </div>
      </div>
      {/* Relative Products section */}
      <div className="rounded-xl bg-white p-2 shadow-inner">
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
    </main>
  );
};

export default ProductDetailPage;
