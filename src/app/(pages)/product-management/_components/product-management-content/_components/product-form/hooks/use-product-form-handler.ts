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
  const router = useRouter();

  const handleSubmit = async (data: ProductFormValues) => {
    try {
      await createProductAction(data);
      router.refresh();

      // Call the external onSubmit handler if provided
      if (onSubmit) {
        await onSubmit(data);
      }

      toast.success("Product created successfully!");
      resetForm(FORM_DEFAULT_VALUES);
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error("Failed to create product. Please try again.");
    }
  };

  return { handleSubmit };
};
