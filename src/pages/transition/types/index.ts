export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  inStock: boolean;
  brand?: string;
  model?: string;
  tags?: string[];
  relevanceScore?: number;
}
