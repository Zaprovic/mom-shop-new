export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  rating: number;
  reviews: number;
  badge?: string | null;
  inStock: boolean;
}
