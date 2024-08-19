import { z } from "zod";

const formSchema = z.object({
  value: z.string().min(1, { message: "این فیلد الزامی است" }),
  price: z.string().min(1, { message: "این فیلد الزامی است" }),
});

export default formSchema;
