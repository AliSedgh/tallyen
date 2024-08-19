import formSchema from "@/lib/validator";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

export type TOrder = {
  createAt: Date;
  unitPrice: string;
  totalPrice: string;
  amount: string;
};

export type FormMethods = UseFormReturn<TFormSchema>;

export type TFormSchema = z.infer<typeof formSchema>;
