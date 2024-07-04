"use client"

import React, { ButtonHTMLAttributes } from "react";

/**
 * Button Component.
 * This component support all features that a button html supported. And it should contain a word/string or a icon inside its.
 * Some attributes that you should pay attention to such as: value, children, type, onClick, ...
 * Example: [Submit], [x icon]
 *
 * @component
 * @param {ButtonHTMLAttributes<HTMLButtonElement>} props - The button element props.
 * @returns {ReactNode} The rendered button element.
 */
const Button: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  ...props
}) => {
  return (
    <button {...props}>
      {props.value === null ? props.value : props.children}
    </button>
  );
};

export default Button;
