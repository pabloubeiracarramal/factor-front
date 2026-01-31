import { useQuery } from '@tanstack/react-query';
import { invoiceService } from '../../../services/invoice.service';

export const useInvoice = (id?: string) => {
  return useQuery({
    queryKey: ['invoice', id],
    queryFn: () => {
      if (!id) throw new Error('ID is required');
      return invoiceService.findOne(id).then((res) => res.data);
    },
    enabled: !!id,
  });
};