import React from 'react';
import { getProductCategories } from '@/apis/product-category';
import { ProductCategoryMdl } from '@/models/products/category';
import Image from 'next/image';
import { CgMenuRight } from 'react-icons/cg';
import Link from 'next/link';

const SideBar = async () => {
  const productCategories = await getProductCategories();

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex h-12 w-full flex-row items-center gap-4 rounded-md bg-[#1E6B0A] px-3 py-2 shadow-inner">
        <CgMenuRight className="size-5 text-white/90" />
        <p className="text-base font-medium text-white">Danh mục sản phẩm</p>
      </div>
      <ul className="flex flex-col gap-2 overflow-x-hidden rounded-md bg-[#FFFFFF] p-3 shadow-inner">
        {productCategories
          ? productCategories.map((category: ProductCategoryMdl) => (
              <li key={category.id}>
                <Link
                  href={''}
                  className="flex w-full flex-row content-start items-center gap-4 p-2 hover:cursor-pointer hover:rounded-md hover:bg-green-100 hover:text-green-900"
                >
                  <Image
                    src={category.iconUrl}
                    alt="Product Category Icon"
                    width={24}
                    height={24}
                  />
                  <span className="mt-0.5 block font-normal">
                    {category.name}
                  </span>
                </Link>
              </li>
            ))
          : ''}
      </ul>
    </div>
  );
};

export default SideBar;
