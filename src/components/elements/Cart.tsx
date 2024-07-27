"use client";

import { useEffect, useState } from "react";
import React from "react";
import { motion } from "framer-motion";

import { FaCartShopping } from "react-icons/fa6";

export default function Cart() {
  const [totalCartItems, setTotalCartItems] = useState<number>(0);
  function handleClick() {}
  useEffect(() => {
    
  }, []);

  return (
    <button
      onClick={handleClick}
      aria-label="open cart"
      className="relative p-2 focus:outline-none bg-emerald-50 w-10 h-10 rounded-full flex justify-center items-center"
    >
      <FaCartShopping className="text-[rgb(var(--primary-color-rgb))] size-5" />
      {totalCartItems !== 0 && (
        <motion.span
          aria-label="total items in the cart"
          className={`w-[1rem] h-[1rem] px-1 py-[1px] flex justify-center items-center font-sans rounded-full text-[0.61rem] bg-red-600 text-white absolute -top-1 -right-1`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          {totalCartItems}
        </motion.span>
      )}
    </button>
  );
}
