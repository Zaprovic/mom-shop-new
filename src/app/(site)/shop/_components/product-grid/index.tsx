import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, Sparkles } from "lucide-react";
import type { Product } from "@/types/product";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div
      className="grid gap-6"
      style={{ gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}
    >
      {products.map((product) => (
        <Card
          key={product.id}
          className="group cursor-pointer hover:shadow-xl transition-all"
        >
          <CardContent className="p-0">
            {/* Product Image */}
            <div className="aspect-square bg-muted rounded-t-lg flex items-center justify-center relative overflow-hidden">
              <Sparkles className="h-16 w-16 text-primary group-hover:scale-110 transition-transform" />

              {/* Badges */}
              {product.badge && (
                <Badge className="absolute top-3 left-3 bg-background">
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
            <div className="p-4 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold line-clamp-2">{product.name}</h3>
              </div>

              {/* Category */}
              <p className="text-xs text-muted-foreground">
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
                <span className="text-xl font-bold">${product.price}</span>
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
        </Card>
      ))}
    </div>
  );
}
