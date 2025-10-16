import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, type ProductFormData } from "@/schemas/product.schema";
import { FORM_DEFAULT_VALUES } from "../utils/constants";

export const useProductForm = () => {
  return useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: FORM_DEFAULT_VALUES,
  });
};
