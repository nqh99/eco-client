"use client";

import React, { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import LoginModal from "./modals/LoginModal";
import RegisterModal from "./modals/RegisterModal"; // Import the Register Modal
import { AiOutlineCaretDown } from "react-icons/ai";

export default function Login() {
  const [showPopup, setShowPopup] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false); // State to toggle between login/register
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState(""); 
  const [showDropdown, setShowDropdown] = useState(false);

  // On component mount, check localStorage for login status and username
  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    const storedUserName = localStorage.getItem("userName");
    
    if (storedIsLoggedIn === "true" && storedUserName) {
      setIsLoggedIn(true);
      setUserName(storedUserName);
    }
  }, []);

  // Toggle modal visibility
  const togglePopup = (isRegister = false) => {
    setIsRegisterMode(isRegister); // Set the mode for register or login
    setShowPopup(!showPopup);
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLoginSuccess = (name: string) => {
    setUserName(name);
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userName", name);
    setShowPopup(false);
  };

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName("");
    setShowDropdown(false);
    localStorage.removeItem("isLoggedIn"); 
    localStorage.removeItem("userName");
  };

  return (
    <div className="relative">
      <div className="flex items-center space-x-2">
        {/* Profile Icon and Username after login */}
        {isLoggedIn ? (
          <div className="relative">
            <button
              id="profile-button"
              aria-label="toggle profile dropdown"
              aria-haspopup="true"
              className="flex items-center p-2 focus:outline-none"
              onClick={toggleDropdown}
            >
              <FaUser className="text-green-700 text-lg" />
              <span className="ml-2 font-semibold text-gray-800">{userName}</span>
              <AiOutlineCaretDown className="ml-1 text-gray-800" />
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute top-12 right-0 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <div className="flex flex-col p-2">
                  <a
                    href="#"
                    className="flex items-center p-2 text-gray-700 hover:bg-green-50"
                  >
                    <FaUser className="mr-2 text-green-700" /> Quản lý tài khoản
                  </a>
                  <a
                    href="#"
                    className="flex items-center p-2 text-gray-700 hover:bg-gray-50"
                  >
                    <span className="mr-2">📝</span> Quản lý đơn hàng
                  </a>
                  <button
                    onClick={handleLogout}
                    className="flex items-center p-2 text-gray-700 hover:bg-red-50"
                  >
                    <span className="mr-2 text-red-500">🚪</span> Đăng xuất
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <FaUser className="text-green-700 text-lg" />
            <div className="flex flex-col">
              <a href="#" className="text-black font-semibold" onClick={() => togglePopup(false)}>
                Đăng nhập/
              </a>
              <a href="#" className="text-gray-500" onClick={() => togglePopup(true)}>
                Đăng ký
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Show LoginModal or RegisterModal based on isRegisterMode */}
      {showPopup && (
        isRegisterMode ? (
          <RegisterModal
            isVisible={showPopup}
            onClose={() => setShowPopup(false)}
            onRegisterSuccess={handleLoginSuccess} // Handle successful registration similar to login
          />
        ) : (
          <LoginModal
            isVisible={showPopup}
            onClose={() => setShowPopup(false)}
            onLoginSuccess={handleLoginSuccess}
          />
        )
      )}
    </div>
  );
}
