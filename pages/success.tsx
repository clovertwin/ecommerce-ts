import React, { useEffect } from "react";
import { runFireworks } from "../lib/utils";
import { useStateContext } from "../context/StateContext";
import { BsFillBagCheckFill } from "react-icons/bs";
import Link from "next/link";

const Success = () => {
  const { setCartItems, setTotalPrice, setTotalQuantitys } = useStateContext();

  useEffect(() => {
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantitys(0);
    runFireworks();
  }, [setCartItems, setTotalPrice, setTotalQuantitys]);

  return (
    <div className="h-[90vh] flex justify-center items-center">
      <div className="bg-neutral-300 py-10 px-3 mx-2 rounded-2xl flex flex-col justify-center items-center text-center md:px-10 md:w-3/4">
        <BsFillBagCheckFill className="text-green-500 text-6xl" />
        <h1 className="text-4xl font-black text-neutral-700 mt-5 lg:text-5xl">
          Thank You For Your Order!
        </h1>
        <p className="mt-5 font-semibold sm:text-lg">
          Check your email inbox for the receipt.
        </p>
        <p className="mt-5 font-semibold sm:text-lg">
          If you have any questions please email
        </p>
        <p className="font-semibold text-red-500 underline hover:cursor-pointer sm:text-lg">
          accessoryshack@email.com
        </p>
        <Link href="/">
          <button
            type="button"
            className="bg-red-500 text-neutral-50 px-5 py-2 mt-10 w-full rounded-full text-xl transition-transform ease-in-out duration-300 hover:scale-110 sm:w-3/4 md:font-semibold"
          >
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
