import BuyForm from "@/components/BuyForm";
import { useUserAccountContext } from "@/hooks/useUserAccountContext";
import { getRandomInteger } from "@/lib/getRandomInteger";
import { useEffect, useMemo } from "react";

const Buy = () => {
  const { setUnitGoldPrice } = useUserAccountContext();

  const randomUnitGoldPrice = useMemo(() => {
    return getRandomInteger(33000000, 36000000);
  }, []);

  useEffect(() => {
    setUnitGoldPrice(randomUnitGoldPrice);
  }, []);

  return (
    <div className="w-full">
      <BuyForm />
    </div>
  );
};

export default Buy;
