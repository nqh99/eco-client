"use client";

import { motion } from "framer-motion";
import React from "react";

const container = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      stiffness: 100,
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

export default function MiniNavbar() {
  return (
    <nav className="relative block h-8 text-[0.65rem] text-white w-full bg-[#1E6B0A]">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative h-full max-w-[2560px] flex justify-end items-center mx-auto"
      >
        <motion.div variants={item} className="relative h-full w-full ">
          <p className="h-full items-center justify-center px-7 flex text-[16px]">
            Sức khoẻ - tiện ích cho mọi nhà{" "}
          </p>
        </motion.div>
      </motion.div>
    </nav>
  );
}
