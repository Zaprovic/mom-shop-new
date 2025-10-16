import React from "react";
import { Control } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { type ProductFormData } from "@/schemas/product.schema";
import { FORM_MESSAGES } from "../../utils/constants";
import { type IFormFieldProps } from "../../types";

interface PriceFieldProps extends IFormFieldProps {
  control: Control<ProductFormData>;
}

export const PriceField = ({ control, disabled }: PriceFieldProps) => {
  return (
    <FormField
      control={control}
      name="price"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{FORM_MESSAGES.price}</FormLabel>
          <FormControl>
            <Input
              placeholder={FORM_MESSAGES.pricePlaceholder}
              type="number"
              step="0.01"
              min="0"
              {...field}
              disabled={disabled}
            />
          </FormControl>
          <FormDescription>{FORM_MESSAGES.priceDescription}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
