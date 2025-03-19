'use client';

import React from 'react';

import { FaUser } from 'react-icons/fa';

export default function Login() {
  return (
    <button
      id="basic-button"
      aria-label="open login menu"
      aria-haspopup="true"
      className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 p-2 focus:outline-none"
    >
      <FaUser className="size-5 text-primary" />
    </button>
  );
}
