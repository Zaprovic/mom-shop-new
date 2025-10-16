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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type ProductFormData } from "@/schemas/product.schema";
import { BADGE_OPTIONS, FORM_MESSAGES } from "../../utils/constants";
import { type IFormFieldProps } from "../../types";

interface BadgeFieldProps extends IFormFieldProps {
  control: Control<ProductFormData>;
}

export const BadgeField = ({ control, disabled }: BadgeFieldProps) => {
  return (
    <FormField
      control={control}
      name="badge"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{FORM_MESSAGES.badge}</FormLabel>
          <Select
            onValueChange={(value) =>
              field.onChange(value === "null" ? null : value)
            }
            value={field.value || "null"}
            disabled={disabled}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={FORM_MESSAGES.badgePlaceholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="null">{FORM_MESSAGES.noBadge}</SelectItem>
              {BADGE_OPTIONS.map((badge: (typeof BADGE_OPTIONS)[number]) => (
                <SelectItem key={badge.value} value={badge.value}>
                  {badge.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormDescription>{FORM_MESSAGES.badgeDescription}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
