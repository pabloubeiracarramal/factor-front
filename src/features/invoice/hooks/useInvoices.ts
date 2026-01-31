import { useQuery } from '@tanstack/react-query';
import { invoiceService } from '../../../services/invoice.service';
import type { InvoiceQueryParams } from '../../../types';

export const useInvoices = (filters?: InvoiceQueryParams) => {
  return useQuery({
    queryKey: ['invoices', filters],
    queryFn: async () => {
      const response = await invoiceService.findAll(filters);
      return response.data;
    },
  });
};
