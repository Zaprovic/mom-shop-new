import type { ProductFormData } from "@/schemas/product.schema";

export type IProductFormProps = {
  onSubmit?: (data: ProductFormData) => void | Promise<void>;
};

export type IFormFieldProps = {
  disabled?: boolean;
};

export type IProductFormHandlers = {
  onSubmit: (data: ProductFormData) => Promise<void>;
};
