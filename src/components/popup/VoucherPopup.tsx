import { useState } from "react";
import { FiInfo } from "react-icons/fi";
import { FaRegCopy } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import Image from "next/image";
import noVouchers from "@/public/images/vouchers.png";

export interface Voucher {
  id: number;
  discount: string;
  maxDiscount: string;
  minOrder: string;
  expiryDate: string;
  code: string;
  conditions: string[];
  type: "all" | "shipping" | "other";
}

const vouchers: Voucher[] = [
  {
    id: 1,
    discount: "15%",
    maxDiscount: "50K",
    minOrder: "1K",
    expiryDate: "10/08/2024",
    code: "ABCDEFGH",
    conditions: [
      "Giảm 20K cho đơn hàng từ 200K",
      "Áp dụng cho các sản phẩm trong danh mục Dầu ăn",
    ],
    type: "all",
  },
  {
    id: 3,
    discount: "20%",
    maxDiscount: "70K",
    minOrder: "1M",
    expiryDate: "31/10/2024",
    code: "PQRSTUV",
    conditions: [
      "Giảm 20% cho đơn hàng từ 1 triệu",
      "Áp dụng cho các sản phẩm trong danh mục Gia dụng",
    ],
    type: "other",
  },
  {
    id: 4,
    discount: "5%",
    maxDiscount: "10K",
    minOrder: "100K",
    expiryDate: "15/09/2024",
    code: "WXYZ1234",
    conditions: [
      "Giảm 5% cho đơn hàng từ 100K",
      "Áp dụng cho các sản phẩm trong danh mục Đồ chơi",
    ],
    type: "all",
  },
  {
    id: 5,
    discount: "10%",
    maxDiscount: "30K",
    minOrder: "500K",
    expiryDate: "10/08/2023",
    code: "EXPIRED1",
    conditions: [
      "Giảm 10% cho đơn hàng từ 500K",
      "Áp dụng cho tất cả các sản phẩm",
    ],
    type: "all",
  },
];

interface VoucherPopupProps {
  onClose: () => void;
  onApply: (voucher: Voucher) => void;
}

