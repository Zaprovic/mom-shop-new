import HeroBanner from "./_components/hero-banner";
import { ShopContent } from "./_components/shop-content";
import { db } from "@/db";
import { category } from "@/db/schema";

const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
];

export default async function ShopPage() {
  const categoriesData = await db.select().from(category);
  const categories = ["All", ...categoriesData.map((c) => c.name)];

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
    category: product.productCategory[0]?.category.name || "Uncategorized",
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
