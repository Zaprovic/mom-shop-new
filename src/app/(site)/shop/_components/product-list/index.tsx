import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, Sparkles } from "lucide-react";
import type { Product } from "@/types/product";

type props = {
  products: Product[];
};

export function ProductList({ products }: props) {
  return (
    <div className="space-y-4">
      {products.map((product) => (
        <Card
          key={product.id}
          className="group cursor-pointer hover:shadow-lg transition-all"
        >
          <CardContent className="p-4">
            <div className="flex gap-4">
              {/* Product Image */}
              <div className="w-32 h-32 bg-muted rounded-lg flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                <Sparkles className="h-12 w-12 text-primary group-hover:scale-110 transition-transform" />
                {product.badge && (
                  <Badge className="absolute top-2 left-2 text-xs bg-background">
                    {product.badge}
                  </Badge>
                )}
              </div>

              {/* Product Info */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-lg mb-1">
                        {product.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
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
                    <span className="text-sm text-muted-foreground ml-1">
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>
                </div>

                {/* Price & CTA */}
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">${product.price}</span>
                  <Button disabled={!product.inStock}>
                    {product.inStock ? "Add to Cart" : "Out of Stock"}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
