"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var react_1 = require("react");
var fi_1 = require("react-icons/fi");
var fa_1 = require("react-icons/fa");
var ai_1 = require("react-icons/ai");
var image_1 = require("next/image");
var vouchers_png_1 = require("@/public/images/vouchers.png");
var vouchers = [
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
        type: "all"
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
        type: "other"
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
        type: "all"
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
        type: "all"
    },
];
var VoucherPopup = function (_a) {
    var onClose = _a.onClose, onApply = _a.onApply;
    var _b = react_1.useState([]), selectedVouchers = _b[0], setSelectedVouchers = _b[1];
    var _c = react_1.useState("all"), activeTab = _c[0], setActiveTab = _c[1];
    var _d = react_1.useState(false), tooltipVisible = _d[0], setTooltipVisible = _d[1];
    var _e = react_1.useState(null), tooltipPosition = _e[0], setTooltipPosition = _e[1];
    var _f = react_1.useState(false), copied = _f[0], setCopied = _f[1];
    var cartHasItems = react_1.useState(true)[0]; // Giả định có sản phẩm trong giỏ hàng
    var _g = react_1.useState(""), voucherCode = _g[0], setVoucherCode = _g[1];
    var toggleVoucher = function (id) {
        setSelectedVouchers(function (prevSelected) {
            return prevSelected.includes(id)
                ? prevSelected.filter(function (voucherId) { return voucherId !== id; })
                : __spreadArrays(prevSelected, [id]);
        });
    };
    var showTooltip = function (e) {
        var rect = e.currentTarget.getBoundingClientRect();
        setTooltipPosition({
            top: rect.top + window.scrollY + rect.height,
            left: rect.left + window.scrollX
        });
        setTooltipVisible(true);
    };
    var hideTooltip = function () {
        setTooltipVisible(false);
        setCopied(false);
    };
    var copyToClipboard = function (code) {
        navigator.clipboard.writeText(code);
        setCopied(true);
    };
    var handleApplyVoucher = function () {
        var selectedVoucher = vouchers.find(function (voucher) { return selectedVouchers.includes(voucher.id); });
        if (selectedVoucher) {
            onApply(selectedVoucher);
            onClose();
        }
        else {
            alert("Vui lòng chọn một mã ưu đãi hợp lệ.");
        }
    };
    var getFilteredVouchers = function () {
        var filtered = vouchers.filter(function (voucher) { return activeTab === "all" || voucher.type === activeTab; });
        if (voucherCode) {
            filtered = filtered.filter(function (voucher) { return voucher.code === voucherCode; });
        }
        return filtered;
    };
    var renderVouchers = function () {
        var filteredVouchers = getFilteredVouchers();
        if (filteredVouchers.length === 0) {
            return (React.createElement("div", { className: "flex flex-col items-center justify-center h-40" },
                React.createElement("div", { className: "mb-4 p-2 bg-blue-100 text-blue-600 rounded-lg flex items-center" },
                    React.createElement(fi_1.FiInfo, { className: "mr-2" }),
                    React.createElement("p", null, "Vui l\u00F2ng ch\u1ECDn s\u1EA3n ph\u1EA9m trong gi\u1ECF h\u00E0ng tr\u01B0\u1EDBc khi ch\u1ECDn m\u00E3 gi\u1EA3m gi\u00E1")),
                React.createElement(image_1["default"], { src: vouchers_png_1["default"], alt: "logo vouchers", className: "w-16 h-16 mb-4" }),
                React.createElement("p", { className: "text-gray-500 text-center" }, "Ch\u01B0a c\u00F3 m\u00E3 gi\u1EA3m gi\u00E1 c\u1EE7a Shop")));
        }
        return filteredVouchers.map(function (voucher) {
            var isExpired = new Date(voucher.expiryDate) < new Date();
            var isSelected = selectedVouchers.includes(voucher.id);
            var baseClass = isSelected ? "bg-green-50 border-green-500" : "bg-gray-50 border-gray-300";
            var textClass = isExpired ? "text-gray-400" : "text-orange-500";
            return (React.createElement("li", { key: voucher.id, className: "flex items-center justify-between py-2 relative " + (isExpired ? "opacity-50" : "") },
                React.createElement("input", { type: "checkbox", id: "voucher-checkbox-" + voucher.id, className: "hidden", checked: isSelected, onChange: function () { return toggleVoucher(voucher.id); }, disabled: !cartHasItems || isExpired }),
                React.createElement("label", { htmlFor: "voucher-checkbox-" + voucher.id, className: "flex items-center justify-center w-5 h-5 rounded-sm border-2 mr-2 " + (isSelected ? "bg-green-600 border-green-600" : "bg-gray-100 border-gray-300") + " cursor-pointer" }, isSelected && (React.createElement("svg", { className: "w-4 h-4 text-white", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
                    React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M5 13l4 4L19 7" })))),
                React.createElement("div", { className: "flex items-center w-full relative rounded-lg overflow-hidden" },
                    React.createElement("div", { className: "flex-grow p-3 " + baseClass + " border-2 border-r-0 rounded-l-lg relative" },
                        React.createElement("span", { className: "text-sm font-semibold " + textClass + " flex items-center" },
                            "Gi\u1EA3m ",
                            voucher.discount,
                            " t\u1EDBi \u0111a ",
                            voucher.maxDiscount,
                            " \u0111\u01A1n t\u1EEB ",
                            voucher.minOrder,
                            ".",
                            React.createElement("span", { className: "ml-2 cursor-pointer relative", onMouseEnter: showTooltip, onMouseLeave: hideTooltip },
                                React.createElement(fi_1.FiInfo, null))),
                        React.createElement("p", { className: "text-xs text-gray-500" },
                            "HSD: ",
                            voucher.expiryDate,
                            " ",
                            isExpired && React.createElement("span", { className: "text-red-500" }, "M\u00E3 \u0111\u00E3 h\u1EBFt h\u1EA1n"))),
                    React.createElement("div", { className: "w-8 h-16 " + baseClass + " border-2 border-l-0 rounded-r-lg flex items-center justify-between relative" },
                        React.createElement("div", { className: "absolute top-[-0.625rem] left-[-0.625rem] w-5 h-5 " + baseClass + " border-2 rounded-full" }),
                        React.createElement("div", { className: "h-10 border-l-2 border-dotted " + baseClass }),
                        React.createElement("div", { className: "absolute bottom-[-0.625rem] left-[-0.625rem] w-5 h-5 " + baseClass + " border-2 rounded-full" }))),
                tooltipVisible && tooltipPosition && (React.createElement("div", { className: "fixed w-64 p-4 bg-white border border-gray-300 rounded shadow-lg z-50", style: { top: tooltipPosition.top, left: tooltipPosition.left }, onMouseEnter: function () { return setTooltipVisible(true); }, onMouseLeave: hideTooltip },
                    React.createElement("p", { className: "font-bold flex items-center" },
                        "M\u00E3: ",
                        voucher.code,
                        React.createElement("button", { onClick: function () { return copyToClipboard(voucher.code); }, className: "ml-2 flex items-center text-green-500" },
                            React.createElement(fa_1.FaRegCopy, null))),
                    React.createElement("p", null,
                        "H\u1EA1n s\u1EED d\u1EE5ng: ",
                        voucher.expiryDate),
                    React.createElement("ul", { className: "mt-2 list-disc list-inside text-sm text-gray-600" }, voucher.conditions.map(function (condition, index) { return (React.createElement("li", { key: index }, condition)); }))))));
        });
    };
    return (React.createElement("div", { className: "fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50" },
        React.createElement("div", { className: "bg-white rounded-lg w-full max-w-md shadow-lg" },
            React.createElement("div", { className: "flex justify-between items-center p-3" },
                React.createElement("h2", { className: "text-lg font-semibold" }, "M\u00E3 \u01B0u \u0111\u00E3i t\u1EEB gia d\u1EE5ng ABC"),
                React.createElement("button", { onClick: onClose, className: "text-gray-500 hover:text-gray-700" },
                    React.createElement(ai_1.AiOutlineClose, null))),
            React.createElement("div", { className: "px-3 mb-4 flex space-x-2" },
                React.createElement("input", { type: "text", placeholder: "Nh\u1EADp m\u00E3 \u01B0u \u0111\u00E3i", className: "flex-grow p-2 border border-gray-300 rounded", value: voucherCode, onChange: function (e) { return setVoucherCode(e.target.value); } }),
                React.createElement("button", { className: "px-4 py-2 rounded " + (voucherCode && vouchers.some(function (voucher) { return voucher.code === voucherCode; }) ? "bg-green-500 text-white" : "bg-gray-100 text-zinc-400"), onClick: handleApplyVoucher, disabled: !voucherCode }, "\u00C1p d\u1EE5ng")),
            React.createElement("div", { className: "mb-6" },
                React.createElement("div", { className: "flex justify-between text-gray-600 text-sm mb-2 border-b" },
                    React.createElement("button", { className: "flex-1 pb-2 " + (activeTab === "all"
                            ? "text-green-500 border-b-2 border-green-500"
                            : "text-gray-500"), onClick: function () { return setActiveTab("all"); } }, "T\u1EA5t c\u1EA3"),
                    React.createElement("button", { className: "flex-1 pb-2 " + (activeTab === "shipping"
                            ? "text-green-500 border-b-2 border-green-500"
                            : "text-gray-500"), onClick: function () { return setActiveTab("shipping"); } }, "V\u1EADn chuy\u1EC3n"),
                    React.createElement("button", { className: "flex-1 pb-2 " + (activeTab === "other"
                            ? "text-green-500 border-b-2 border-green-500"
                            : "text-gray-500"), onClick: function () { return setActiveTab("other"); } }, "\u01AFu \u0111\u00E3i kh\u00E1c")),
                React.createElement("ul", { className: "divide-y divide-gray-200 overflow-y-auto h-64 p-3 scrollbar-rounded scrollbar-thin scrollbar-none" }, renderVouchers())),
            React.createElement("div", { className: "flex justify-between items-center border-t pt-4 px-3 pb-2" },
                React.createElement("p", { className: "text-sm text-gray-700 grid" },
                    "Ti\u1EBFt ki\u1EC7m",
                    " ",
                    React.createElement("span", { className: "text-red-500" },
                        selectedVouchers.length * 25000,
                        "\u0111")),
                React.createElement("button", { onClick: handleApplyVoucher, className: "px-4 py-2 rounded " + (selectedVouchers.length > 0
                        ? "bg-green-500 text-white"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"), disabled: selectedVouchers.length === 0 }, "\u00C1p d\u1EE5ng m\u00E3")))));
};
exports["default"] = VoucherPopup;
