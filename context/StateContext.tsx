import React, {
  useState,
  createContext,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { Product, CartItem } from "../typings";
import { toast } from "react-hot-toast";

interface Props {
  children?: ReactNode;
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
  onToggleAddSubtractItem: (product: Product, action: "inc" | "dec") => void;
}

const Context = createContext({} as StateContextInterface);

const initialState = []!;

export const StateContext = ({ children }: Props) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialState);
  const [showCart, setShowCart] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantitys, setTotalQuantitys] = useState(0);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const localStorageCartData = localStorage.getItem("cart");
    if (localStorageCartData) {
      const parsedCartData = JSON.parse(localStorageCartData);
      const localStorageTotalPrice = localStorage.getItem("totalPrice");
      const localStorageQuantitys = localStorage.getItem("quantitys");
      setCartItems(parsedCartData);
      setTotalPrice(
        localStorageTotalPrice ? JSON.parse(localStorageTotalPrice) : 0
      );
      setTotalQuantitys(
        localStorageQuantitys ? JSON.parse(localStorageQuantitys) : 0
      );
    }
  }, []);

  useEffect(() => {
    if (cartItems !== initialState) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
      localStorage.setItem("totalPrice", JSON.stringify(totalPrice));
      localStorage.setItem("quantitys", JSON.stringify(totalQuantitys));
    }
  }, [cartItems, totalPrice, totalQuantitys]);

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
      setTotalPrice((prev) => prev - foundItem.price * foundItem.quantity);
      setTotalQuantitys((prev) => prev - foundItem.quantity);
      setCartItems(cartItems.filter((item) => item._id !== product._id));
    } else return;
  };

  const onToggleAddSubtractItem = (product: Product, action: "inc" | "dec") => {
    const foundItem = cartItems.find((item) => item._id === product._id);
    const foundItemId = cartItems.findIndex((item) => item._id === product._id);
    if (foundItem) {
      if (action === "inc") {
        const updatedItem = { ...foundItem, quantity: foundItem.quantity + 1 };
        let upDatedCartItems = [...cartItems];
        upDatedCartItems[foundItemId] = updatedItem;
        setCartItems(upDatedCartItems);
        setTotalPrice((prev) => prev + foundItem.price);
        setTotalQuantitys((prev) => prev + 1);
      } else if (action === "dec") {
        if (foundItem.quantity > 1) {
          const upDatedItem = {
            ...foundItem,
            quantity: foundItem.quantity - 1,
          };
          let updatedCartItems = [...cartItems];
          updatedCartItems[foundItemId] = upDatedItem;
          setCartItems(updatedCartItems);
          setTotalPrice((prev) => prev - foundItem.price);
          setTotalQuantitys((prev) => prev - 1);
        } else {
          return;
        }
      }
    } else {
      return;
    }
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
        onToggleAddSubtractItem,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
