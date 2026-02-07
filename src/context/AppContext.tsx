import React, { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from 'sonner@2.0.3';
import { CartItem, Product, User } from '../types';

interface AppContextType {
  cart: CartItem[];
  wishlist: Product[];
  user: User | null;
  addToCart: (product: Product, quantity: number, color: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  login: (email: string, password: string) => void;
  signup: (name: string, email: string, password: string) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [user, setUser] = useState<User | null>(null);

  const addToCart = (product: Product, quantity: number, color: string) => {
    setCart((prev) => {
      const existingItem = prev.find(
        (item) => item.product.id === product.id && item.selectedColor === color
      );
      if (existingItem) {
        toast.success('Updated cart quantity');
        return prev.map((item) =>
          item.product.id === product.id && item.selectedColor === color
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      toast.success('Added to cart!');
      return [...prev, { product, quantity, selectedColor: color }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    toast.success('Removed from cart');
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    toast.success('Cart cleared');
  };

  const addToWishlist = (product: Product) => {
    setWishlist((prev) => {
      if (prev.find((p) => p.id === product.id)) return prev;
      toast.success('Added to wishlist!');
      return [...prev, product];
    });
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist((prev) => prev.filter((p) => p.id !== productId));
    toast.success('Removed from wishlist');
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((p) => p.id === productId);
  };

  const login = (email: string, password: string) => {
    // Mock login
    setUser({
      id: '1',
      name: 'John Doe',
      email: email,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + email,
    });
    toast.success('Welcome back!');
  };

  const signup = (name: string, email: string, password: string) => {
    // Mock signup
    setUser({
      id: '1',
      name: name,
      email: email,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + email,
    });
    toast.success('Account created successfully!');
  };

  const logout = () => {
    setUser(null);
    toast.success('Logged out successfully');
  };

  return (
    <AppContext.Provider
      value={{
        cart,
        wishlist,
        user,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}