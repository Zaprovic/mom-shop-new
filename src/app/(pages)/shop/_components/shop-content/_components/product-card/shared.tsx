import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Sparkles } from "lucide-react";
import { ProductFormData } from "@/schemas/product.schema";
import Image from "next/image";

type ImageProps = {
  product: ProductFormData;
  mode: "grid" | "list";
};

export function ProductImage({ product, mode }: ImageProps) {
  const isGrid = mode === "grid";

  return (
    <div
      className={
        isGrid
          ? "aspect-square bg-muted rounded-t-lg flex items-center justify-center relative overflow-hidden"
          : "w-28 h-28 bg-muted rounded-lg flex items-center justify-center flex-shrink-0 relative overflow-hidden"
      }
    >
      {product.imageUrl ? (
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={400}
          height={400}
          className="h-full w-full object-cover"
        />
      ) : (
        <Sparkles
          className={
            isGrid ? "h-14 w-14 text-primary" : "h-10 w-10 text-primary"
          }
        />
      )}

      {/* Wishlist / Heart */}
      <Button
        variant="ghost"
        size="icon"
        className={
          isGrid
            ? "absolute top-3 right-3 bg-background/80 backdrop-blur hover:bg-background"
            : undefined
        }
      >
        <Heart className="h-4 w-4" />
      </Button>

      {/* Stock overlay for grid */}
      {isGrid && !product.inStock && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur flex items-center justify-center">
          <Badge variant="secondary">Out of Stock</Badge>
        </div>
      )}
    </div>
  );
}

type PriceCTAProps = {
  product: ProductFormData;
  mode: "grid" | "list";
};

export function PriceAndCTA({ product, mode }: PriceCTAProps) {
  const isGrid = mode === "grid";

  return (
    <div
      className={
        isGrid
          ? "flex items-center justify-between pt-2"
          : "flex items-center justify-between"
      }
    >
      <span className={isGrid ? "text-lg font-bold" : "text-xl font-bold"}>
        ${product.price}
      </span>
      <Button
        size={isGrid ? "sm" : undefined}
        disabled={!product.inStock}
        className={
          isGrid ? "group-hover:translate-x-1 transition-transform" : undefined
        }
      >
        {product.inStock ? "Add to Cart" : "Out of Stock"}
      </Button>
    </div>
  );
}
