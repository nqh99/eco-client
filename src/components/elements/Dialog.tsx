"use client";

import React from "react";
import { useState } from "react";
import Button from "./Button";
import { motion as m } from "framer-motion";

export default function Dialog() {
  let [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="bg-black/20 focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white"
      >
        Open dialog
      </Button>

      {isOpen && (
        <div className="relative z-10 focus:outline-none">
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <m.div
                animate={{ x: 100 }}
                transition={{ ease: "easeOut", duration: 1 }}
                className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
              >
                <h3 className="text-base/7 font-medium text-white">
                  Payment successful
                </h3>
                <p className="mt-2 text-sm/6 text-white/50">
                  Your payment has been successfully submitted. We’ve sent you
                  an email with all of the details of your order.
                </p>
                <div className="mt-4">
                  <Button
                    className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                    onClick={() => setIsOpen(false)}
                  >
                    Got it, thanks!
                  </Button>
                </div>
              </m.div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
