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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type ProductFormData } from "@/schemas/product.schema";
import { BADGE_OPTIONS } from "../../utils/constants";
import { type IFormFieldProps } from "../../types";

interface BadgeFieldProps extends IFormFieldProps {}

export const BadgeField = ({ disabled }: BadgeFieldProps) => {
  const { control } = useFormContext<ProductFormData>();
  return (
    <FormField
      control={control}
      name="badge"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Badge (Optional)</FormLabel>
          <Select
            onValueChange={(value) =>
              field.onChange(value === "null" ? null : value)
            }
            value={field.value || "null"}
            disabled={disabled}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a badge or leave empty" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="null">No Badge</SelectItem>
              {BADGE_OPTIONS.map((badge: (typeof BADGE_OPTIONS)[number]) => (
                <SelectItem key={badge.value} value={badge.value}>
                  {badge.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormDescription>
            Add a badge to highlight your product
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
