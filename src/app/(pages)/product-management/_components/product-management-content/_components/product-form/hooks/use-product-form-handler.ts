"use client";

import { toast } from "sonner";
import { type UseFormReset } from "react-hook-form";
import { type ProductFormValues } from "@/schemas/product.schema";
import { FORM_DEFAULT_VALUES } from "../utils/constants";
import { createProductAction } from "../../../../../actions";
import { useRouter } from "next/navigation";

type props = {
  onSubmit?: (data: ProductFormValues) => void | Promise<void>;
  resetForm: UseFormReset<ProductFormValues>;
};

export const useProductFormHandler = ({ onSubmit, resetForm }: props) => {
  const handleSubmit = async (data: ProductFormValues) => {
    try {
      // Call the external onSubmit handler if provided
      if (onSubmit) {
        await onSubmit(data);
      }
      resetForm(FORM_DEFAULT_VALUES);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return { handleSubmit };
};
