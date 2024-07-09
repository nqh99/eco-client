import React from "react";

import Image from "next/image";

// ======== import icon / image ======= //
import iconNotification from "@/public/icons/notification-icon.svg";
type Props = {
  isSmartphone: boolean;
};

//local storage acting like a server
export default function Notification() {
  //handle event: click item notification
  function handleClick() {
    console.log("handle event notification");
  }

  return (
    <>
      <div
        className={`h-full flex items-center justify-center xl:w-[130px] xs:w-[50px]`}
      >
        <button
          onClick={handleClick}
          aria-label="open cart"
          className="h-full w-full rounded-none xl:mb-2 flex items-center justify-center xl:justify-end xl:items-end after:bg-neutral-300/50 hover-bg-effect z-40 xl:z-0 xl:after:bg-transparent"
        >
          <div className="relative flex flex-row w-full h-full justify-center items-center xl:mr-2">
            <div className="flex relative w-10 h-10 rounded-full bg-[#F1FFF3] z-10 p-[10px] justify-center items-center">
              <Image
                src={iconNotification}
                alt="icon notification"
                className="h-full min-w-5"
              />
            </div>
          </div>
        </button>
      </div>
    </>
  );
}
