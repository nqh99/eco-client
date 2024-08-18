// src/models/validation.ts

import React from "react";

export interface FormFieldProps<T extends Record<string, any>> {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder: string;
  field: keyof T;
  isTouched: boolean;
  formData: T;
  col?: string;
  as?: "input" | "textarea";
}

export const isValidField = <T extends Record<string, any>>(field: keyof T, formData: T): boolean => {
  const fieldValue = formData[field];

  if (typeof fieldValue !== "string") {
    return true;
  }

  switch (field) {
    case "phone":
      return /^[0-9]{10,11}$/.test(fieldValue);
    case "email":
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fieldValue);
    default:
      // Generic validation for required fields
      return fieldValue.trim().length > 0;
  }
};

export const getWarningMessage = <T extends Record<string, any>>(field: keyof T): string => {
  const warningMessages = {
    phone: "Số điện thoại không được để trống.",
    email: "Vui lòng nhập địa chỉ email hợp lệ.",
    name: "Họ tên không được để trống.",
    address: "Địa chỉ không được để trống.",
  } as Record<keyof T, string>;

  return warningMessages[field] || "Trường này không hợp lệ.";
};
