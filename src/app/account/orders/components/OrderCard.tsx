import Image from "next/legacy/image";
import { AiOutlineRight } from "react-icons/ai";
import { Order } from "./../store/ordersData";

interface OrderCardProps {
  order: Order;
}

const getStatusClass = (status: string): string => {
  switch (status) {
    case "shipping":
      return "text-yellow-500";
    case "pending":
      return "text-green-600";
    case "processing":
      return "text-yellow-500";
    case "delivered":
      return "text-green-500";
    case "canceled":
    case "returned":
      return "text-gray-500";
    default:
      return "text-gray-600";
  }
};

const Button = ({
  text,
  className,
  disabled = false,
}: {
  text: string;
  className: string;
  disabled?: boolean;
}) => (
  <button
    className={`${className} text-sm px-6 py-3 rounded-md`}
    disabled={disabled}
  >
    {text}
  </button>
);

export default function OrderCard({ order }: OrderCardProps) {
    const renderActionButtons = () => {
      // Hide buttons for specific statuses like "Đã hoàn tiền" or "Yêu cầu đã được xử lý"
      if (order.status === "returned" || order.status === "completed") {
        return null; // No buttons will be shown for these statuses
      }
  
      if (order.status === "processing") {
        return (
          <>
            <Button
              text="Đã nhận hàng"
              className="bg-gray-300 text-gray-600"
              disabled
            />
            <Button
              text="Yêu cầu trả hàng/ hoàn tiền"
              className="bg-gray-300 text-gray-600 ml-2"
              disabled
            />
          </>
        );
      }
  
      if (order.status === "shipping") {
        return (
          <>
            <Button text="Đã nhận hàng" className="bg-primary text-white" />
            <Button
              text="Yêu cầu trả hàng/ hoàn tiền"
              className="border border-primary text-primary ml-2"
            />
          </>
        );
      }
  
      if (order.status === "delivered") {
        return (
          <>
            <Button text="Đánh giá" className="bg-primary text-white" />
            <Button
              text="Yêu cầu trả hàng/ hoàn tiền"
              className="border border-primary text-primary ml-2"
            />
            <Button
              text="Mua lại"
              className="border border-primary text-primary ml-2"
            />
          </>
        );
      }
  
      return (
        <>
          <Button text={order.buttonText} className="bg-primary text-white" />
          {order.buttonCancelPayment && (
            <Button
              text={order.buttonCancelPayment}
              className="border border-primary text-primary ml-2"
            />
          )}
        </>
      );
    };
  
    return (
      <div className="bg-white mt-3 rounded-lg shadow-md w-[70.31rem] lg:w-full">
        <div className="mx-auto mt-2 border border-gray-100">
          <div className="px-6 py-2 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center">
              <Image
                src="/icons/logo.svg"
                alt="Logo shop"
                className="rounded-full mr-4"
                width={30}
                height={30}
              />
              <span className="font-semibold">{order.shopName}</span>
              <AiOutlineRight className="ml-2" />
            </div>
            <div className="flex justify-center items-center">
              <i className="mr-1">🚚</i>
              <p>{order.statusText}</p>
              <p className="text-gray-500 mx-2">|</p>
              <p className={getStatusClass(order.status)}>{order.orderStatus}</p>
            </div>
          </div>
  
          <div className="px-6 py-4">
            <div className="flex items-center justify-center justify-between">
              <img
                src={order.imgSrc}
                alt={order.productName}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-grow ml-4">
                <h2 className="font-semibold text-sm">{order.productName}</h2>
                <p className="text-xs text-gray-500">
                  Thể tích: {order.volume} | Khối lượng: {order.weight} | Loại
                  hàng: {order.quality} | Số lượng: {order.quantity}
                </p>
              </div>
              <div className="text-red-600 font-semibold text-lg">
                {order.price}
              </div>
            </div>
          </div>
  
          <div className="px-6 py-4 flex items-center border-t justify-between">
            <div className="mt-4 flex justify-center">{renderActionButtons()}</div>
            <div className="text-right font-semibold text-lg">
              Thành tiền:{" "}
              <span className="text-red-600">
                {order.totalPrice ? order.totalPrice : order.price}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
  