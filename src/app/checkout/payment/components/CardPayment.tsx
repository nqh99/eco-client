"use client";

import React from "react";
import { Radio, RadioGroup } from "@headlessui/react";
import Input from "../../components/CustomizableInput";
import { BankAccountMdl, PaymentMethodMdl } from "@/models/users/bank";

interface PaymentMethodProps {
  selectedMethod: string;
  onMethodChange: (method: string) => void;
  paymentMethods: PaymentMethod[];
}

type PaymentMethodOptionProps = {
  method: PaymentMethodMdl;
  checked: boolean;
};

const AccountInfoSection: React.FC<{ accountInfo: BankAccountMdl[] }> = ({
  accountInfo,
}) => (
  <div className="mt-6 flex gap-4 text-sm hg:grid-cols-2">
    {accountInfo.map((info, index) => (
      <section
        key={index}
        className="flex-1 min-w-[300px] p-4 bg-gray-100 rounded-lg"
      >
        <p className="font-semibold">{info.name}</p>
        <p>Số tài khoản: {info.accountNumber}</p>
        <p>Ngân hàng: {info.bankBranch.name}</p>
      </section>
    ))}
  </div>
);

const PaymentMethodOption: React.FC<PaymentMethodOptionProps> = ({
  method,
  checked,
}) => (
  <div className="flex items-center">
    <span
      className={`${
        checked ? "bg-primary border-transparent" : "bg-white border-gray-300"
      } h-4 w-4 rounded-full border flex items-center justify-center`}
    >
      {checked && <span className="h-2 w-2 bg-white rounded-full" />}
    </span>
    <span className="ml-2 text-sm">{method.name}</span>
    <Input type="hidden" value={method.id} />
  </div>
);

const OrderInfo: React.FC<PaymentMethodProps> = ({
  selectedMethod,
  onMethodChange,
  paymentMethods,
}) => {
  const selectedPaymentMethod = paymentMethods.find(
    (method) => method.value === selectedMethod
  );

  return (
    <section className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="font-medium mb-4">Phương thức thanh toán</h2>
      <RadioGroup
        value={selectedMethod}
        onChange={onMethodChange}
        className="space-y-4 grid"
      >
        {paymentMethods.map(({ value, label }) => (
          <Radio key={value} value={value} as="button">
            {({ checked }) => (
              <PaymentMethodOption
                value={value}
                label={label}
                checked={checked}
              />
            )}
          </Radio>
        ))}
      </RadioGroup>

      {selectedPaymentMethod?.accountInfo && (
        <AccountInfoSection accountInfo={selectedPaymentMethod.accountInfo} />
      )}
    </section>
  );
};

export default OrderInfo;
