"use client";

import React, { useEffect, useMemo, useState } from "react";
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
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { DataTable } from "./_components/data-table";
import { createColumns } from "./_components/columns";
import { useUser } from "@clerk/nextjs";
import { Category } from "./_components/product-form/types";
import { formatToCOP } from "@/lib/utils";
import { PlusCircle } from "lucide-react";
import {
  createProductAction,
  updateProductAction,
  deleteProductAction,
} from "../../actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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
  const [editingProduct, setEditingProduct] = useState<ProductFormData | null>(
    null
  );
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts]);

  const handleProductSubmit = async (data: ProductFormValues) => {
    try {
      if (editingProduct) {
        const result = await updateProductAction(editingProduct.id, data);
        if (result.success) {
          toast.success("Product updated successfully");
          router.refresh();
        } else {
          toast.error("Failed to update product");
        }
      } else {
        await createProductAction(data);
        toast.success("Product created successfully");
        router.refresh();
      }
      setIsDialogOpen(false);
      setEditingProduct(null);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const confirmDeleteProduct = (id: number) => {
    setProductToDelete(id);
    setDeleteConfirmationOpen(true);
  };

  const handleDeleteProduct = async () => {
    if (productToDelete === null) return;

    try {
      const result = await deleteProductAction(productToDelete);
      if (result.success) {
        toast.success("Product deleted successfully");
        router.refresh();
      } else {
        toast.error("Failed to delete product");
      }
    } catch (error) {
      toast.error("Failed to delete product");
    } finally {
      setDeleteConfirmationOpen(false);
      setProductToDelete(null);
    }
  };

  const handleEditProduct = (product: ProductFormData) => {
    setEditingProduct(product);
    setIsDialogOpen(true);
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
        <Dialog
          open={isDialogOpen}
          onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) setEditingProduct(null);
          }}
        >
          <DialogTrigger asChild>
            <Button size="lg" className="w-full md:w-auto">
              <PlusCircle className="mr-2 h-5 w-5" /> Create Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {editingProduct ? "Edit Product" : "Create New Product"}
              </DialogTitle>
              <DialogDescription>
                {editingProduct
                  ? "Update the product information below."
                  : "Add a new product to your catalog. Fill in all the required information below."}
              </DialogDescription>
            </DialogHeader>
            <ProductForm
              onSubmit={handleProductSubmit}
              categories={categories}
              initialValues={editingProduct || undefined}
            />
          </DialogContent>
        </Dialog>

        <Dialog
          open={deleteConfirmationOpen}
          onOpenChange={setDeleteConfirmationOpen}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete the
                product.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button variant="destructive" onClick={handleDeleteProduct}>
                Delete
              </Button>
            </DialogFooter>
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
        <div className="w-full">
          {/* KPI strip for small screens */}
          <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3 lg:hidden">
            <Card className="min-w-0 py-4">
              <CardContent className="min-w-0 px-4">
                <p className="text-xs text-foreground/60">Total Products</p>
                <p className="truncate text-base font-semibold tabular-nums sm:text-xl">
                  {stats.total}
                </p>
              </CardContent>
            </Card>
            <Card className="min-w-0 py-4">
              <CardContent className="min-w-0 px-4">
                <p className="text-xs text-foreground/60">In Stock</p>
                <p className="truncate text-base font-semibold tabular-nums sm:text-xl">
                  {stats.inStock}
                </p>
              </CardContent>
            </Card>
            <Card className="min-w-0 py-4">
              <CardContent className="min-w-0 px-4">
                <p className="text-xs text-foreground/60">Total Value</p>
                <p className="truncate text-base font-semibold tabular-nums sm:text-xl">
                  {formatToCOP(stats.totalValue)}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main content + sticky insights sidebar */}
          <div className="grid gap-6 xl:[grid-template-columns:_2fr_280px]">
            <div className="order-2 min-w-0 xl:order-1">
              <DataTable
                columns={createColumns({
                  onDelete: confirmDeleteProduct,
                  onEdit: handleEditProduct,
                })}
                data={products}
              />
            </div>
            <aside className="order-1 min-w-0 xl:order-2 xl:sticky xl:top-24">
              <Card className="min-w-0 py-4 sm:py-6">
                <CardContent className="space-y-4 px-4 pt-0 sm:px-6">
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
        </div>
      )}
    </div>
  );
};
