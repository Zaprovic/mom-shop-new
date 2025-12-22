import { z } from "zod";

export const productSchema = z.object({
  id: z.number(),
  name: z
    .string()
    .min(2, {
      message: "El nombre del producto debe tener al menos 2 caracteres.",
    })
    .max(100, {
      message: "El nombre del producto no debe exceder los 100 caracteres.",
    }),
  price: z.coerce.number().min(0, {
    message: "El precio debe ser un número no negativo.",
  }),
  category: z.string().min(1, {
    message: "Por favor selecciona una categoría.",
  }),
  imageUrl: z.string().url({
    message: "Por favor ingresa una URL válida.",
  }),
  inStock: z.boolean(),
});

export const productFormSchema = productSchema.omit({ id: true });

export type ProductFormData = z.infer<typeof productSchema>;
export type ProductFormValues = z.infer<typeof productFormSchema>;
