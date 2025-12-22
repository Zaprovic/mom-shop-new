"use server";

import { db } from "@/db";
import { category, product, productCategory } from "@/db/schema";
import { ProductFormValues } from "@/schemas/product.schema";
import { getUser } from "@/server/auth";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createProductAction(data: ProductFormValues) {
  const user = await getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  try {
    // 1. Handle Category
    let categoryId: number;
    const existingCategory = await db
      .select()
      .from(category)
      .where(eq(category.name, data.category))
      .limit(1);

    if (existingCategory.length > 0) {
      categoryId = existingCategory[0].id;
    } else {
      const [newCategory] = await db
        .insert(category)
        .values({ name: data.category })
        .returning();
      categoryId = newCategory.id;
    }

    // 2. Create Product
    const [newProduct] = await db
      .insert(product)
      .values({
        name: data.name,
        price: data.price,
        imageUrl: data.imageUrl,
        inStock: data.inStock,
        userId: user.id,
      })
      .returning();

    // 3. Link Product and Category
    await db.insert(productCategory).values({
      productId: newProduct.id,
      categoryId: categoryId,
    });

    revalidatePath("/product-management");
    revalidatePath("/shop");

    return { success: true };
  } catch (error) {
    console.error("Error creating product:", error);
    throw new Error("Failed to create product");
  }
}
