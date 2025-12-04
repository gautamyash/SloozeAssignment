import type { AuthResponse, LoginCredentials, Product, ProductFormData } from '../types';

// Simulate network latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Pre-configured users
const users = [
  {
    id: '1',
    name: 'Manager User',
    email: 'manager@commodityhub.com',
    password: 'password123',
    role: 'MANAGER' as const,
  },
  {
    id: '2',
    name: 'Store Keeper User',
    email: 'store@commodityhub.com',
    password: 'password123',
    role: 'STORE_KEEPER' as const,
  },
];

// In-memory product storage
let products: Product[] = [
  {
    id: '1',
    name: 'Wheat',
    category: 'Grains',
    sku: 'GRN-001',
    price: 25.50,
    quantity: 150,
    status: 'IN_STOCK',
  },
  {
    id: '2',
    name: 'Corn',
    category: 'Grains',
    sku: 'GRN-002',
    price: 20.00,
    quantity: 5,
    status: 'LOW_STOCK',
  },
  {
    id: '3',
    name: 'Rice',
    category: 'Grains',
    sku: 'GRN-003',
    price: 30.75,
    quantity: 0,
    status: 'OUT_OF_STOCK',
  },
  {
    id: '4',
    name: 'Coffee Beans',
    category: 'Beverages',
    sku: 'BEV-001',
    price: 45.00,
    quantity: 80,
    status: 'IN_STOCK',
  },
  {
    id: '5',
    name: 'Sugar',
    category: 'Sweeteners',
    sku: 'SWT-001',
    price: 15.25,
    quantity: 3,
    status: 'LOW_STOCK',
  },
];

let nextProductId = 6;

// Authentication API
export const authApi = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    await delay(800); // Simulate network latency

    const user = users.find(
      u => u.email === credentials.email && u.password === credentials.password
    );

    if (!user) {
      throw new Error('Invalid email or password');
    }

    const token = `token_${user.id}_${Date.now()}`;

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  },
};

// Products API
export const productsApi = {
  async getAll(): Promise<Product[]> {
    await delay(600);
    return [...products];
  },

  async getById(id: string): Promise<Product | null> {
    await delay(400);
    const product = products.find(p => p.id === id);
    return product ? { ...product } : null;
  },

  async create(data: ProductFormData): Promise<Product> {
    await delay(700);
    const newProduct: Product = {
      id: String(nextProductId++),
      ...data,
    };
    products.push(newProduct);
    return { ...newProduct };
  },

  async update(id: string, data: ProductFormData): Promise<Product> {
    await delay(700);
    const index = products.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Product not found');
    }
    products[index] = { ...products[index], ...data };
    return { ...products[index] };
  },
};

