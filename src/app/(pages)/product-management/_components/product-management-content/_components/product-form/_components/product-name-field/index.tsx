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
          <FormLabel>Nombre del Producto</FormLabel>
          <FormControl>
            <Input
              placeholder="Ingresa el nombre del producto..."
              {...field}
              disabled={disabled}
            />
          </FormControl>
          <FormDescription>
            El nombre de tu producto (2-100 caracteres)
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
