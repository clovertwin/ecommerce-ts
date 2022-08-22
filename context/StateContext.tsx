import React, { useState, createContext, useContext, ReactNode } from "react";
import { Product } from "../typings";
import { toast } from "react-hot-toast";

interface Props {
  children?: ReactNode;
}

interface CartItem extends Product {
  quantity: number;
}

interface StateContextInterface {
  cartItems: [] | CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<never[]>>;
  showCart: boolean;
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
  totalPrice: number;
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
  totalQuantitys: number;
  setTotalQuantitys: React.Dispatch<React.SetStateAction<number>>;
  qty: number;
}

const Context = createContext({} as StateContextInterface);

export const StateContext = ({ children }: Props) => {
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantitys, setTotalQuantitys] = useState(0);
  const [qty, setQty] = useState(1);

  return (
    <Context.Provider
      value={{
        cartItems,
        setCartItems,
        showCart,
        setShowCart,
        totalPrice,
        setTotalPrice,
        totalQuantitys,
        setTotalQuantitys,
        qty,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
