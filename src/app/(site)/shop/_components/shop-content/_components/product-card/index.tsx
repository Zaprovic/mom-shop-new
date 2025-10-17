import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/types/product";
import { ProductImage, ProductRating, PriceAndCTA } from "./shared";
import { Heart } from "lucide-react";
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
            <ProductImage product={product} mode="list" />

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

                <ProductRating product={product} />
              </div>

              <PriceAndCTA product={product} mode="list" />
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
          <ProductImage product={product} mode="grid" />

          {/* Product Info */}
          <div className="p-3 space-y-1.5">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-sm line-clamp-2">
                {product.name}
              </h3>
            </div>

            <p className="text-[11px] text-muted-foreground">
              {product.category}
            </p>

            <ProductRating product={product} />

            <PriceAndCTA product={product} mode="grid" />
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
