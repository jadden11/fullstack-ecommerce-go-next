// src/types/Product.ts
export type Product = {
  ID: number;
  name: string;
  brand: string;
  description: string;
  price: number;
  imageUrl: string;
  isNew?: boolean;
  stock?: number;
  popularity?: number;
  size?: string;
  color?: string;
  CreatedAt?: string;
  UpdatedAt?: string;
};
