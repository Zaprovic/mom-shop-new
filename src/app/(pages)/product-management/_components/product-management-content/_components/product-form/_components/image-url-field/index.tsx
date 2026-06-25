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
          <FormLabel>URL de la Imagen</FormLabel>
          <FormControl>
            <Input
              placeholder="Ingresa la URL de la imagen..."
              {...field}
              disabled={disabled}
            />
          </FormControl>
          <FormDescription>La URL de la imagen del producto</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
