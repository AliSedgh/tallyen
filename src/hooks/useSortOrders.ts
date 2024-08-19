import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useUserAccountContext } from "./useUserAccountContext";

export type TOrder = {
  createAt: Date;
  unitPrice: string;
  totalPrice: string;
  amount: string;
};

export const useSortedOrders = () => {
  const { orders } = useUserAccountContext();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const sortQuery = queryParams.get("sort");

  const sortFunctions = {
    "newest-purchase": (a: TOrder, b: TOrder) =>
      new Date(b.createAt).getTime() - new Date(a.createAt).getTime(),
    "highest-payment": (a: TOrder, b: TOrder) =>
      parseFloat(b.totalPrice) - parseFloat(a.totalPrice),
    "lowest-payment": (a: TOrder, b: TOrder) =>
      parseFloat(a.totalPrice) - parseFloat(b.totalPrice),
    "highest-unit-price": (a: TOrder, b: TOrder) =>
      parseFloat(b.unitPrice) - parseFloat(a.unitPrice),
    "lowest-unit-price": (a: TOrder, b: TOrder) =>
      parseFloat(a.unitPrice) - parseFloat(b.unitPrice),
  };

  const sortedOrders = useMemo(() => {
    const sortFunction = sortFunctions[sortQuery as keyof typeof sortFunctions];
    return sortFunction ? [...orders].sort(sortFunction) : orders;
  }, [orders, sortQuery]);

  return sortedOrders;
};
