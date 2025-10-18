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
  rating: z.coerce.number().min(0).max(5, {
    message: "Rating must be between 0 and 5.",
  }),
  reviews: z.coerce.number().min(0, {
    message: "Number of reviews must be a non-negative integer.",
  }),
  badge: z.union([z.string(), z.null()]).optional(),
  inStock: z.boolean(),
});

export type ProductFormData = z.infer<typeof productSchema>;
