import React from "react";

interface Props {
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
}

const Cart = ({ setShowCart }: Props) => {
  return (
    <div
      onClick={() => setShowCart(false)}
      className="fixed w-screen right-0 top-0 z-40 bg-opacity-60 bg-neutral-900"
    >
      <div className="w-3/4 h-screen float-right py-10 px-2 relative bg-neutral-50">
        <button onClick={() => setShowCart(false)}>close</button>
      </div>
    </div>
  );
};

export default Cart;
