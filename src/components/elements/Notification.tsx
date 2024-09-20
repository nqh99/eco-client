"use client";

import React from "react";

import {
  CloseButton,
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import { IoMdNotifications } from "react-icons/io";
import Link from "next/link";
import { GrFormClose } from "react-icons/gr";
import { motion as m } from "framer-motion";

export default function Notification({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <Popover>
      <PopoverButton className="p-2 focus:outline-none bg-emerald-50 w-10 h-10 rounded-full flex justify-center items-center data-[active]:text-white data-[hover]:text-white data-[focus]:outline-1 data-[focus]:outline-white">
        <IoMdNotifications className="text-primary size-6" />
      </PopoverButton>
      <PopoverPanel
        transition
        anchor="bottom"
        className="flex flex-col w-96 pt-3 px-3 gap-3 rounded-md bg-green-50 text-black text-sm/6 transition duration-200 ease-in-out [--anchor-gap:12px] data-[closed]:-translate-y-1 data-[closed]:opacity-0"
      >
        <div className="flex flex-row justify-between px-2 items-center text-red-700">
          <p className="text-gray-400 text-base font-light text-left select-none">
            Thông báo mới nhận
          </p>
          <CloseButton
            as={m.div}
            initial={{ opacity: 0.6 }}
            whileHover={{
              scale: 1.2,
              transition: { duration: 1 },
            }}
            whileTap={{ scale: 0.9 }}
            whileInView={{ opacity: 1 }}
            className="rounded-full bg-white hover:border-solid hover:border cursor-pointer"
          >
            <GrFormClose className="size-5" />
          </CloseButton>
        </div>
        {children}
        <Link
          href={""}
          passHref
          className="border-solid border-t border-slate-200 hover:text-green-800"
        >
          <p className="text-center p-2">Xem tất cả</p>
        </Link>
      </PopoverPanel>
    </Popover>
  );
}
