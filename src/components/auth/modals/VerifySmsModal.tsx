import React, { useState, useEffect } from "react";
import Button from "@/components/elements/Button";
import Input from "../../elements/CustomizableInput"; 
import AuthForm from "../../elements/AuthComponent";

interface VerifySmsModalProps {
  phoneNumber: string;
  email?: string;
  onClose: () => void;
}

export default function VerifySmsModal({ phoneNumber, email, onClose }: VerifySmsModalProps) {
  const [smsCode, setSmsCode] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(30); // Thời gian đếm ngược để gửi lại mã
  const correctCode = "123456"; // Mã xác thực đúng, giả định cho demo

  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeRemaining]);

  const handleVerify = () => {
    if (smsCode.join("") === "") {
      setError("Vui lòng nhập mã xác thực.");
    } else if (smsCode.join("") !== correctCode) {
      setError("Mã xác thực không chính xác. Vui lòng thử lại.");
    } else {
      setError("");
      alert("Xác thực thành công!");
      onClose();
    }
  };

  const handleInputChange = (index: number, value: string) => {
    if (/^[0-9]$/.test(value) || value === "") {
      const newCode = [...smsCode];
      newCode[index] = value;
      setSmsCode(newCode);
    }
  };

  const handleResendCode = () => {
    if (timeRemaining === 0) {
      setTimeRemaining(30); // Đặt lại thời gian đếm ngược
    }
  };

  return (
    <AuthForm isVisible={true} onClose={onClose}>
      <h2 className="text-2xl font-semibold mb-6 text-green-800 text-center">Nhập mã xác minh</h2>
      <p className="text-center mb-4">
        Email <strong>{email}</strong> đã có tài khoản. Vui lòng xác thực để đăng nhập.
      </p>

      {/* Mã xác minh (6 ô số) */}
      <div className="flex justify-center space-x-2 mb-6">
        {smsCode.map((code, index) => (
          <Input
            key={index}
            type="text"
            maxLength={1}
            value={code}
            onChange={(e) => handleInputChange(index, e.target.value)}
            className="w-10 h-12 text-center text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            showErrorIcon={false}
          />
        ))}
      </div>

      {/* Thông báo lỗi */}
      {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

      {/* Nút gửi lại mã */}
      <div className="flex justify-center items-center mb-4">
        {timeRemaining === 0 ? (
          <Button onClick={handleResendCode} className="text-green-700 font-medium">
            Gửi lại mã
          </Button>
        ) : (
          <p className="text-gray-500">Gửi lại mã sau {timeRemaining}s</p>
        )}
      </div>

      <Button
        onClick={handleVerify}
        className="bg-green-700 text-white py-2 px-4 rounded-[0.525rem] w-full font-medium"
      >
        Tiếp tục
      </Button>

      <div className="flex justify-center mt-4 text-sm">
        <p className="text-gray-500">
          Hoặc gửi mã qua số điện thoại <strong>{phoneNumber}</strong>
        </p>
      </div>
    </AuthForm>
  );
}
