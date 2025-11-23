export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  rwnBalance: number;
  isAuthenticated: boolean;
  tier: 'standard' | 'vip' | 'premium';
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  subcategory: string;
  sizes: string[];
  colors: string[];
  description: string;
  isNew: boolean;
  isTrending: boolean;
  isOnSale: boolean;
  rwnEligible: boolean;
  rating: number;
  reviewCount: number;
}

export interface CartItem {
  product: Product;
  size: string;
  color: string;
  quantity: number;
}

export interface NavigationItem {
  label: string;
  href: string;
  children?: NavigationItem[];
}

export interface RWNPack {
  id: string;
  price: number;
  tokens: number;
  bonus: number;
  popular?: boolean;
}