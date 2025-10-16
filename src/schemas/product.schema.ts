import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Product name must be at least 2 characters.",
    })
    .max(100, {
      message: "Product name must not exceed 100 characters.",
    }),
  price: z
    .string()
    .refine((val) => !isNaN(parseFloat(val)), {
      message: "Price must be a valid number.",
    })
    .refine((val) => parseFloat(val) > 0, {
      message: "Price must be greater than 0.",
    }),
  category: z.string().min(1, {
    message: "Please select a category.",
  }),
  rating: z
    .string()
    .refine((val) => !isNaN(parseFloat(val)), {
      message: "Rating must be a valid number.",
    })
    .refine(
      (val) => {
        const num = parseFloat(val);
        return num >= 0 && num <= 5;
      },
      {
        message: "Rating must be between 0 and 5.",
      }
    ),
  reviews: z
    .string()
    .refine((val) => !isNaN(parseInt(val)), {
      message: "Reviews must be a valid number.",
    })
    .refine((val) => parseInt(val) >= 0, {
      message: "Reviews cannot be negative.",
    }),
  badge: z.union([z.string(), z.null()]).optional(),
  inStock: z.boolean(),
});

export type ProductFormData = z.infer<typeof productSchema>;
