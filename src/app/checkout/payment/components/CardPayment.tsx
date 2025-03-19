'use client';

import React from 'react';
import { Radio, RadioGroup } from '@headlessui/react';
import Input from '../../components/CustomizableInput';
interface AccountInfo {
  name: string;
  accountNumber: string;
  bankBranch: string;
}

interface PaymentMethod {
  value: string;
  label: string;
  accountInfo?: AccountInfo[];
}

interface PaymentMethodProps {
  selectedMethod: string;
  onMethodChange: (method: string) => void;
  paymentMethods: PaymentMethod[];
}

const AccountInfoSection: React.FC<{ accountInfo: AccountInfo[] }> = ({
  accountInfo,
}) => (
  <div className="mt-6 flex gap-4 text-sm hg:grid-cols-2">
    {accountInfo.map((info, index) => (
      <section
        key={index}
        className="min-w-[300px] flex-1 rounded-lg bg-gray-100 p-4"
      >
        <p className="font-semibold">{info.name}</p>
        <p>Số tài khoản: {info.accountNumber}</p>
        <p>Ngân hàng: {info.bankBranch}</p>
      </section>
    ))}
  </div>
);

const PaymentMethodOption: React.FC<{
  value: string;
  label: string;
  checked: boolean;
}> = ({ value, label, checked }) => (
  <div className="flex items-center">
    <span
      className={`${
        checked ? 'border-transparent bg-primary' : 'border-gray-300 bg-white'
      } flex h-4 w-4 items-center justify-center rounded-full border`}
    >
      {checked && <span className="h-2 w-2 rounded-full bg-white" />}
    </span>
    <span className="ml-2 text-sm">{label}</span>
    <Input type="hidden" value={value} />
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
    <section className="rounded-lg bg-white p-4 shadow-md">
      <h2 className="mb-4 font-medium">Phương thức thanh toán</h2>
      <RadioGroup
        value={selectedMethod}
        onChange={onMethodChange}
        className="grid space-y-4"
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
