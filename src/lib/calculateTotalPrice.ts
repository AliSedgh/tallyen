import { TOrder } from "@/types";
import formatNumberWithCommas from "./formatPriceWithCommas";

export const calculateTotalPrice = (orders: TOrder[]): string => {
  const totalPrice = orders.reduce((total, order) => {
    return total + parseFloat(order.totalPrice);
  }, 0);

  return formatNumberWithCommas(totalPrice);
};
