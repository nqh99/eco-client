import React from "react";

interface PaymentMethodProps {
  selectedMethod: string;
  onMethodChange: (method: string) => void;
}

interface AccountInfoProps {
  name: string;
  accountNumber: string;
  bankBranch: string;
}

const AccountInfo: React.FC<AccountInfoProps> = ({ name, accountNumber, bankBranch }) => (
  <div className="p-4 bg-gray-100 rounded-lg">
    <p className="font-semibold">{name}</p>
    <p>Số tài khoản: {accountNumber}</p>
    <p>Ngân hàng: {bankBranch}</p>
  </div>
);

const PaymentMethod: React.FC<PaymentMethodProps> = ({ selectedMethod, onMethodChange }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Thanh toán</h2>
      <div className="mt-4">
        <label className="flex items-center mb-4">
          <input
            type="radio"
            name="paymentMethod"
            value="COD"
            checked={selectedMethod === "COD"}
            onChange={() => onMethodChange("COD")}
            className="form-radio text-primary h-4 w-4"
          />
          <span className="ml-2 text-sm">Thanh toán tiền mặt (COD)</span>
        </label>
        <label className="flex items-center mb-4">
          <input
            type="radio"
            name="paymentMethod"
            value="bankTransfer"
            checked={selectedMethod === "bankTransfer"}
            onChange={() => onMethodChange("bankTransfer")}
            className="form-radio text-primary h-4 w-4"
          />
          <span className="ml-2 text-sm">Chuyển khoản ngân hàng</span>
        </label>
      </div>

      <div className="mt-6 grid grid-cols-1 xxs:grid-cols-2 gap-4 text-sm">
        <AccountInfo
          name="Cty TNHH ĐT TM và DV QT Eco-HHB"
          accountNumber="152704073686868"
          bankBranch="HD Bank chi nhánh Long Khánh, Đồng Nai"
        />
        <AccountInfo
          name="Hồ Thị Hồng"
          accountNumber="0908265127"
          bankBranch="HD Bank chi nhánh Long Khánh, Đồng Nai"
        />
      </div>
    </div>
  );
};

export default PaymentMethod;
