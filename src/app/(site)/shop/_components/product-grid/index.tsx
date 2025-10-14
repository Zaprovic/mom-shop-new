import type { Product } from "@/types/product";
import { ProductCard } from "../product-card";

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
        <ProductCard key={product.id} product={product} viewMode="grid" />
      ))}
    </div>
  );
}
