// import react hook
import { useEffect, useState } from "react";
//import framer motion
import { motion } from "framer-motion";

import Image from "next/image";
// ======== import icon / image ======= //
import iconShop from "@/public/icons/shop-icon.svg";

export default function Cart() {
  // use context
  const [totalCartItems, setTotalCartItems] = useState<number>();
  //handle event: click button cart -> check login -> check cart
  function handleClick() {
    console.log("check login -> check cart");
  }
  // test total cart item //
  useEffect(() => {
    setTotalCartItems(3);
  }, []);

  return (
    <>
      <div
        className={`h-full flex items-center justify-center xl:w-[130px] xs:w-[50px]`}
      >
        <button
          onClick={handleClick}
          aria-label="open cart"
          className="h-full w-full rounded-none xl:mb-2 flex items-center justify-center xl:justify-end xl:items-end z-40 xl:z-0 xl:after:bg-transparent"
        >
          <div className="relative flex flex-row w-full h-full justify-center items-center xl:mr-2">
            <div className="relative rounded-full w-10 h-10 bg-[#F1FFF3] z-10 p-[10px]">
              <Image
                src={iconShop}
                alt="icon shop"
                className="h-full text-green-3 min-w-5"
              />
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
            </div>
          </div>
        </button>
      </div>
    </>
  );
}
