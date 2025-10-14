"use client";

import { useState } from "react";
import { FiltersBar } from "../filters-bar";
import { SidebarFilters } from "../sidebar-filters";
import { ProductGrid } from "../product-grid";
import { ProductList } from "../product-list";
import { EmptyState } from "../empty-state";
import type { Product } from "@/types/product";

type props = {
  initialProducts: Product[];
  categories: string[];
  sortOptions: { label: string; value: string }[];
};

export function ShopContent({
  initialProducts,
  categories,
  sortOptions,
}: props) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [showFilters, setShowFilters] = useState(false);

  // Filter and sort products
  const filteredProducts = initialProducts
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

  const handleResetFilters = () => {
    setSelectedCategory("All");
    setPriceRange([0, 100]);
    setSortBy("featured");
  };

  const handleClearFilters = () => {
    setSelectedCategory("All");
    setPriceRange([0, 100]);
  };

  return (
    <>
      <FiltersBar
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        sortOptions={sortOptions}
        sortBy={sortBy}
        onSortChange={setSortBy}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onToggleFilters={() => setShowFilters(!showFilters)}
        filteredCount={filteredProducts.length}
        totalCount={initialProducts.length}
      />

      {/* Main Content */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <SidebarFilters
            priceRange={priceRange}
            onPriceRangeChange={setPriceRange}
            onResetFilters={handleResetFilters}
            showFilters={showFilters}
          />

          {/* Products Grid/List */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <EmptyState onClearFilters={handleClearFilters} />
            ) : viewMode === "grid" ? (
              <ProductGrid products={filteredProducts} />
            ) : (
              <ProductList products={filteredProducts} />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
