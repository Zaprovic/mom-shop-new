import { ProductFormData } from "@/schemas/product.schema";

export const products: ProductFormData[] = [
  {
    id: 1,
    name: "Radiant Glow Serum",
    price: 45,
    category: "Skincare",
    imageUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80",
    inStock: true,
  },
  {
    id: 2,
    name: "Hydrating Face Cream",
    price: 38,
    category: "Skincare",
    imageUrl: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80",
    inStock: true,
  },
  {
    id: 3,
    name: "Vitamin C Cleanser",
    price: 28,
    category: "Skincare",
    imageUrl: "https://images.unsplash.com/photo-1556228720-1957be83f304?w=800&q=80",
    inStock: true,
  },
  {
    id: 4,
    name: "Anti-Aging Night Oil",
    price: 52,
    category: "Skincare",
    imageUrl: "https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?w=800&q=80",
    inStock: true,
  },
  {
    id: 5,
    name: "Matte Foundation",
    price: 42,
    category: "Makeup",
    imageUrl: "https://images.unsplash.com/photo-1596462502278-27bfdd403348?w=800&q=80",
    inStock: true,
  },
];
