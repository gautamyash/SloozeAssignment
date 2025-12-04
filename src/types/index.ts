export type UserRole = 'MANAGER' | 'STORE_KEEPER';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export type ProductStatus = 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK';

export interface Product {
  id: string;
  name: string;
  category: string;
  sku: string;
  price: number;
  quantity: number;
  status: ProductStatus;
}

export interface ProductFormData {
  name: string;
  category: string;
  sku: string;
  price: number;
  quantity: number;
  status: ProductStatus;
}

