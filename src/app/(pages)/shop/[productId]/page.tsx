import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { db } from "@/db";
import { formatToCOP } from "@/lib/utils";

export default async function SingleProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;

  const idNum = parseInt(productId || "", 10);

  const productData = !isNaN(idNum)
    ? await db.query.product.findFirst({
      where: (product, { eq }) => eq(product.id, idNum),
      with: {
        productCategory: {
          with: {
            category: true,
          },
        },
      },
    })
    : undefined;

  const product = productData
    ? {
      id: productData.id,
      name: productData.name,
      price: productData.price,
      imageUrl: productData.imageUrl,
      inStock: productData.inStock,
      category:
        productData.productCategory[0]?.category.name || "Uncategorized",
    }
    : undefined;

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10">
        <Card>
          <CardContent className="text-center py-12">
            <h2 className="text-2xl font-bold mb-2">Product not found</h2>
            <p className="text-muted-foreground mb-4">
              We couldn&apos;t find the product you&apos;re looking for.
            </p>
            <Link href="/shop">
              <Button variant="outline">Back to shop</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-start gap-8 flex-col lg:flex-row">
        {/* Left: Image / gallery placeholder */}
        <div className="w-full lg:w-1/2">
          <div className="rounded-xl overflow-hidden bg-muted p-6 flex items-center justify-center">
            {/* Placeholder visual using icon to match product-card style */}
            <div className="w-full h-[420px] bg-gradient-to-b from-muted/60 to-muted/40 rounded-lg flex items-center justify-center overflow-hidden">
              {product.imageUrl ? (
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={400}
                  height={400}
                  className="h-full w-full object-cover"
                />
              ) : (
                <ShoppingCart className="h-28 w-28 text-primary" />
              )}
            </div>
          </div>
          <div className="mt-4 flex gap-3">
            {/* Small thumbnails (visual placeholders) */}
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-20 h-20 rounded-lg bg-muted flex items-center justify-center"
              >
                <ShoppingCart className="h-6 w-6 text-primary" />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Details */}
        <div className="w-full lg:w-1/2">
          <div className="flex items-center justify-between mb-3">
            <Link
              href="/shop"
              className="text-muted-foreground flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </Link>
          </div>

          <h1 className="text-3xl font-semibold mb-2">{product.name}</h1>
          <p className="text-sm text-muted-foreground mb-4">
            {product.category}
          </p>

          {/* Price & Actions */}
          <div className="flex items-center gap-6 mb-6">
            <div>
              <div className="text-3xl font-bold">{formatToCOP(product.price)}</div>
              {!product.inStock && (
                <div className="text-sm text-destructive mt-1">
                  Out of stock
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 ml-auto">
              <Button size="lg" disabled={!product.inStock}>
                <ShoppingCart className="h-4 w-4" /> Add to cart
              </Button>
              <Button variant="ghost" size="lg">
                <Heart className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Highlights & details (no description field in schema) */}
          <div className="grid grid-cols-1 gap-3">
            <Card>
              <CardContent>
                <h3 className="font-semibold mb-2">Highlights</h3>
                <ul className="text-sm text-muted-foreground space-y-2 list-inside list-disc">
                  <li>Category: {product.category}</li>
                  <li>
                    {product.inStock
                      ? "Available now"
                      : "Currently out of stock"}
                  </li>
                </ul>
              </CardContent>
            </Card>

            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-card p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">SKU</p>
                <div className="font-medium">SKU-{product.id}</div>
              </div>
              <div className="bg-card p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">Availability</p>
                <div className="font-medium">
                  {product.inStock ? "In stock" : "Out of stock"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
