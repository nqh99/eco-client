'use client';

import React, { useEffect, useRef, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { FiHeart, FiLogOut, FiShoppingBag, FiUser } from 'react-icons/fi';
import { authSlice } from '@/lib/features/auth/authSlice';
import { revoke } from '@/apis/auth';

export default function LoginBtn() {
  const router = useRouter();
  const authState = useAppSelector((state) => state.auth);
  const hasAvatar = authState.isAuthenticated && authState.customer?.avatar;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    await revoke();
    dispatch(authSlice.actions.unauthenticate());
    router.push('/');
  };

  const navigateTo = (path: string) => {
    router.push(path);
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        id="basic-button"
        aria-label="open login menu"
        aria-haspopup="true"
        aria-expanded={isDropdownOpen ? 'true' : 'false'}
        onClick={() => {
          if (!authState.isAuthenticated) {
            router.push('/login');
            return;
          }
          setIsDropdownOpen(!isDropdownOpen);
        }}
        className={`flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 focus:outline-none ${hasAvatar ? 'p-0' : 'p-2'}`}
      >
        {hasAvatar ? (
          <img
            src={authState.customer?.avatar as string}
            alt="User avatar"
            className="h-full w-full rounded-full object-cover"
          />
        ) : (
          <FaUser className="size-5 text-primary" />
        )}
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && authState.isAuthenticated && (
        <div className="absolute right-0 z-50 mt-2 w-48 rounded-md border border-gray-200 bg-white py-1 shadow-lg">
          <div className="border-b border-gray-100 px-4 py-2">
            <p className="truncate text-xs text-gray-500">
              {authState.customer?.email || ''}
            </p>
          </div>

          <button
            onClick={() => navigateTo('/profile')}
            className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <FiUser className="mr-2" /> Tài khoản của tôi
          </button>

          <button
            onClick={() => navigateTo('/orders')}
            className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <FiShoppingBag className="mr-2" /> Đơn hàng
          </button>

          <button
            onClick={() => navigateTo('/wishlist')}
            className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <FiHeart className="mr-2" /> Danh sách yêu thích
          </button>

          <div className="my-1 border-t border-gray-100"></div>

          <button
            onClick={handleLogout}
            className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
          >
            <FiLogOut className="mr-2" /> Đăng xuất
          </button>
        </div>
      )}
    </div>
  );
}
