'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';

const CheckoutForm: React.FC = () => {
 const [email, setEmail] = useState('');
 const [name, setName] = useState('');
 const [phone, setPhone] = useState('');
 const [address, setAddress] = useState('');
 const [loading, setLoading] = useState(false);
 const [message, setMessage] = useState('');
 const { clearCart } = useCart();
 const router = useRouter();

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setMessage('');

  // Validasi sederhana
  if (!email || !name || !phone || !address) {
   setMessage('Mohon lengkapi semua data.');
   setLoading(false);
   return;
  }

  // Simulasi pengiriman data ke backend
  try {
   // Di sini Anda akan memanggil API backend untuk menyimpan pesanan
   // const response = await fetch('http://localhost:8080/api/orders', {
   //   method: 'POST',
   //   headers: { 'Content-Type': 'application/json' },
   //   body: JSON.stringify({ email, name, phone, address, cartItems }),
   // });

   // if (!response.ok) {
   //   throw new Error('Gagal memproses pesanan.');
   // }

   // Logika sukses
   await new Promise(resolve => setTimeout(resolve, 2000)); // Simulasi delay API
   setMessage('Pesanan Anda berhasil dikirim! Kami akan segera menghubungi Anda.');
   clearCart(); // Kosongkan keranjang setelah berhasil

   // Redirect ke halaman sukses setelah beberapa detik
   setTimeout(() => {
    router.push('/');
   }, 3000);

  } catch (error) {
   setMessage(`Terjadi kesalahan: ${error instanceof Error ? error.message : 'Silakan coba lagi.'}`);
  } finally {
   setLoading(false);
  }
 };

 return (
  <div className="bg-white p-6 rounded-lg shadow-md">
   <h3 className="text-xl font-bold mb-4">Informasi Pelanggan</h3>
   <form onSubmit={handleSubmit} className="space-y-4">
    <div>
     <label className="block text-gray-700">Email</label>
     <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
      required
     />
    </div>
    <div>
     <label className="block text-gray-700">Nama Lengkap</label>
     <input
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
      className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
      required
     />
    </div>
    <div>
     <label className="block text-gray-700">Nomor Telepon</label>
     <input
      type="tel"
      value={phone}
      onChange={(e) => setPhone(e.target.value)}
      className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
      required
     />
    </div>
    <div>
     <label className="block text-gray-700">Alamat Lengkap</label>
     <textarea
      value={address}
      onChange={(e) => setAddress(e.target.value)}
      rows={4}
      className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
      required
     />
    </div>
    <button
     type="submit"
     className="w-full bg-green-600 text-white p-3 rounded-md hover:bg-green-700 disabled:bg-gray-400"
     disabled={loading}
    >
     {loading ? 'Memproses...' : 'Konfirmasi Pesanan'}
    </button>
    {message && (
     <p className={`mt-2 text-center ${message.includes('berhasil') ? 'text-green-600' : 'text-red-600'}`}>
      {message}
     </p>
    )}
   </form>
  </div>
 );
};

export default CheckoutForm;
