import React from "react";
import {
  AiOutlineLeft,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useStateContext } from "../context/StateContext";
import { urlFor } from "../lib/client";
import getStripe from "../lib/getStripe";
import { toast } from "react-hot-toast";

const Cart = () => {
  const {
    cartItems,
    setShowCart,
    onToggleAddSubtractItem,
    totalQuantitys,
    totalPrice,
    onRemove,
  } = useStateContext();

  const handleCheckout = async () => {
    const stripe = await getStripe();
    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItems),
    });
    if (response.status === 500) return;
    const data = await response.json();
    toast.loading("Redirecting...");
    stripe!.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <div className="fixed w-screen right-0 top-0 z-40 bg-opacity-60 bg-neutral-900 backdrop-blur-sm">
      <div className="w-screen h-screen float-right py-10 px-2 relative bg-neutral-50 text-neutral-600 sm:w-3/4 md:w-1/2 lg:w-2/5">
        <div className="flex items-center ml-3 text-xl font-medium">
          <div
            className="transition-transform ease-in-out duration-300 hover:scale-125 hover:cursor-pointer"
            onClick={() => setShowCart(false)}
          >
            <AiOutlineLeft />
          </div>
          <p className="ml-3">Your Cart</p>
          <p className="ml-3 text-red-500">
            ({totalQuantitys} {totalQuantitys === 1 ? "item" : "items"})
          </p>
        </div>
        {cartItems.length < 1 && (
          <div className="flex flex-col items-center justify-center mt-14">
            <MdOutlineShoppingCart className="text-9xl" />
            <h3 className="mt-5 text-3xl font-semibold">Your cart is empty</h3>
            <button
              onClick={() => setShowCart(false)}
              type="button"
              className="px-14 py-2 text-2xl font-semibold text-neutral-50 bg-red-500 rounded-full mt-10 transition-transform ease-in-out duration-300 hover:scale-110"
            >
              Continue Shopping
            </button>
          </div>
        )}
        {cartItems.length >= 1 && (
          <div className="flex flex-col justify-between items-center mt-3">
            <div className="h-[50vh] overflow-y-scroll w-full">
              {cartItems.map((item) => (
                <div key={item._id} className="flex items-center mt-5">
                  <img
                    src={urlFor(item.image[0]).url()}
                    alt={`${item.name} image`}
                    className="w-28 h-28 rounded-xl bg-neutral-300 p-2 mr-5"
                  />
                  <div className="flex-col w-full mr-3">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold mr-3">
                        {item.name}
                      </h3>
                      <p className="text-lg font-bold text-black">
                        ${item.price}
                      </p>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <div className="border flex border-neutral-600">
                        <div
                          onClick={() => onToggleAddSubtractItem(item, "dec")}
                          className="flex items-center justify-center px-3 py-1 hover:cursor-pointer"
                        >
                          <AiOutlineMinus />
                        </div>
                        <div className="flex items-center justify-center px-4 py-1 border-x border-neutral-600">
                          <p className="text-xl">{item.quantity}</p>
                        </div>
                        <div
                          onClick={() => onToggleAddSubtractItem(item, "inc")}
                          className="flex items-center justify-center px-3 py-1 hover:cursor-pointer"
                        >
                          <AiOutlinePlus />
                        </div>
                      </div>
                      <AiOutlineCloseCircle
                        onClick={() => onRemove(item)}
                        className="text-red-500 text-2xl hover:cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-around w-full text-2xl font-bold mt-10">
              <h3>Subtotal:</h3>
              <p>${totalPrice}</p>
            </div>
            <button
              onClick={handleCheckout}
              className="bg-red-500 text-neutral-50 px-5 py-2 mt-3 rounded-full text-2xl w-3/4 transition-transform ease-in-out duration-300 hover:scale-110"
              type="button"
            >
              Pay With Stripe
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
