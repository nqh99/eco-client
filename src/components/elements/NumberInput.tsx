"use client";

import { Button, Input } from "@headlessui/react";
import clsx from "clsx";
import React, { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { motion as m } from "framer-motion";

const NumberInput = () => {
  const [val, setVal] = useState(0);

  const increase = (e: any) => {
    setVal((prev) => prev + 1);
  };

  const decrease = (e: any) => {
    if (val - 1 < 0) {
      return;
    }
    setVal((prev) => prev - 1);
  };

  return (
    <div className="flex flex-row gap-2 items-center justify-start w-full h-full">
      <Button
        as={m.button}
        whileTap={{ scale: 0.9 }}
        onClick={decrease}
        className="bg-slate-100 rounded w-10 h-9 flex items-center justify-center data-[hover]:bg-slate-200 shadow-inner"
      >
        <FaMinus />
      </Button>
      <Input
        type="number"
        value={val}
        min={0}
        onChange={(e) => setVal(parseInt(e.target.value))}
        required
        name="Buy Quantity Input"
        className={clsx(
          "block border border-slate-300 rounded w-20 h-9 py-1.5 px-3 text-sm/6 no-spinner",
          "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
        )}
      ></Input>
      <Button
        as={m.button}
        whileTap={{ scale: 0.9 }}
        onClick={increase}
        className="bg-slate-100 rounded w-10 h-9 flex items-center justify-center data-[hover]:bg-slate-200 shadow-inner"
      >
        <FaPlus />
      </Button>
    </div>
  );
};

export default NumberInput;
