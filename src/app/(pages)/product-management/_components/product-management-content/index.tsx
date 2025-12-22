"use client";

import React, { useMemo, useState } from "react";
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
import { PlusCircle } from "lucide-react";

type ProductManagementContentProps = {
  categories: Category[];
  initialProducts: ProductFormData[];
};

type EmptyProductProps = {
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleProductSubmit: (data: ProductFormValues) => void;
  categories: Category[];
};

const EmptyProduct = ({
  isDialogOpen,
  setIsDialogOpen,
  categories,
  handleProductSubmit,
}: EmptyProductProps) => {
  return (
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
  );
};

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

  const stats = useMemo(() => {
    const total = products.length;
    const inStock = products.filter((p) => p.inStock).length;
    const outOfStock = total - inStock;
    const totalValue = products.reduce((sum, p) => sum + Number(p.price), 0);
    const avgPrice = total > 0 ? totalValue / total : 0;
    const categoriesSet = new Set(products.map((p) => p.category));
    const categoriesCount = categoriesSet.size;
    const categoryFreq: Record<string, number> = {};
    products.forEach((p) => {
      categoryFreq[p.category] = (categoryFreq[p.category] || 0) + 1;
    });
    const mostCommonCategory =
      Object.keys(categoryFreq).sort(
        (a, b) => (categoryFreq[b] ?? 0) - (categoryFreq[a] ?? 0)
      )[0] || "—";
    const maxPrice =
      total > 0 ? Math.max(...products.map((p) => Number(p.price))) : 0;
    const minPrice =
      total > 0 ? Math.min(...products.map((p) => Number(p.price))) : 0;
    const stockPct = total > 0 ? Math.round((inStock / total) * 100) : 0;

    return {
      total,
      inStock,
      outOfStock,
      totalValue,
      avgPrice,
      categoriesCount,
      mostCommonCategory,
      maxPrice,
      minPrice,
      stockPct,
    };
  }, [products]);

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
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
              <PlusCircle className="mr-2 h-5 w-5" /> Create Product
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

      {/* Products Table & Insights */}
      {products.length === 0 ? (
        <EmptyProduct
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          categories={categories}
          handleProductSubmit={handleProductSubmit}
        />
      ) : (
        <>
          {/* KPI strip for small screens */}
          <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:hidden">
            <Card className="min-w-0">
              <CardContent className="min-w-0 pt-4">
                <p className="text-xs text-foreground/60">Total Products</p>
                <p className="truncate text-base font-semibold tabular-nums sm:text-xl">
                  {stats.total}
                </p>
              </CardContent>
            </Card>
            <Card className="min-w-0">
              <CardContent className="min-w-0 pt-4">
                <p className="text-xs text-foreground/60">In Stock</p>
                <p className="truncate text-base font-semibold tabular-nums sm:text-xl">
                  {stats.inStock}
                </p>
              </CardContent>
            </Card>
            <Card className="min-w-0">
              <CardContent className="min-w-0 pt-4">
                <p className="text-xs text-foreground/60">Total Value</p>
                <p className="truncate text-base font-semibold tabular-nums sm:text-xl">
                  {formatToCOP(stats.totalValue)}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main content + sticky insights sidebar */}
          <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
            <div className="order-2 lg:order-1">
              <DataTable
                columns={createColumns({ onDelete: handleDeleteProduct })}
                data={products}
              />
            </div>
            <aside className="order-1 lg:order-2 lg:sticky lg:top-24">
              <Card className="min-w-0">
                <CardContent className="space-y-4 pt-6">
                  <div>
                    <p className="text-sm font-medium">Inventory Insights</p>
                    <p className="text-xs text-foreground/60">
                      Quick KPIs for your catalog
                    </p>
                  </div>
                  <div className="grid gap-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-sm text-foreground/60">
                        Total Products
                      </span>
                      <span className="text-sm font-semibold">
                        {stats.total}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-sm text-foreground/60">
                        In Stock
                      </span>
                      <span className="text-sm font-semibold">
                        {stats.inStock}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-sm text-foreground/60">
                        Out of Stock
                      </span>
                      <span className="text-sm font-semibold">
                        {stats.outOfStock}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-sm text-foreground/60">
                        Stock %
                      </span>
                      <span className="text-sm font-semibold">
                        {stats.stockPct}%
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-sm text-foreground/60">
                        Categories
                      </span>
                      <span className="text-sm font-semibold">
                        {stats.categoriesCount}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-sm text-foreground/60">
                        Top Category
                      </span>
                      <span className="text-sm font-semibold capitalize">
                        {stats.mostCommonCategory}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-sm text-foreground/60">
                        Total Value
                      </span>
                      <span className="text-sm font-semibold">
                        {formatToCOP(stats.totalValue)}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-sm text-foreground/60">
                        Average Price
                      </span>
                      <span className="text-sm font-semibold">
                        {formatToCOP(stats.avgPrice)}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-sm text-foreground/60">
                        Highest Price
                      </span>
                      <span className="text-sm font-semibold">
                        {formatToCOP(stats.maxPrice)}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-sm text-foreground/60">
                        Lowest Price
                      </span>
                      <span className="text-sm font-semibold">
                        {formatToCOP(stats.minPrice)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </aside>
          </div>
        </>
      )}
    </div>
  );
};
