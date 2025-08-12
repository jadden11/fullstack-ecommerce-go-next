'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '@/types/Product';

// Definisikan struktur item di keranjang
interface CartItem extends Product {
 quantity: number;
}

// Definisikan struktur konteks keranjang
interface CartContextType {
 cartItems: CartItem[];
 addToCart: (product: Product, quantity?: number) => void;
 removeFromCart: (productId: number) => void;
 clearCart: () => void;
}

// Buat konteks dengan nilai default
const CartContext = createContext<CartContextType | undefined>(undefined);

// Buat provider yang akan membungkus seluruh aplikasi
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
 const [cartItems, setCartItems] = useState<CartItem[]>([]);

 // Fungsi untuk menambahkan produk ke keranjang
 const addToCart = (product: Product, quantityToAdd = 1) => {
  setCartItems(prevItems => {
   const existingItem = prevItems.find(item => item.ID === product.ID);
   if (existingItem) {
    return prevItems.map(item =>
     item.ID === product.ID
      ? { ...item, quantity: item.quantity + quantityToAdd }
      : item
    );
   } else {
    return [...prevItems, { ...product, quantity: quantityToAdd }];
   }
  });
 };

 // Fungsi untuk menghapus produk dari keranjang
 const removeFromCart = (productId: number) => {
  setCartItems(prevItems => prevItems.filter(item => item.ID !== productId));
 };

 // Fungsi untuk mengosongkan keranjang
 const clearCart = () => {
  setCartItems([]);
 };

 return (
  <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
   {children}
  </CartContext.Provider>
 );
};

// Buat hook kustom untuk memudahkan penggunaan konteks
export const useCart = () => {
 const context = useContext(CartContext);
 if (context === undefined) {
  throw new Error('useCart must be used within a CartProvider');
 }
 return context;
};
