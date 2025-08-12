'use client';

import React from 'react';
import { Product } from '@/types/Product';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCart } from 'lucide-react'; // Menggunakan ikon keranjang dari Lucide React

interface ProductCardProps {
 product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
 const { addToCart } = useCart();

 const handleAddToCart = () => {
  // Memanggil fungsi addToCart dari CartContext
  addToCart(product);
  // Contoh notifikasi, bisa diganti dengan toast atau modal
  alert(`${product.name} berhasil ditambahkan ke keranjang!`);
 };

 return (
  <div className="bg-white rounded-lg overflow-hidden shadow-md transform transition-transform duration-300 hover:scale-105 flex flex-col">
   <div className="relative h-64 w-full">
    <img
     src={product.imageUrl}
     alt={product.name}
     className="w-full h-full object-cover"
    />
    {product.isNew && (
     <span className="absolute top-2 left-2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
      New Arrival
     </span>
    )}
   </div>
   <div className="p-4 flex flex-col flex-1">
    <h4 className="text-gray-500 text-sm">{product.brand}</h4>
    <h3 className="font-semibold text-lg">{product.name}</h3>
    <div className="flex justify-between items-center mt-2">
     <span className="font-bold text-gray-800">Rp {product.price.toLocaleString('id-ID')}</span>
     <span className="text-sm text-gray-400">{product.stock} items left</span>
    </div>
    <button
     onClick={handleAddToCart}
     className="w-full mt-auto flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
    >
     <ShoppingCart size={18} />
     <span>Add to Cart</span>
    </button>
   </div>
  </div>
 );
};

export default ProductCard;
