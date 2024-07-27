import React from "react";
import { getProductCategories } from "@/apis/product-category";
import { ProductCategoryMdl } from "@/models/products/category";
import Image from "next/image";
import { CgMenuRight } from "react-icons/cg";
import Link from "next/link";

const SideBar = async () => {
  const productCategories = await getProductCategories();

  return (
    <div className="flex flex-col w-full gap-2">
      <div className="w-full h-12 flex flex-row items-center gap-4 bg-[#1E6B0A] shadow-inner rounded-md px-3 py-2">
        <CgMenuRight className="size-5 text-white/90" />
        <p className="text-white font-medium text-base">Danh mục sản phẩm</p>
      </div>
      <ul className="flex flex-col gap-2 rounded-md p-3 bg-[#FFFFFF] shadow-inner overflow-x-hidden">
        {productCategories
          ? productCategories.map((category: ProductCategoryMdl) => (
              <li key={category.id}>
                <Link
                  href={""}
                  className="flex flex-row w-full content-start p-2 gap-4 items-center hover:bg-green-100 hover:cursor-pointer hover:rounded-md hover:text-green-900"
                >
                  <Image
                    src={category.iconUrl}
                    alt="Product Category Icon"
                    width={24}
                    height={24}
                  />
                  <span className="block mt-0.5 font-normal">
                    {category.name}
                  </span>
                </Link>
              </li>
            ))
          : ""}
      </ul>
    </div>
  );
};

export default SideBar;
