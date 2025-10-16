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

interface ReviewsFieldProps extends IFormFieldProps {
  control: Control<ProductFormData>;
}

export const ReviewsField = ({ control, disabled }: ReviewsFieldProps) => {
  return (
    <FormField
      control={control}
      name="reviews"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{FORM_MESSAGES.reviews}</FormLabel>
          <FormControl>
            <Input
              placeholder={FORM_MESSAGES.reviewsPlaceholder}
              type="number"
              min="0"
              {...field}
              disabled={disabled}
            />
          </FormControl>
          <FormDescription>{FORM_MESSAGES.reviewsDescription}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
