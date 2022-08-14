import Link from "next/link";
import { useState } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import Cart from "./Cart";

const Navbar = () => {
  const [showCart, setShowCart] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex justify-between items-center bg-neutral-50 shadow-md px-7 py-3">
      <p className="font-bold text-lg">
        <Link href="/">AccessoryShack</Link>
      </p>

      <button type="button" className="relative flex text-2xl cursor-pointer">
        <MdOutlineShoppingCart />
        <span className="absolute -right-2 -top-1 text-xs font-semibold bg-red-500 text-neutral-50 w-4 h-4 leading-tight rounded-full text-center">
          0
        </span>
      </button>
      {showCart && <Cart />}
    </header>
  );
};

export default Navbar;
