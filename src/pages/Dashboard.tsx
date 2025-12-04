import { useEffect, useState } from 'react';
import { productsApi } from '../api/fakeApi';
import type { Product } from '../types';

/**
 * Dashboard page - Manager only.
 * Displays high-level commodity statistics derived from products.
 */
export function Dashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const data = await productsApi.getAll();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load products');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-solid border-indigo-500 border-r-transparent"></div>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 text-red-700 dark:text-red-400 px-6 py-4 rounded-r-lg">
          {error}
        </div>
      </div>
    );
  }

  // Calculate statistics
  const totalProducts = products.length;
  const totalQuantity = products.reduce((sum, p) => sum + p.quantity, 0);
  const lowStockCount = products.filter(p => p.status === 'LOW_STOCK').length;
  const outOfStockCount = products.filter(p => p.status === 'OUT_OF_STOCK').length;
  const inStockCount = products.filter(p => p.status === 'IN_STOCK').length;

  // Group products by status for visualization
  const productsByStatus = {
    IN_STOCK: products.filter(p => p.status === 'IN_STOCK'),
    LOW_STOCK: products.filter(p => p.status === 'LOW_STOCK'),
    OUT_OF_STOCK: products.filter(p => p.status === 'OUT_OF_STOCK'),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-indigo-50/30 to-purple-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">Overview of your commodities inventory</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all p-6 border border-gray-200/50 dark:border-gray-700/50 hover:scale-105 transform">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Total Products
                </div>
                <div className="mt-3 text-4xl font-bold text-gray-900 dark:text-white">
                  {totalProducts}
                </div>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all p-6 border border-gray-200/50 dark:border-gray-700/50 hover:scale-105 transform">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Total Quantity
                </div>
                <div className="mt-3 text-4xl font-bold text-gray-900 dark:text-white">
                  {totalQuantity.toLocaleString()}
                </div>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all p-6 border border-yellow-200/50 dark:border-yellow-700/50 hover:scale-105 transform">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-yellow-600 dark:text-yellow-400 uppercase tracking-wide">
                  Low Stock Items
                </div>
                <div className="mt-3 text-4xl font-bold text-yellow-600 dark:text-yellow-400">
                  {lowStockCount}
                </div>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all p-6 border border-red-200/50 dark:border-red-700/50 hover:scale-105 transform">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-red-600 dark:text-red-400 uppercase tracking-wide">
                  Out of Stock
                </div>
                <div className="mt-3 text-4xl font-bold text-red-600 dark:text-red-400">
                  {outOfStockCount}
                </div>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Products by Status Visualization */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* In Stock */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-green-200/50 dark:border-green-700/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-md">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  In Stock
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">{inStockCount} items</p>
              </div>
            </div>
            <div className="space-y-3">
              {productsByStatus.IN_STOCK.length > 0 ? (
                productsByStatus.IN_STOCK.slice(0, 5).map(product => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200/50 dark:border-green-700/50 hover:shadow-md transition-all"
                  >
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{product.name}</span>
                    <span className="text-xs font-semibold text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">
                      {product.quantity}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">No items in stock</p>
              )}
            </div>
          </div>

          {/* Low Stock */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-yellow-200/50 dark:border-yellow-700/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-md">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Low Stock
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">{lowStockCount} items</p>
              </div>
            </div>
            <div className="space-y-3">
              {productsByStatus.LOW_STOCK.length > 0 ? (
                productsByStatus.LOW_STOCK.map(product => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-3 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-xl border border-yellow-200/50 dark:border-yellow-700/50 hover:shadow-md transition-all"
                  >
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{product.name}</span>
                    <span className="text-xs font-semibold text-yellow-700 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30 px-2 py-1 rounded-full">
                      {product.quantity}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">No low stock items</p>
              )}
            </div>
          </div>

          {/* Out of Stock */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-red-200/50 dark:border-red-700/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-md">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Out of Stock
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">{outOfStockCount} items</p>
              </div>
            </div>
            <div className="space-y-3">
              {productsByStatus.OUT_OF_STOCK.length > 0 ? (
                productsByStatus.OUT_OF_STOCK.map(product => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-3 bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 rounded-xl border border-red-200/50 dark:border-red-700/50 hover:shadow-md transition-all"
                  >
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{product.name}</span>
                    <span className="text-xs font-semibold text-red-700 dark:text-red-400 bg-red-100 dark:bg-red-900/30 px-2 py-1 rounded-full">
                      Empty
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">No out of stock items</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

