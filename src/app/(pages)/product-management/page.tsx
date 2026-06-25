import { ProductManagementContent } from "./_components/product-management-content";
import { db } from "@/db";
import { category, product, productCategory } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function ProductManagementPage() {
  const categories = await db.select().from(category);

  const productsData = await db
    .select({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      inStock: product.inStock,
      categoryName: category.name,
    })
    .from(product)
    .leftJoin(productCategory, eq(product.id, productCategory.productId))
    .leftJoin(category, eq(productCategory.categoryId, category.id));

  const productsMap = new Map();
  productsData.forEach((p) => {
    if (!productsMap.has(p.id)) {
      productsMap.set(p.id, {
        id: p.id,
        name: p.name,
        price: p.price,
        imageUrl: p.imageUrl,
        inStock: p.inStock,
        category: p.categoryName || "",
      });
    }
  });

  const products = Array.from(productsMap.values());

  return (
    <main className="min-h-screen bg-background">
      <ProductManagementContent
        categories={categories}
        initialProducts={products}
      />
    </main>
  );
}
