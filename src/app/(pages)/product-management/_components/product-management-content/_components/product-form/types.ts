import type { ProductFormData } from "@/schemas/product.schema";

export type Category = {
  id: number;
  name: string;
};

export type IProductFormProps = {
  onSubmit?: (data: ProductFormData) => void | Promise<void>;
  categories: Category[];
};

export type IFormFieldProps = {
  disabled?: boolean;
};

export type ICategoryFieldProps = IFormFieldProps & {
  categories: Category[];
};

export type IProductFormHandlers = {
  onSubmit: (data: ProductFormData) => Promise<void>;
};
