"use client";

import { Button, Input } from "@headlessui/react";
import clsx from "clsx";
import React, { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { motion as m } from "framer-motion";

interface NumberInputProps {
  onValChange: (val: number) => void;
}

const NumberInput = ({ onValChange }: NumberInputProps) => {
  const [val, setVal] = useState<number>(1);

  const increaseByBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    const newVal = val + 1;
    setVal(newVal);
    onValChange(newVal);
  };

  const decreaseByBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    const newVal = val - 1;
    if (newVal <= 0) {
      return;
    }
    setVal(newVal);
    onValChange(newVal);
  };

  const handleInputValChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = parseInt(e.target.value);

    if (newVal < 1 || isNaN(newVal)) {
      setVal(0);
      onValChange(0);
      return;
    }

    setVal(newVal);
    onValChange(newVal);
  };

  return (
    <div className="flex flex-row gap-2 items-center justify-start w-full h-full">
      <Button
        as={m.button}
        whileTap={{
          scale: 0.95,
          transition: { duration: 0.1, ease: "easeInOut" },
        }}
        animate={{ scale: 1, transition: { duration: 0.3, ease: "easeInOut" } }}
        onClick={decreaseByBtn}
        className="bg-slate-100 rounded w-10 h-9 min-w-8 min-h-7 flex items-center justify-center data-[hover]:bg-slate-200 data-[hover]:text-green-900 shadow-inner"
      >
        <FaMinus />
      </Button>
      <Input
        type="number"
        value={val}
        min={0}
        onChange={handleInputValChange}
        required
        name="Buy Quantity Input"
        className={clsx(
          "block border border-slate-300 rounded w-20 h-9 min-w-20 min-h-6 py-1.5 px-3 text-sm/6 no-spinner",
          "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
        )}
      ></Input>
      <Button
        as={m.button}
        whileTap={{
          scale: 0.95,
          transition: { duration: 0.1, ease: "easeInOut" },
        }}
        animate={{ scale: 1, transition: { duration: 0.3, ease: "easeInOut" } }}
        onClick={increaseByBtn}
        className="bg-slate-100 rounded w-10 h-9 min-w-8 min-h-7 flex items-center justify-center data-[hover]:bg-slate-200 data-[hover]:text-green-900 shadow-inner"
      >
        <FaPlus />
      </Button>
    </div>
  );
};

export default NumberInput;
