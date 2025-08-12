'use client';

import Header from '@/components/Header';
import { useCart } from '@/contexts/CartContext';
import { useRouter } from 'next/navigation';
import React from 'react';

const CartPage = () => {
 const { cartItems, removeFromCart } = useCart();
 const router = useRouter();

 const handleCheckout = () => {
  router.push('/checkout');
 };

 if (cartItems.length === 0) {
  return (
   <div>
    <Header />
    <div className="container mx-auto p-8 text-center">
     <h2 className="text-2xl font-bold mb-4">Keranjang Anda Kosong</h2>
     <p>Tambahkan beberapa produk untuk melanjutkan.</p>
    </div>
   </div>
  );
 }

 const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

 return (
  <div>
   <Header />
   <div className="container mx-auto p-4 md:p-8">
    <h2 className="text-3xl font-bold mb-6">Keranjang Belanja</h2>
    <div className="flex flex-col md:flex-row gap-8">
     {/* Daftar Produk di Keranjang */}
     <div className="flex-1">
      <div className="space-y-4">
       {cartItems.map((item) => (
        <div key={item.ID} className="flex items-center gap-4 p-4 border rounded-lg shadow-sm">
         <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
         <div className="flex-1">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-gray-600 text-sm">Brand: {item.brand}</p>
          <p className="text-gray-600 text-sm">Size: {item.size}</p>
          <p className="font-bold">Rp {item.price.toLocaleString('id-ID')}</p>
         </div>
         <div className="flex items-center gap-4">
          <span className="text-gray-600">Qty: {item.quantity}</span>
          <button onClick={() => removeFromCart(item.ID)} className="text-red-500 hover:text-red-700">
           Hapus
          </button>
         </div>
        </div>
       ))}
      </div>
     </div>

     {/* Ringkasan Pesanan */}
     <div className="w-full md:w-1/3 bg-gray-50 p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4">Ringkasan Pesanan</h3>
      <div className="flex justify-between mb-2">
       <span>Subtotal</span>
       <span>Rp {subtotal.toLocaleString('id-ID')}</span>
      </div>
      <div className="flex justify-between mb-4">
       <span>Ongkos Kirim</span>
       <span>Rp 0</span>
      </div>
      <div className="h-px bg-gray-200 my-4" />
      <div className="flex justify-between font-bold text-lg mb-6">
       <span>Total</span>
       <span>Rp {subtotal.toLocaleString('id-ID')}</span>
      </div>
      <button
       onClick={handleCheckout}
       className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700"
      >
       Lanjutkan ke Pembayaran
      </button>
     </div>
    </div>
   </div>
  </div>
 );
};

export default CartPage;
