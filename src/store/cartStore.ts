import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product } from '../types';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, size: string, color: string, quantity?: number) => void;
  removeItem: (productId: string, size: string, color: string) => void;
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getRWNPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      
      addItem: (product, size, color, quantity = 1) => {
        const { items } = get();
        const existingItem = items.find(
          item => item.product.id === product.id && 
                  item.size === size && 
                  item.color === color
        );
        
        if (existingItem) {
          set({
            items: items.map(item =>
              item.product.id === product.id && 
              item.size === size && 
              item.color === color
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          });
        } else {
          set({ items: [...items, { product, size, color, quantity }] });
        }
      },
      
      removeItem: (productId, size, color) => {
        set({
          items: get().items.filter(
            item => !(item.product.id === productId && 
                     item.size === size && 
                     item.color === color)
          )
        });
      },
      
      updateQuantity: (productId, size, color, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId, size, color);
          return;
        }
        
        set({
          items: get().items.map(item =>
            item.product.id === productId && 
            item.size === size && 
            item.color === color
              ? { ...item, quantity }
              : item
          )
        });
      },
      
      clearCart: () => set({ items: [] }),
      
      toggleCart: () => set({ isOpen: !get().isOpen }),
      
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      
      getTotalPrice: () => {
        return get().items.reduce((total, item) => 
          total + (item.product.price * item.quantity), 0
        );
      },
      
      getRWNPrice: () => {
        const totalPrice = get().getTotalPrice();
        // 10% discount when paying with RWN
        const discountedPrice = totalPrice * 0.9;
        // Convert to RWN (1 RWN = $0.01)
        return Math.ceil(discountedPrice * 100);
      }
    }),
    {
      name: 'cart-storage',
    }
  )
);