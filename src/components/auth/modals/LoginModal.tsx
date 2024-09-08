import React, { useState } from "react";
import { FaFacebookF, FaUserAlt, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";
import logo from "./../../../../public/images/logo.png";
import Input from "../../elements/CustomizableInput"; // Ensure this component handles className correctly
import Button from "@/components/elements/Button";

interface LoginModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function LoginModal({ isVisible, onClose }: LoginModalProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false); // State to toggle password visibility

  const handleLogin = () => {
    // Fake error handling
    if (username !== "Vy Nguyen" || password !== "correctpassword") {
      setError("Tên đăng nhập hoặc mật khẩu không đúng");
    } else {
      setError(""); // Clear error
    }
  };

  const renderInputField = (
    icon: JSX.Element,
    type: string,
    placeholder: string,
    value: string,
    onChange: React.Dispatch<React.SetStateAction<string>>,
    extraIcon?: JSX.Element
  ) => (
    <div className="relative mb-3">
      {icon}
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`border ${error ? 'border-red-500' : 'border-gray-300'} rounded-[0.525rem] p-3 pl-10 w-full`}
        showErrorIcon={false}
      />
      {extraIcon}
    </div>
  );

  const socialButtons = [
    { icon: <FaFacebookF />, className: "bg-blue-600", key: "facebook" },
    { icon: <FcGoogle size={24} />, className: "bg-gray-200", key: "google" },
  ];

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-lg relative max-w-[902px] w-full flex">
        {/* Left Image Section */}
        <div className="w-5/12 rounded-l-xl overflow-hidden">
          <Image
            src={logo}
            alt="logo vouchers"
            width={400}
            height={600}
            className="rounded-l-xl"
          />
        </div>

        {/* Right Form Section */}
        <div className="w-7/12 p-8 flex flex-col justify-center" style={{ height: "600px" }}>
          <h2 className="text-2xl font-semibold mb-6 text-green-800 text-center">Đăng nhập</h2>

          {/* Username Input */}
          {renderInputField(
            <FaUserAlt className="absolute left-3 top-[1.5rem] transform -translate-y-1/2 text-gray-400 z-10" />,
            "text",
            "Email hoặc số điện thoại",
            username,
            setUsername
          )}

          {/* Password Input */}
          {renderInputField(
            <FaLock className="absolute left-3 top-[1.5rem] transform -translate-y-1/2 text-gray-400 z-10" />,
            passwordVisible ? "text" : "password",
            "Mật khẩu",
            password,
            setPassword,
            <span
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute right-3 top-[1.5rem] transform -translate-y-1/2 cursor-pointer text-gray-400 z-10"
            >
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </span>
          )}

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <Button
            onClick={handleLogin}
            className="bg-green-700 text-white py-2 px-4 rounded-[0.525rem] w-full  font-roboto font-medium"
          >
            Đăng nhập
          </Button>

          <div className="flex justify-between mt-4 text-sm">
            <a href="#" className="text-green-700 font-roboto font-medium">Quên mật khẩu</a>
            <a href="#" className="text-green-700 font-roboto font-medium">Đăng nhập với SMS</a>
          </div>

          {/* Divider with text */}
          <div className="relative mt-6 mb-3">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500 font-roboto font-medium">Hoặc tiếp tục bằng</span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="flex justify-center space-x-4">
            {socialButtons.map((btn) => (
              <Button
                key={btn.key}
                className={`${btn.className} w-[4.75rem] h-[2.375rem] rounded-[0.525rem] text-white flex items-center justify-center`}
              >
                {btn.icon}
              </Button>
            ))}
          </div>

          <p className="mt-6 text-center text-sm font-roboto font-medium">
            Bạn chưa có tài khoản? <a href="#" className="text-green-700 font-roboto font-medium">Tạo tài khoản</a>
          </p>
        </div>

        {/* Close Button */}
        <Button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        >
          X
        </Button>
      </div>
    </div>
  );
}
