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

interface ProductNameFieldProps extends IFormFieldProps {
  control: Control<ProductFormData>;
}

export const ProductNameField = ({
  control,
  disabled,
}: ProductNameFieldProps) => {
  return (
    <FormField
      control={control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{FORM_MESSAGES.productName}</FormLabel>
          <FormControl>
            <Input
              placeholder={FORM_MESSAGES.productNamePlaceholder}
              {...field}
              disabled={disabled}
            />
          </FormControl>
          <FormDescription>
            {FORM_MESSAGES.productNameDescription}
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
