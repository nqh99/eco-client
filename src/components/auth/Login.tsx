"use client";

import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import LoginModal from "./modals/LoginModal";

export default function Login() {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
    console.log("Popup state: ", !showPopup);
  };

  return (
    <div className="relative">
      <div className="flex items-center space-x-2">
        {/* Icon Button */}
        <button
          id="basic-button"
          aria-label="open login menu"
          aria-haspopup="true"
          className="p-2 focus:outline-none bg-emerald-50 w-10 h-10 rounded-full flex justify-center items-center"
          onClick={togglePopup}
        >
          <FaUser className="text-green-700 text-lg" />
        </button>

        {/* Login/Register Links */}
        <div className="flex flex-col">
          <a href="#" className="text-black font-semibold" onClick={togglePopup}>
            Đăng nhập/
          </a>
          <a href="#" className="text-gray-500">
            Đăng ký
          </a>
        </div>
      </div>

      {/* Chỉ hiển thị LoginModal khi showPopup là true */}
      {showPopup && <LoginModal isVisible={showPopup} onClose={togglePopup} />}
    </div>
  );
}
