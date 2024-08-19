import React, { FC, PropsWithChildren, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { TOrder } from "@/types";
import { getRandomInteger } from "@/lib/getRandomInteger";

interface ICartContext {
  totalPrice: string;
  gold: string;
  unitGoldPrice: string;
  setTotalPrice: (value: string) => void;
  setGold: (value: string) => void;
  setUnitGoldPrice: (value: string) => void;
  orders: TOrder[];
  setOrders: (val: TOrder) => void;
}

export const CartContext = React.createContext<ICartContext | null>(null);

const CartProvider: FC<PropsWithChildren> = ({ children }) => {
  const [goldStorage, setGoldStorage] = useLocalStorage("gold", "10");
  const [priceStorage, setPriceStorage] = useLocalStorage("price", "100000000");
  const [totalOrders, setTotalOrders] = useLocalStorage("orders", "[]");

  const [totalPrice, setTotalPrice] = React.useState(priceStorage);
  const [gold, setGold] = React.useState(goldStorage);
  const [unitGoldPrice, setUnitGoldPrice] = React.useState<string>(
    getRandomInteger(33000000, 36000000)
  );
  const [orders, setOrders] = useState<TOrder[]>(totalOrders);

  useEffect(() => {
    setGoldStorage(gold);
    setPriceStorage(totalPrice);
    setTotalOrders(orders);
  }, [gold, totalPrice, orders]);

  const value = {
    totalPrice,
    gold,
    setTotalPrice,
    setGold,
    unitGoldPrice,
    setUnitGoldPrice,
    orders,
    setOrders: (val: TOrder) => setOrders([...orders, val]),
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;
