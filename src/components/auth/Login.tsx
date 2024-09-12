"use client";

import React, { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import LoginModal from "./modals/LoginModal";
import RegisterModal from "./modals/RegisterModal";
import { AiOutlineCaretDown } from "react-icons/ai";

export default function Login() {
  const [showPopup, setShowPopup] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentPath, setCurrentPath] = useState<string>("");

  // On component mount, check localStorage for login status, username, and currentPath
  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    const storedUserName = localStorage.getItem("userName");
    const storedCurrentPath = localStorage.getItem("currentPath");

    if (storedIsLoggedIn === "true" && storedUserName) {
      setIsLoggedIn(true);
      setUserName(storedUserName);
    }

    if (storedCurrentPath) {
      setCurrentPath(storedCurrentPath);
    }
  }, []);

  // Toggle modal visibility
  const togglePopup = (isRegister = false) => {
    setIsRegisterMode(isRegister);
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
    localStorage.removeItem("currentPath"); // Remove stored path on logout
  };

  // Handle navigation click, save the clicked path to localStorage
  const handleLinkClick = (path: string) => {
    setCurrentPath(path);
    localStorage.setItem("currentPath", path); // Store the new path in localStorage
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
                    href="/account/profile"
                    className={`flex items-center p-2 text-gray-700 hover:bg-green-50 ${
                      currentPath === "/account/profile" ? "text-green-700" : ""
                    }`}
                    onClick={() => handleLinkClick("/account/profile")} // Set current path in localStorage
                  >
                    <FaUser className="mr-2 text-green-700" /> Quản lý tài khoản
                  </a>
                  <a
                    href="/account/orders"
                    className={`flex items-center p-2 text-gray-700 hover:bg-gray-50 ${
                      currentPath === "/account/orders" ? "text-green-700" : ""
                    }`}
                    onClick={() => handleLinkClick("/account/orders")} // Set current path in localStorage
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
      {showPopup &&
        (isRegisterMode ? (
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
        ))}
    </div>
  );
}
