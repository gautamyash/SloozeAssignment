# CommodityHub - Commodities Management System

A complete front-end application for managing commodities with role-based access control, built with React, TypeScript, and Vite.

## Features

- **Authentication System**: Secure login with email and password
- **Role-Based Access Control**: Manager and Store Keeper roles with different permissions
- **Dashboard**: Manager-only dashboard with commodity statistics
- **Product Management**: View, add, and edit products (accessible to both roles)
- **Light/Dark Mode**: Theme switching with localStorage persistence
- **Responsive Design**: Modern UI built with TailwindCSS

## Tech Stack

- **React 18** with **TypeScript**
- **Vite** for build tooling
- **React Router** for routing
- **React Context** for state management (Auth + Theme)
- **TailwindCSS** for styling

## Installation & Setup

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start the development server:**

   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:5173` (or the port shown in the terminal)

## Test Credentials

### Manager Account

- **Email:** `manager@commodityhub.com`
- **Password:** `password123`
- **Access:** Dashboard, Products, Add/Edit Products

### Store Keeper Account

- **Email:** `store@commodityhub.com`
- **Password:** `password123`
- **Access:** Products, Add/Edit Products (no Dashboard access)

## Role-Based Access Rules

| Feature | Manager | Store Keeper |
|---------|---------|--------------|
| Login | ✅ | ✅ |
| Dashboard | ✅ | ❌ |
| View Products | ✅ | ✅ |
| Add/Edit Products | ✅ | ✅ |
| Role-Based UI | ✅ | ✅ |

## Project Structure

```
src/
├── api/
│   └── fakeApi.ts          # Mock API layer with authentication and products endpoints
├── components/
│   ├── Navbar.tsx          # Navigation bar with role-based menu and theme toggle
│   ├── ProtectedRoute.tsx  # Router guard for authentication and role-based access
│   └── Toast.tsx           # Toast notification component
├── contexts/
│   ├── AuthContext.tsx     # Authentication context with login/logout and user state
│   └── ThemeContext.tsx   # Theme context for light/dark mode
├── pages/
│   ├── Login.tsx          # Login page
│   ├── Dashboard.tsx      # Manager-only dashboard with statistics
│   ├── ProductsList.tsx   # Products list page
│   └── ProductForm.tsx    # Add/Edit product form (reusable)
├── types/
│   └── index.ts           # TypeScript type definitions
├── App.tsx                # Main app component with routing
├── main.tsx              # Application entry point
└── index.css             # Global styles with TailwindCSS
```

## Key Implementation Details

### Authentication & Role Handling

- **AuthContext** (`src/contexts/AuthContext.tsx`):
  - Manages user authentication state
  - Stores token and user data in localStorage for persistence
  - Rehydrates auth state on app load
  - Provides `login()`, `logout()`, and `isAuthenticated` to components

- **ProtectedRoute** (`src/components/ProtectedRoute.tsx`):
  - Router guard that checks authentication status
  - Optionally checks for required role (e.g., MANAGER for dashboard)
  - Redirects unauthenticated users to `/login`
  - Redirects unauthorized users (wrong role) to `/products`

### Router Guards

Routes are protected using the `ProtectedRoute` component:

```tsx
<Route
  path="/dashboard"
  element={
    <ProtectedRoute requiredRole="MANAGER">
      <Dashboard />
    </ProtectedRoute>
  }
/>
```

- Unauthenticated users → redirected to `/login`
- Authenticated users without required role → redirected to `/products`
- Authenticated users with correct role → access granted

### Role-Based Menu Visibility

The **Navbar** component (`src/components/Navbar.tsx`) dynamically shows/hides menu items based on user role:

- **Managers** see: Dashboard, Products, Logout
- **Store Keepers** see: Products, Logout (Dashboard link is hidden)

The menu restrictions are enforced both in the UI (hiding links) and at the route level (ProtectedRoute guards prevent direct URL access).

### Theme Persistence

- **ThemeContext** (`src/contexts/ThemeContext.tsx`):
  - Manages light/dark theme state
  - Persists theme preference in localStorage
  - Applies `dark` class to document root for TailwindCSS dark mode
  - Provides `toggleTheme()` function for theme switching

The theme toggle button is available in the navbar and persists across page reloads.

## Mock API

The application uses a mock API layer (`src/api/fakeApi.ts`) that simulates:

- **Authentication**: `POST /auth/login` with email and password
- **Products**: `GET /products`, `POST /products`, `PUT /products/:id`

All API calls include simulated network latency (400-800ms) for realistic UX. The mock data includes 5 pre-configured products.

## Features Breakdown

### Login Flow

- Email and password validation
- Error handling for invalid credentials
- Automatic redirect to `/products` after successful login
- Session persistence via localStorage

### Dashboard (Manager Only)

- Total products count
- Total quantity across all products
- Low stock items count
- Out of stock items count
- Products grouped by status (In Stock, Low Stock, Out of Stock)

### Products Management

- **List Page**: Table view with all products, highlighting low/out-of-stock items
- **Add Form**: Create new products with validation
- **Edit Form**: Update existing products
- Form validation for required fields, positive prices, and non-negative quantities

### UI Enhancements

- Loading states during API calls
- Error messages for failed operations
- Success notifications (toasts) for successful actions
- Responsive design for mobile and desktop
- Dark mode support throughout the application

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## Notes

- All authentication and product data is stored in-memory (mock API)
- Page refreshes will maintain authentication state (via localStorage)
- The theme preference persists across sessions
- Router guards prevent unauthorized access even with direct URL navigation
