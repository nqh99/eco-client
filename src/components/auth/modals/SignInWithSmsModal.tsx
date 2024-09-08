import React, { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import Button from "@/components/elements/Button";
import Input from "../../elements/CustomizableInput"; 
import AuthForm from "../../elements/AuthComponent";
import VerifySmsModal from "./VerifySmsModal";
interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function SignInWithSmsModal({ isVisible, onClose }: ModalProps) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [verifySmsVisible, setVerifySmsVisible] = useState(false); // Kiểm tra xem modal mã xác thực có hiển thị hay không

  const handleSubmit = () => {
    if (phoneNumber === "") {
      setError("Vui lòng nhập số điện thoại.");
    } else {
      // Giả định gửi mã xác thực
      setError("");
      setVerifySmsVisible(true); // Hiển thị modal nhập mã xác thực
    }
  };

  return (
    <>
      {/* Hiển thị modal nhập số điện thoại */}
      {!verifySmsVisible && (
        <AuthForm isVisible={isVisible} onClose={onClose}>
          <h2 className="text-2xl font-semibold mb-6 text-green-800 text-center">Đăng nhập với SMS</h2>

          {/* Nhập số điện thoại */}
          <div className="relative mb-3">
            <FaUserAlt className="absolute left-3 top-[1.5rem] transform -translate-y-1/2 text-gray-400 z-10" />
            <Input
              type="text"
              placeholder="Số điện thoại"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className={`border ${error ? 'border-red-500' : 'border-gray-300'} rounded-[0.525rem] p-3 pl-10 w-full`}
            />
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <Button
            onClick={handleSubmit}
            className="bg-green-700 text-white py-2 px-4 rounded-[0.525rem] w-full font-medium"
          >
            Tiếp tục
          </Button>
        </AuthForm>
      )}

      {/* Hiển thị modal nhập mã xác thực */}
      {verifySmsVisible && (
        <VerifySmsModal phoneNumber={phoneNumber} onClose={() => setVerifySmsVisible(false)} />
      )}
    </>
  );
}
