"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FORM_DEFAULT_VALUES } from "./utils/constants";
import { type IProductFormProps } from "./types";
import { ProductNameField } from "./_components/product-name-field";
import { PriceField } from "./_components/price-field";
import { CategoryField } from "./_components/category-field";
import { ImageUrlField } from "./_components/image-url-field";
import { StockField } from "./_components/stock-field";
import { useProductFormHandler } from "./hooks/use-product-form-handler";
import { useForm, type Resolver } from "react-hook-form";
import { ProductFormValues, productFormSchema } from "@/schemas/product.schema";
import { zodResolver } from "@hookform/resolvers/zod";

export const ProductForm = ({
  onSubmit,
  categories,
  initialValues,
}: IProductFormProps) => {
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema) as Resolver<ProductFormValues>,
    defaultValues: initialValues || FORM_DEFAULT_VALUES,
  });
  const { isSubmitting } = form.formState;
  const isEditing = !!initialValues;

  const { handleSubmit } = useProductFormHandler({
    onSubmit,
    resetForm: form.reset,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <ProductNameField disabled={isSubmitting} />

        <div className="grid gap-6 md:grid-cols-2">
          <PriceField disabled={isSubmitting} />
          <CategoryField disabled={isSubmitting} categories={categories} />
        </div>

        <ImageUrlField disabled={isSubmitting} />

        <StockField disabled={isSubmitting} />

        <div className="flex gap-3 pt-4">
          <Button type="submit" disabled={isSubmitting} className="flex-1">
            {isSubmitting
              ? isEditing
                ? "Actualizando..."
                : "Creando..."
              : isEditing
              ? "Actualizar producto"
              : "Crear producto"}
          </Button>
          <Button
            type="button"
            variant="outline"
            disabled={isSubmitting}
            onClick={() => form.reset(FORM_DEFAULT_VALUES)}
          >
            Restablecer
          </Button>
        </div>
      </form>
    </Form>
  );
};
