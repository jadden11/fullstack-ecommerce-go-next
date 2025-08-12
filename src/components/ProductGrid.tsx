'use client';

import React from 'react';
import { Product } from '@/types/Product';
import ProductCard from './ProductCard'; // Mengimpor komponen ProductCard yang baru

interface ProductGridProps {
 products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
 if (products.length === 0) {
  return <div className="text-center text-gray-500 mt-8">Tidak ada produk yang ditemukan.</div>;
 }

 return (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
   {products.map((product) => (
    // Menggunakan komponen ProductCard untuk setiap produk
    <ProductCard key={product.ID} product={product} />
   ))}
  </div>
 );
};

export default ProductGrid;
