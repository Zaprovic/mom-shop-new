import { z } from "zod";

export const productSchema = z.object({
  id: z.number(),
  name: z
    .string()
    .min(2, {
      message: "Product name must be at least 2 characters.",
    })
    .max(100, {
      message: "Product name must not exceed 100 characters.",
    }),
  price: z.coerce.number().min(0, {
    message: "Price must be a non-negative number.",
  }),
  category: z.string().min(1, {
    message: "Please select a category.",
  }),
  imageUrl: z.string().url({
    message: "Please enter a valid URL.",
  }),
  inStock: z.boolean(),
});

export const productFormSchema = productSchema.omit({ id: true });

export type ProductFormData = z.infer<typeof productSchema>;
export type ProductFormValues = z.infer<typeof productFormSchema>;
