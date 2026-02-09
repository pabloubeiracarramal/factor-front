import { useMutation, useQueryClient } from '@tanstack/react-query';
import { App } from 'antd';
import { invoiceService } from '../../../services/invoice.service';
import { useTranslation } from 'react-i18next';

export const useConfirmInvoice = () => {
  const queryClient = useQueryClient();
  const { message } = App.useApp();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: (id: string) => invoiceService.confirm(id),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      queryClient.invalidateQueries({ queryKey: ['invoice'] });
      message.success(t('invoices.confirmSuccess', { number: `${response.data.invoiceSeries}-${response.data.invoiceNumber}` }));
    },
    onError: (error: any) => {
      message.error(error.response?.data?.message || t('invoices.confirmError'));
    },
  });
};
