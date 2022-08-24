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
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  showCart: boolean;
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
  totalPrice: number;
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
  totalQuantitys: number;
  setTotalQuantitys: React.Dispatch<React.SetStateAction<number>>;
  qty: number;
  increaseQty: () => void;
  decreaseQty: () => void;
  onAdd: (product: Product, quantity: number) => void;
  onRemove: (product: Product) => void;
}

const Context = createContext({} as StateContextInterface);

export const StateContext = ({ children }: Props) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantitys, setTotalQuantitys] = useState(0);
  const [qty, setQty] = useState(1);

  const onAdd = (product: Product, quantity: number) => {
    const foundItem = cartItems.find(
      (item: CartItem) => item._id === product._id
    );
    setTotalPrice((prev) => prev + product.price * quantity);
    setTotalQuantitys((prev) => prev + quantity);
    if (foundItem) {
      const updatedCartItems = cartItems.map((item: CartItem) => {
        if (item._id === product._id) {
          return { ...item, quantity: item.quantity + quantity };
        } else {
          return item;
        }
      });
      setCartItems(updatedCartItems);
    } else {
      const cartItem: CartItem = { ...product, quantity };
      setCartItems((prev: CartItem[]) => [...prev, cartItem]);
    }
    toast.success(`${qty} ${product.name} added to cart.`);
  };

  const onRemove = (product: Product) => {
    const foundItem = cartItems.find(
      (item: CartItem) => item._id === product._id
    );
    if (foundItem) {
      setTotalPrice((prev) => prev - product.price);
      setTotalQuantitys((prev) => prev - foundItem.quantity);
      setCartItems(cartItems.filter((item) => item._id !== product._id));
    } else return;
  };

  const increaseQty = () => setQty((prev) => prev + 1);

  const decreaseQty = () => setQty((prev) => (prev > 1 ? prev - 1 : 1));

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
        increaseQty,
        decreaseQty,
        onAdd,
        onRemove,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
