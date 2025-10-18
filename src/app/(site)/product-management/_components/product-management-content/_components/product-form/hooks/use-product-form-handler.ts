import { toast } from "sonner";
import { type UseFormReset } from "react-hook-form";
import { type ProductFormData } from "@/schemas/product.schema";
import { FORM_DEFAULT_VALUES } from "../utils/constants";

interface UseProductFormHandlerParams {
  onSubmit?: (data: ProductFormData) => void | Promise<void>;
  resetForm: UseFormReset<ProductFormData>;
}

const API_CALL_DELAY = 500; // Simulated API call delay in ms

export const useProductFormHandler = ({
  onSubmit,
  resetForm,
}: UseProductFormHandlerParams) => {
  const handleSubmit = async (data: ProductFormData) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, API_CALL_DELAY));

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
