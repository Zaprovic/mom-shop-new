import { ProductFormData } from "@/schemas/product.schema";
import { ProductCard } from "../product-card";

type props = {
  products: ProductFormData[];
};

export function ProductList({ products }: props) {
  return (
    <div className="space-y-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} viewMode="list" />
      ))}
    </div>
  );
}
