import { ProductManagementContent } from "./_components/product-management-content";
import { db } from "@/db";
import { category } from "@/db/schema";

export default async function ProductManagementPage() {
  const categories = await db.select().from(category);

  return (
    <main className="min-h-screen bg-background">
      <ProductManagementContent categories={categories} />
    </main>
  );
}
