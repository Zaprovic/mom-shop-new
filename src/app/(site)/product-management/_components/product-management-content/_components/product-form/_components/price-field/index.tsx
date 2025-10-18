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
import { CircleDollarSign } from "lucide-react";

interface PriceFieldProps extends IFormFieldProps {}

export const PriceField = ({ disabled }: PriceFieldProps) => {
  const { control } = useFormContext<ProductFormData>();
  return (
    <FormField
      control={control}
      name="price"
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            Price <CircleDollarSign className="size-4" />{" "}
          </FormLabel>
          <FormControl>
            <Input
              placeholder="0.00"
              type="number"
              step="0.01"
              min="0"
              {...field}
              disabled={disabled}
            />
          </FormControl>
          <FormDescription>Product price in USD</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
