"use client";

import React, { useState } from "react";
import Button from "@/components/elements/Button";
import CardPayment from "./components/CardPayment";
import CardProduct from "./components/CardProduct";
import Input from "../components/CustomizableInput";
import BListbox from "../components/CustomizableSelect"; 

type FormDataKeys = "recipientName" | "recipientPhone" | "recipientEmail" | "city" | "district" | "ward" | "houseNumber";

type FormData = {
  [key in FormDataKeys]: string;
};

const paymentMethods = [
  {
    value: "COD",
    label: "Thanh toán tiền mặt (COD)",
  },
  {
    value: "bankTransfer1",
    label: "Chuyển khoản ngân hàng",
    accountInfo: [
      { name: "Cty TNHH DT TM và DV QT Eco-HHB", accountNumber: "152704073686868", bankBranch: "HD Bank chi nhánh Long Khánh, Đồng Nai" },
      { name: "Hồ Thị Hồng", accountNumber: "0908265127", bankBranch: "HD Bank chi nhánh Long Khánh, Đồng Nai" },
    ],
  },
];

const cities = [
  { value: "Hanoi", label: "Hà Nội" },
  { value: "HCM", label: "Hồ Chí Minh" },
];

const districts = [
  { value: "District1", label: "Quận 1" },
  { value: "District2", label: "Quận 2" },
];

const wards = [
  { value: "Ward1", label: "Phường 1" },
  { value: "Ward2", label: "Phường 2" },
];

const inputFields = [
  { key: "recipientName", placeholder: "Tên người nhận", type: "text", validation: "recipientName" },
  { key: "recipientPhone", placeholder: "Số điện thoại", type: "text", validation: "recipientPhone" },
  { key: "recipientEmail", placeholder: "Email", type: "email", validation: "recipientEmail" },
];

const selectFields = [
  { key: "city", options: cities, placeholder: "Tỉnh thành" },
  { key: "district", options: districts, placeholder: "Quận/huyện" },
  { key: "ward", options: wards, placeholder: "Phường/xã" },
];

const validateInput = {
  recipientName: (value: string) => value.trim() === "" ? "Recipient name is required." : "",
  recipientPhone: (value: string) => /^[0-9]{10,11}$/.test(value) ? "" : "Phone number must be 10-11 digits.",
  recipientEmail: (value: string) => /\S+@\S+\.\S+/.test(value) ? "" : "Please enter a valid email address.",
  city: (value: string) => value.trim() === "" ? "City is required." : "",
  district: (value: string) => value.trim() === "" ? "District is required." : "",
  ward: (value: string) => value.trim() === "" ? "Ward is required." : "",
  houseNumber: (value: string) => value.trim() === "" ? "House number is required." : "",
};

const PaymentPage: React.FC = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("bankTransfer1");
  const [formData, setFormData] = useState<FormData>({
    recipientName: "",
    recipientPhone: "",
    recipientEmail: "",
    city: "",
    district: "",
    ward: "",
    houseNumber: "",
  });
  const [triggerValidation, setTriggerValidation] = useState(false);

  const handleInputChange = (field: FormDataKeys) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prevData) => ({ ...prevData, [field]: e.target.value }));
  };

  const validateForm = () => {
    return Object.keys(formData).reduce((acc: { [key: string]: string }, field) => {
      const error = validateInput[field as FormDataKeys](formData[field as FormDataKeys]);
      if (error) acc[field] = error;
      return acc;
    }, {});
  };

  const handleSubmit = () => {
    setTriggerValidation(true);
    const errors = validateForm();
    const hasErrors = Object.values(errors).some((error) => error !== "");
    
    if (!hasErrors) {
      console.log("Form is valid! Proceed with submission:", formData);
    } else {
      console.log("Form contains errors.");
    }
  };

  return (
    <div className="p-6 rounded-lg shadow-md grid grid-cols-12 gap-6 bg-[#f9f9f9]">
      <div className="col-span-8 lg:col-span-8 sm:col-span-12">
        <CardPayment selectedMethod={selectedPaymentMethod} onMethodChange={setSelectedPaymentMethod} paymentMethods={paymentMethods} />
        <CardProduct />
      </div>

      <div className="col-span-4 lg:col-span-12">
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h2 className="font-semibold mb-4">Thông tin người nhận</h2>

          {/* Render Input Fields */}
          <div className="grid grid-cols-2 gap-4">
            {inputFields.slice(0, 2).map(({ key, type, placeholder }) => (
              <Input
                key={key}
                type={type}
                placeholder={placeholder}
                value={formData[key as FormDataKeys]}
                onChange={handleInputChange(key as FormDataKeys)}
                validate={validateInput[key as FormDataKeys]}
                triggerValidation={triggerValidation}
              />
            ))}
          </div>

          <Input
            type="email"
            placeholder="Email"
            value={formData.recipientEmail}
            onChange={handleInputChange("recipientEmail")}
            validate={validateInput.recipientEmail}
            triggerValidation={triggerValidation}
          />

          {/* Render Select Fields */}
          <div className="grid grid-cols-3 gap-2">
            {selectFields.map(({ key, options, placeholder }) => (
              <BListbox
                key={key}
                value={formData[key as FormDataKeys]}
                onChange={handleInputChange(key as FormDataKeys)}
                options={options}
                placeholder={placeholder}
                validate={validateInput[key as FormDataKeys]}
                triggerValidation={triggerValidation}
              />
            ))}
          </div>

          <Input
            as="textarea"
            placeholder="Số nhà..."
            value={formData.houseNumber}
            onChange={handleInputChange("houseNumber")}
            validate={validateInput.houseNumber}
            triggerValidation={triggerValidation}
          />
        </div>

        <div className="p-4 bg-white rounded-lg shadow-md mt-4">
          <div className="flex justify-between mb-3"><span className="text-sm">Tạm tính</span><span className="text-sm">5.208.000 đ</span></div>
          <div className="flex justify-between mb-3"><span className="text-sm">Tổng giảm giá</span><span className="text-sm">-100.000 ₫</span></div>
          <div className="flex justify-between mb-3">
            <span className="text-sm">Tổng tiền</span>
            <div className="flex flex-col items-end">
              <span className="text-sm text-[#ffaa00]">5.152.000 ₫</span>
              <span className="text-xs text-informal mb-3">(Đã bao gồm VAT nếu có)</span>
            </div>
          </div>
          <Button onClick={handleSubmit} className="bg-red-600 text-white text-center rounded-md px-3 py-2 w-full">Đặt hàng</Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
