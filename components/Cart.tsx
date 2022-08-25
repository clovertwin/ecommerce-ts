import React from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useStateContext } from "../context/StateContext";

const Cart = () => {
  const {
    cartItems,
    showCart,
    setShowCart,
    onToggleAddSubtractItem,
    totalQuantitys,
    totalPrice,
    onRemove,
  } = useStateContext();

  return (
    <div className="fixed w-screen right-0 top-0 z-40 bg-opacity-60 bg-neutral-900 backdrop-blur-sm">
      <div className="w-screen h-screen float-right py-10 px-2 relative bg-neutral-50 text-neutral-600 md:w-1/2">
        <div className="flex items-center ml-3 text-xl font-medium">
          <div
            className="transition-transform ease-in-out duration-300 hover:scale-125 hover:cursor-pointer"
            onClick={() => setShowCart(false)}
          >
            <AiOutlineLeft />
          </div>
          <p
            className="ml-3 hover:cursor-pointer"
            onClick={() => setShowCart(false)}
          >
            Your Cart
          </p>
          <p className="ml-3 text-red-500">({totalQuantitys})</p>
        </div>
        {cartItems.length < 1 && (
          <div className="flex flex-col items-center justify-center mt-14">
            <MdOutlineShoppingCart className="text-9xl" />
            <h3 className="mt-5 text-3xl font-semibold">Your cart is empty</h3>
            <button
              type="button"
              className="px-14 py-2 text-2xl font-semibold text-neutral-50 bg-red-500 rounded-full mt-10 transition-transform ease-in-out duration-300 hover:scale-110"
            >
              Continue Shopping
            </button>
          </div>
        )}
        {cartItems.length >= 1 && <h2>cart items</h2>}
      </div>
    </div>
  );
};

export default Cart;
