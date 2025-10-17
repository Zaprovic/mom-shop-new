"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { X, ExternalLink, Star, Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";

type Props = {
  product: Product;
  onClose: () => void;
};

export function ProductModal({ product, onClose }: Props) {
  const [isVisible, setIsVisible] = useState(false);

  // Trigger animation on mount
  useEffect(() => {
    // Small delay to ensure the animation triggers
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // Handle close with animation
  const handleClose = () => {
    setIsVisible(false);
    // Wait for animation to complete before closing
    setTimeout(() => {
      onClose();
    }, 300);
  };

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop with fade animation */}
      <div
        className={`absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleClose}
      />

      {/* Modal Content with scale and fade animation */}
      <div
        className={`relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto m-4 transition-all duration-300 ${
          isVisible
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-4"
        }`}
      >
        <Card className="shadow-2xl">
          <CardContent className="p-6">
            {/* Header with close button and link to full page */}
            <div className="flex items-center justify-between mb-4">
              <Link
                href={`/shop/${product.id}`}
                className="text-sm text-primary hover:underline flex items-center gap-1"
              >
                View full details <ExternalLink className="h-3 w-3" />
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClose}
                className="rounded-full"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Product Content */}
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Left: Image */}
              <div
                className={`w-full lg:w-1/2 transition-all duration-500 delay-100 ${
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-4"
                }`}
              >
                <div className="rounded-xl overflow-hidden bg-muted p-4">
                  <div className="w-full h-[300px] lg:h-[350px] bg-gradient-to-b from-muted/60 to-muted/40 rounded-lg flex items-center justify-center">
                    <ShoppingCart className="h-20 w-20 text-primary" />
                  </div>
                </div>
                {/* Thumbnails */}
                <div className="mt-3 flex gap-2">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center"
                    >
                      <ShoppingCart className="h-5 w-5 text-primary" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Details */}
              <div
                className={`w-full lg:w-1/2 transition-all duration-500 delay-200 ${
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-4"
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h2 className="text-2xl font-semibold mb-1">
                      {product.name}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {product.category}
                    </p>
                  </div>
                  {product.badge && <Badge>{product.badge}</Badge>}
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? "text-chart-4 fill-chart-4"
                            : "text-muted fill-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating} • {product.reviews} reviews
                  </span>
                </div>

                {/* Price */}
                <div className="mb-4">
                  <div className="text-3xl font-bold">${product.price}</div>
                  {!product.inStock && (
                    <div className="text-sm text-destructive mt-1">
                      Out of stock
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 mb-6">
                  <Button
                    size="lg"
                    disabled={!product.inStock}
                    className="flex-1"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" /> Add to cart
                  </Button>
                  <Button variant="outline" size="lg">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>

                {/* Quick Info */}
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2 text-sm">Quick Info</h3>
                    <ul className="text-sm text-muted-foreground space-y-1.5 list-inside list-disc">
                      <li>Rating: {product.rating} stars</li>
                      <li>Category: {product.category}</li>
                      <li>
                        {product.inStock
                          ? "Available now"
                          : "Currently out of stock"}
                      </li>
                      <li>{product.reviews} customer reviews</li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Call to action for full page */}
                <div className="mt-4 p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">
                    Want to see more details, specifications, and customer
                    reviews?
                  </p>
                  <Link href={`/shop/${product.id}`}>
                    <Button variant="secondary" size="sm" className="w-full">
                      View full product page{" "}
                      <ExternalLink className="h-3 w-3 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Wrapper component for use in intercepting routes
export function ProductModalWrapper({ product }: { product: Product }) {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  return <ProductModal product={product} onClose={handleClose} />;
}
