import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, Sparkles } from "lucide-react";
import { ProductFormData } from "@/schemas/product.schema";

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
      <Sparkles
        className={isGrid ? "h-14 w-14 text-primary" : "h-10 w-10 text-primary"}
      />

      {product.badge && (
        <Badge
          className={
            isGrid
              ? "absolute top-3 left-3 bg-background text-foreground"
              : "absolute top-2 left-2 text-xs bg-background text-foreground"
          }
        >
          {product.badge}
        </Badge>
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

type RatingProps = {
  product: ProductFormData;
};

export function ProductRating({ product }: RatingProps) {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-3 w-3 ${
            i < Math.floor(Number(product.rating) || 0)
              ? "text-chart-4 fill-chart-4"
              : "text-muted fill-muted"
          }`}
        />
      ))}
      <span className="text-xs text-muted-foreground ml-1">
        {product.rating} ({product.reviews}
        {product.reviews !== undefined ? "" : ""})
      </span>
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
