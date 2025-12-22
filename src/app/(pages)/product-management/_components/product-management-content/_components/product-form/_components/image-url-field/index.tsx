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

export const ImageUrlField = ({ disabled }: IFormFieldProps) => {
  const { control } = useFormContext<ProductFormData>();
  return (
    <FormField
      control={control}
      name="imageUrl"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Image URL</FormLabel>
          <FormControl>
            <Input
              placeholder="Enter image URL..."
              {...field}
              disabled={disabled}
            />
          </FormControl>
          <FormDescription>The URL of the product image</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
