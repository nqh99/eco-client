import React, { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import Button from "@/components/elements/Button";
import Input from "../../elements/CustomizableInput"; 
import AuthForm from "../../elements/AuthComponent";
import { MdCheckCircle } from "react-icons/md";

interface ForgotPasswordModalProps {
  onClose: () => void;
}

export default function ForgotPasswordModal({ onClose }: ForgotPasswordModalProps) {
  const [contact, setContact] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isEmail, setIsEmail] = useState(false);

  const handleForgotPassword = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\d{10,11}$/;

    if (emailPattern.test(contact)) {
      setIsEmail(true);
      setError("");
      setSuccess(true);
    } else if (phonePattern.test(contact)) {
      setIsEmail(false);
      setError("");
      setSuccess(true);
    } else {
      setError("Vui lòng nhập email hoặc số điện thoại hợp lệ");
    }
  };

  if (success) {
    return (
      <AuthForm isVisible={true} onClose={onClose}>
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-6 text-green-800">Quên mật khẩu</h2>
          <p className="mb-4 font-roboto font-medium">
            Link lấy lại mật khẩu đã được gửi qua {isEmail ? "email" : "SĐT"} <strong>{contact}</strong>. Vui lòng kiểm tra {isEmail ? "hộp thư" : "tin nhắn"}.
          </p>
          <MdCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
        </div>
      </AuthForm>
    );
  }

  return (
    <AuthForm isVisible={true} onClose={onClose}>
      <h2 className="text-2xl font-semibold mb-6 text-green-800 text-center">Quên mật khẩu</h2>

      <div className="relative">
        <FaUserAlt className="absolute left-3 top-[1.5rem] transform -translate-y-1/2 text-gray-400 z-10" />
        <Input
          type="text"
          placeholder="Email hoặc số điện thoại"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          className="border border-gray-300 rounded-[0.525rem] p-3 pl-10 w-full"
          showErrorIcon={false}
        />
      </div>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <Button
        onClick={handleForgotPassword}
        className="bg-green-700 text-white py-2 px-4 rounded-[0.525rem] w-full font-medium"
      >
        Tiếp tục
      </Button>
    </AuthForm>
  );
}
