"use client";

import React from "react";

import { FaUser } from "react-icons/fa";

export default function Login() {
  return (
    <button
      id="basic-button"
      aria-label="open login menu"
      aria-haspopup="true"
      className="p-2 focus:outline-none bg-emerald-50 w-10 h-10 rounded-full flex justify-center items-center"
    >
      <FaUser className="text-primary size-5" />
    </button>
  );
}
