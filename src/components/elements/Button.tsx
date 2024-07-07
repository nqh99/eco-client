"use client";

import React, { ButtonHTMLAttributes } from "react";
import { motion as m, MotionProps } from "framer-motion";

type ButtonProps = MotionProps & ButtonHTMLAttributes<HTMLElement>;

/**
 * Button Component.
 * This component support all features that a button html supported and can be styled with motion. It should contain a word/string or a icon inside its.
 * Some attributes that you should pay attention to such as: value, children, type, onClick, ...
 * Use case: 
 * - use with form
 * - in case, it isn't linked to anything url
 * - .. etc
 * Example: [Submit], [x icon]
 *
 * @component
 * @param {ButtonProps} props - The button element props.
 * @returns {ReactNode} The rendered button element.
 */
const Button: React.FC<ButtonProps> = ({ className, ...props }) => {
  return (
    <m.button
      whileHover={{ scale: 0.9 }}
      className={`box-border inline-flex items-center justify-center gap-3 rounded-md bg-white font-medium p-1 text-green-600 ${className}`}
      {...props}
    >
      {props.children}
    </m.button>
  );
};

export default Button;
