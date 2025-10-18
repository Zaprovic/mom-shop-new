import React from "react";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { type ProductFormData } from "@/schemas/product.schema";
import { type IFormFieldProps } from "../../types";

interface StockFieldProps extends IFormFieldProps {}

export const StockField = ({ disabled }: StockFieldProps) => {
  const { control } = useFormContext<ProductFormData>();
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
            <FormLabel className="font-medium">In Stock</FormLabel>
            <FormDescription>
              Is this product currently available?
            </FormDescription>
          </div>
        </FormItem>
      )}
    />
  );
};
