import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, Sparkles } from "lucide-react";
import { Product } from "@/types/product";
import Link from "next/link";

type props = {
  product: Product;
  viewMode?: "grid" | "list";
};

function ProductCardList({ product }: props) {
  return (
    <Card className="group cursor-pointer hover:shadow-lg transition-all py-2">
      <Link href={`/shop/${product.id}`}>
        <CardContent className="p-3">
          <div className="flex gap-3">
            {/* Product Image */}
            <div className="w-28 h-28 bg-muted rounded-lg flex items-center justify-center flex-shrink-0 relative overflow-hidden">
              <Sparkles className="h-10 w-10 text-primary group-hover:scale-110 transition-transform" />
              {product.badge && (
                <Badge className="absolute top-2 left-2 text-xs bg-background text-foreground">
                  {product.badge}
                </Badge>
              )}
            </div>

            {/* Product Info */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-base mb-0.5">
                      {product.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-1">
                      {product.category}
                    </p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${
                        i < Math.floor(product.rating)
                          ? "text-chart-4 fill-chart-4"
                          : "text-muted fill-muted"
                      }`}
                    />
                  ))}
                  <span className="text-xs text-muted-foreground ml-1">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
              </div>

              {/* Price & CTA */}
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold">${product.price}</span>
                <Button disabled={!product.inStock}>
                  {product.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}

function ProductCardGrid({ product }: props) {
  return (
    <Card className="group cursor-pointer hover:shadow-xl transition-all p-0">
      <Link href={`/shop/${product.id}`}>
        <CardContent className="p-0">
          {/* Product Image */}
          <div className="aspect-square bg-muted rounded-t-lg flex items-center justify-center relative overflow-hidden">
            <Sparkles className="h-14 w-14 text-primary group-hover:scale-110 transition-transform" />

            {/* Badges */}
            {product.badge && (
              <Badge className="absolute top-3 left-3 bg-background text-foreground">
                {product.badge}
              </Badge>
            )}

            {/* Wishlist Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-3 right-3 bg-background/80 backdrop-blur hover:bg-background"
            >
              <Heart className="h-4 w-4" />
            </Button>

            {/* Stock Status */}
            {!product.inStock && (
              <div className="absolute inset-0 bg-background/80 backdrop-blur flex items-center justify-center">
                <Badge variant="secondary">Out of Stock</Badge>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="p-3 space-y-1.5">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-sm line-clamp-2">
                {product.name}
              </h3>
            </div>

            {/* Category */}
            <p className="text-[11px] text-muted-foreground">
              {product.category}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < Math.floor(product.rating)
                      ? "text-chart-4 fill-chart-4"
                      : "text-muted fill-muted"
                  }`}
                />
              ))}
              <span className="text-xs text-muted-foreground ml-1">
                {product.rating} ({product.reviews})
              </span>
            </div>

            {/* Price & CTA */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-lg font-bold">${product.price}</span>
              <Button
                size="sm"
                disabled={!product.inStock}
                className="group-hover:translate-x-1 transition-transform"
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}

export function ProductCard({ product, viewMode = "grid" }: props) {
  if (viewMode === "list") {
    return <ProductCardList product={product} />;
  }

  return <ProductCardGrid product={product} />;
}
