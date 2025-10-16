import React from "react";
import { Control } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { type ProductFormData } from "@/schemas/product.schema";
import { FORM_MESSAGES } from "../../utils/constants";
import { type IFormFieldProps } from "../../types";

interface StockFieldProps extends IFormFieldProps {
  control: Control<ProductFormData>;
}

export const StockField = ({ control, disabled }: StockFieldProps) => {
  return (
    <FormField
      control={control}
      name="inStock"
      render={({ field }) => (
        <FormItem className="flex flex-row items-center gap-3 space-y-0">
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={disabled}
            />
          </FormControl>
          <div className="flex flex-col gap-1">
            <FormLabel className="font-medium">
              {FORM_MESSAGES.inStock}
            </FormLabel>
            <FormDescription>
              {FORM_MESSAGES.inStockDescription}
            </FormDescription>
          </div>
        </FormItem>
      )}
    />
  );
};
