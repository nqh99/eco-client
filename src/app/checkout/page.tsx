import React from "react";

const ShoppingCartPage = () => {
  // TODO: enhance later
  const cartItems = 1;
  return (
    <main className="px-default gap-3 flex flex-col">
      {cartItems > 0 ? (
        <>
          {/* Shopping Cart section with user orders */}
          <div className="flex flex-row gap-3 mt-4 overflow-visible">
            <div className="w-3/4 flex flex-col gap-3"></div>
            <div className="w-1/4 inline-flex flex-col gap-4 sticky h-fit top-0 right-0"></div>
          </div>
        </>
      ) : (
        <>
          {/* Shopping Cart section without user orders */}
          <div></div>
          {/* Top Selling Products section */}
          <div></div>
          {/* Relative Products section */}
          <div></div>
        </>
      )}
      {/* Eco-HHB Policies section */}
      <div></div>
    </main>
  );
};

export default ShoppingCartPage;
