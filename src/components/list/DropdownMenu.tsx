"use client";

import React from "react";
import Button from "../elements/Button";

interface DropdownMenuProps {
  title: string | React.ReactNode;
  items: React.ReactNode[];
  anchor: "bottom start" | "bottom end"
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ title, items }) => {
  return (
    <div className="">
      <Button whileHover={{ scale: 1 }}>
        {typeof title === "string" ? (
          <>
            {title}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-4"
            >
              <path
                fillRule="evenodd"
                d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </>
        ) : (
          title
        )}
      </Button>
      <div className="flex flex-col w-52 origin-top-right rounded-xl border border-white/5 bg-white/5 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0">
        {items.map((item) => (
          item
        ))}
      </div>
    </div>
  );
};

export default DropdownMenu;
