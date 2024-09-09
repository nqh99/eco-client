import React, { useState } from "react";
import { FaUserAlt, FaEnvelope, FaLock, FaPhone, FaEye, FaEyeSlash, FaFacebookF } from "react-icons/fa"; 
import Button from "@/components/elements/Button";
import Input from "../../elements/CustomizableInput";
import AuthForm from "../../elements/AuthComponent";
import VerifySmsModal from "./VerifySmsModal";
import { FcGoogle } from "react-icons/fc";

interface RegisterModalProps {
  onClose: () => void;
}

// Simulated list of registered phone numbers
const registeredPhoneNumbers = ["0398102325", "0123456789", "0987654321"];

export default function RegisterModal({ onClose }: RegisterModalProps) {
  const [formData, setFormData] = useState({
    userName: "Vy Nguyen",
    phoneNumber: "0398102325",
    email: "vy@gmail.com",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState({ field: "", message: "" });
  const [success, setSuccess] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false); 
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateForm = () => {
    const { userName, phoneNumber, email, password, confirmPassword } = formData;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\d{10,11}$/;
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    if (!userName) return { field: "userName", message: "Tài khoản không để trống" };
    
    // Check if phone number exists in the registeredPhoneNumbers list
    if (registeredPhoneNumbers.includes(phoneNumber)) {
      return { field: "phoneNumber", message: "Số điện thoại đã tồn tại" };
    }
    
    if (!phonePattern.test(phoneNumber)) {
      return { field: "phoneNumber", message: "Số điện thoại không hợp lệ" };
    }

    if (!emailPattern.test(email)) return { field: "email", message: "Email không hợp lệ" };
    if (!passwordPattern.test(password)) return { field: "password", message: "Mật khẩu phải có ít nhất 8 ký tự bao gồm 1 chữ cái hoa, 1 chữ cái thường, và 1 số" };
    if (password !== confirmPassword) return { field: "confirmPassword", message: "Mật khẩu xác nhận không khớp" };

    return null;
  };

  const handleRegister = () => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
    } else {
      setError({ field: "", message: "" });
      setSuccess(true);
      setShowVerifyModal(true);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  if (success) {
    console.log("Registration successful!");
    return <div>Registration successful!</div>;
  }

  if (showVerifyModal) {
    const { phoneNumber, email } = formData;
    return <VerifySmsModal phoneNumber={phoneNumber} email={email} onClose={onClose} />;
  }

  const createFormInput = (icon: React.ReactNode, type: string, placeholder: string, value: string, field: string, errorField: string, inputType: string = "text", onToggleVisibility?: () => void, toggleIcon?: React.ReactNode) => (
    <div className="relative">
      {icon}
      <Input
        type={inputType}
        placeholder={placeholder}
        value={value}
        onChange={(e) => handleInputChange(field, e.target.value)}
        className={`border ${error.field === errorField ? "border-red-500" : "border-gray-300"} rounded-[0.525rem] p-3 pl-10 w-full`}
        showErrorIcon={false}
      />
      {toggleIcon && (
        <button
          type="button"
          className="absolute right-3 top-[1.5rem] transform -translate-y-1/2 text-gray-400 z-10 focus:outline-none"
          onClick={onToggleVisibility}
        >
          {toggleIcon}
        </button>
      )}
      {error.field === errorField && <p className="font-roboto text-red-500 text-sm mb-4">{error.message}</p>}
    </div>
  );

  return (
    <AuthForm isVisible={true} onClose={onClose}>
      <h2 className="text-2xl font-semibold mb-6 mt-6 text-green-800 text-center">Tạo tài khoản</h2>

      {/* Username and Phone Number Fields */}
      <div className="grid grid-cols-2 gap-4">
        {createFormInput(
          <FaUserAlt className="absolute left-3 top-[1.5rem] transform -translate-y-1/2 text-gray-400 z-10" />,
          "text",
          "Tên người dùng",
          formData.userName,
          "userName",
          "userName"
        )}
        {createFormInput(
          <FaPhone className="absolute left-3 top-[1.5rem] transform -translate-y-1/2 text-gray-400 z-10" />,
          "text",
          "Số điện thoại",
          formData.phoneNumber,
          "phoneNumber",
          "phoneNumber"
        )}
      </div>

      {/* Email Field */}
      {createFormInput(
        <FaEnvelope className="absolute left-3 top-[1.5rem] transform -translate-y-1/2 text-gray-400 z-10" />,
        "email",
        "Email",
        formData.email,
        "email",
        "email"
      )}

      {/* Password and Confirm Password Fields with Toggle Icon */}
      {createFormInput(
        <FaLock className="absolute left-3 top-[1.5rem] transform -translate-y-1/2 text-gray-400 z-10" />,
        "password",
        "Nhập mật khẩu",
        formData.password,
        "password",
        "password",
        showPassword ? "text" : "password",
        togglePasswordVisibility,
        showPassword ? <FaEyeSlash /> : <FaEye />
      )}
      {createFormInput(
        <FaLock className="absolute left-3 top-[1.5rem] transform -translate-y-1/2 text-gray-400 z-10" />,
        "password",
        "Xác nhận mật khẩu",
        formData.confirmPassword,
        "confirmPassword",
        "confirmPassword",
        showConfirmPassword ? "text" : "password",
        toggleConfirmPasswordVisibility,
        showConfirmPassword ? <FaEyeSlash /> : <FaEye />
      )}

      {/* Register Button */}
      <Button
        onClick={handleRegister}
        className="bg-green-700 text-white py-2 px-4 rounded-[0.525rem] w-full font-medium"
      >
        Tạo tài khoản
      </Button>

      {/* Divider */}
      <div className="relative mt-6 mb-3">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-2 text-gray-500 font-roboto font-medium">Hoặc tiếp tục bằng</span>
        </div>
      </div>

      {/* Social login buttons */}
      <div className="flex justify-center space-x-4">
        <Button className="bg-blue-500 text-white w-[4.75rem] h-[2.375rem] rounded-[0.525rem] flex items-center justify-center">
          <FaFacebookF className="text-lg" />
        </Button>
        <Button className="bg-white border border-gray-300 text-gray-700 w-[4.75rem] h-[2.375rem] rounded-[0.525rem] flex items-center justify-center">
          <FcGoogle className="text-lg" />
        </Button>
      </div>
    </AuthForm>
  );
}
