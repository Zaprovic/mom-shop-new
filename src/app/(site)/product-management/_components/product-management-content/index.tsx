"use client";

import React, { useState } from "react";
import { ProductForm } from "./_components/product-form";
import { ProductFormData } from "@/schemas/product.schema";
import type { Product } from "@/types/product";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, Edit2 } from "lucide-react";

export const ProductManagementContent = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleProductSubmit = (data: ProductFormData) => {
    const newProduct: Product = {
      id: Math.max(0, ...products.map((p) => p.id)) + 1,
      name: data.name,
      price: parseFloat(data.price),
      category: data.category,
      rating: parseFloat(data.rating),
      reviews: parseInt(data.reviews),
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

      {/* Products Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.length === 0 ? (
          <div className="col-span-full">
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
                <Button
                  onClick={() => setIsFormVisible(true)}
                  variant="outline"
                >
                  Create Product
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          products.map((product) => (
            <Card
              key={product.id}
              className="flex flex-col transition-all hover:shadow-md"
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <CardTitle className="line-clamp-2">
                      {product.name}
                    </CardTitle>
                    <p className="mt-2 text-sm text-foreground/60">
                      {product.category}
                    </p>
                  </div>
                  {product.badge && (
                    <Badge variant="secondary" className="shrink-0 capitalize">
                      {product.badge}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col gap-4">
                {/* Product Details */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground/60">Price</span>
                    <span className="font-semibold text-foreground">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground/60">Rating</span>
                    <span className="font-semibold text-foreground">
                      {product.rating.toFixed(1)} ⭐
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground/60">Reviews</span>
                    <span className="font-semibold text-foreground">
                      {product.reviews}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground/60">
                      Stock Status
                    </span>
                    <Badge
                      variant={product.inStock ? "default" : "destructive"}
                    >
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </Badge>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-4 flex gap-2 border-t pt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    disabled
                  >
                    <Edit2 className="h-4 w-4" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Statistics Footer */}
      {products.length > 0 && (
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
                  products.reduce((sum, p) => sum + p.rating, 0) /
                  products.length
                ).toFixed(1)}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col gap-2 pt-6">
              <p className="text-sm text-foreground/60">Total Value</p>
              <p className="text-3xl font-bold text-foreground">
                ${products.reduce((sum, p) => sum + p.price, 0).toFixed(2)}
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
