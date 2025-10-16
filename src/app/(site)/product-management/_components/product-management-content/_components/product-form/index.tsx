"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { FORM_MESSAGES, FORM_DEFAULT_VALUES } from "./utils/constants";
import { type IProductFormProps } from "./types";
import { ProductNameField } from "./_components/product-name-field";
import { PriceField } from "./_components/price-field";
import { CategoryField } from "./_components/category-field";
import { RatingField } from "./_components/rating-field";
import { ReviewsField } from "./_components/reviews-field";
import { BadgeField } from "./_components/badge-field";
import { StockField } from "./_components/stock-field";
import { useProductForm } from "./hooks/use-product-form";
import { useProductFormHandler } from "./hooks/use-product-form-handler";

export const ProductForm = ({ onSubmit }: IProductFormProps) => {
  const form = useProductForm();
  const { isSubmitting } = form.formState;

  const { handleSubmit } = useProductFormHandler({
    onSubmit,
    resetForm: form.reset,
  });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Create New Product</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <ProductNameField control={form.control} disabled={isSubmitting} />

            <div className="grid gap-6 md:grid-cols-2">
              <PriceField control={form.control} disabled={isSubmitting} />
              <CategoryField control={form.control} disabled={isSubmitting} />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <RatingField control={form.control} disabled={isSubmitting} />
              <ReviewsField control={form.control} disabled={isSubmitting} />
            </div>

            <BadgeField control={form.control} disabled={isSubmitting} />

            <StockField control={form.control} disabled={isSubmitting} />

            <div className="flex gap-3 pt-4">
              <Button type="submit" disabled={isSubmitting} className="flex-1">
                {isSubmitting
                  ? FORM_MESSAGES.submitLoading
                  : FORM_MESSAGES.submitButton}
              </Button>
              <Button
                type="button"
                variant="outline"
                disabled={isSubmitting}
                onClick={() => form.reset(FORM_DEFAULT_VALUES)}
              >
                {FORM_MESSAGES.resetButton}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
