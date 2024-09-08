import React, { useState } from "react";
import { FaUserAlt, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import Button from "@/components/elements/Button";
import Input from "../../elements/CustomizableInput";
import AuthForm from "../../elements/AuthComponent";
import ForgotPasswordModal from "./ForgotPasswordModal";
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import SignInWithSmsModal from "../modals/SignInWithSmsModal";

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  onLoginSuccess: (username: string) => void; // Callback when login succeeds
}

export default function LoginModal({ isVisible, onClose, onLoginSuccess }: ModalProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [forgotPasswordVisible, setForgotPasswordVisible] = useState(false);
  const [smsLoginVisible, setSmsLoginVisible] = useState(false); // State to handle SMS login modal visibility

  const handleLogin = () => {
    // Fake login check for demonstration purposes
    if (username !== "Vy Nguyen" || password !== "123456") {
      setError("Tên đăng nhập hoặc mật khẩu không đúng");
    } else {
      setError("");
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", username); // Store username
      onLoginSuccess(username); // Call the onLoginSuccess callback with username
    }
  };

  const socialButtons = [
    { icon: <FaFacebookF />, className: "bg-blue-600", key: "facebook" },
    { icon: <FcGoogle size={24} />, className: "bg-gray-200", key: "google" },
  ];

  return (
    <>
      {/* Show login modal if user is not logged in */}
      {!forgotPasswordVisible && !smsLoginVisible && (
        <AuthForm isVisible={isVisible} onClose={onClose}>
          <h2 className="text-2xl font-semibold mb-6 text-green-800 text-center">Đăng nhập</h2>

          {/* Username Input */}
          <div className="relative mb-3">
            <FaUserAlt className="absolute left-3 top-[1.5rem] transform -translate-y-1/2 text-gray-400 z-10" />
            <Input
              type="text"
              placeholder="Email hoặc số điện thoại"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`border ${error ? 'border-red-500' : 'border-gray-300'} rounded-[0.525rem] p-3 pl-10 w-full`}
              showErrorIcon={false}
            />
          </div>

          {/* Password Input */}
          <div className="relative mb-3">
            <FaLock className="absolute left-3 top-[1.5rem] transform -translate-y-1/2 text-gray-400 z-10" />
            <Input
              type={passwordVisible ? "text" : "password"}
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`border ${error ? 'border-red-500' : 'border-gray-300'} rounded-[0.525rem] p-3 pl-10 w-full`}
              showErrorIcon={false}
            />
            <span
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute right-3 top-[1.5rem] transform -translate-y-1/2 cursor-pointer text-gray-400 z-10"
            >
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <Button
            onClick={handleLogin}
            className="bg-green-700 text-white py-2 px-4 rounded-[0.525rem] w-full font-medium"
          >
            Đăng nhập
          </Button>

          <div className="flex justify-between mt-4 text-sm">
            <a
              href="#"
              onClick={() => setForgotPasswordVisible(true)}
              className="text-green-700 font-medium"
            >
              Quên mật khẩu
            </a>
            <a
              href="#"
              onClick={() => setSmsLoginVisible(true)} // Show SMS login modal
              className="text-green-700 font-medium"
            >
              Đăng nhập với SMS
            </a>
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
        </AuthForm>
      )}

      {/* Show ForgotPasswordModal if forgotPasswordVisible is true */}
      {forgotPasswordVisible && (
        <ForgotPasswordModal onClose={() => setForgotPasswordVisible(false)} />
      )}

      {/* Show SignInWithSmsModal if smsLoginVisible is true */}
      {smsLoginVisible && (
        <SignInWithSmsModal isVisible={smsLoginVisible} onClose={() => setSmsLoginVisible(false)} />
      )}
    </>
  );
}
