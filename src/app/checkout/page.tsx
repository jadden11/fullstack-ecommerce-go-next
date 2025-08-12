'use client';

import Header from '@/components/Header';
import CheckoutForm from '@/components/CheckoutForm';
import { useCart } from '@/contexts/CartContext';
import { useRouter } from 'next/navigation';
import React from 'react';

const CheckoutPage = () => {
 const { cartItems } = useCart();
 const router = useRouter();

 const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

 if (cartItems.length === 0) {
  return (
   <div>
    <Header />
    <div className="container mx-auto p-8 text-center">
     <h2 className="text-2xl font-bold mb-4">Keranjang Anda Kosong</h2>
     <p>Tidak ada item untuk di checkout. Silakan kembali ke halaman utama.</p>
     <button onClick={() => router.push('/')} className="mt-4 bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700">
      Kembali ke Beranda
     </button>
    </div>
   </div>
  );
 }

 return (
  <div>
   <Header />
   <div className="container mx-auto p-4 md:p-8">
    <h2 className="text-3xl font-bold mb-6">Informasi Pembayaran & Pengiriman</h2>
    <div className="flex flex-col md:flex-row gap-8">
     <div className="flex-1">
      <CheckoutForm />
     </div>
     <div className="w-full md:w-1/3 bg-gray-50 p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4">Ringkasan Pesanan</h3>
      <div className="space-y-2 mb-4">
       {cartItems.map(item => (
        <div key={item.ID} className="flex items-center gap-2">
         <img src={item.imageUrl} alt={item.name} className="w-12 h-12 rounded-md object-cover" />
         <div className="flex-1">
          <p className="font-semibold text-sm">{item.name}</p>
          <p className="text-gray-600 text-xs">Qty: {item.quantity}</p>
         </div>
         <p className="font-semibold text-sm">Rp {item.price.toLocaleString('id-ID')}</p>
        </div>
       ))}
      </div>
      <div className="h-px bg-gray-200 my-4" />
      <div className="flex justify-between mb-2">
       <span>Subtotal</span>
       <span>Rp {subtotal.toLocaleString('id-ID')}</span>
      </div>
      <div className="flex justify-between mb-2">
       <span>Ongkos Kirim</span>
       <span>Rp 0</span>
      </div>
      <div className="h-px bg-gray-200 my-4" />
      <div className="flex justify-between font-bold text-lg">
       <span>Total</span>
       <span>Rp {subtotal.toLocaleString('id-ID')}</span>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
};

export default CheckoutPage;
