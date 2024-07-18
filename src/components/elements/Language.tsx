"use client";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Image from "next/image";
import { useState } from "react";
import { TbSquareRoundedChevronDown } from "react-icons/tb";

export default function Language() {
  const [language, setLanguage] = useState("Vietnamese");

  const languages = new Map([
    ["Vietnamese", "/icons/vn-flag.svg"],
    ["English", "/icons/usa-flag.svg"],
  ]);

  return (
    <>
      <Menu>
        <MenuButton className="flex flex-rơw items-center gap-1 shadow-inner shadow-white/10 focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white">
          <Image
            src={languages.get(language) || "/icons/vn-flag.svg"}
            alt="Language Icon"
            width={34}
            height={34}
            className="rounded min-w-7"
          />
          <TbSquareRoundedChevronDown className="size-4 min-w-3" />
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom end"
          className="flex flex-col w-40 origin-top-right p-2 gap-2 rounded-md border border-white/5 bg-green-50 transition duration-100 ease-out [--anchor-gap:12px] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          {Array.from(languages.entries()).map(([l, url]) =>
            l !== language ? (
              <MenuItem key={l}>
                <button
                  onClick={() => {
                    setLanguage(l);
                  }}
                  className="flex flex-row w-full items-center border shadow-inner p-1 gap-3 rounded-md hover:bg-stone-50 hover:text-green-900"
                >
                  <Image
                    src={url}
                    alt={`${l} Flag Icon`}
                    width={30}
                    height={30}
                  />
                  <span className="select-none">{l}</span>
                </button>
              </MenuItem>
            ) : (
              ""
            )
          )}
        </MenuItems>
      </Menu>
    </>
  );
}
