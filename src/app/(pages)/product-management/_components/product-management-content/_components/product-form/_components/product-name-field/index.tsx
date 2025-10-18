import React from "react";
import { useFormContext } from "react-hook-form";
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
import { type IFormFieldProps } from "../../types";

export const ProductNameField = ({ disabled }: IFormFieldProps) => {
  const { control } = useFormContext<ProductFormData>();
  return (
    <FormField
      control={control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Product Name</FormLabel>
          <FormControl>
            <Input
              placeholder="Enter product name..."
              {...field}
              disabled={disabled}
            />
          </FormControl>
          <FormDescription>
            The name of your product (2-100 characters)
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
