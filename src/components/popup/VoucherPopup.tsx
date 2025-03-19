'use client';

import { useEffect, useState } from 'react';
import { FiInfo } from 'react-icons/fi';
import { FaRegCopy } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import Image from 'next/image';
import noVouchers from '@/public/images/vouchers.png';
import DiscountMdl from '@/models/products/discount';
import { isOutdated } from '@/utils/datetime';
import { copyToClipboard } from '@/utils/core';
import { Input } from '@headlessui/react';

type VoucherPopupProps = {
  onClose: () => void;
  onApply: (voucher: DiscountMdl[]) => void;
  vouchers: DiscountMdl[];
};

type VoucherItemProps = {
  info: DiscountMdl;
  isChecked: boolean;
  onChecked: (val: boolean) => void;
};

const VoucherPopup: React.FC<VoucherPopupProps> = ({
  onClose,
  onApply,
  vouchers,
}) => {
  const [selectedVouchers, setSelectedVouchers] = useState<Set<string>>(
    new Set()
  );

  const [activeTab, setActiveTab] = useState<'all' | 'shipping' | 'others'>(
    'all'
  );

  const [searchedVoucherCode, setSearchedVoucherCode] = useState<string>('');

  const [discountsByCategory, setDiscountsByCategory] = useState<
    Map<string, DiscountMdl[]>
  >(new Map());

  useEffect(() => {
    setDiscountsByCategory(() => {
      const newVal = new Map();

      vouchers.forEach((val) => {
        if (!newVal.has(val.id)) {
          newVal.set(val.id, [val]);
        }

        newVal.get(val.id)?.push(val);
      });

      return newVal;
    });
  }, [vouchers]);

  const handleApplyVoucher = () => {
    const selectedVoucher = vouchers.filter((voucher) =>
      selectedVouchers.has(voucher.id)
    );

    if (selectedVoucher) {
      onApply(selectedVoucher);
      onClose();
    } else {
      alert('Vui lòng chọn một mã ưu đãi hợp lệ.');
    }
  };

  const renderVouchers = (activeTab: string) => {
    if (vouchers.length === 0) {
      return <EmptyVoucherSection />;
    }

    let voucherItems: DiscountMdl[] | undefined = [];

    if (searchedVoucherCode) {
      voucherItems = vouchers.filter((val) =>
        val.id.includes(searchedVoucherCode)
      );
    } else {
      voucherItems = discountsByCategory.get(activeTab) || [];
    }

    const onCheckedVoucher = (val: boolean, voucher: DiscountMdl) => {
      if (val) {
        setSelectedVouchers((prev) => {
          const newVal = new Set(prev);
          newVal.add(voucher.id);

          return newVal;
        });
      } else {
        setSelectedVouchers((prev) => {
          const newVal = new Set(prev);
          newVal.delete(voucher.id);

          return newVal;
        });
      }
    };

    return voucherItems.map((voucher) => {
      return (
        <>
          <VoucherItem
            info={voucher}
            isChecked={selectedVouchers.has(voucher.id)}
            onChecked={(val) => {
              onCheckedVoucher(val, voucher);
            }}
          />
        </>
      );
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-white shadow-lg">
        <div className="flex items-center justify-between p-3">
          <h2 className="text-lg font-semibold">Mã ưu đãi từ gia dụng ABC</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <AiOutlineClose />
          </button>
        </div>
        <div className="mb-4 flex space-x-2 px-3">
          <input
            type="text"
            placeholder="Nhập mã ưu đãi"
            className="flex-grow rounded border border-primary p-2"
            value={searchedVoucherCode}
            onChange={(e) => setSearchedVoucherCode(e.target.value)}
          />
          <button
            className={`rounded px-4 py-2 ${
              searchedVoucherCode &&
              vouchers.some(
                (voucher) => voucher.discountCode === searchedVoucherCode
              )
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-zinc-400'
            }`}
            onClick={handleApplyVoucher}
            disabled={!searchedVoucherCode}
          >
            Áp dụng
          </button>
        </div>
        <div className="mb-6">
          <div className="mb-2 flex justify-between border-b text-sm text-gray-600">
            <button
              className={`flex-1 pb-2 ${
                activeTab === 'all'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('all')}
            >
              Tất cả
            </button>
            <button
              className={`flex-1 pb-2 ${
                activeTab === 'shipping'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('shipping')}
            >
              Vận chuyển
            </button>
            <button
              className={`flex-1 pb-2 ${
                activeTab === 'others'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('others')}
            >
              Ưu đãi khác
            </button>
          </div>
          <ul className="scrollbar-rounded scrollbar-thin scrollbar-none h-64 divide-y divide-gray-200 overflow-y-auto p-3">
            {renderVouchers(activeTab)}
          </ul>
        </div>
        <div className="flex items-center justify-between border-t px-3 pb-2 pt-4">
          <p className="grid text-sm text-gray-700">
            Tiết kiệm{' '}
            <span className="text-red-500">
              {selectedVouchers.size * 25000}đ
            </span>
          </p>
          <button
            onClick={handleApplyVoucher}
            className={`rounded px-4 py-2 ${
              selectedVouchers.size > 0
                ? 'bg-primary text-white'
                : 'cursor-not-allowed bg-gray-100 text-gray-400'
            }`}
            disabled={selectedVouchers.size === 0}
          >
            Áp dụng mã
          </button>
        </div>
      </div>
    </div>
  );
};

const VoucherItem = ({ info, isChecked, onChecked }: VoucherItemProps) => {
  const [tooltipVisible, setTooltipVisible] = useState<boolean>(false);

  const isExpired = isOutdated(info.expiredDate || '');

  const baseClass = isChecked
    ? 'bg-green-50 border-green-500 border-primary'
    : 'bg-gray-50 border-gray-300';
  const textClass = isExpired ? 'text-gray-400' : 'text-orange-500';

  return (
    <li
      key={info.id}
      className={`relative flex items-center justify-between py-2 ${
        isExpired ? 'opacity-50' : ''
      }`}
    >
      <Input
        type="checkbox"
        id={`voucher-checkbox-${info.id}`}
        className="hidden"
        checked={isChecked}
        onChange={(e) => onChecked(e.target.checked)}
        disabled={isExpired}
      />
      <label
        htmlFor={`voucher-checkbox-${info.id}`}
        className={`mr-2 flex h-5 w-5 items-center justify-center rounded-sm border-2 ${
          isChecked
            ? 'border-primary bg-primary'
            : 'border-gray-300 bg-gray-100'
        } cursor-pointer`}
      >
        {isChecked && (
          <svg
            className="h-4 w-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </label>

      <div
        className={`relative flex w-full items-center overflow-hidden rounded-lg`}
      >
        <div
          className={`flex-grow p-3 ${baseClass} relative rounded-l-lg border border-r-0`}
        >
          <span
            className={`text-sm font-semibold ${textClass} flex items-center`}
          >
            Giảm {info.discountPercent} tới đa {info.maxDiscountPrice} đơn từ{' '}
            {info.minOrderPrice}
            <span
              className="relative ml-2 cursor-pointer"
              onMouseEnter={() => setTooltipVisible(true)}
              onMouseLeave={() => setTooltipVisible(false)}
            >
              <FiInfo />
            </span>
          </span>
          <p className="text-xs text-gray-500">
            HSD: {info.expiredDate}{' '}
            {isExpired && <span className="text-red-500">Mã đã hết hạn</span>}
          </p>
        </div>
        <div
          className={`h-16 w-8 ${baseClass} relative flex items-center justify-between rounded-r-lg border-2 border-l-0`}
        >
          <div
            className={`absolute left-[-0.625rem] top-[-0.625rem] h-5 w-5 ${baseClass} rounded-full border-2`}
          />
          <div className={`h-10 border-l-2 border-dotted ${baseClass}`} />
          <div
            className={`absolute bottom-[-0.625rem] left-[-0.625rem] h-5 w-5 ${baseClass} rounded-full border-2`}
          />
        </div>
      </div>

      {tooltipVisible && (
        <div
          className="boder-primary fixed left-1 top-1 z-50 w-64 rounded border bg-white p-4 shadow-lg"
          onMouseEnter={() => setTooltipVisible(true)}
          onMouseLeave={() => setTooltipVisible(false)}
        >
          <p className="flex items-center font-bold">
            Mã: {info.discountCode}
            <button
              onClick={() => copyToClipboard(info.discountCode)}
              className="ml-2 flex items-center text-green-500"
            >
              <FaRegCopy />
            </button>
          </p>
          <p>Hạn sử dụng: {info.expiredDate}</p>
          <ul className="mt-2 list-inside list-disc text-sm text-gray-600">
            {info.discountCons?.map((condition, index) => (
              <li key={index}>{condition}</li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
};

const EmptyVoucherSection = () => {
  return (
    <div className="flex h-40 flex-col items-center justify-center">
      <div className="mb-4 flex items-center rounded-lg bg-blue-100 p-2 text-blue-600">
        <FiInfo className="mr-2" />
        <p>Vui lòng chọn sản phẩm trong giỏ hàng trước khi chọn mã giảm giá</p>
      </div>
      <Image src={noVouchers} alt="logo vouchers" className="mb-4 h-16 w-16" />
      <p className="text-center text-gray-500">Chưa có mã giảm giá của Shop</p>
    </div>
  );
};

export default VoucherPopup;
