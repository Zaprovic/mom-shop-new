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

interface ReviewsFieldProps extends IFormFieldProps {}

export const ReviewsField = ({ disabled }: ReviewsFieldProps) => {
  const { control } = useFormContext<ProductFormData>();
  return (
    <FormField
      control={control}
      name="reviews"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Number of Reviews</FormLabel>
          <FormControl>
            <Input
              placeholder="0"
              type="number"
              min="0"
              {...field}
              disabled={disabled}
            />
          </FormControl>
          <FormDescription>Total number of customer reviews</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
