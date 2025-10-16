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

interface RatingFieldProps extends IFormFieldProps {
  control: Control<ProductFormData>;
}

export const RatingField = ({ control, disabled }: RatingFieldProps) => {
  return (
    <FormField
      control={control}
      name="rating"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{FORM_MESSAGES.rating}</FormLabel>
          <FormControl>
            <Input
              placeholder={FORM_MESSAGES.ratingPlaceholder}
              type="number"
              step="0.1"
              min="0"
              max="5"
              {...field}
              disabled={disabled}
            />
          </FormControl>
          <FormDescription>{FORM_MESSAGES.ratingDescription}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
