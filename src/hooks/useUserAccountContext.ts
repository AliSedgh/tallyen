import { CartContext } from "@/provider/CartProvider";
import { useContext } from "react";

export const useUserAccountContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
};
