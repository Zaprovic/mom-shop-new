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

export const RatingField = ({ disabled }: IFormFieldProps) => {
  const { control } = useFormContext<ProductFormData>();
  return (
    <FormField
      control={control}
      name="rating"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Rating</FormLabel>
          <FormControl>
            <Input
              placeholder="0"
              type="number"
              step="0.1"
              min="0"
              max="5"
              {...field}
              disabled={disabled}
            />
          </FormControl>
          <FormDescription>Rating out of 5</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
