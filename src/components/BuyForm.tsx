import React, { ChangeEvent, useCallback } from "react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/Form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import formatNumberWithCommas from "@/lib/formatPriceWithCommas";
import useCustomForm from "@/hooks/useCustomForm";
import { convertNumberToWords, convertToToman } from "@/lib/convertToTomanWord";
import { useUserAccountContext } from "@/hooks/useUserAccountContext";

const BuyForm: React.FC = () => {
  const { unitGoldPrice } = useUserAccountContext();
  const { form, submitHandler } = useCustomForm();

  const amountInWords = convertNumberToWords(form.watch().price);

  const cleanInputValue = useCallback((value: string): string => {
    return value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");
  }, []);

  const calculatePrice = useCallback(
    (value: string, unitGoldPrice: string): string => {
      return (+value * +unitGoldPrice).toString();
    },
    []
  );

  const calculateValue = useCallback(
    (price: string, unitGoldPrice: string): string => {
      return (+price / +unitGoldPrice).toFixed(3).toString();
    },
    []
  );

  const onChangeHandler = useCallback(
    (
      e: ChangeEvent<HTMLInputElement>,
      onChange: (val: string) => void,
      type: "price" | "value"
    ) => {
      const rawValue = e.target.value;
      const numericValue = cleanInputValue(rawValue);

      if (numericValue === "") {
        onChange("");
        form.setValue(type === "price" ? "value" : "price", "");
        return;
      }

      if (type === "price") {
        const formattedPrice = formatNumberWithCommas(+numericValue);
        const calculatedValue = calculateValue(numericValue, unitGoldPrice);
        onChange(formattedPrice);
        form.setValue("value", calculatedValue);
      } else {
        const calculatedPrice = formatNumberWithCommas(
          +calculatePrice(numericValue, unitGoldPrice)
        );
        onChange(numericValue);
        form.setValue("price", calculatedPrice);
      }
    },
    [cleanInputValue, calculatePrice, calculateValue, form, unitGoldPrice]
  );

  return (
    <div>
      <Form {...form}>
        <form onSubmit={submitHandler}>
          <div className="flex flex-col mt-5 gap-5 md:flex-row">
            <div className="flex-1">
              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        error={form.formState.errors.value}
                        placeholder="مقدار"
                        value={field.value}
                        name={field.name}
                        onChange={(e) => {
                          onChangeHandler(e, field.onChange, "value");
                        }}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex-1 flex flex-col w-full">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        error={form.formState.errors.price}
                        value={field.value}
                        name={field.name}
                        onChange={(e) => {
                          onChangeHandler(e, field.onChange, "price");
                        }}
                        placeholder="مبلغ"
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <span className="text-xs mt-2">{amountInWords}</span>
            </div>
          </div>
          <div className="flex justify-end w-full flex-col md:flex-row gap-2 mt-5">
            <Button
              disabled={!!!form.getValues("price")}
              className="disabled:opacity-20 px-4 md:w-32 w-full"
              type="submit"
            >
              خرید
            </Button>
            <Link
              to="/"
              className="px-4 py-2 text-center bg-slate-200 font-semibold rounded-md md:w-32 w-full"
            >
              برگشت
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default BuyForm;
