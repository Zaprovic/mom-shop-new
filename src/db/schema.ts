import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  primaryKey,
  real,
  serial,
  varchar,
} from "drizzle-orm/pg-core";
import {
  createSelectSchema,
  createInsertSchema,
  createUpdateSchema,
} from "drizzle-zod";
import { z } from "zod";

// ------------------------------------------------------------------------

export const category = pgTable("category", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 50 }).notNull().unique(),
});

export const createCategorySchema = createSelectSchema(category);
export type CreateCategoryType = z.infer<typeof createCategorySchema>;

export const insertCategorySchema = createInsertSchema(category);
export type InsertCategoryType = z.infer<typeof insertCategorySchema>;

export const updateCategorySchema = createUpdateSchema(category);
export type UpdateCategoryType = z.infer<typeof updateCategorySchema>;

export const categoryRelations = relations(category, ({ many }) => ({
  productCategory: many(productCategory),
}));

// ------------------------------------------------------------------------

export const product = pgTable("product", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  price: real("price").notNull(),
  rating: real("rating").default(0).notNull(),
  reviews: integer("reviews").default(0).notNull(),
  inStock: boolean("in_stock").default(true).notNull(),
});

export const createProductSchema = createSelectSchema(product);
export type CreateProductType = z.infer<typeof createProductSchema>;

export const insertProductSchema = createInsertSchema(product);
export type InsertProductType = z.infer<typeof insertProductSchema>;

export const updateProductSchema = createUpdateSchema(product);
export type UpdateProductType = z.infer<typeof updateProductSchema>;

export const productRelations = relations(product, ({ many }) => ({
  productCategory: many(productCategory),
}));

// ------------------------------------------------------------------------

export const productCategory = pgTable(
  "product_category",
  {
    productId: serial("product_id")
      .notNull()
      .references(() => product.id, {
        onDelete: "cascade",
      }),
    categoryId: serial("category_id")
      .notNull()
      .references(() => category.id, {
        onDelete: "cascade",
      }),
  },
  (t) => [primaryKey({ columns: [t.productId, t.categoryId] })]
);

export const createProductCategorySchema = createSelectSchema(productCategory);
export type CreateProductCategoryType = z.infer<
  typeof createProductCategorySchema
>;

export const insertProductCategorySchema = createInsertSchema(productCategory);
export type InsertProductCategoryType = z.infer<
  typeof insertProductCategorySchema
>;

export const updateProductCategorySchema = createUpdateSchema(productCategory);
export type UpdateProductCategoryType = z.infer<
  typeof updateProductCategorySchema
>;

export const productCategoryRelations = relations(
  productCategory,
  ({ one }) => ({
    product: one(product, {
      fields: [productCategory.productId],
      references: [product.id],
    }),
    category: one(category, {
      fields: [productCategory.categoryId],
      references: [category.id],
    }),
  })
);

// ------------------------------------------------------------------------
