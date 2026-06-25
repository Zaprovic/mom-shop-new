"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { type ProductFormData } from "@/schemas/product.schema";
import { type ICategoryFieldProps } from "../../types";

export const CategoryField = ({
  disabled,
  categories,
}: ICategoryFieldProps) => {
  const { control } = useFormContext<ProductFormData>();

  const options = categories.map((category) => ({
    label: category.name,
    value: category.name,
  }));

  return (
    <FormField
      control={control}
      name="category"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Categoría</FormLabel>
          <FormControl>
            <CreatableSelect
              isDisabled={disabled}
              isClearable
              options={options}
              value={
                field.value ? { label: field.value, value: field.value } : null
              }
              onChange={(option) => {
                field.onChange(option ? option.value : "");
              }}
              placeholder="Selecciona o crea una categoría"
              className="text-sm"
              styles={{
                control: (base) => ({
                  ...base,
                  borderColor: "hsl(var(--input))",
                  backgroundColor: "hsl(var(--background))",
                  color: "hsl(var(--foreground))",
                }),
                menu: (base) => ({
                  ...base,
                  backgroundColor: "hsl(var(--background))",
                  color: "hsl(var(--foreground))",
                }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isFocused
                    ? "hsl(var(--accent))"
                    : "transparent",
                  color: state.isFocused
                    ? "hsl(var(--accent-foreground))"
                    : "inherit",
                }),
                singleValue: (base) => ({
                  ...base,
                  color: "hsl(var(--foreground))",
                }),
                input: (base) => ({
                  ...base,
                  color: "hsl(var(--foreground))",
                }),
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
