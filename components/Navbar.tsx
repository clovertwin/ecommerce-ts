import Link from "next/link";
import { useStateContext } from "../context/StateContext";
import { MdOutlineShoppingCart } from "react-icons/md";
import Cart from "./Cart";

const Navbar = () => {
  const { showCart, setShowCart, totalQuantitys } = useStateContext();

  return (
    <header className="sticky top-0 z-30 flex justify-between items-center bg-neutral-50 shadow-md px-7 py-3">
      <p className="font-bold text-xl text-neutral-600 transition-transform duration-500 ease-in-out hover:text-black">
        <Link href="/">AccessoryShack</Link>
      </p>

      <button
        type="button"
        onClick={() => setShowCart(true)}
        className="relative flex text-2xl cursor-pointer text-neutral-600 transition-transform duration-500 ease-in-out hover:scale-125 hover:text-black"
      >
        <MdOutlineShoppingCart />
        <span className="absolute -right-2 -top-1 text-[.70rem] font-semibold bg-red-500 text-neutral-50 w-4 h-4 leading-snug rounded-full text-center">
          {totalQuantitys}
        </span>
      </button>
      {showCart && <Cart />}
    </header>
  );
};

export default Navbar;
