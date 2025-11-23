import { Product } from '../types';

export const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max',
    brand: 'Apple',
    price: 1199,
    images: [
      'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'electronics',
    subcategory: 'mobile',
    sizes: ['128GB', '256GB', '512GB', '1TB'],
    colors: ['Natural Titanium', 'Blue Titanium', 'White Titanium', 'Black Titanium'],
    description: 'The most advanced iPhone ever with titanium design and A17 Pro chip.',
    isNew: true,
    isTrending: true,
    isOnSale: false,
    rwnEligible: true,
    rating: 4.8,
    reviewCount: 2847
  },
  {
    id: '2',
    name: 'MacBook Pro 16"',
    brand: 'Apple',
    price: 2499,
    images: [
      'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'electronics',
    subcategory: 'computers',
    sizes: ['M3 Pro', 'M3 Max'],
    colors: ['Space Gray', 'Silver'],
    description: 'Supercharged by M3 Pro and M3 Max chips for extreme performance.',
    isNew: true,
    isTrending: false,
    isOnSale: false,
    rwnEligible: true,
    rating: 4.9,
    reviewCount: 1523
  },
  {
    id: '3',
    name: 'Sony WH-1000XM5',
    brand: 'Sony',
    price: 399,
    originalPrice: 449,
    images: [
      'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'electronics',
    subcategory: 'audio',
    sizes: ['One Size'],
    colors: ['Black', 'Silver'],
    description: 'Industry-leading noise canceling headphones with premium sound.',
    isNew: false,
    isTrending: true,
    isOnSale: true,
    rwnEligible: true,
    rating: 4.7,
    reviewCount: 3421
  },
  {
    id: '4',
    name: 'Designer Silk Dress',
    brand: 'Luxury Brand',
    price: 350,
    images: [
      'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'womens',
    subcategory: 'clothing',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy', 'Emerald', 'Burgundy'],
    description: 'Elegant silk dress perfect for special occasions.',
    isNew: true,
    isTrending: true,
    isOnSale: false,
    rwnEligible: true,
    rating: 4.6,
    reviewCount: 892
  },
  {
    id: '5',
    name: 'Premium Leather Jacket',
    brand: 'Fashion House',
    price: 450,
    images: [
      'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'mens',
    subcategory: 'clothing',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Brown', 'Tan'],
    description: 'Handcrafted leather jacket with premium materials.',
    isNew: false,
    isTrending: true,
    isOnSale: false,
    rwnEligible: true,
    rating: 4.8,
    reviewCount: 1247
  },
  {
    id: '6',
    name: 'Designer Sneakers',
    brand: 'Luxury Footwear',
    price: 280,
    originalPrice: 320,
    images: [
      'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'womens',
    subcategory: 'shoes',
    sizes: ['5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10'],
    colors: ['White', 'Black', 'Pink', 'Blue'],
    description: 'Comfortable designer sneakers with premium materials.',
    isNew: false,
    isTrending: false,
    isOnSale: true,
    rwnEligible: true,
    rating: 4.5,
    reviewCount: 634
  }
];

export const rwnPacks = [
  { id: '1', price: 10, tokens: 1000, bonus: 0 },
  { id: '2', price: 25, tokens: 2500, bonus: 0 },
  { id: '3', price: 50, tokens: 5000, bonus: 0 },
  { id: '4', price: 100, tokens: 10000, bonus: 0, popular: true },
  { id: '5', price: 250, tokens: 25000, bonus: 250 },
  { id: '6', price: 500, tokens: 50000, bonus: 500 }
];