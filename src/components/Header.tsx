'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Heart, ShoppingCart, User } from 'lucide-react';
import { useCart } from '@/contexts/CartContext'; // Import hook useCart

const Header = () => {
 const [searchQuery, setSearchQuery] = useState('');
 const router = useRouter();
 const { cartItems } = useCart(); // Ambil item dari konteks
 const cartItemCount = cartItems.length;

 const handleSearch = (e: React.FormEvent) => {
  e.preventDefault();
  const newParams = new URLSearchParams(window.location.search);
  if (searchQuery) {
   newParams.set('q', searchQuery);
  } else {
   newParams.delete('q');
  }
  router.push(`/?${newParams.toString()}`);
 };

 return (
  <header className="bg-white shadow-md">
   <div className="container mx-auto p-4 flex items-center justify-between">
    <div className="flex items-center space-x-4">
     <span className="text-lg font-bold text-[#555] cursor-pointer" onClick={() => router.push('/')}>
      sStella
     </span>
     <form onSubmit={handleSearch} className="hidden md:flex relative w-64">
      <input
       type="text"
       placeholder="What are you looking for?"
       className="w-full p-2 pl-10 rounded-full bg-gray-100 border-none focus:outline-none"
       value={searchQuery}
       onChange={(e) => setSearchQuery(e.target.value)}
      />
      <svg
       className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
       fill="none"
       stroke="currentColor"
       viewBox="0 0 24 24"
       xmlns="http://www.w3.org/2000/svg"
      >
       <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
       />
      </svg>
     </form>
    </div>

    <div className="flex items-center space-x-6 text-gray-600">
     <span className="cursor-pointer flex items-center space-x-1">
      <Heart size={20} />
      {/* <span className="text-sm">Wishlist</span> */}
     </span>
     <div className="relative cursor-pointer" onClick={() => router.push('/cart')}>
      <ShoppingCart size={20} />
      {cartItemCount > 0 && (
       <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
        {cartItemCount}
       </span>
      )}
     </div>
     <span className="cursor-pointer flex items-center space-x-1">
      <User size={20} />
      <span className="hidden md:block text-sm">Login</span>
     </span>
    </div>
   </div>
  </header>
 );
};

export default Header;
