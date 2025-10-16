import React from "react";
import { Control } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type ProductFormData } from "@/schemas/product.schema";
import { PRODUCT_CATEGORIES, FORM_MESSAGES } from "../../utils/constants";
import { type IFormFieldProps } from "../../types";

interface CategoryFieldProps extends IFormFieldProps {
  control: Control<ProductFormData>;
}

export const CategoryField = ({ control, disabled }: CategoryFieldProps) => {
  return (
    <FormField
      control={control}
      name="category"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{FORM_MESSAGES.category}</FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            disabled={disabled}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={FORM_MESSAGES.categoryPlaceholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {PRODUCT_CATEGORIES.map((category: string) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
