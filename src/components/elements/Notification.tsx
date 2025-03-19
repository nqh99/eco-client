'use client';

import React from 'react';

import {
  CloseButton,
  Popover,
  PopoverButton,
  PopoverPanel,
} from '@headlessui/react';
import { IoMdNotifications } from 'react-icons/io';
import Link from 'next/link';
import { GrFormClose } from 'react-icons/gr';
import { motion as m } from 'framer-motion';

export default function Notification({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <Popover>
      <PopoverButton className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 p-2 focus:outline-none data-[active]:text-white data-[hover]:text-white data-[focus]:outline-1 data-[focus]:outline-white">
        <IoMdNotifications className="size-6 text-primary" />
      </PopoverButton>
      <PopoverPanel
        transition
        anchor="bottom"
        className="flex w-96 flex-col gap-3 rounded-md bg-green-50 px-3 pt-3 text-sm/6 text-black transition duration-200 ease-in-out [--anchor-gap:12px] data-[closed]:-translate-y-1 data-[closed]:opacity-0"
      >
        <div className="flex flex-row items-center justify-between px-2 text-red-700">
          <p className="select-none text-left text-base font-light text-gray-400">
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
            className="cursor-pointer rounded-full bg-white hover:border hover:border-solid"
          >
            <GrFormClose className="size-5" />
          </CloseButton>
        </div>
        {children}
        <Link
          href={''}
          passHref
          className="border-t border-solid border-slate-200 hover:text-green-800"
        >
          <p className="p-2 text-center">Xem tất cả</p>
        </Link>
      </PopoverPanel>
    </Popover>
  );
}
