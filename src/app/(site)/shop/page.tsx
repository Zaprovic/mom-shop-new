"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  SlidersHorizontal,
  Grid3x3,
  List,
  ChevronDown,
  Heart,
  Sparkles,
} from "lucide-react";
import { products } from "@/mock/products";
import HeroBanner from "./_components/hero-banner";

const categories = ["All", "Skincare", "Makeup", "Haircare", "Fragrance"];
const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Best Rating", value: "rating" },
  { label: "Most Reviews", value: "reviews" },
];

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [showFilters, setShowFilters] = useState(false);

  // Filter and sort products
  const filteredProducts = products
    .filter((product) => {
      if (selectedCategory !== "All" && product.category !== selectedCategory)
        return false;
      if (product.price < priceRange[0] || product.price > priceRange[1])
        return false;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "reviews":
          return b.reviews - a.reviews;
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner */}
      <HeroBanner />

      {/* Filters Bar */}
      <section className="border-b bg-background sticky top-16 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="rounded-full"
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-2">
              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-background border rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none text-muted-foreground" />
              </div>

              {/* View Toggle */}
              <div className="flex items-center border rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid3x3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>

              {/* Filters Toggle (Mobile) */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden"
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-muted-foreground">
            Showing {filteredProducts.length} of {products.length} products
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside
            className={`lg:w-64 space-y-6 ${
              showFilters ? "block" : "hidden lg:block"
            }`}
          >
            <Card>
              <CardContent className="p-6 space-y-6">
                {/* Price Range */}
                <div>
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <SlidersHorizontal className="h-4 w-4" />
                    Price Range
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Min</span>
                      <span className="font-medium">${priceRange[0]}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={priceRange[0]}
                      onChange={(e) =>
                        setPriceRange([parseInt(e.target.value), priceRange[1]])
                      }
                      className="w-full"
                    />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Max</span>
                      <span className="font-medium">${priceRange[1]}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([priceRange[0], parseInt(e.target.value)])
                      }
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Rating Filter */}
                <div>
                  <h3 className="font-semibold mb-4">Rating</h3>
                  <div className="space-y-2">
                    {[4, 3, 2, 1].map((rating) => (
                      <label
                        key={rating}
                        className="flex items-center gap-2 cursor-pointer hover:text-foreground text-muted-foreground transition-colors"
                      >
                        <input type="checkbox" className="rounded" />
                        <div className="flex items-center gap-1">
                          {[...Array(rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="h-3 w-3 fill-chart-4 text-chart-4"
                            />
                          ))}
                          <span className="text-sm ml-1">& Up</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Availability */}
                <div>
                  <h3 className="font-semibold mb-4">Availability</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="rounded"
                        defaultChecked
                      />
                      <span className="text-sm">In Stock</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">Out of Stock</span>
                    </label>
                  </div>
                </div>

                {/* Reset Filters */}
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setSelectedCategory("All");
                    setPriceRange([0, 100]);
                    setSortBy("featured");
                  }}
                >
                  Reset Filters
                </Button>
              </CardContent>
            </Card>
          </aside>

          {/* Products Grid/List */}
          <div className="flex-1">
            {viewMode === "grid" ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
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
                          <h3 className="font-semibold line-clamp-2">
                            {product.name}
                          </h3>
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
                          <span className="text-xl font-bold">
                            ${product.price}
                          </span>
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
            ) : (
              <div className="space-y-4">
                {filteredProducts.map((product) => (
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
                            <span className="text-2xl font-bold">
                              ${product.price}
                            </span>
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
            )}

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <Sparkles className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  No products found
                </h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters or search criteria
                </p>
                <Button
                  onClick={() => {
                    setSelectedCategory("All");
                    setPriceRange([0, 100]);
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
