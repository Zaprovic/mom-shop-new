import { relations } from "drizzle-orm";
import {
  boolean,
  pgSchema,
  primaryKey,
  real,
  serial,
  varchar,
  text,
} from "drizzle-orm/pg-core";
import {
  createSelectSchema,
  createInsertSchema,
  createUpdateSchema,
} from "drizzle-zod";
import { z } from "zod";

export const shopSchema = pgSchema("shop");
export const authSchema = pgSchema("auth");

// ------------------------------------------------------------------------

export const user = authSchema.table("user", {
  id: varchar("id", { length: 255 }).primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
});

export const createUserSchema = createSelectSchema(user);
export type CreateUserType = z.infer<typeof createUserSchema>;

export const insertUserSchema = createInsertSchema(user);
export type InsertUserType = z.infer<typeof insertUserSchema>;

export const updateUserSchema = createUpdateSchema(user);
export type UpdateUserType = z.infer<typeof updateUserSchema>;

export const userRelations = relations(user, ({ many }) => ({
  products: many(product),
}));

// ------------------------------------------------------------------------

export const category = shopSchema.table("category", {
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

export const product = shopSchema.table("product", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  price: real("price").notNull(),
  imageUrl: text("image_url").notNull(),
  inStock: boolean("in_stock").default(true).notNull(),
  userId: varchar("user_id", { length: 255 })
    .notNull()
    .references(() => user.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
});

export const createProductSchema = createSelectSchema(product);
export type CreateProductType = z.infer<typeof createProductSchema>;

export const insertProductSchema = createInsertSchema(product);
export type InsertProductType = z.infer<typeof insertProductSchema>;

export const updateProductSchema = createUpdateSchema(product);
export type UpdateProductType = z.infer<typeof updateProductSchema>;

export const productRelations = relations(product, ({ many, one }) => ({
  productCategory: many(productCategory),
  user: one(user, {
    fields: [product.userId],
    references: [user.id],
  }),
}));

// ------------------------------------------------------------------------

export const productCategory = shopSchema.table(
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
