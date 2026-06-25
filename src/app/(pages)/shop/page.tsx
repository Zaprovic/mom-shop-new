import HeroBanner from "./_components/hero-banner";
import { ShopContent } from "./_components/shop-content";
import { db } from "@/db";
import { category } from "@/db/schema";

const sortOptions = [
  { label: "Destacados", value: "featured" },
  { label: "Precio: Menor a Mayor", value: "price-asc" },
  { label: "Precio: Mayor a Menor", value: "price-desc" },
];

export default async function ShopPage() {
  const categoriesData = await db.select().from(category);
  const categories = ["Todos", ...categoriesData.map((c) => c.name)];

  const productsData = await db.query.product.findMany({
    with: {
      productCategory: {
        with: {
          category: true,
        },
      },
    },
  });

  const formattedProducts = productsData.map((product) => ({
    id: product.id,
    name: product.name,
    price: product.price,
    imageUrl: product.imageUrl,
    inStock: product.inStock,
    category: product.productCategory[0]?.category.name || "Sin Categoría",
  }));

  return (
    <div className="min-h-screen bg-background">
      <HeroBanner />

      <ShopContent
        initialProducts={formattedProducts}
        categories={categories}
        sortOptions={sortOptions}
      />
    </div>
  );
}
