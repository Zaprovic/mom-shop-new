import { products } from "@/mock/products";
import HeroBanner from "./_components/hero-banner";
import { ShopContent } from "./_components/shop-content";

const categories = ["All", "Skincare", "Makeup", "Haircare", "Fragrance"];
const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Best Rating", value: "rating" },
  { label: "Most Reviews", value: "reviews" },
];

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-background">
      <HeroBanner />

      <ShopContent
        initialProducts={products}
        categories={categories}
        sortOptions={sortOptions}
      />
    </div>
  );
}
