import { useMutation, useQueryClient } from '@tanstack/react-query';
import { App } from 'antd';
import { invoiceService } from '../../../services/invoice.service';
import type { UpdateInvoiceDto } from '../../../types';
import { useNavigate } from 'react-router-dom';

export const useUpdateInvoice = (id?: string) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { message } = App.useApp();

  return useMutation({
    mutationFn: (data: UpdateInvoiceDto) => {
      if (!id) throw new Error('ID is required');
      return invoiceService.update(id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      queryClient.invalidateQueries({ queryKey: ['invoice', id] });
      message.success('Invoice updated successfully');
      navigate('/invoices');
    },
    onError: (error: any) => {
      message.error(error.response?.data?.message || 'Failed to update invoice');
    }
  });
};
