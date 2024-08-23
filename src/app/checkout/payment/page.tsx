import React from "react";

const PaymentPage = () => {
  return (
    <div className="p-default rounded-lg shadow-md grid grid-cols-12 gap-5">
      <h2 className="col-span-9">Thanh Toán</h2>
      <div className="col-span-9 flex flex-col gap-3">
        {/* Payment methods */}
        <div>Payment methods</div>
        {/* Cart Products */}
        <div>Cart Products</div>
      </div>
      {/*Payment Information */}
      <div className="col-span-3">Payment Information</div>
    </div>
  );
};

export default PaymentPage;
