"use client";

import React, { useState } from "react";
import { Radio, RadioGroup } from "@headlessui/react";
import Input from "../../components/CustomizableInput";
import { BankAccountMdl } from "@/models/users/bank";
import {
  getDataMappingWithPaymentMethod,
  getDisplayMethodMsg,
  PaymentMethod,
} from "@/constants/transaction/payment-method";

interface PaymentMethodProps {
  onMethodChange: (method: PaymentMethod) => void;
}

type PaymentMethodOptionProps = {
  method: PaymentMethod;
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
        <p>
          Ngân hàng: {info.bankBranch.nickname} - {info.bankBranch.name}
        </p>
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
    <span className="ml-2 text-sm">{getDisplayMethodMsg(method)}</span>
    <Input type="hidden" value={method} />
  </div>
);

/**
 * CartPayment component allows users to select a payment method.
 *
 * @component
 * @param {PaymentMethodProps} props - The props for the component.
 * @param {function} props.onMethodChange - Callback function to handle payment method change.
 *
 * @returns {JSX.Element} The rendered component.
 *
 * @example
 * <CartPayment onMethodChange={handlePaymentMethodChange} />
 *
 * @remarks
 * This component uses a RadioGroup to display available payment methods.
 * When the payment method is changed, it updates the state and calls the onMethodChange callback.
 * If the selected payment method is BankTransfer, it displays the AccountInfoSection with the relevant account information.
 */
const CartPayment: React.FC<PaymentMethodProps> = ({ onMethodChange }) => {
  const [method, setPaymentMethod] = useState<PaymentMethod>(
    PaymentMethod.Cash
  );

  const handleMethodChange = (val: PaymentMethod) => {
    if (onMethodChange) {
      onMethodChange(val);
    }

    setPaymentMethod(val);
  };

  return (
    <section className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="font-medium mb-4">Phương thức thanh toán</h2>
      <RadioGroup
        value={method}
        onChange={handleMethodChange}
        className="space-y-4 grid"
      >
        {Object.values(PaymentMethod).map((method) => (
          <Radio key={method} value={method} as="button">
            {({ checked }) => (
              <PaymentMethodOption method={method} checked={checked} />
            )}
          </Radio>
        ))}
      </RadioGroup>

      {method === PaymentMethod.BankTransfer && (
        <AccountInfoSection
          accountInfo={
            getDataMappingWithPaymentMethod(
              PaymentMethod.BankTransfer
            ) as BankAccountMdl[]
          }
        />
      )}
    </section>
  );
};

export default CartPayment;
