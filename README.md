# Factor - Invoice Management System

<div align="center">

![Factor](https://img.shields.io/badge/Factor-Invoice%20Management-1890ff?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?style=flat-square&logo=vite)
![Ant Design](https://img.shields.io/badge/Ant%20Design-6.2-0170FE?style=flat-square&logo=antdesign)

**A modern, feature-rich invoice management application built with React and TypeScript.**

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Application](#running-the-application)
- [Available Scripts](#-available-scripts)
- [Architecture](#-architecture)
- [Authentication](#-authentication)
- [Internationalization](#-internationalization)
- [Theming](#-theming)
- [API Integration](#-api-integration)
- [License](#-license)

---

## 🎯 Overview

Factor is a comprehensive invoice management system designed to streamline billing operations for businesses. It provides a clean, intuitive interface for managing invoices, clients, and company settings, with support for multiple languages and themes.

---

## ✨ Features

### Invoice Management
- 📝 Create, edit, and delete invoices
- 📊 Track invoice status (Draft, Pending, Paid, Overdue)
- 📄 Generate and preview PDF invoices
- 🔢 Automatic invoice numbering with series support
- 💰 Multi-currency support
- 📅 Manage emission, operation, and due dates

### Client Management
- 👥 Full CRUD operations for clients
- 🏢 Store client company details (VAT, address, contact info)
- 🔍 Advanced filtering and search capabilities
- 📋 Client-invoice relationship tracking

### Dashboard
- 📈 Overview statistics and metrics
- 📋 Recent invoices table
- 🎯 Quick action buttons

### Company Settings
- ⚙️ Configure company profile
- 👤 User management
- 🏷️ Customizable branding

### User Experience
- 🌍 Multi-language support (English & Spanish)
- 🌙 Dark/Light theme toggle
- 📱 Responsive design
- 🔐 Protected routes with authentication

---

## 🛠️ Tech Stack

### Core
| Technology | Version | Purpose |
|------------|---------|---------|
| [React](https://react.dev/) | 19.2 | UI Library |
| [TypeScript](https://www.typescriptlang.org/) | 5.9 | Type Safety |
| [Vite](https://vitejs.dev/) | 7.2 | Build Tool & Dev Server |

### UI & Styling
| Technology | Version | Purpose |
|------------|---------|---------|
| [Ant Design](https://ant.design/) | 6.2 | UI Component Library |
| [@ant-design/icons](https://ant.design/components/icon) | 6.1 | Icon Library |

### State & Data Management
| Technology | Version | Purpose |
|------------|---------|---------|
| [TanStack Query](https://tanstack.com/query) | 5.90 | Server State Management |
| [Axios](https://axios-http.com/) | 1.13 | HTTP Client |

### Routing & Navigation
| Technology | Version | Purpose |
|------------|---------|---------|
| [React Router](https://reactrouter.com/) | 7.13 | Client-side Routing |

### Internationalization
| Technology | Version | Purpose |
|------------|---------|---------|
| [i18next](https://www.i18next.com/) | 25.8 | Internationalization Framework |
| [react-i18next](https://react.i18next.com/) | 16.5 | React Integration |
| [i18next-browser-languagedetector](https://github.com/i18next/i18next-browser-languageDetector) | 8.2 | Language Detection |

### Utilities
| Technology | Version | Purpose |
|------------|---------|---------|
| [Day.js](https://day.js.org/) | 1.11 | Date Manipulation |

### Development Tools
| Technology | Version | Purpose |
|------------|---------|---------|
| [ESLint](https://eslint.org/) | 9.39 | Code Linting |
| [typescript-eslint](https://typescript-eslint.io/) | 8.46 | TypeScript ESLint Support |
| [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) | 4.2 | Fast React Refresh |

---

## 📁 Project Structure

```
factor-front/
├── public/                     # Static assets
├── src/
│   ├── components/             # Shared/global components
│   │   ├── AppHeader.tsx       # Application header with navigation
│   │   ├── LanguageSwitcher.tsx# Language selection component
│   │   ├── ModalHeader.tsx     # Reusable modal header
│   │   ├── Navbar.tsx          # Navigation bar
│   │   ├── PageHeader.tsx      # Page title component
│   │   ├── ProtectedRoute.tsx  # Auth route wrapper
│   │   └── ThemeSwitcher.tsx   # Dark/Light mode toggle
│   │
│   ├── config/                 # Application configuration
│   │   └── index.ts            # Config exports (API URLs, etc.)
│   │
│   ├── contexts/               # React Context providers
│   │   ├── AuthContext.tsx     # Authentication state
│   │   └── ThemeContext.tsx    # Theme state
│   │
│   ├── features/               # Feature-based modules
│   │   ├── auth/               # Authentication feature
│   │   │   └── pages/
│   │   │       ├── AuthCallbackPage.tsx
│   │   │       └── LoginPage.tsx
│   │   │
│   │   ├── client/             # Client management feature
│   │   │   ├── components/
│   │   │   │   ├── clients-table/
│   │   │   │   ├── create-client-modal/
│   │   │   │   └── edit-client-modal/
│   │   │   ├── hooks/
│   │   │   ├── pages/
│   │   │   └── utils/
│   │   │
│   │   ├── company/            # Company management feature
│   │   │   └── pages/
│   │   │
│   │   ├── dashboard/          # Dashboard feature
│   │   │   ├── components/
│   │   │   │   ├── overview-row/
│   │   │   │   └── recent-invoices-table/
│   │   │   └── pages/
│   │   │
│   │   ├── invoice/            # Invoice management feature
│   │   │   ├── components/
│   │   │   │   ├── invoice-form/
│   │   │   │   ├── invoices-table/
│   │   │   │   └── pdf-preview-modal/
│   │   │   ├── hooks/
│   │   │   ├── pages/
│   │   │   └── utils/
│   │   │
│   │   └── settings/           # Settings feature
│   │       ├── components/
│   │       │   ├── company-form/
│   │       │   └── users-list/
│   │       ├── hooks/
│   │       └── pages/
│   │
│   ├── hooks/                  # Global custom hooks
│   │
│   ├── i18n/                   # Internationalization
│   │   ├── index.ts            # i18n configuration
│   │   └── locales/
│   │       ├── en.json         # English translations
│   │       └── es.json         # Spanish translations
│   │
│   ├── services/               # API service layer
│   │   ├── api.ts              # Axios instance & interceptors
│   │   ├── auth.service.ts     # Authentication API
│   │   ├── client.service.ts   # Client API
│   │   ├── company.service.ts  # Company API
│   │   ├── invoice.service.ts  # Invoice API
│   │   └── user.service.ts     # User API
│   │
│   ├── types/                  # TypeScript type definitions
│   │   └── index.ts            # All interfaces & types
│   │
│   ├── App.tsx                 # Root component
│   ├── App.css                 # Global styles
│   ├── main.tsx                # Application entry point
│   └── index.css               # Base CSS
│
├── eslint.config.js            # ESLint configuration
├── index.html                  # HTML entry point
├── package.json                # Dependencies & scripts
├── tsconfig.json               # TypeScript configuration
├── tsconfig.app.json           # App TypeScript config
├── tsconfig.node.json          # Node TypeScript config
└── vite.config.ts              # Vite configuration
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v18.0.0 or higher recommended)
- **npm** (v9.0.0 or higher) or **yarn** or **pnpm**
- A running instance of the Factor backend API

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd factor-front
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

### Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3000
```

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:3000` |

### Running the Application

**Development mode:**
```bash
npm run dev
```
The application will be available at `http://localhost:5173`

**Production build:**
```bash
npm run build
```

**Preview production build:**
```bash
npm run preview
```

---

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Type-check and build for production |
| `npm run lint` | Run ESLint for code quality checks |
| `npm run preview` | Preview the production build locally |

---

## 🏗️ Architecture

### Feature-Based Architecture

The application follows a **feature-based architecture** pattern, where code is organized by business domain rather than technical function:

```
features/
├── auth/           # Authentication & authorization
├── client/         # Client management
├── company/        # Company setup & management
├── dashboard/      # Dashboard & analytics
├── invoice/        # Invoice operations
└── settings/       # User & company settings
```

Each feature module contains:
- **components/** - Feature-specific UI components
- **hooks/** - Custom hooks for business logic
- **pages/** - Route page components
- **utils/** - Utility functions

### State Management

- **Server State**: Managed with TanStack Query (React Query) for caching, synchronization, and automatic refetching
- **Auth State**: React Context for global authentication state
- **Theme State**: React Context for theme preferences
- **Local State**: React useState/useReducer for component-level state

### Custom Hooks Pattern

Business logic is extracted into custom hooks:
- `useClients` - Client data fetching
- `useInvoices` - Invoice data fetching
- `useCreateInvoice` - Invoice creation logic
- `useDeleteInvoice` - Invoice deletion with confirmation
- `useInvoiceFilters` - Filter state management
- And more...

---

## 🔐 Authentication

Factor uses **JWT-based authentication** with Google OAuth support:

1. **Login Flow**: Users authenticate via Google OAuth
2. **Token Storage**: JWT tokens are stored in `localStorage`
3. **Protected Routes**: `ProtectedRoute` component guards authenticated routes
4. **Automatic Token Refresh**: Axios interceptors handle 401 responses
5. **Company Requirement**: Some routes require the user to have an associated company

### Auth Context API

```typescript
interface AuthContextType {
  token: string | null;
  user: User | null;
  isLoading: boolean;
  login: (token: string) => void;
  logout: () => void;
  fetchProfile: () => Promise<void>;
}
```

---

## 🌍 Internationalization

Factor supports multiple languages using **i18next**:

### Supported Languages
- 🇺🇸 English (`en`)
- 🇪🇸 Spanish (`es`)

### Adding Translations

1. Add translations to `src/i18n/locales/[lang].json`
2. Use the `useTranslation` hook in components:

```typescript
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();
  return <h1>{t('invoices.title')}</h1>;
}
```

### Language Detection

Language is automatically detected from:
1. `localStorage` (persisted preference)
2. Browser navigator settings

---

## 🎨 Theming

Factor supports **Light** and **Dark** themes using Ant Design's theming system:

### Theme Context API

```typescript
interface ThemeContextType {
  theme: 'light' | 'dark' | 'system';
  effectiveTheme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
}
```

### Using Themes

The `ThemeSwitcher` component allows users to toggle between:
- ☀️ Light mode
- 🌙 Dark mode
- 💻 System preference

---

## 🔌 API Integration

### Axios Configuration

The application uses a centralized Axios instance with:
- **Base URL** configuration from environment variables
- **Request interceptor** for JWT token injection
- **Response interceptor** for error handling and auto-logout on 401

### Service Layer

API calls are organized into service modules:

```typescript
// Example: Invoice Service
invoiceService.getAll(params)      // List invoices
invoiceService.getById(id)         // Get single invoice
invoiceService.create(data)        // Create invoice
invoiceService.update(id, data)    // Update invoice
invoiceService.delete(id)          // Delete invoice
invoiceService.getDashboard()      // Get dashboard stats
invoiceService.generatePdf(id)     // Generate PDF
```

---

## 📄 License

**PROPRIETARY SOFTWARE**

Copyright © 2026 Factor. All Rights Reserved.

This software is proprietary and confidential. Unauthorized copying, modification, distribution, or use of this software is strictly prohibited. See the [LICENSE](LICENSE) file for full details.

---

<div align="center">

**Built with ❤️ using React & TypeScript**

</div>
