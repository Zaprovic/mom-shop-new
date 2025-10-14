import type { Product } from "@/types/product";
import { ProductCard } from "../product-card";

interface ProductListProps {
  products: Product[];
}

export function ProductList({ products }: ProductListProps) {
  return (
    <div className="space-y-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} viewMode="list" />
      ))}
    </div>
  );
}
