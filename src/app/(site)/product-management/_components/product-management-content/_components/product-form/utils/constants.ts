export const PRODUCT_CATEGORIES = [
  "Skincare",
  "Makeup",
  "Haircare",
  "Fragrances",
  "Wellness",
] as const;

export const BADGE_OPTIONS = [
  { value: "best-seller", label: "Best Seller" },
  { value: "new", label: "New" },
  { value: "trending", label: "Trending" },
  { value: "popular", label: "Popular" },
  { value: "limited", label: "Limited Edition" },
] as const;

export const FORM_DEFAULT_VALUES = {
  name: "",
  price: "",
  category: "",
  rating: "5",
  reviews: "0",
  badge: null,
  inStock: true,
} as const;

export const FORM_MESSAGES = {
  submitLoading: "Creating...",
  submitSuccess: "Product created successfully!",
  submitButton: "Create Product",
  resetButton: "Reset",
  productName: "Product Name",
  productNamePlaceholder: "Enter product name",
  productNameDescription: "The name of your product (2-100 characters)",
  price: "Price ($)",
  pricePlaceholder: "0.00",
  priceDescription: "Product price in USD",
  category: "Category",
  categoryPlaceholder: "Select a category",
  rating: "Rating",
  ratingPlaceholder: "0",
  ratingDescription: "Rating out of 5",
  reviews: "Number of Reviews",
  reviewsPlaceholder: "0",
  reviewsDescription: "Total number of customer reviews",
  badge: "Badge (Optional)",
  badgePlaceholder: "Select a badge or leave empty",
  badgeDescription: "Add a badge to highlight your product",
  noBadge: "No Badge",
  inStock: "In Stock",
  inStockDescription: "Is this product currently available?",
} as const;
