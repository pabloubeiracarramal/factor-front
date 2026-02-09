// Payment Method
export type PaymentMethod = 'BANK_TRANSFER' | 'CASH' | 'CREDIT_CARD' | 'PAYPAL' | 'OTHER';

// User
export interface User {
  id: string;
  email: string;
  name: string | null;
  googleId: string | null;
  avatarUrl: string | null;
  companyId: string | null;
  role: 'ADMIN' | 'USER';
  createdAt: string;
  updatedAt: string;
  company?: Company;
}

// Company
export interface Company {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  street: string | null;
  city: string | null;
  postalCode: string | null;
  state: string | null;
  country: string | null;
  vatNumber: string | null;
  bankAccountNumber: string | null;
  createdAt: string;
  updatedAt: string;
  users?: User[];
  invoices?: Invoice[];
  invitations?: CompanyInvitation[];
  _count?: {
    invoices: number;
    users: number;
    clients?: number;
  };
}

// Company Invitation
export interface CompanyInvitation {
  id: string;
  email: string;
  token: string;
  companyId: string;
  expiresAt: string;
  acceptedAt: string | null;
  createdAt: string;
}

// Invoice
export interface Invoice {
  id: string;
  invoiceNumber: string;
  invoiceSeries: string;
  reference?: string | null;
  clientId: string;
  client: Client;
  description: string | null;
  status: 'DRAFT' | 'PENDING' | 'PAID';
  paymentMethod?: PaymentMethod | null;
  observations?: string | null;
  dueDays: number;
  dueDate: string;
  emissionDate: string;
  operationDate: string;
  currency: string;
  companyId: string;
  createdAt: string;
  updatedAt: string;
  items?: InvoiceItem[];
}

// Invoice Item
export interface InvoiceItem {
  id: string;
  name: string;
  description?: string | null;
  quantity: number;
  price: string;
  taxRate: number;
  invoiceId: string;
}

// DTOs
export interface CreateCompanyDto {
  name: string;
  street?: string;
  city?: string;
  postalCode?: string;
  state?: string;
  country?: string;
  vatNumber?: string;
  bankAccountNumber?: string;
  adminEmail: string;
  adminName: string;
}

export interface UpdateCompanyDto {
  name?: string;
  email?: string;
  phone?: string;
  street?: string;
  city?: string;
  postalCode?: string;
  state?: string;
  country?: string;
  vatNumber?: string;
  bankAccountNumber?: string;
}

export interface CreateUserDto {
  email: string;
  name: string;
  companyId: string;
}

export interface UpdateUserDto {
  name?: string;
  companyId?: string;
}

export interface CreateInvoiceDto {
  clientId: string;
  description?: string;
  dueDays?: number;
  emissionDate?: string;
  operationDate?: string;
  invoiceSeries?: string;
  reference?: string;
  currency?: string;
  status?: 'DRAFT' | 'PENDING' | 'PAID';
  paymentMethod?: PaymentMethod;
  observations?: string;
  items: CreateInvoiceItemDto[];
}

export interface CreateInvoiceItemDto {
  name: string;
  description?: string;
  quantity: number;
  price: number;
  taxRate?: number;
}

export interface UpdateInvoiceDto {
  invoiceNumber?: string;
  clientId?: string;
  status?: 'DRAFT' | 'PENDING' | 'PAID';
  paymentMethod?: PaymentMethod;
  observations?: string;
  dueDays?: number;
  emissionDate?: string;
  operationDate?: string;
  invoiceSeries?: string;
  reference?: string;
  currency?: string;
  description?: string;
  items?: CreateInvoiceItemDto[];
}

// Dashboard
export interface DashboardStats {
  totalRevenue: number;
  outstandingAmount: number;
  invoiceCounts: {
    paid: number;
    overdue: number;
    draft: number;
  };
  recentInvoices: Invoice[];
  overdueInvoices: Invoice[];
  topClients: TopClient[];
  monthlyRevenue: MonthlyRevenue[];
  teamStats: {
    activeMembers: number;
    pendingInvitations: number;
  };
}

export interface TopClient {
  clientName: string;
  totalRevenue: number;
  invoiceCount: number;
}

export interface MonthlyRevenue {
  month: string;
  revenue: number;
  year: number;
}

// Invoice Query Filters
export interface InvoiceQueryParams {
  status?: 'DRAFT' | 'PENDING' | 'PAID';
  dateFrom?: string;
  dateTo?: string;
  priceMin?: number;
  priceMax?: number;
  clientId?: string;
  reference?: string;
}

// Client
export interface Client {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  street: string | null;
  city: string | null;
  postalCode: string | null;
  state: string | null;
  country: string | null;
  vatNumber: string | null;
  companyId: string;
  createdAt: string;
  updatedAt: string;
}

// Client Query Filters
export interface ClientQueryParams {
  name?: string;
  email?: string;
  phone?: string;
  vatNumber?: string;
  dateFrom?: string;
  dateTo?: string;
}

// Client DTOs
export interface CreateClientDto {
  name: string;
  email?: string;
  phone?: string;
  street?: string;
  city?: string;
  postalCode?: string;
  state?: string;
  country?: string;
  vatNumber?: string;
}

export interface UpdateClientDto {
  name?: string;
  email?: string;
  phone?: string;
  street?: string;
  city?: string;
  postalCode?: string;
  state?: string;
  country?: string;
  vatNumber?: string;
}
