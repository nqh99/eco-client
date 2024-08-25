"use client";

import React, { useState, useRef } from "react";
import Button from "@/components/elements/Button";
import RecipientInfo from "./components/RecipientInfo";
import PaymentMethod from "./components/PaymentMethod";

const PaymentPage: React.FC = () => {
  const [recipientData, setRecipientData] = useState({
    name: "",
    phone: "",
    email: "",
    city: null,
    district: null,
    ward: null,
    address: "",
  });

  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("COD");

  const recipientInfoRef = useRef<{ validateFields: () => boolean }>(null);

  const handleFormDataChange = (data: typeof recipientData) => {
    setRecipientData(data);
  };

  const handleSubmit = () => {
    if (recipientInfoRef.current?.validateFields()) {
      // console.log("Validation passed");
      // console.log("recipientData", recipientData);
    } else {
      // console.log("Validation failed");
    }
  };

  return (
    <div className="p-6 rounded-lg shadow-md grid grid-cols-12 gap-6 bg-[#f9f9f9]">
      <div className="col-span-8 lg:col-span-8 sm:col-span-12">
        <PaymentMethod
          selectedMethod={selectedPaymentMethod}
          onMethodChange={setSelectedPaymentMethod}
        />
      </div>

      <div className="col-span-4 lg:col-span-12">
        <div className="p-4 bg-white rounded-lg shadow-md">
          <RecipientInfo
            onFormDataChange={handleFormDataChange}
            touchedFields={touchedFields}
            ref={recipientInfoRef}
          />
        </div>

        <div className="p-4 bg-white rounded-lg shadow-md mt-4">
          <div className="flex justify-between mb-3">
            <span className="inline-block text-sm">Tạm tính</span>
            <span className="inline-block text-sm">5.208.000 đ</span>
          </div>
          <div className="flex justify-between mb-3">
            <span className="inline-block text-sm">Tổng giảm giá</span>
            <span className="inline-block text-sm">-100.000 ₫</span>
          </div>
          <div className="flex justify-between mb-3">
            <span className="inline-block text-sm">Tổng tiền</span>
            <div className="flex flex-col justify-items-end">
              <span className="text-right block text-sm text-[#ffaa00]">
                5.152.000 ₫
              </span>
              <span className="text-right block text-xs text-informal mb-3">
                (Đã bao gồm VAT nếu có)
              </span>
            </div>
          </div>
          <Button onClick={handleSubmit} className="bg-red-600 text-white text-center rounded-md px-3 py-2 w-full">
            Đặt hàng
          </Button>
        </div>
      </div>
      {/*Payment Information */}
      <div className="col-span-3">Payment Information</div>
    </div>
  );
};

export default PaymentPage;
