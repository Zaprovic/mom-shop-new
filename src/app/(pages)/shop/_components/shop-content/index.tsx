"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { FiltersBar } from "./_components/filters-bar";
import { SidebarFilters } from "./_components/sidebar-filters";
import { EmptyState } from "./_components/empty-state";
import { useMediaQuery } from "@/app/(pages)/shop/hooks/use-media-query";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { ITEMS_PER_PAGE_DESKTOP_PAGINATION } from "../../utils/constants";
import { ProductGrid } from "./_components/product-grid";
import { ProductList } from "./_components/product-list";
import { ProductFormData } from "@/schemas/product.schema";

type props = {
  initialProducts: ProductFormData[];
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
  const [searchQuery, setSearchQuery] = useState("");

  // Pagination & Infinite Scroll
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedItems, setDisplayedItems] = useState(12); // For infinite scroll
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const productsTopRef = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  // Wrapped setters that reset pagination when filters change
  const setSelectedCategoryWithReset = useCallback((category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    setDisplayedItems(ITEMS_PER_PAGE_DESKTOP_PAGINATION);
  }, []);

  const setSortByWithReset = useCallback((sort: string) => {
    setSortBy(sort);
    setCurrentPage(1);
    setDisplayedItems(ITEMS_PER_PAGE_DESKTOP_PAGINATION);
  }, []);

  const setPriceRangeWithReset = useCallback((range: [number, number]) => {
    setPriceRange(range);
    setCurrentPage(1);
    setDisplayedItems(ITEMS_PER_PAGE_DESKTOP_PAGINATION);
  }, []);

  const setSearchQueryWithReset = useCallback((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
    setDisplayedItems(ITEMS_PER_PAGE_DESKTOP_PAGINATION);
  }, []);

  // Filter and sort products
  const filteredProducts = initialProducts
    .filter((product) => {
      // Category filter
      if (selectedCategory !== "All" && product.category !== selectedCategory)
        return false;
      // Price range filter
      const price =
        typeof product.price === "string"
          ? parseFloat(product.price)
          : product.price;
      if (Number.isNaN(price) || price < priceRange[0] || price > priceRange[1])
        return false;
      // Search query filter
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesCategory = product.category.toLowerCase().includes(query);
        if (!matchesName && !matchesCategory) return false;
      }
      return true;
    })
    .sort((a, b) => {
      const priceA =
        typeof a.price === "string" ? parseFloat(a.price) : a.price;
      const priceB =
        typeof b.price === "string" ? parseFloat(b.price) : b.price;

      switch (sortBy) {
        case "price-asc":
          return (priceA ?? 0) - (priceB ?? 0);
        case "price-desc":
          return (priceB ?? 0) - (priceA ?? 0);
        case "rating":
          return Number(b.rating) - Number(a.rating);
        case "reviews":
          return Number(b.reviews) - Number(a.reviews);
        default:
          return 0;
      }
    });

  // Calculate pagination
  const totalPages = Math.ceil(
    filteredProducts.length / ITEMS_PER_PAGE_DESKTOP_PAGINATION
  );

  // Get products to display based on device type
  const productsToDisplay = isDesktop
    ? filteredProducts.slice(
        (currentPage - 1) * ITEMS_PER_PAGE_DESKTOP_PAGINATION,
        currentPage * ITEMS_PER_PAGE_DESKTOP_PAGINATION
      )
    : filteredProducts.slice(0, displayedItems);

  // Scroll to top on pagination change (desktop only)
  useEffect(() => {
    if (isDesktop && productsTopRef.current) {
      productsTopRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [currentPage, isDesktop]);

  // Infinite scroll logic for mobile
  useEffect(() => {
    if (isDesktop) return; // Only for mobile

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && displayedItems < filteredProducts.length) {
          setDisplayedItems((prev) =>
            Math.min(
              prev + ITEMS_PER_PAGE_DESKTOP_PAGINATION,
              filteredProducts.length
            )
          );
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [isDesktop, displayedItems, filteredProducts.length]);

  const handleResetFilters = () => {
    setSelectedCategoryWithReset("All");
    setPriceRangeWithReset([0, 100]);
    setSortByWithReset("featured");
    setSearchQueryWithReset("");
  };

  const handleClearFilters = () => {
    setSelectedCategoryWithReset("All");
    setPriceRangeWithReset([0, 100]);
    setSearchQueryWithReset("");
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("ellipsis");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("ellipsis");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("ellipsis");
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push("ellipsis");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <>
      <FiltersBar
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategoryWithReset}
        sortOptions={sortOptions}
        sortBy={sortBy}
        onSortChange={setSortByWithReset}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onToggleFilters={() => setShowFilters(!showFilters)}
        filteredCount={filteredProducts.length}
        totalCount={initialProducts.length}
        searchQuery={searchQuery}
        onSearchChange={setSearchQueryWithReset}
      />

      {/* Main Content */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <SidebarFilters
            priceRange={priceRange}
            onPriceRangeChange={setPriceRangeWithReset}
            onResetFilters={handleResetFilters}
            showFilters={showFilters}
          />

          {/* Products Grid/List */}
          <div className="flex-1">
            <div ref={productsTopRef} />
            {filteredProducts.length === 0 ? (
              <EmptyState onClearFilters={handleClearFilters} />
            ) : (
              <>
                {viewMode === "grid" ? (
                  <ProductGrid products={productsToDisplay} />
                ) : (
                  <ProductList products={productsToDisplay} />
                )}

                {/* Desktop Pagination */}
                {isDesktop && totalPages > 1 && (
                  <div className="mt-8">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            onClick={() =>
                              setCurrentPage((prev) => Math.max(1, prev - 1))
                            }
                            className={
                              currentPage === 1
                                ? "pointer-events-none opacity-50"
                                : "cursor-pointer"
                            }
                          />
                        </PaginationItem>

                        {getPageNumbers().map((page, index) => (
                          <PaginationItem key={index}>
                            {page === "ellipsis" ? (
                              <PaginationEllipsis />
                            ) : (
                              <PaginationLink
                                onClick={() => setCurrentPage(page as number)}
                                isActive={currentPage === page}
                                className="cursor-pointer"
                              >
                                {page}
                              </PaginationLink>
                            )}
                          </PaginationItem>
                        ))}

                        <PaginationItem>
                          <PaginationNext
                            onClick={() =>
                              setCurrentPage((prev) =>
                                Math.min(totalPages, prev + 1)
                              )
                            }
                            className={
                              currentPage === totalPages
                                ? "pointer-events-none opacity-50"
                                : "cursor-pointer"
                            }
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}

                {/* Mobile Infinite Scroll Trigger */}
                {!isDesktop && displayedItems < filteredProducts.length && (
                  <div
                    ref={loadMoreRef}
                    className="mt-8 flex justify-center items-center py-8"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                      <p className="text-sm text-muted-foreground">
                        Loading more products...
                      </p>
                    </div>
                  </div>
                )}

                {/* Mobile - Showing count */}
                {!isDesktop &&
                  displayedItems >= filteredProducts.length &&
                  filteredProducts.length >
                    ITEMS_PER_PAGE_DESKTOP_PAGINATION && (
                    <div className="mt-8 text-center">
                      <p className="text-sm text-muted-foreground">
                        Showing all {filteredProducts.length} products
                      </p>
                    </div>
                  )}
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
