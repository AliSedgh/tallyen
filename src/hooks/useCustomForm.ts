import formSchema from "@/lib/validator";
import { FormMethods, TFormSchema, TOrder } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { removeCommas } from "@persian-tools/persian-tools";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useUserAccountContext } from "./useUserAccountContext";

const useCustomForm = (): { form: FormMethods; submitHandler: () => void } => {
  const { setTotalPrice, totalPrice, unitGoldPrice, setOrders, setGold, gold } =
    useUserAccountContext();
  const form = useForm<TFormSchema>({
    defaultValues: { value: "", price: "" },
    resolver: zodResolver(formSchema),
  });

  const navigate = useNavigate();

  const isPriceExceeding = (totalPrice: number, price: string): boolean => {
    return +price > totalPrice;
  };

  const calculateNewTotalPrice = (
    currentTotalPrice: number,
    price: string
  ): string => {
    return (currentTotalPrice - +removeCommas(price)).toString();
  };
  const handleValidationError = (form: FormMethods, message: string) => {
    form.setError("price", {
      type: "manual",
      message,
    });
    setTimeout(() => form.setFocus("price", { shouldSelect: true }), 0);
  };

  const onSubmit: SubmitHandler<TFormSchema> = (data) => {
    const totalPriceWithoutCommas = removeCommas(data.price);
    const value: TOrder = {
      amount: data.value,
      totalPrice: totalPriceWithoutCommas,
      unitPrice: unitGoldPrice,
      createAt: new Date(),
    };

    if (+value.totalPrice > 1000000000) {
      handleValidationError(form, "مبلغ خرید تا سقف یک میلیار ریال مجاز است");
      return;
    }

    if (isPriceExceeding(+totalPrice, value.totalPrice)) {
      handleValidationError(form, "مبلغ خرید بیشتر از موجودی شما است");
    } else {
      setOrders(value);
      setTotalPrice(calculateNewTotalPrice(+totalPrice, data.price));
      setGold((+gold + +data.value).toString());
      navigate("/");
    }
  };

  return { form, submitHandler: form.handleSubmit(onSubmit) };
};

export default useCustomForm;
