"use client";

import React, { useState } from "react";
import { ProductForm } from "./_components/product-form";
import { ProductFormData, ProductFormValues } from "@/schemas/product.schema";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DataTable } from "./_components/data-table";
import { createColumns } from "./_components/columns";
import { useUser } from "@clerk/nextjs";
import { Category } from "./_components/product-form/types";
import { formatToCOP } from "@/lib/utils";

interface ProductManagementContentProps {
  categories: Category[];
  initialProducts: ProductFormData[];
}

export const ProductManagementContent = ({
  categories,
  initialProducts,
}: ProductManagementContentProps) => {
  const [products, setProducts] = useState<ProductFormData[]>(initialProducts);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { user } = useUser();

  React.useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts]);

  const handleProductSubmit = (data: ProductFormValues) => {
    const newProduct: ProductFormData = {
      id: Math.max(0, ...products.map((p) => p.id)) + 1,
      name: data.name,
      price: data.price,
      category: data.category,
      imageUrl: data.imageUrl,
      inStock: data.inStock,
    };

    setProducts((prev) => [newProduct, ...prev]);
    setIsDialogOpen(false);
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
            Welcome back, {user?.firstName}
          </h1>
          <p className="mt-2 text-foreground/60">
            Create and manage your product catalog
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="lg" className="w-full md:w-auto">
              + Create Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Product</DialogTitle>
              <DialogDescription>
                Add a new product to your catalog. Fill in all the required
                information below.
              </DialogDescription>
            </DialogHeader>
            <ProductForm
              onSubmit={handleProductSubmit}
              categories={categories}
            />
          </DialogContent>
        </Dialog>
      </div>

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
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">Create Product</Button>
              </DialogTrigger>
              <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Create New Product</DialogTitle>
                  <DialogDescription>
                    Add a new product to your catalog. Fill in all the required
                    information below.
                  </DialogDescription>
                </DialogHeader>
                <ProductForm
                  onSubmit={handleProductSubmit}
                  categories={categories}
                />
              </DialogContent>
            </Dialog>
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
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col gap-2 pt-6">
                <p className="text-sm text-foreground/60">Total Value</p>
                <p className="text-3xl font-bold text-foreground">
                  {formatToCOP(
                    products.reduce((sum, p) => sum + Number(p.price), 0)
                  )}
                </p>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};
