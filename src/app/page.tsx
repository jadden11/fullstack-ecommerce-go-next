// src/app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import FilterSidebar from '@/components/FilterSidebar';
import ProductGrid from '@/components/ProductGrid';
import { Product } from '@/types/Product';
import { useSearchParams, useRouter } from 'next/navigation';

interface FilterOption {
  brand: string;
  count: number;
}

interface SizeOption {
  size: string;
  count: number;
}

const brandImages: { [key: string]: string } = {
  'Adidas': 'https://static-id.zacdn.com/cms/w31/Desain_tanpa_judul.png',
  // 'Nike': 'https://images.unsplash.com/photo-1579298245158-831415250462?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  // 'Uniqlo': 'https://images.unsplash.com/photo-1555529718-2e860959f67a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  // 'Puma': 'https://images.unsplash.com/photo-1572979208035-7c1514798363?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  // 'Apple': 'https://images.unsplash.com/photo-1558296347-152140f7d432?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
};

const defaultBannerImage = "https://images.ctfassets.net/9q8du028z7sn/2DAwc6e5SYo41xlqVFuwO8/12cd364e134563f8347d4d9bb67d6de4/2024-CW23-Women-Hero-w23hncjunesegmented-1-dsk.jpg";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filterOptions, setFilterOptions] = useState<{ brands: FilterOption[], sizes: SizeOption[] }>({ brands: [], sizes: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();

  // Membaca semua parameter dari URL
  const brand = searchParams.get('brand') || '';
  const sortBy = searchParams.get('sortBy') || 'popularity';
  const priceMin = searchParams.get('priceMin') || '';
  const priceMax = searchParams.get('priceMax') || '';
  const size = searchParams.get('size') || '';
  const color = searchParams.get('color') || '';
  const searchQuery = searchParams.get('q') || '';

  // Menentukan URL gambar banner berdasarkan merek yang dipilih
  const currentBannerImage = brandImages[brand] || defaultBannerImage;

  useEffect(() => {
    const fetchProductsAndFilters = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch produk dari API
        let productsUrl = 'http://localhost:8080/api/products';
        const params = new URLSearchParams();
        if (brand) params.append('brand', brand);
        if (priceMin) params.append('priceMin', priceMin);
        if (priceMax) params.append('priceMax', priceMax);
        if (size) params.append('size', size);
        if (color) params.append('color', color);
        if (searchQuery) params.append('q', searchQuery);
        params.append('sortBy', sortBy);

        if (params.toString()) {
          productsUrl += `?${params.toString()}`;
        }

        const productsResponse = await fetch(productsUrl);
        if (!productsResponse.ok) {
          throw new Error('Failed to fetch products');
        }
        const productsData = await productsResponse.json();
        setProducts(productsData);

        // Fetch opsi filter dari API baru
        const filterResponse = await fetch('http://localhost:8080/api/filter-options');
        if (!filterResponse.ok) {
          throw new Error('Failed to fetch filter options');
        }
        const filterData = await filterResponse.json();
        setFilterOptions(filterData);

      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };
    fetchProductsAndFilters();
  }, [brand, priceMin, priceMax, size, color, sortBy, searchQuery]);

  // Handler untuk memperbarui URL saat filter diubah
  const handleFilterChange = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    router.push(`/?${newParams.toString()}`);
  };

  const clearFilter = () => {
    router.push('/');
  };

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div>
      <Header />
      <div className="container mx-auto p-4 md:p-8">
        <div className="relative h-[250px] md:h-[400px] rounded-lg overflow-hidden mb-8">
          {/* Menggunakan URL gambar yang dinamis */}
          <img
            src={currentBannerImage}
            alt={brand || 'Simple is More'}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
          />
          {/* <div className="absolute inset-0 flex items-center justify-start p-8 md:p-16">
            {brand && (
              <div className="text-white text-shadow-lg">
                <h1 className="text-4xl md:text-6xl font-bold">{brand} Collection</h1>
              </div>
            )}
            {!brand && (
              <div className="text-white">
                <h1 className="text-4xl md:text-6xl font-bold">Simple is More</h1>
              </div>
            )}
          </div> */}
        </div>

        <div className="flex items-center text-sm text-gray-500 mb-4">
          <span className="cursor-pointer hover:text-gray-700" onClick={clearFilter}>
            Home
          </span>
          {brand && (
            <>
              <span className="mx-2">/</span>
              <span className="font-semibold text-gray-800">
                {brand}
              </span>
            </>
          )}
          {size && (
            <>
              <span className="mx-2">/</span>
              <span className="font-semibold text-gray-800">
                Size: {size}
              </span>
            </>
          )}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">{products.length} result for {brand || 'all products'}</h2>
          <div className="flex items-center mt-4 md:mt-0">
            <span className="mr-2 text-gray-500">Sort by:</span>
            <select
              className="text-gray-700"
              value={sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            >
              <option value="popularity">Popular</option>
              <option value="newest">Newest</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>
        </div>
        <div className="flex">
          <div className="hidden md:block md:w-1/4 pr-8">
            <FilterSidebar
              onFilterChange={handleFilterChange}
              brands={filterOptions.brands}
              sizes={filterOptions.sizes}
              activeBrand={brand}
              activeSize={size}
            />
          </div>
          <div className="w-full md:w-3/4">
            <ProductGrid products={products} />
          </div>
        </div>
      </div>
    </div>
  );
}