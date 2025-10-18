import { ProductFormData } from "@/schemas/product.schema";
import { ProductCard } from "../product-card";

type props = {
  products: ProductFormData[];
};

export function ProductGrid({ products }: props) {
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
