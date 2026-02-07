export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  material: string;
  colors: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
  arAvailable: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface ComparisonProduct {
  brand: string;
  name: string;
  price: number;
  rating: number;
  features: string[];
  pros: string[];
  cons: string[];
}

export interface BlueprintItem {
  id: string;
  productId: string;
  product: Product;
  x: number;
  y: number;
  rotation: number;
  scale: number;
}
