// src/components/FilterSidebar.tsx
'use client';

import React, { useState } from 'react';

interface FilterSidebarProps {
 onFilterChange: (key: string, value: string) => void;
 brands: { brand: string; count: number }[];
 sizes: { size: string; count: number }[];
 activeBrand: string;
 activeSize: string;
}

const colors = ['bg-black', 'bg-red-500', 'bg-blue-500', 'bg-gray-300', 'bg-green-500'];

const FilterSidebar: React.FC<FilterSidebarProps> = ({ onFilterChange, brands, sizes, activeBrand, activeSize }) => {
 const [priceMin, setPriceMin] = useState('');
 const [priceMax, setPriceMax] = useState('');

 const handlePriceChange = (e: React.FormEvent) => {
  e.preventDefault();
  onFilterChange('priceMin', priceMin);
  onFilterChange('priceMax', priceMax);
 };

 const handleBrandChange = (brand: string) => {
  const newValue = activeBrand === brand ? '' : brand;
  onFilterChange('brand', newValue);
 };

 const handleSizeChange = (size: string) => {
  const newValue = activeSize === size ? '' : size;
  onFilterChange('size', newValue);
 };

 return (
  <div className="w-full bg-white p-4 rounded-3xl shadow-lg">
   <div className="flex justify-between items-center mb-4">
    <h3 className="text-xl font-bold">Filter</h3>
   </div>

   {/* Brand Filter (DINAMIS) */}
   <div className="mb-6">
    <div className="flex justify-between items-center mb-2">
     <h4 className="font-semibold">Brand</h4>
    </div>
    <div className="space-y-2 text-gray-600 text-sm">
     {brands.map((brand) => (
      <div key={brand.brand} className="flex items-center justify-between">
       <label className="flex items-center">
        <input
         type="checkbox"
         className="mr-2"
         checked={activeBrand === brand.brand}
         onChange={() => handleBrandChange(brand.brand)}
        /> {brand.brand}
       </label>
       <span>{brand.count}</span>
      </div>
     ))}
    </div>
   </div>

   {/* Price Filter */}
   <div className="mb-6">
    <form onSubmit={handlePriceChange}>
     <div className="flex justify-between items-center mb-2">
      <h4 className="font-semibold">Price</h4>
     </div>
     <div className="flex gap-2">
      <input
       type="number"
       placeholder="Min"
       className="w-1/2 p-2 rounded"
       value={priceMin}
       onChange={(e) => setPriceMin(e.target.value)}
      />
      <input
       type="number"
       placeholder="Max"
       className="w-1/2 p-2 rounded"
       value={priceMax}
       onChange={(e) => setPriceMax(e.target.value)}
      />
     </div>
     <button type="submit" className="mt-2 w-full bg-blue-600 text-white p-2 rounded">
      Apply
     </button>
    </form>
   </div>

   {/* Size Filter (DINAMIS) */}
   <div className="mb-6">
    <div className="flex justify-between items-center mb-2">
     <h4 className="font-semibold">Size</h4>
    </div>
    <div className="flex flex-wrap gap-2 text-sm">
     {sizes.map(size => (
      <span
       key={size.size}
       className={`border text-gray-600 px-4 py-1 rounded-full cursor-pointer hover:bg-gray-100 ${activeSize === size.size ? 'bg-gray-800 text-white' : ''}`}
       onClick={() => handleSizeChange(size.size)}
      >
       {size.size}
      </span>
     ))}
    </div>
   </div>

   {/* Color Filter */}
   <div>
    <div className="flex justify-between items-center mb-2">
     <h4 className="font-semibold">Color</h4>
    </div>
    <div className="flex flex-wrap gap-2">
     {colors.map(color => (
      <span
       key={color}
       className={`w-6 h-6 rounded-full cursor-pointer ${color} border border-gray-300`}
       onClick={() => onFilterChange('color', color.replace('bg-', ''))}
      ></span>
     ))}
    </div>
   </div>
  </div>
 );
};

export default FilterSidebar;