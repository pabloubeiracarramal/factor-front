import api from './api';
import type { Invoice, CreateInvoiceDto, UpdateInvoiceDto, DashboardStats, InvoiceQueryParams } from '../types';

export const invoiceService = {
  create: (data: CreateInvoiceDto) => 
    api.post<Invoice>('/invoices', data),
  
  findAll: (params?: InvoiceQueryParams) => 
    api.get<Invoice[]>('/invoices', { params }),
  
  findOne: (id: string) => 
    api.get<Invoice>(`/invoices/${id}`),
  
  update: (id: string, data: UpdateInvoiceDto) => 
    api.patch<Invoice>(`/invoices/${id}`, data),
  
  remove: (id: string) => 
    api.delete(`/invoices/${id}`),
  
  getDashboard: () => 
    api.get<DashboardStats>('/invoices/dashboard'),
  
  previewPDF: (id: string) => 
    api.get(`/invoices/${id}/pdf/preview`, { responseType: 'blob' }),
  
  downloadPDF: (id: string) => 
    api.get(`/invoices/${id}/pdf/download`, { responseType: 'blob' }),
};