const VoucherPopup: React.FC<VoucherPopupProps> = ({ onClose, onApply }) => {
  const [selectedVouchers, setSelectedVouchers] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [tooltipVisible, setTooltipVisible] = useState<boolean>(false);
  const [tooltipPosition, setTooltipPosition] = useState<{ top: number; left: number } | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [cartHasItems] = useState<boolean>(true); // Giả định có sản phẩm trong giỏ hàng
  const [voucherCode, setVoucherCode] = useState<string>("");

  const toggleVoucher = (id: number) => {
    setSelectedVouchers((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((voucherId) => voucherId !== id)
        : [...prevSelected, id]
    );
  };

  const showTooltip = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      top: rect.top + window.scrollY + rect.height,
      left: rect.left + window.scrollX,
    });
    setTooltipVisible(true);
  };

  const hideTooltip = () => {
    setTooltipVisible(false);
    setCopied(false);
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
  };

  const handleApplyVoucher = () => {
    const selectedVoucher = vouchers.find((voucher) => selectedVouchers.includes(voucher.id));
    if (selectedVoucher) {
      onApply(selectedVoucher);
      onClose();
    } else {
      alert("Vui lòng chọn một mã ưu đãi hợp lệ.");
    }
  };

  const getFilteredVouchers = () => {
    let filtered = vouchers.filter((voucher) => activeTab === "all" || voucher.type === activeTab);
    if (voucherCode) {
      filtered = filtered.filter((voucher) => voucher.code === voucherCode);
    }
    return filtered;
  };

  const renderVouchers = () => {
    const filteredVouchers = getFilteredVouchers();

    if (filteredVouchers.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-40">
          <div className="mb-4 p-2 bg-blue-100 text-blue-600 rounded-lg flex items-center">
            <FiInfo className="mr-2" />
            <p>Vui lòng chọn sản phẩm trong giỏ hàng trước khi chọn mã giảm giá</p>
          </div>
          <Image src={noVouchers} alt="logo vouchers" className="w-16 h-16 mb-4" />
          <p className="text-gray-500 text-center">Chưa có mã giảm giá của Shop</p>
        </div>
      );
    }

    return filteredVouchers.map((voucher) => {
      const isExpired = new Date(voucher.expiryDate) < new Date();
      const isSelected = selectedVouchers.includes(voucher.id);
      const baseClass = isSelected ? "bg-green-50 border-green-500" : "bg-gray-50 border-gray-300";
      const textClass = isExpired ? "text-gray-400" : "text-orange-500";

      return (
        <li key={voucher.id} className={`flex items-center justify-between py-2 relative ${isExpired ? "opacity-50" : ""}`}>
          <input
            type="checkbox"
            id={`voucher-checkbox-${voucher.id}`}
            className="hidden"
            checked={isSelected}
            onChange={() => toggleVoucher(voucher.id)}
            disabled={!cartHasItems || isExpired}
          />
          <label
            htmlFor={`voucher-checkbox-${voucher.id}`}
            className={`flex items-center justify-center w-5 h-5 rounded-sm border-2 mr-2 ${
              isSelected ? "bg-green-600 border-green-600" : "bg-gray-100 border-gray-300"
            } cursor-pointer`}
          >
            {isSelected && (
              <svg className="w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </label>

          <div className={`flex items-center w-full relative rounded-lg overflow-hidden`}>
            <div className={`flex-grow p-3 ${baseClass} border-2 border-r-0 rounded-l-lg relative`}>
              <span className={`text-sm font-semibold ${textClass} flex items-center`}>
                Giảm {voucher.discount} tới đa {voucher.maxDiscount} đơn từ {voucher.minOrder}.
                <span className="ml-2 cursor-pointer relative" onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
                  <FiInfo />
                </span>
              </span>
              <p className="text-xs text-gray-500">HSD: {voucher.expiryDate} {isExpired && <span className="text-red-500">Mã đã hết hạn</span>}</p>
            </div>
            <div className={`w-8 h-16 ${baseClass} border-2 border-l-0 rounded-r-lg flex items-center justify-between relative`}>
              <div className={`absolute top-[-0.625rem] left-[-0.625rem] w-5 h-5 ${baseClass} border-2 rounded-full`} />
              <div className={`h-10 border-l-2 border-dotted ${baseClass}`} />
              <div className={`absolute bottom-[-0.625rem] left-[-0.625rem] w-5 h-5 ${baseClass} border-2 rounded-full`} />
            </div>
          </div>

          {tooltipVisible && tooltipPosition && (
            <div
              className="fixed w-64 p-4 bg-white border border-gray-300 rounded shadow-lg z-50"
              style={{ top: tooltipPosition.top, left: tooltipPosition.left }}
              onMouseEnter={() => setTooltipVisible(true)}
              onMouseLeave={hideTooltip}
            >
              <p className="font-bold flex items-center">
                Mã: {voucher.code}
                <button onClick={() => copyToClipboard(voucher.code)} className="ml-2 flex items-center text-green-500">
                  <FaRegCopy />
                </button>
              </p>
              <p>Hạn sử dụng: {voucher.expiryDate}</p>
              <ul className="mt-2 list-disc list-inside text-sm text-gray-600">
                {voucher.conditions.map((condition, index) => (
                  <li key={index}>{condition}</li>
                ))}
              </ul>
            </div>
          )}
        </li>
      );
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg w-full max-w-md shadow-lg">
        <div className="flex justify-between items-center p-3">
          <h2 className="text-lg font-semibold">Mã ưu đãi từ gia dụng ABC</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <AiOutlineClose />
          </button>
        </div>
        <div className="px-3 mb-4 flex space-x-2">
          <input
            type="text"
            placeholder="Nhập mã ưu đãi"
            className="flex-grow p-2 border border-gray-300 rounded"
            value={voucherCode}
            onChange={(e) => setVoucherCode(e.target.value)}
          />
          <button
            className={`px-4 py-2 rounded ${
              voucherCode && vouchers.some((voucher) => voucher.code === voucherCode) ? "bg-green-500 text-white" : "bg-gray-100 text-zinc-400"
            }`}
            onClick={handleApplyVoucher}
            disabled={!voucherCode}
          >
            Áp dụng
          </button>
        </div>
        <div className="mb-6">
          <div className="flex justify-between text-gray-600 text-sm mb-2 border-b">
           
          <button
              className={`flex-1 pb-2 ${
                activeTab === "all"
                  ? "text-green-500 border-b-2 border-green-500"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("all")}
            >
              Tất cả
            </button>
            <button
              className={`flex-1 pb-2 ${
                activeTab === "shipping"
                  ? "text-green-500 border-b-2 border-green-500"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("shipping")}
            >
              Vận chuyển
            </button>
            <button
              className={`flex-1 pb-2 ${
                activeTab === "other"
                  ? "text-green-500 border-b-2 border-green-500"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("other")}
            >
              Ưu đãi khác
            </button>
          </div>
          <ul className="divide-y divide-gray-200 overflow-y-auto h-64 p-3 scrollbar-rounded scrollbar-thin scrollbar-none">
            {renderVouchers()}
          </ul>
        </div>
        <div className="flex justify-between items-center border-t pt-4 px-3 pb-2">
          {/* <p className="text-sm text-gray-500">
            {selectedVouchers.length > 0
              ? `Đã chọn ${selectedVouchers.length} mã giảm giá`
              : "Chọn mã giảm giá"}
          </p> */}
          <p className="text-sm text-gray-700 grid">
            Tiết kiệm{" "}
            <span className="text-red-500">
              {selectedVouchers.length * 25000}đ
            </span>
          </p>
          <button
            onClick={handleApplyVoucher}
            className={`px-4 py-2 rounded ${
              selectedVouchers.length > 0
                ? "bg-green-500 text-white"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
            disabled={selectedVouchers.length === 0}
          >
            Áp dụng mã
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoucherPopup;
