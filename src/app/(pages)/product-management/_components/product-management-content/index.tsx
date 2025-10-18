"use client";

import React, { useState } from "react";
import { ProductForm } from "./_components/product-form";
import { ProductFormData } from "@/schemas/product.schema";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "./_components/data-table";
import { createColumns } from "./_components/columns";

export const ProductManagementContent = () => {
  const [products, setProducts] = useState<ProductFormData[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleProductSubmit = (data: ProductFormData) => {
    const newProduct: ProductFormData = {
      id: Math.max(0, ...products.map((p) => p.id)) + 1,
      name: data.name,
      price: data.price,
      category: data.category,
      rating: data.rating,
      reviews: data.reviews,
      badge: data.badge || null,
      inStock: data.inStock,
    };

    setProducts((prev) => [newProduct, ...prev]);
    setIsFormVisible(false);
  };

  const handleDeleteProduct = (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Product Management
          </h1>
          <p className="mt-2 text-foreground/60">
            Create and manage your product catalog
          </p>
        </div>
        <Button
          onClick={() => setIsFormVisible(!isFormVisible)}
          size="lg"
          className="w-full md:w-auto"
        >
          {isFormVisible ? "Hide Form" : "+ Create Product"}
        </Button>
      </div>

      {/* Form Section */}
      {isFormVisible && (
        <div className="mb-8">
          <ProductForm onSubmit={handleProductSubmit} />
        </div>
      )}

      {/* Products Table */}
      {products.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex min-h-[300px] flex-col items-center justify-center gap-4">
            <div className="text-center">
              <p className="text-lg font-semibold text-foreground">
                No products yet
              </p>
              <p className="text-sm text-foreground/60">
                Create your first product to get started
              </p>
            </div>
            <Button onClick={() => setIsFormVisible(true)} variant="outline">
              Create Product
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <DataTable
            columns={createColumns({ onDelete: handleDeleteProduct })}
            data={products}
          />

          {/* Statistics Footer */}
          <div className="mt-12 grid gap-4 md:grid-cols-4">
            <Card>
              <CardContent className="flex flex-col gap-2 pt-6">
                <p className="text-sm text-foreground/60">Total Products</p>
                <p className="text-3xl font-bold text-foreground">
                  {products.length}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col gap-2 pt-6">
                <p className="text-sm text-foreground/60">In Stock</p>
                <p className="text-3xl font-bold text-foreground">
                  {products.filter((p) => p.inStock).length}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col gap-2 pt-6">
                <p className="text-sm text-foreground/60">Average Rating</p>
                <p className="text-3xl font-bold text-foreground">
                  {(
                    products.reduce((sum, p) => sum + Number(p.rating), 0) /
                    products.length
                  ).toFixed(1)}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col gap-2 pt-6">
                <p className="text-sm text-foreground/60">Total Value</p>
                <p className="text-3xl font-bold text-foreground">
                  $
                  {products
                    .reduce((sum, p) => sum + Number(p.price), 0)
                    .toFixed(2)}
                </p>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};
